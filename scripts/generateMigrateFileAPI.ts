#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";

const fileName = process.argv[2];
const folder = process.argv[3] || "migrations";

if (!fileName) {
  console.error("Please provide a filename");
  process.exit(1);
}

const filePath = generateFilePath(fileName);
createFile(filePath);

function generateFilePath(name: string) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  const formattedIsoDate = isoDate.replaceAll(":", "").replaceAll("-", "");
  const fileName = `${formattedIsoDate.substring(0, formattedIsoDate.length - 5)}-${name}.ts`;

  return path.join(process.cwd(), "packages/db/src", folder, fileName);
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
