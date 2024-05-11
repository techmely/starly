import type { Kysely } from "kysely";
import { withTimestamps } from "../utils";
import { sql } from "kysely";
import type { DB } from "kysely-codegen";

export async function up(db: Kysely<DB>) {
  await db.schema
    .createType("user_status")
    .asEnum(["NEWBIE", "VERIFIED", "BLACKLIST", "INACTIVE", "ACTIVE", "CLOSED"])
    .execute();

  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "varchar(50)", (col) => col.primaryKey())
    .addColumn("email", "varchar(200)", (col) => col.notNull().unique())
    .addColumn("unverified_email", "varchar(200)", (col) => col.unique())
    .addColumn("nickname", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("status", sql`"user_status"`, (col) => col.notNull().defaultTo("NEWBIE"))
    .addColumn("is_email_verified", "boolean", (col) => col.defaultTo(false))
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("avatar_url", "text", (col) => col.notNull())
    .addColumn("firebase_user_id", "varchar(50)", (col) => col.notNull().unique())
    // .addColumn("mobile", "varchar(20)", (col) => col.unique())
    // .addColumn("birthday", "timestamp")
    // .addColumn("locale", "varchar(10)", (col) => col.notNull())
    // .addColumn("gender", "varchar(50)")
    // .addColumn("apple_id", "varchar(128)", (col) => col.unique())
    // .addColumn("google_id", "varchar(128)", (col) => col.unique())
    // .addColumn("facebook_id", "varchar(128)", (col) => col.unique())
    // .addColumn("github_id", "varchar(128)", (col) => col.unique())
    // .addColumn("open_platform", "varchar(25)", (col) => col.notNull())
    // .addColumn("utm_campaign", "varchar(50)", (col) => col.notNull())
    // .addColumn("utm_medium", "varchar(255)", (col) => col.notNull())
    // .addColumn("utm_source", "varchar(255)", (col) => col.notNull())
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
