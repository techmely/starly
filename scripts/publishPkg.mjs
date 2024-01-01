#!/usr/bin/env zx

import path from "path";
import { fileURLToPath } from "url";
import fse from "fs-extra";
import { $, cd, echo } from "zx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();
const buildPath = path.join(root, "./dist");

async function publishPkgNah() {
  try {
    await cpBasePkgJson();
    cd(buildPath);
    echo("Publishing...");
    await $`npm publish --provenance --access public`;
    echo("Published!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

publishPkgNah();

async function cpBasePkgJson() {
  const basePkgData = await fse.readFile(path.resolve(root, "./package.json"), "utf8");
  const { scripts, devDependencies, files, exports, ...rest } = JSON.parse(basePkgData);

  const newPkgData = {
    ...rest,
    types: "./index.d.ts",
    typings: "./index.d.ts",
    main: "./index.js",
    module: "./index.mjs",
  };

  const destination = path.resolve(buildPath, "./package.json");
  await fse.writeFile(destination, JSON.stringify(newPkgData, null, 2), "utf8");
  echo(`Created package.json in ${destination}`);
}

async function cpBaseFiles(file) {
  const sourcePath = path.resolve(root, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  const sourceFile = await fse.readFile(sourcePath, "utf8");
  // Currently, bun not support copy file --> use writeFile instead
  await fse.writeFile(targetPath, sourceFile, "utf8");
  echo(`Copied ${humanizePathname(sourcePath)} to ${humanizePathname(targetPath)}`);
}

function humanizePathname(_path) {
  const projectDir = __dirname.replace(/\/scripts$/, "");
  return _path.replace(projectDir, "");
}
