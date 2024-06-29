let plugins = [
  [
    require.resolve("babel-plugin-module-resolver"),
    {
      root: ["../.."],
      alias: {
        // define aliases to shorten the import paths
        app: "../../packages/app",
        "@my/ui": "../../packages/ui",
      },
      extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
    },
  ],
];

if (process.env.EAS_BUILD_PLATFORM === "android") {
  plugins.push([
    "@tamagui/babel-plugin",
    {
      components: ["@techmely/starly-ui", "tamagui"],
      config: "../../packages/design-system/src/tamagui.config.ts",
      logTimings: true,
      disableExtraction: process.env.NODE_ENV === "development",
    },
  ]);
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins,
  };
};
