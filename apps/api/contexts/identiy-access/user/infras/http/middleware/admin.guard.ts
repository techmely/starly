import type { HonoEnv } from "@techmely/hono";
import {} from "@techmely/http";
import type { MiddlewareHandler } from "hono";
import { UserIsNotAdminException } from "../../../domain/user.exceptions";

export const adminGuard = (): MiddlewareHandler<HonoEnv> => {
  return async (c, next) => {
    const config = c.get("config");
    const firebaseUser = c.get("firebaseUser");
    if (!config.admin.authIds.includes(firebaseUser.sub)) {
      throw new UserIsNotAdminException();
    }
    await next();
  };
};
