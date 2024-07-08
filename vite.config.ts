import ViteHonoDevServer from "@hono/vite-dev-server";
import { paraglide as ViteParaglide } from "@inlang/paraglide-vite";
import ViteReact from "@vitejs/plugin-react";
import { FontaineTransform } from "fontaine";
import ViteMillion from "million/compiler";
import { telefunc as ViteTelefunc } from "telefunc/vite";
import Vike from "vike/plugin";
import { defineConfig } from "vite";
import ViteCompress from "vite-plugin-compression2";
import viteAutoImport from "./modules/vite/vite.auto-import";

const isProd = process.env.NODE_ENV === "production";
console.log("isProd:", isProd);

export default defineConfig({
  plugins: [
    ViteParaglide({
      project: "./project.inlang",
      outdir: "./locales/paraglide",
    }),
    ViteMillion.vite({ auto: true }),
    FontaineTransform.vite({
      fallbacks: [
        "Be Vietnam Pro,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      ],
    }),
    viteAutoImport,
    Vike({ prerender: { partial: true } }),
    isProd &&
      ViteCompress({
        algorithm: "brotliCompress",
        deleteOriginalAssets: false,
        exclude: [/\.(png|avif|webp|jpe?g|gif)$/i, /\.map$/, /\.br$/],
      }),
    ViteHonoDevServer({
      entry: "hono-entry.ts",
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
    ViteReact(),
    ViteTelefunc(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "#root": __dirname,
    },
  },
});
