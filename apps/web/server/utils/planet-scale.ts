import { CamelCasePlugin, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import { serverEnvs } from "./server-envs";

let dbClient: Kysely<AppDatabase>;

export type AppDatabase = {
  users: any;
  menus: any;
  tenant: any;
  role: any;
};

export const getDBClient = (): Kysely<AppDatabase> => {
  dbClient =
    dbClient ||
    new Kysely<AppDatabase>({
      log: serverEnvs.VITE_NODE_ENV === "development" ? ["error", "error"] : undefined,
      dialect: new PlanetScaleDialect({
        username: serverEnvs.DB_USERNAME,
        password: serverEnvs.DB_PASSWORD,
        host: serverEnvs.DB_HOST,
      }),
      plugins: [new CamelCasePlugin()],
    });
  return dbClient;
};
