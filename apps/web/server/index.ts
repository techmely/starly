import fs from "fs";
import uWS from "uWebSockets.js";
import { accessEnvs } from "./utils/server-envs";

const envs = accessEnvs();

const port = 9001;

const app = uWS
  ./*SSL*/ App({
    key_file_name: fs.readFileSync("certs/localhost-key.pem"),
    cert_file_name: fs.readFileSync("certs/localhost.pem"),
  })
  .any("/anything", (res, req) => {
    res.end(`Any route with method: ${req.getMethod()}`);
  })
  .get("/user/agent", (res, req) => {
    res.end(`Your user agent is: ${req.getHeader("user-agent")} thank you, come again!`);
  })
  .get("/static/yes", (res, req) => {
    res.end("This is very static");
  })
  .get("/candy/:kind", (res, req) => {
    res.end(`So you want candy? Have some ${req.getParameter(0)}!`);
  })
  .get("/*", (res, req) => {
    /* Wildcards - make sure to catch them last */
    res.end("Nothing to see here!");
  })
  .listen(port, (token) => {
    if (token) {
      console.log(`Listening to port ${port}`);
    } else {
      console.log(`Failed to listen to port ${port}`);
    }
  });
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
