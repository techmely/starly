import type { Kysely } from "kysely";
import { withTimestamps } from "../utils";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("tenant_roles")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(155)", (col) => col.notNull())
    .addColumn("description", "varchar(255)", (col) => col.notNull())
    .addColumn("slug", "varchar(155)", (col) => col.notNull())
    .addColumn("tenant_id", "integer", (col) => col.references("tenants.id").notNull())
    .$call(withTimestamps)
    .execute();

  await db.schema
    .createIndex("tenant_roles_name_tenant_id_unique")
    .on("tenant_roles")
    .columns(["name", "slug", "tenant_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("tenant_roles_tenant_id")
    .on("tenant_roles")
    .columns(["tenant_id"])
    .execute();

  await db.schema
    .createTable("tenants_users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("tenant_id", "integer", (col) => col.references("tenants.id").notNull())
    .addColumn("user_id", "varchar(42)", (col) => col.references("users.id").notNull())
    .addColumn("tenant_role_id", "integer", (col) => col.references("tenant_roles.id"))
    .$call(withTimestamps)
    .execute();

  await db.schema
    .createIndex("tenants_users_tenant_id")
    .on("tenants_users")
    .columns(["tenant_id"])
    .execute();

  await db.schema
    .createIndex("tenants_users_user_id")
    .on("tenants_users")
    .columns(["user_id"])
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex("tenants_users_user_id").execute();
  await db.schema.dropIndex("tenants_users_tenant_id").execute();
  await db.schema.dropIndex("tenant_roles_tenant_id").execute();
  await db.schema.dropIndex("tenant_roles_name_tenant_id_unique").execute();

  await db.schema.dropTable("tenants_users").execute();
  await db.schema.dropTable("tenant_roles").execute();
}
