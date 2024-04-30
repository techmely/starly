import { html } from "@elysiajs/html";
import type Elysia from "elysia";

const isProd = process.env.NODE_ENV === "production";
const root = process.cwd();
console.log("root:", root);

export default async function useViteMiddleware() {
  return async (app: Elysia) => {
    if (isProd) {
      app.use(html({ contentType: "text/html; charset=utf-8" }));
    } else {
      const vite = await import("vite");
      const viteDev = await vite.createServer({
        root,
        server: { middlewareMode: true },
      });
      const middleware = viteDev.middlewares;
      app.connect("*", middleware);
    }
    return app;
  };
}
