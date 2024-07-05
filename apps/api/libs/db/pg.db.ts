import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { getEnvVar } from "@techmely/utils";
import { createDatabase } from "#root/db";

const pgDialect = new PostgresDialect({
  pool: new Pool({
    host: getEnvVar("DB_HOST"),
    port: getEnvVar("DB_PORT") || 5432,
    user: getEnvVar("DB_USER"),
    password: getEnvVar("DB_PASSWORD"),
    database: getEnvVar("DB_DATABASE"),
  }),
});

export const pgDatabase = createDatabase(pgDialect);
