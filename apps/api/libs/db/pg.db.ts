import { createDatabase } from "@techmely/db";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { getEnvVar } from "@techmely/utils";
import type { AppDatabase } from "../db/app-db.types";

const pgDialect = new PostgresDialect({
  pool: new Pool({
    host: getEnvVar("DB_HOST"),
    port: getEnvVar("DB_PORT") || 5432,
    user: getEnvVar("DB_USER"),
    password: getEnvVar("DB_PASSWORD"),
    database: getEnvVar("DB_NAME"),
  }),
});

export const pgDatabase = createDatabase<AppDatabase>(pgDialect);
