import { Hono } from "hono";
import { compress } from "hono/compress";
import { timing } from "hono/timing";

import { commonContext } from "@techmely/hono";
import { secureHeadersMiddleware } from "@techmely/hono/secure-header";

import { safeParse } from "valibot";
import { appRuntimeEnvSchema } from "./helpers/runtimeEnv";
import { telefuncMiddleware } from "./middleware/telefuncHandler";
import vikeMiddleware from "./middleware/vikeHandler";
import { sessionRouter } from "./router/session";

const app = new Hono<HonoEnv>();
app.use(commonContext());
app.use(timing());
app.use(secureHeadersMiddleware());
// app.use(firebaseAuthMiddleware());

// if (isProd) {
//   app.use("/assets/*", serveStatic({ root: "dist/client/" }));
// }

app.post("/_telefunc", telefuncMiddleware());

app.route("/api/session", sessionRouter);

app.all("*", vikeMiddleware());

app.use(compress());

app.get("/.well-know/security", (c) => {
  // const appPath = isProd ? rootPath : path.resolve(dirname, "..");

  // const defaultAppleDeveloper = await readFile(path.resolve(appPath, "public/apple-developer.txt"));
  return c.text("well-know security");
});

const port = process.env.PORT || 3000;

console.log(`App running on http://localhost:${port}`);

export default {
  port,
  fetch(req, server) {
    // const IP = server.requestIP(req),
    const parsedEnv = safeParse(appRuntimeEnvSchema, process.env);
    if (!parsedEnv.success) {
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          message: "Some environment variables are missing or are invalid",
          errors: parsedEnv.issues,
        },
        { status: 500 },
      );
    }
    globalThis.runtimeEnv = parsedEnv.output;
    return app.fetch(req, { ...parsedEnv.output });
  },
};
