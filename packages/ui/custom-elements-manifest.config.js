// import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";
import { customElementVsCodePlugin } from "custom-element-vs-code-integration";

export default {
  outDir: "dist",
  packagejson: true,
  globs: ["src/*.component.ts"],
  plugins: [
    customElementVsCodePlugin({
      outdir: "dist",
      htmlFileName: "techmely.icon.json",
      cssFileName: null,
      referencesTemplate: () => [
        {
          name: "Documentation",
          url: "https://techmely.com/products/mely-ui/icon",
        },
      ],
    }),
  ],
};
