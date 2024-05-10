import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileMigrationProvider, type Kysely, Migrator } from "kysely";

const __filename = fileURLToPath(import.meta.url);

export const createMigrator = (db: Kysely<any>) => {
  const migrationFolder = path.join(path.dirname(__filename), "../src/migrations");

  return new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder,
    }),
  });
};
