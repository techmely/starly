import { CamelCasePlugin, type Dialect, Kysely } from "kysely";

export function createDatabase<Database>(dialect: Dialect) {
  return new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });
}
