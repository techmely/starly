import type { Kysely } from "kysely";
import type { TenantModel } from "../../../domain/repo/tenant.model";

type DatabaseTables = {
  tenant: TenantModel;
};

export async function up(db: Kysely<DatabaseTables>) {}

export async function down(db: Kysely<DatabaseTables>) {}
