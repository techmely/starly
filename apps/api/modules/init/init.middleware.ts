import type { HonoEnv } from "@techmely/hono";
import type { MiddlewareHandler } from "hono";

/**
 * Call this once before hono instance running
 */
export function init(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {};
}
