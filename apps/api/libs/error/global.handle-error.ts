import { CODE_INTERNAL_SERVER_ERROR } from "@techmely/http";
import type { Context } from "hono";
import type { HonoEnv } from "../hono/hono.types";

export function globalHandleError(err: Error, c: Context<HonoEnv>) {
  const { logger } = c.get("container");

  const requestId = c.get("requestId");

  // Validation error

  // Http error

  // Business error

  // Network error

  // Unknown error - we fuck'up, must fire the incident event to the team to investigate -> Fix

  logger.error("Unhandled exception", {
    name: err.name,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
    requestId,
  });

  return c.json({
    code: CODE_INTERNAL_SERVER_ERROR,
    docs: "https://techmely/docs/api-reference/errors/code/HTTP_INTERNAL_SERVER_ERROR",
    message: "something unexpected happened",
    requestId,
  });
}
