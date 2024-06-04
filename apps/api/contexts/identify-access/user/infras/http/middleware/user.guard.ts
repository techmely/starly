import type { MiddlewareHandler } from "hono";
import { UserUnauthorizedException } from "../../../domain/user.exceptions";
import type { HonoEnv } from "#root/libs/hono/hono.types";
import userService from "../../user.injection";

type Options = {
  required: boolean;
};

export const useUserGuard = (
  options: Options = { required: false },
): MiddlewareHandler<HonoEnv> => {
  return async (c, next) => {
    const firebaseUser = c.get("firebaseUser");
    if (!firebaseUser) {
      throw new UserUnauthorizedException();
    }
    const user = await userService.GetByAuthId({ id: firebaseUser.sub });
    if (options.required && !user) {
      throw new UserUnauthorizedException("Not found user on app database");
    }
    c.set("user", user);
    await next();
    if (options.required) {
      c.header("Cache-Control", "private");
    }
  };
};
