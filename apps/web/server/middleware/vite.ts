import { html } from "@elysiajs/html";
import type { HonoEnv } from "@techmely/hono";
import type Elysia from "elysia";
import type { Hono } from "hono";

const isProd = process.env.NODE_ENV === "production";
const root = process.cwd();

export default async function useViteMiddleware(app: Hono<HonoEnv>) {
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
