import { Hono } from "hono";
// import { compress } from "hono/compress";
import { timing } from "hono/timing";
import { cors } from "hono/cors";
import { etag } from "hono/etag";

import { commonContext, secureHeadersMiddleware, validateFirebaseAuth } from "@techmely/hono";
import { safeParse } from "valibot";
import { accountRouter } from "./contexts/identify-access/user/infras/http/routers/account.router";
import { userRouter } from "./contexts/identify-access/user/infras/http/routers/user.router";
import { globalHandleError } from "./libs/error/global.handle-error";
import { runtimeEnvSchema } from "./libs/hono/hono.schema";
import type { HonoEnv } from "./libs/hono/hono.types";
import { initApp } from "./libs/middlewares/init";
import { useAdminGuard } from "./contexts/identify-access/user/infras/http/middleware/admin.guard";
import { articleRouter } from "./contexts/collaboration/articles/infras/http/routers/article.router";

const app = new Hono<HonoEnv>();
app.use(initApp());
app.use(commonContext());
app.use(timing());
/*
 * Bun currently not support CompressionStream yet
 * @see https://github.com/oven-sh/bun/issues/159
 */
// app.use(compress());
app.use(secureHeadersMiddleware());

app.use("*", (c, next) =>
  validateFirebaseAuth({
    projectId: c.get("config").firebase.projectId,
  })(c, next),
);

app.use("/api/*", (c, next) => cors(c.get("config").cors)(c, next));
app.use("/api/*", etag({ weak: true }));

app.get("/", (c) => {
  return c.json({ data: "Welcome to the Starly API" });
});

// auth api
app.route("/api/v1/auth", accountRouter);
app.route("/api/v1/users", userRouter);

// // meta schemas api
// app.route("/api/v1/meta_schemas", metaSchemaRouter);

// // files api
// app.route("/api/v1/my_files", myFileRouter);

// // post api
// app.route("/api/v1/articles/me", myArticlesRouter);
app.route("/api/v1/articles", articleRouter);

// // organizations api
// app.route("/api/v1/organizations", organizationRouter);
// app.route("/api/v1/my_organizations", myOrganizationRouter);
//
// // tags api
// app.route("/api/v1/tags", tagRouter);
// app.route("/api/v1/my_tags", myTagRouter);

// admin api

app.use("/admin/*", useAdminGuard());
// app.route("/admin/api/v1/tags", adminTagRouter);
// app.route("/admin/api/v1/organizations", adminOrganizationRouter);
// app.route("/admin/api/v1/meta_schemas", adminMetaSchemaRouter);
// app.route("/admin/api/v1/users", adminUserRouter);
// app.route("/admin/api/v1/posts", adminPostRouter);
// app.route("/admin/api/v1/tenants", tenantsRouter);

app.onError(globalHandleError);

const PORT = Bun.env.API_PORT || 3000;

const server = Bun.serve({
  port: PORT,
  fetch(req, server) {
    const parsedEnv = safeParse(runtimeEnvSchema, Bun.env);
    if (!parsedEnv.success) {
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          message: "Some environment variables are missing or are invalid",
          errors: parsedEnv.issues[0],
        },
        { status: 500 },
      );
    }
    return app.fetch(req, { IP: server.requestIP(req), ...parsedEnv.output });
  },
  maxRequestBodySize: 200_000_000_000,
});

console.log(`App start in ${server.url.origin}`);
