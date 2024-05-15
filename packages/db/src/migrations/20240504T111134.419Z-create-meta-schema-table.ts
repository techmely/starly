import type { Kysely } from "kysely";
import { sql } from "kysely";
import { withTimestamps } from "../utils";

export async function up(db: Kysely<any>) {
  await db.schema.createType("meta_schema_type").asEnum(["SYSTEM", "DEFAULT"]).execute();

  await db.schema
    .createTable("meta_schemas")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(155)", (col) => col.notNull())
    .addColumn("version", "integer", (col) => col.notNull().defaultTo(1))
    .addColumn("target", "varchar(16)", (col) => col.notNull())
    .addColumn("is_default", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("schema", "jsonb", (col) => col.notNull())
    .addColumn("type", sql`"meta_schema_type"`, (col) => col.notNull().defaultTo("DEFAULT"))
    .addColumn("tenant_id", "integer", (col) => col.references("tenants.id"))
    .$call(withTimestamps)
    .execute();

  await db.schema
    .createIndex("meta_schemas_tenant_id")
    .on("meta_schemas")
    .column("tenant_id")
    .execute();

  await db.schema
    .createIndex("meta_schemas_name_version_tenant_id_unique")
    .on("meta_schemas")
    .columns(["name", "version", "tenant_id"])
    .unique()
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex("meta_schemas_name_version_tenant_id_unique").execute();
  await db.schema.dropIndex("meta_schemas_tenant_id").execute();
  await db.schema.dropTable("meta_schemas").execute();
  await db.schema.dropType("meta_schema_type").execute();
}
