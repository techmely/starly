import ViteReact from "@vitejs/plugin-react";
import ViteVike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [ViteReact({}), ViteVike({})],
});
