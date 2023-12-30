#!/usr/bin/env zx
import fs from "fs";
import path from "path";

function generateFilePath(name) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  const fileName = `${isoDate}-${name}.ts`;

  return path.join(process.cwd(), "migrations", fileName);
}

function createFile(fileName) {
  fs.writeFile(fileName, "", "utf8", (error) => {
    if (error) {
      console.error(`Error creating file: ${error}`);
    } else {
      console.log(`File created: ${fileName}`);
    }
  });
}

function writeFileContent(
  filePath,
  content = `import { Kysely } from "kysely";
import type { AppDatabase } from "../apps/web/server/utils/planet-scale";

export async function up(db: Kysely<AppDatabase>) {}
export async function down(db: Kysely<AppDatabase>) {}`,
) {
  fs.appendFileSync(filePath, content, { encoding: "utf-8" });
}

const fileName = process.argv[2];
if (!fileName) {
  console.error("Please provide a filename");
  process.exit(1);
}

const filePath = generateFilePath(fileName);
console.log("filePath:", filePath);
createFile(filePath);
writeFileContent(filePath);
