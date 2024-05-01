import type { HonoEnv } from "@techmely/hono";
import Http from "@techmely/http";
import { ConsoleLogger } from "@techmely/logger";
import type { MiddlewareHandler, Context } from "hono";

/**
 * Call this once before hono instance running
 */
export function init(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    await injectDependencies(c);
    await next();
  };
}

async function injectDependencies(c: Context<HonoEnv>) {
  return new Promise((res) => {
    const logger = new ConsoleLogger();
    const cache = "cache";
    const http = Http.create("");
    http.c.set("container", {
      cache,
      db: "db",
      logger,
      http,
    });
    res("OK");
  });
}
