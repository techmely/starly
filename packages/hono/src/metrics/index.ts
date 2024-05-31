import type { MiddlewareHandler } from "hono";

export function metricsMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const { logger, analytics, metrics } = c.get("container");
    const start = performance.now();
    const payload: Record<string, any> = {
      metric: "",
      path: c.req.path,
      // @ts-ignore
      continent: c.req.raw?.cf?.continent,
      // @ts-ignore - this is a bug in the types
      country: c.req.raw?.cf?.country,
      // @ts-ignore - this is a bug in the types
      colo: c.req.raw?.cf?.colo,
      // @ts-ignore - this is a bug in the types
      city: c.req.raw?.cf?.city,
      userAgent: c.req.header("user-agent"),
    };

    try {
      payload.requestId = c.get("requestId");
      const telemetry = {
        runtime: c.req.header("Techmely-Telemetry-Runtime"),
        platform: c.req.header("Techmely-Telemetry-Platform"),
        versions: c.req.header("Techmely-Telemetry-SDK")?.split(","),
      };
      if (telemetry.runtime || telemetry.platform || telemetry.versions) {
        c.executionCtx.waitUntil(
          analytics
            .ingestSdkTelemetry({
              runtime: telemetry.runtime || "unknown",
              platform: telemetry.platform || "unknown",
              versions: telemetry.versions || [],
              requestId: payload.requestId,
              time: Date.now(),
            })
            .catch((err) => {
              logger.error("Error ingesting SDK telemetry", {
                method: c.req.method,
                path: c.req.path,
                error: err.message,
              });
            }),
        );
      }

      await next();
    } catch (error) {
      payload.error = (error as Error).message;
      logger.error("request", {
        method: c.req.method,
        path: c.req.path,
        error: error,
      });
      throw error;
    } finally {
      payload.status = c.res.status;
      payload.serviceLatency = performance.now() - start;
      c.res.headers.append("Techmely-Latency", `service=${payload.serviceLatency}ms`);
      c.res.headers.append("Techmely-Version", c.env.VERSION);
      // metrics?.emit(payload);
      c.executionCtx.waitUntil(Promise.all([metrics?.flush(), logger.flush()]));
    }
  };
}
