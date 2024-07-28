#!/usr/bin/env zx

import { $ } from "zx";
import pkg from "../package.json";

const appVersion = pkg.version;

await $`echo "VITE_APP_VERSION=${appVersion}" >> ".env.development"`;
