// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const path = require("node:path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

const monorepoPackages = {
  "@techmely/api": path.resolve(workspaceRoot, "apps/api"),
  "@techmely/design-system": path.resolve(workspaceRoot, "packages/design-system"),
  "@techmely/models": path.resolve(workspaceRoot, "packages/models"),
};
config.resolver.extraNodeModules = monorepoPackages;

config.watchFolders = [workspaceRoot, ...Object.values(monorepoPackages)];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

config.transformer = { ...config.transformer, unstable_allowRequireContext: true };
config.transformer.minifierPath = require.resolve("metro-minify-terser");

// // Use moon to restore the cache when possible
// config.cacheStores = [
//   new FileStore({ root: path.join(projectRoot, ".moon", "cache", "metro") }),
// ];

module.exports = config;
