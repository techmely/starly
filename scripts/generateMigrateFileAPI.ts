#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";

function generateFilePath(name: string) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  const fileName = `${isoDate.replaceAll(":", "").replaceAll("-", "")}-${name}.ts`;

  return path.join(process.cwd(), "packages/db/src/migrations", fileName);
}

function createFile(fileName: string) {
  fs.writeFile(fileName, "", "utf8", (error) => {
    if (error) {
      console.error(`Error creating file: ${error}`);
    } else {
      console.log(`File created: ${fileName}`);
    }
  });
}

async function writeFileContent(
  filePath: string,
  content = `import { Kysely } from "kysely";
export async function up(db: Kysely<any>) {}
export async function down(db: Kysely<any>) {}`,
) {
  await Bun.write(filePath, content, { encoding: "utf-8" });
}

const fileName = process.argv[2];
if (!fileName) {
  console.error("Please provide a filename");
  process.exit(1);
}

const filePath = generateFilePath(fileName);
createFile(filePath);
writeFileContent(filePath);
