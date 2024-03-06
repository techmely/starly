import { trace } from "@opentelemetry/api";

import type { MiddlewareHandler } from "hono";
import type { HonoEnv } from "../utils/environment";

export function openTelemetryMiddleware(): MiddlewareHandler<HonoEnv> {
  const tracer = trace.getTracer("hono", "0.0.1");

  return (c, next) => {
    return tracer.startActiveSpan("hono", async (span) => {
      const requestId = `req_${span.spanContext().traceId}`;
      c.set("requestId", requestId);
      c.res.headers.append("Techmely-Request-Id", requestId);

      span.setAttributes({
        "hono.request.path": c.req.path,
        "hono.request.method": c.req.method,
        "hono.request.url": c.req.url,
      });

      await next();

      if (c.error) {
        span.setStatus({ code: 2, message: c.error.message });
        span.recordException(c.error);
      }

      span.setAttributes({
        "hono.response.status_code": c.res.status,
      });

      span.end();
    });
  };
}