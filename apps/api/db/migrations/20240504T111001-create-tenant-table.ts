import type { Kysely } from "kysely";
import { withTimestamps } from "../utils";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("tenants")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("slug", "varchar(255)", (col) => col.unique().notNull())
    .addColumn("description", "text", (col) => col.notNull().defaultTo(""))
    .addColumn("is_verified", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("metadata", "jsonb")
    .addColumn("owner_id", "text", (col) => col.references("users.id").onDelete("set null"))
    .$call(withTimestamps)
    .execute();

  await db.schema.createIndex("tenants_owner_id").on("tenants").column("owner_id").execute();

  await db.schema
    .createIndex("tenants_metadata_gin")
    .on("tenants")
    .column("metadata")
    .using("gin")
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex("tenants_metadata_gin").execute();
  await db.schema.dropIndex("tenants_owner_id").execute();
  await db.schema.dropTable("tenants").execute();
}
