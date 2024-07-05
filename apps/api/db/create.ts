import type { AppDatabase } from "#root/libs/db/app-db.types";
import { CamelCasePlugin, type Dialect, Kysely } from "kysely";

export function createDatabase(dialect: Dialect) {
  return new Kysely<AppDatabase>({
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
