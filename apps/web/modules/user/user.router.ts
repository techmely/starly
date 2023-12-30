import { type Router, defineEventHandler } from "h3";
import { getUsers } from "./user.service";

export default function useUserRouter(router: Router) {
  router.get("/api/v1/users", defineEventHandler(getUsers));
}
