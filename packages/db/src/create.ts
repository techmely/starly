import { CamelCasePlugin, Kysely, type Dialect } from "kysely";

export function createDatabase<Database>(dialect: Dialect) {
  return new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });
}
