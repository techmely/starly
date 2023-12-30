import { createServer } from "node:http";
import { createApp, createRouter, toNodeListener } from "h3";
import { useDependenciesInjection } from "#modules/_internal/di/di.middleware";
import useAuthRouter from "#modules/auth/auth.route";
import { useTelefuncRouter } from "#modules/telefunc/telefunc.router";
import useTenantRouter from "#modules/tenant/tenant.router";
import useUserRouter from "#modules/user/user.router";
import { useVikeRouter } from "#modules/vike/vike.router";
import useViteMiddleware from "#modules/vite/vite.middleware";
import { compressMiddleware } from "../modules/compression/compress.middleware";
import { accessEnvs } from "./utils/server-envs";

letGo();

const envs = accessEnvs();

async function letGo() {
  const app = createApp({
    onRequest(event) {
      useDependenciesInjection(event);
    },
    // TODO: Capture exceptions with Sentry here
    // onError(error, event) {
    // },
    onBeforeResponse: compressMiddleware,
  });

  await useViteMiddleware(app);

  const router = createRouter({ preemptive: true });

  useVikeRouter(router);
  useTelefuncRouter(router);
  useAuthRouter(router);
  useUserRouter(router);
  useTenantRouter(router);

  app.use(router);
  const server = createServer(toNodeListener(app)).listen(envs.PORT);

  server.on("listening", () => {
    console.log(`Server listening on http://localhost:${envs.PORT}`);
  });
}
