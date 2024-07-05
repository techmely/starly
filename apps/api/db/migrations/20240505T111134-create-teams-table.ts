import type { Kysely } from "kysely";
import { withTimestamps } from "../utils";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("tenant_teams")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(155)", (col) => col.notNull())
    .addColumn("description", "varchar(255)", (col) => col.notNull())
    .addColumn("slug", "varchar(155)", (col) => col.notNull())
    .addColumn("metadata", "jsonb")
    .addColumn("tenant_id", "integer", (col) => col.references("tenants.id").notNull())
    .$call(withTimestamps)
    .execute();

  await db.schema
    .createIndex("tenant_team_slug_tenant_id_unique")
    .on("tenant_teams")
    .columns(["slug", "tenant_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("tenant_team_tenant_id")
    .on("tenant_teams")
    .columns(["tenant_id"])
    .execute();

  await db.schema
    .createIndex("tenants_teams_metadata_gin")
    .on("tenant_teams")
    .column("metadata")
    .using("gin")
    .execute();

  await db.schema
    .createTable("tenants_teams_users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("tenant_id", "integer", (col) => col.references("tenants.id").notNull())
    .addColumn("user_id", "varchar(42)", (col) => col.references("users.id").notNull())
    .addColumn("tenant_team_id", "integer", (col) => col.references("tenant_teams.id"))
    .$call(withTimestamps)
    .execute();

  await db.schema
    .createIndex("tenants_teams_users_tenant_id")
    .on("tenants_teams_users")
    .columns(["tenant_id"])
    .execute();

  await db.schema
    .createIndex("tenants_teams_users_user_id")
    .on("tenants_teams_users")
    .columns(["user_id"])
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex("tenants_users_user_id").execute();
  await db.schema.dropIndex("tenants_users_tenant_id").execute();
  await db.schema.dropIndex("tenant_team_tenant_id").execute();
  await db.schema.dropIndex("tenant_team_slug_tenant_id_unique").execute();

  await db.schema.dropTable("tenants_teams_users").execute();
  await db.schema.dropTable("tenant_teams").execute();
}
