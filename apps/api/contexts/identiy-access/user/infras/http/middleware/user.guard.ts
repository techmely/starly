import type { HonoEnv } from "@techmely/hono";
import type { MiddlewareHandler } from "hono";
import { UserUnauthorizedException } from "../../../domain/user.exceptions";

export const userGuard = (): MiddlewareHandler<HonoEnv> => {
  return async (c, next) => {
    const config = c.get("config");
    const firebaseUser = c.get("firebaseUser");
    if (!firebaseUser) {
      throw new UserUnauthorizedException();
    }

    await next();
  };
};
