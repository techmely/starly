import type { HonoEnv } from "@techmely/hono";
import type { Hono } from "hono";
import sirv from "sirv";

const isProd = process.env.NODE_ENV === "production";
const root = process.cwd();

export default async function useViteMiddleware(app: Hono<HonoEnv>) {
  if (isProd) {
    app.use("/");
  } else {
    const vite = await import("vite");
    const viteDev = await vite.createServer({
      root,
      server: { middlewareMode: true },
    });
    const middleware = viteDev.middlewares;
    // app.on()
    // app.use(fromNodeMiddleware(viteDevMiddleware));
  }
}
