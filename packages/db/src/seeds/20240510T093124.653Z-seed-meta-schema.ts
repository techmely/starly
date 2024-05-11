import type { Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  await db.insertInto("meta_schemas").values({});
}

export async function down(db: Kysely<any>) {}
