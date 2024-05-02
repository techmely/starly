// import { CamelCasePlugin, Kysely } from "kysely";
// import { PlanetScaleDialect } from "kysely-planetscale";

// let dbClient: Kysely<AppDatabase>;

// export type AppDatabase = {
//   t: any;
// };

// export const getDBClient = (): Kysely<AppDatabase> => {
//   dbClient =
//     dbClient ||
//     new Kysely<AppDatabase>({
//       log: process.env.VITE_NODE_ENV === "development" ? ["error", "error"] : undefined,
//       dialect: new PlanetScaleDialect({
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         host: process.env.DB_HOST,
//       }),
//       plugins: [new CamelCasePlugin()],
//     });
//   return dbClient;
// };
