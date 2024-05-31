import type { MiddlewareHandler } from "hono";
import { UserUnauthorizedException } from "../../../domain/user.exceptions";
import type { HonoEnv } from "#root/libs/hono/hono.types";
import userService from "../../user.injection";

type Options = {
  required: boolean;
};
const defaultOptions: Options = {
  required: false,
};

export const userGuard = (options: Options = defaultOptions): MiddlewareHandler<HonoEnv> => {
  return async (c, next) => {
    const firebaseUser = c.get("firebaseUser");
    if (!firebaseUser) {
      throw new UserUnauthorizedException();
    }
    const config = c.get("config");
    const user = await userService.get(request);

    await next();
  };
};
