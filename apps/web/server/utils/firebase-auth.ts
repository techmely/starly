import { validateFirebaseAuth } from "@fiboup/h3-firebase-auth";
import { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } from "@techmely/utils";
import { type H3Event, createError } from "h3";
import { serverEnvs } from "./server-envs";

export async function firebaseAuth(event: H3Event) {
  try {
    await validateFirebaseAuth({ projectId: serverEnvs.VITE_FIREBASE_PROJECT_ID })(event);
  } catch (error) {
    throw createError({ statusCode: HTTP_BAD_REQUEST, message: error.message });
  }
}

export function requireAuthorization(event: H3Event) {
  const user = event.context.user;
  if (!user) {
    throw createError({ statusCode: HTTP_UNAUTHORIZED, message: "Unauthorized" });
  }
}
