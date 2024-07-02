import {} from "@techmely/http";
import type { MiddlewareHandler } from "hono";
import { UserIsNotAdminException } from "../../../domain/user.exceptions";
import type { HonoEnv } from "#root/libs/hono/hono.types";

export const useAdminGuard = (): MiddlewareHandler<HonoEnv> => {
  return async (c, next) => {
    const config = c.get("config");
    const firebaseUser = c.get("firebaseUser");
    if (!firebaseUser || !config.admin.authIds.includes(firebaseUser.sub)) {
      throw new UserIsNotAdminException();
    }
    await next();
  };
};
