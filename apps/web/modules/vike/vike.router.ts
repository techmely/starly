import { type Router, eventHandler } from "h3";
import vikeMiddleware from "./vike.middleware";

export function useVikeRouter(router: Router) {
  router.use("/**", eventHandler(vikeMiddleware));
}
