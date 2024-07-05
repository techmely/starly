import { getEnvVar } from "@techmely/utils";
import appRoot from "app-root-path";
import dotenv from "dotenv";
import { NO_MIGRATIONS, PostgresDialect } from "kysely";
import { Pool, type PoolConfig } from "pg";
import { createDatabase } from "./create";
import { createMigrator } from "./migrator";

const apiEnvPath = `${appRoot.path}/apps/api/.env`;
dotenv.config({ path: apiEnvPath });

const dbPoolConfig: PoolConfig = {
  host: getEnvVar("DB_HOST"),
  port: +(getEnvVar("DB_PORT") ?? "5432"),
  user: getEnvVar("DB_USER"),
  password: getEnvVar("DB_PASSWORD"),
  database: getEnvVar("DB_DATABASE"),
  // ssl:
  //   getEnvVar("DB_SSL", "false") === "true"
  //     ? {
  //         rejectUnauthorized: getEnvVar("DB_SSL_REJECT_UNAUTHORIZED", "true") === "true",
  //       }
  //     : undefined,
};

export const dialect = new PostgresDialect({
  pool: new Pool(dbPoolConfig),
});

const db = createDatabase(dialect);
const migrator = createMigrator(db);

const migrationDirection = process.argv[3];

if (!["down", "up", "none"].includes(migrationDirection)) {
  throw new Error("Migration direction must be one of options [up,down,none]");
}

if (migrationDirection === "down") {
  migrateDown();
} else if (migrationDirection === "up") {
  migrateUp();
} else if (migrationDirection === "none") {
  migrateNone();
}

async function migrateUp() {
  const { error, results = [] } = await migrator.migrateToLatest();
  for (const mr of results) {
    if (mr.status === "Success") {
      console.log(`migration '${mr.migrationName}' was executed successfully`);
    } else if (mr.status === "Error") {
      console.error(`\nfailed to execute migration "${mr.migrationName}"\n`);
    }
  }

  if (error) {
    console.error("\nfailed to migrate\n");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

async function migrateDown() {
  const { error, results = [] } = await migrator.migrateDown();

  for (const mr of results) {
    if (mr.status === "Success") {
      console.log(`migration '${mr.migrationName}' was reverted successfully`);
    } else if (mr.status === "Error") {
      console.error(`failed to execute migration "${mr.migrationName}"`);
    }
  }

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

async function migrateNone() {
  const { error, results = [] } = await migrator.migrateTo(NO_MIGRATIONS);
  for (const mr of results) {
    if (mr.status === "Success") {
      console.log(`migration '${mr.migrationName}' was reverted successfully`);
    } else if (mr.status === "Error") {
      console.error(`failed to execute migration "${mr.migrationName}"`);
    }
  }

  if (error) {
    console.error("\nfailed to migrate\n");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}
