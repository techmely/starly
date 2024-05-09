import type { HonoEnv } from "@techmely/hono";
import { ConsoleLogger } from "@techmely/logger";
import http from "@techmely/http";
import type { MiddlewareHandler, Context } from "hono";
import { generatePrefixId } from "@techmely/utils/id";

/**
 * Call this once before hono instance running
 */
export function initApp(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    injectRequestId(c);
    await injectConfig(c);
    await injectDependencies(c);
    await next();
  };
}

function injectRequestId(c: Context<HonoEnv>) {
  const requestId = generatePrefixId("req");
  c.set("requestId", requestId);
  c.res.headers.append("X-Request-Id", requestId);
}

async function injectDependencies(c: Context<HonoEnv>) {
  return new Promise((resolve) => {
    const logger = new ConsoleLogger();
    const cache = "cache";
    const _http = http.create({
      headers: {
        "X-Powser-By": "Techmely",
      },
    });
    c.set("container", {
      cache,
      db: "db",
      logger,
      http: _http,
    });
    resolve("OK");
  });
}

async function injectConfig(c: Context<HonoEnv>) {
  return new Promise((resolve) => {
    c.set("config", {
      db: {
        host: c.env.DB_HOST,
        port: c.env.DB_PORT || 5432,
        user: c.env.DB_USER,
        password: c.env.DB_PASSWORD,
        database: c.env.DB_NAME,
      },
      firebase: {
        apiKey: c.env.FIREBASE_API_KEY,
        projectId: c.env.FIREBASE_PROJECT_ID,
      },
      storage: {
        s3: {
          bucket: c.env.S3_BUCKET,
          accessKeyId: c.env.S3_ACCESS_KEY_ID,
          secretAccessKey: c.env.S3_SECRET_ACCESS_KEY,
          endpoint: c.env.S3_ENDPOINT,
          region: c.env.S3_REGION,
          getGcsImageServingEndpoint: c.env.S3_GET_GCS_IMAGE_SERVING_ENDPOINT,
        },
      },
      cors: {
        origin: c.env.CORS_ORIGIN.split(","),
        allowHeaders: c.env.CORS_ALLOW_HEADERS.split(","),
        allowMethods: c.env.CORS_ALLOW_METHODS.split(","),
        maxAge: c.env.CORS_MAX_AGE,
        credentials: c.env.CORS_CREDENTIALS,
      },
    });
    resolve("OK");
  });
}
