import path from "path";
import { paraglide } from "@inlang/paraglide-js-adapter-vite";
import ViteReact from "@vitejs/plugin-react";
import { FontaineTransform } from "fontaine";
import ViteMillion from "million/compiler";
import { telefunc as ViteTelefunc } from "telefunc/vite";
import Vike from "vike/plugin";
import { defineConfig } from "vite";
import ViteCompress from "vite-plugin-compression2";
import ViteVercel from "vite-plugin-vercel";
import viteAutoImport from "./modules/vite/vite.auto-import";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    paraglide({
      project: "../../project.inlang",
      outdir: "./locales/paraglide",
    }),
    ViteMillion.vite({ auto: true }),
    FontaineTransform.vite({
      fallbacks: [
        "Be Vietnam Pro,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      ],
    }),
    viteAutoImport,
    ViteReact(),
    Vike({ prerender: { partial: true } }),
    ViteTelefunc(),
    // ViteVercel(),
    isProd &&
      ViteCompress({
        algorithm: "brotliCompress",
        deleteOriginalAssets: false,
        exclude: [/\.(png|avif|webp|jpe?g|gif)$/i, /\.map$/, /\.br$/],
      }),
  ].filter(Boolean),
  build: {
    // target is es2022 to support top level await
    // https://caniuse.com/?search=top%20level%20await
    target: "es2022",
    minify: isProd,
  },
  resolve: {
    alias: {
      "#assets": path.join(__dirname, "/assets"),
      "#modules": path.join(__dirname, "/modules"),
      "#pages": path.join(__dirname, "/pages"),
      "#server": path.join(__dirname, "/server"),
      "#shared": path.join(__dirname, "/shared"),
    },
  },
  vercel: {
    config: {
      routes: [
        {
          src: "/((?!assets/).*)",
          headers: {
            "X-Vite-Techmely": "Independence-Freedom-Happiness",
            // "Cache-Control": "s-maxage=172800, stale-while-revalidate=60", // 2 days
            // "Content-Encoding": "br",
          },
          continue: true,
        },
      ],
    },
  },
  optimizeDeps: {
    include: ["@techmely/vike-react/onRenderClient"],
  },
});
