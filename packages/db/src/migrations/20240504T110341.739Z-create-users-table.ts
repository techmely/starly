import type { Kysely } from "kysely";
import { withTimestamps } from "../utils";
import { sql } from "kysely";
import type { DB } from "kysely-codegen";

export async function up(db: Kysely<DB>) {
  await db.schema
    .createType("user_status")
    .asEnum(["NEWBIE", "VERIFIED", "BLACKLIST", "INACTIVE", "ACTIVE", "CLOSED"])
    .execute();
  await db.schema.createType("system_role_type").asEnum(["USER", "ADMIN", "SUPER_ADMIN"]).execute();

  // .addColumn("mobile", "varchar(20)", (col) => col.unique())
  // .addColumn("birthday", "timestamp")
  // .addColumn("locale", "varchar(10)", (col) => col.notNull())
  // .addColumn("gender", "varchar(50)")

  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "varchar(50)", (col) => col.primaryKey())
    .addColumn("email", "varchar(200)", (col) => col.notNull().unique())
    // If user need to receive the system notification or do some transaction --> Need to confirm email
    .addColumn("unverified_email", "varchar(200)", (col) => col.unique())
    .addColumn("nickname", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("status", sql`"user_status"`, (col) => col.notNull().defaultTo("NEWBIE"))
    .addColumn("is_email_verified", "boolean", (col) => col.defaultTo(false))
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("avatar_url", "text", (col) => col.notNull())
    .addColumn("firebase_user_id", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("system_role", sql`"system_role_type"`, (col) => col.notNull().defaultTo("USER"))
    // When using firebase auth --> Know user using basic auth, or facebook/github/twitter/google... auth
    .addColumn("auth_strategy", "varchar(12)", (col) => col.unique())
    // Use to know where is user creating their account - for marketing strategy
    .addColumn("open_platform", "varchar(25)", (col) => col.notNull())
    .addColumn("utm_campaign", "varchar(50)", (col) => col.notNull())
    .addColumn("utm_medium", "varchar(255)", (col) => col.notNull())
    .addColumn("utm_source", "varchar(255)", (col) => col.notNull())
    .addColumn("metadata", "jsonb")
    .$call(withTimestamps)
    .execute();

  await db.schema
    .createIndex("users_metadata_gin")
    .on("users")
    .column("metadata")
    .using("gin")
    .execute();
  await db.schema.createIndex("users_id_idx").on("users").column("id").unique().execute();
  await db.schema.createIndex("users_email_idx").on("users").column("email").unique().execute();
  await db.schema
    .createIndex("users_nickname_idx")
    .on("users")
    .column("nickname")
    .unique()
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex("users_id_idx").on("users").execute();
  await db.schema.dropIndex("users_email_idx").on("users").execute();
  await db.schema.dropIndex("users_nickname_idx").on("users").execute();
  await db.schema.dropTable("users").execute();
}
