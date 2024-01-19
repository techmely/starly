#!/usr/bin/env zx

import { $ } from "zx";

await $`husky install`;
await $`git config core.ignorecase false`;
