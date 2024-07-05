import { CamelCasePlugin, type Dialect, Kysely } from "kysely";

export function createDatabase<Database>(dialect: Dialect) {
  return new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()],
    log(event) {
      if (event.level === "query") {
        console.log(event.query.sql);
        console.log(event.query.parameters);
      }
    },
  });
}
