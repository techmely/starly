// import { Hono } from "hono";
// import { compress } from "hono/compress";
// import { timing } from "hono/timing";

// import type { HonoEnv } from "@techmely/hono";
// import useViteMiddleware from "#root/modules/vite/vite.middleware";
// import { accessEnvs } from "./utils/server-envs";

// const envs = accessEnvs();

// // const port = 9001;

// const app = new Hono<HonoEnv>();
// app.use(timing());
// app.use(compress());
// app.get("/ping", (c) => c.text("pong"));

// await useViteMiddleware(app);

// export default app;

import { serverTiming } from "@elysiajs/server-timing";
import { Elysia } from "elysia";
import vikeMiddleware from "./middleware/vike";
import useViteMiddleware from "./middleware/vite";

const app = new Elysia()
  .use(serverTiming())
  .use(vikeMiddleware())
  .use(useViteMiddleware())
  .get("/", () => "Hello Elysia")
  .get("/user/:id", ({ params: { id } }) => id)
  .post("/form", ({ body }) => body)
  .listen(3000);

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);
