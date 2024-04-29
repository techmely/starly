import { accessEnvs } from "./utils/server-envs";

const envs = accessEnvs();

const port = 9001;

// async function letGo() {
//   const app = createApp({
//     onRequest(event) {
//       useDependenciesInjection(event);
//     },
//     // TODO: Capture exceptions with Sentry here
//     // onError(error, event) {
//     // },
//     onBeforeResponse: compressMiddleware,
//   });

//   await useViteMiddleware(app);

//   const router = createRouter({ preemptive: true });

//   useVikeRouter(router);
//   useTelefuncRouter(router);

//   app.use(router);
//   // const server = createServer(toNodeListener(app)).listen(envs.PORT);

//   // server.on("listening", () => {
//   //   console.log(`Server listening on http://localhost:${envs.PORT}`);
//   // });
// }
