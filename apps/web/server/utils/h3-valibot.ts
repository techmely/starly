import { HTTP_BAD_REQUEST } from "@techmely/utils";
import { type H3Event, createError, getRouterParams, readBody } from "h3";
import {
  type BaseSchema,
  type BaseSchemaAsync,
  type Output,
  flatten,
  safeParseAsync,
} from "valibot";

/**
 * Parse and validate request body from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useValidatedBody<T extends BaseSchemaAsync | BaseSchema>(
  event: H3Event,
  schema: T,
): Promise<Output<T>> {
  const body = await readBody(event);
  const parsed = await safeParseAsync<T>(schema, JSON.parse(body));
  if (parsed.success) {
    return parsed.output;
  }

  throw createError({
    statusCode: HTTP_BAD_REQUEST,
    message: "Bad Request",
    data: flatten(parsed.issues),
  });
}

/**
 * Parse and validate request body from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useValidatedParams<T extends BaseSchemaAsync | BaseSchema>(
  event: H3Event,
  schema: T,
): Promise<Output<T>> {
  const params = getRouterParams(event);
  const parsed = await safeParseAsync<T>(schema, params);
  if (parsed.success) {
    return parsed.output;
  }
  throw createError({
    statusCode: HTTP_BAD_REQUEST,
    message: "Bad Request",
    data: flatten(parsed.issues),
  });
}
