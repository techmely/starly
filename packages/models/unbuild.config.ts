import pkg from "./package.json";

import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: ["src/index"],
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: Object.keys(pkg.peerDependencies),
});
