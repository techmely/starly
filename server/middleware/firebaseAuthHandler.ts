import { parseCookie } from "@techmely/utils";
import { getAuth } from "firebase-admin/auth";
import type { MiddlewareHandler } from "hono";
import { firebaseAdmin } from "#server/modules/auth/firebaseAdmin";

export default function firebaseAuthMiddleware(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const cookieString = c.req.header("cookie") || "";
    if (!cookieString) return next();

    const cookies = parseCookie(cookieString);
    const sessionCookie: string = cookies.__session;
    if (!sessionCookie) return next();

    try {
      const auth = getAuth(firebaseAdmin);
      const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
      const firebaseUser = await auth.getUser(decodedIdToken.sub);
      c.set("firebaseUser", firebaseUser);
    } catch (error) {
      console.debug("verifySessionCookie:", error);
    }
  };
}
