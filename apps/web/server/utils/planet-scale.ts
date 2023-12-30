import { CamelCasePlugin, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import type { MenuModel, RoleModel, TenantModel, UserModel } from "@techmely/models";
import { serverEnvs } from "./server-envs";

let dbClient: Kysely<AppDatabase>;

export type AppDatabase = {
  users: UserModel;
  menus: MenuModel;
  tenant: TenantModel;
  role: RoleModel;
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
