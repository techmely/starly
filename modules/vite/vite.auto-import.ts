import ViteAutoImport from "unplugin-auto-import/vite";

export default ViteAutoImport({
  dts: "./typings/auto-imports.d.ts",
  imports: ["react"],
  dirs: ["./shared/composables", "./shared/helpers"],
});
