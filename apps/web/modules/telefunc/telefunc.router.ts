import { type Router, eventHandler } from "h3";
import telefuncMiddleware from "./telefunc.middleware";

export function useTelefuncRouter(router: Router) {
  router.post("/_telefunc", eventHandler(telefuncMiddleware));
}
