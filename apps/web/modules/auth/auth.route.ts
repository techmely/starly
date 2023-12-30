import { type Router, defineEventHandler } from "h3";
import { postUser } from "../user/user.service";

export default function useAuthRouter(router: Router) {
  router.post("/api/v1/auth", defineEventHandler(postUser));
}
