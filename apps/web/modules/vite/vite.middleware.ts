import { type App, fromNodeMiddleware } from "h3";
import sirv from "sirv";

const isProd = process.env.NODE_ENV === "production";
const root = process.cwd();

export default async function useViteMiddleware(app: App) {
  if (isProd) {
    app.use(
      "/",
      fromNodeMiddleware(
        sirv(`${root}/dist/client`, {
          etag: true,
          brotli: true,
          maxAge: 60 * 60 * 24 * 30, // 30 days
        }),
      ),
    );
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(fromNodeMiddleware(viteDevMiddleware));
  }
}
