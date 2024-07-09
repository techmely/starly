import type { MiddlewareHandler } from "hono";
import { telefunc } from "telefunc";

export function telefuncMiddleware(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const httpResponse = await telefunc({
      url: c.req.url.toString(),
      method: c.req.method,
      body: await c.req.text(),
    });

    const { body, statusCode, contentType } = httpResponse;

    return new Response(body, {
      status: statusCode,
      headers: {
        "content-type": contentType,
      },
    });
  };
}
