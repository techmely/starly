import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ViteHonoDevServer from "@hono/vite-dev-server";
import { paraglide as ViteParaglide } from "@inlang/paraglide-vite";
import { inspectorServer as ViteInspectorServer } from "@react-dev-inspector/vite-plugin";
import ViteReact from "@vitejs/plugin-react";
import { FontaineTransform } from "fontaine";
import ViteMillion from "million/compiler";
import { telefunc as ViteTelefunc } from "telefunc/vite";
import ViteAutoImport from "unplugin-auto-import/vite";
import Vike from "vike/plugin";
import { defineConfig } from "vite";
import ViteCompress from "vite-plugin-compression2";

const isProd = process.env.NODE_ENV === "production";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, ".");

export default defineConfig({
  plugins: [
    ViteHonoDevServer({
      entry: "src/server/index.ts",
      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /.*\.webmanifest($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],
      injectClientScript: false,
    }),
    ViteParaglide({
      project: "./project.inlang",
      outdir: "./src/locales/paraglide",
    }),
    ViteMillion.vite({ auto: true }),
    FontaineTransform.vite({
      fallbacks: [
        "Be Vietnam Pro,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      ],
    }),
    ViteAutoImport({
      dts: "./typings/auto-imports.d.ts",
      imports: ["react"],
    }),
    Vike(),
    ViteReact(),
    ViteTelefunc(),
    ViteInspectorServer(),
    isProd &&
      ViteCompress({
        algorithm: "brotliCompress",
        deleteOriginalAssets: false,
        exclude: [/\.(png|avif|webp|jpe?g|gif)$/i, /\.map$/, /\.br$/],
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "#root": resolve(root, "src"),
      "#server": resolve(root, "src/server"),
      $paraglide: resolve(root, "src/locales/paraglide"),
    },
  },
  ssr: {
    noExternal: ['react-use']
  }
});
