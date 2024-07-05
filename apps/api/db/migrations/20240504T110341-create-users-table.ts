import type { Kysely } from "kysely";
import { sql } from "kysely";
import { withTimestamps } from "../utils";

export async function up(db: Kysely<any>) {
  await db.schema.createType("user_status").asEnum(["INACTIVE", "ACTIVE", "CLOSED"]).execute();
  await db.schema
    .createType("auth_strategy")
    .asEnum(["BASIC", "GOOGLE", "GITHUB", "FACEBOOK", "X", "APPLE", "LINKEDIN"])
    .execute();

  // .addColumn("mobile", "varchar(20)", (col) => col.unique())
  // .addColumn("birthday", "timestamp")
  // .addColumn("locale", "varchar(10)", (col) => col.notNull())
  // .addColumn("gender", "varchar(50)")

  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "varchar(42)", (col) => col.primaryKey())
    .addColumn("email", "varchar(200)", (col) => col.notNull().unique())
    .addColumn("nickname", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("status", sql`"user_status"`, (col) => col.notNull().defaultTo("ACTIVE"))
    .addColumn("is_email_verified", "boolean", (col) => col.defaultTo(false))
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("avatar_url", "text", (col) => col.notNull())
    .addColumn("firebase_user_id", "varchar(50)", (col) => col.notNull().unique())
    // When using firebase auth --> Know user using basic auth, or facebook/github/twitter/google... auth
    .addColumn("auth_strategy", sql`"auth_strategy"`, (col) => col.notNull().defaultTo("BASIC"))
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
  await db.schema.dropType("user_status").execute();
}
