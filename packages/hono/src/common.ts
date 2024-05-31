import type { MiddlewareHandler } from "hono";

export function commonContext(): MiddlewareHandler {
  return (c, next) => {
    c.set(
      "location",
      c.req.header("True-Client-IP") ??
        c.req.header("CF-Connecting-IP") ??
        // @ts-expect-error - the cf object will be there on cloudflare
        c.req.raw?.cf?.colo ??
        "",
    );
    c.set("userAgent", c.req.header("User-Agent"));

    return next();
  };
}
