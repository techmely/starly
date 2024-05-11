import {
  type UserFromDecodedIdToken,
  fetchGooglePublicKeys,
  verifyAndDecodeJwt,
} from "@techmely/auth";
import type { MiddlewareHandler } from "hono";

export type FirebaseBaseAuthOptions = {
  projectId: string;
  transformUser?: <T>(decodedToken: UserFromDecodedIdToken) => T;
  /**
   * @default "firebaseUser"
   */
  userContextKey?: string;
  /**
   * @default "Bearer"
   */
  tokenHeaderPrefix?: string;
};

const transformCurrentUser = (decodedToken: UserFromDecodedIdToken) => {
  return decodedToken;
};

/**
 * If you want to access the user through c.get("user") with typing
 * Please try to add like `{ user: UserFromDecodedIdToken }` to your hono binding variables
 */
export function validateFirebaseAuth(options: FirebaseBaseAuthOptions): MiddlewareHandler {
  const {
    projectId,
    tokenHeaderPrefix = "Bearer",
    transformUser = transformCurrentUser,
    userContextKey = "firebaseUser",
  } = options;

  return async (c, next) => {
    const tokenHeader = c.req.header("Authorization");
    // When not pass headers ==> By pass verify
    if (!tokenHeader || !tokenHeader.startsWith(tokenHeaderPrefix)) {
      return await next();
    }

    const token = tokenHeader.substring(tokenHeaderPrefix.length + 1);
    try {
      const publicKeys = await fetchGooglePublicKeys();
      const user = await verifyAndDecodeJwt(token, publicKeys, projectId);
      const _user = transformUser(user);
      c.set(userContextKey, _user);
      await next();
    } catch (err) {
      console.error("Error when verify firebase auth", err);
      throw new Error("Error when verify firebase auth");
    }
  };
}
