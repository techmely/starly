import { psEnumSql, psMySqlUuid, psWithMySqlV8, psWithTimestamps } from "@techmely/api-core";
import type { Kysely } from "kysely";
import type { UserModel } from "../../../domain/repo/user.model";

type DatabaseTables = {
  user: UserModel;
};

export async function up(db: Kysely<DatabaseTables>) {
  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "varchar(36)", (col) => col.primaryKey())
    .addColumn("email", "varchar(200)", (col) => col.notNull().unique())
    .addColumn("unverified_email", "varchar(200)", (col) => col.unique())
    .addColumn("nickname", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("mobile", "varchar(20)", (col) => col.unique())
    .addColumn("password_hash", "varchar(200)")
    .addColumn(
      "status",
      psEnumSql("NEWBIE", "VERIFIED", "BLACKLIST", "INACTIVE", "ACTIVE", "CLOSED"),
      (col) => col.notNull(),
    )
    .addColumn("birthday", "timestamp")
    .addColumn("is_email_verified", "boolean", (col) => col.defaultTo(false))
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("locale", "varchar(10)", (col) => col.notNull())
    .addColumn("avatar_url", "text", (col) => col.notNull())
    .addColumn("gender", "varchar(50)")
    .addColumn("firebase_user_id", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("apple_id", "varchar(128)", (col) => col.unique())
    .addColumn("google_id", "varchar(128)", (col) => col.unique())
    .addColumn("facebook_id", "varchar(128)", (col) => col.unique())
    .addColumn("github_id", "varchar(128)", (col) => col.unique())
    .addColumn("open_platform", "varchar(50)", (col) => col.notNull())
    .addColumn("utm_campaign", "varchar(255)", (col) => col.notNull())
    .addColumn("utm_medium", "varchar(255)", (col) => col.notNull())
    .addColumn("utm_source", "varchar(255)", (col) => col.notNull())
    .$call(psWithTimestamps)
    .$call(psWithMySqlV8)
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

export async function down(db: Kysely<DatabaseTables>) {
  console.log("\nStart to table users: ...");
  await db.schema.dropTable("users").execute();
  console.log("Drop table users successfully\n: ...");
  console.log("Start to drop users indexes successfully\n: ...");
  await db.schema.dropIndex("users_id_idx").on("users").execute();
  await db.schema.dropIndex("users_email_idx").on("users").execute();
  await db.schema.dropIndex("users_nickname_idx").on("users").execute();
  console.log("Drop users indexes successfully.");
}
