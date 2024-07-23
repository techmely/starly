import { serializeCookie } from "@techmely/es-toolkit";
import { getAuth } from "firebase-admin/auth";
import type { Context } from "hono";
import { firebaseAdmin } from "#server/modules/auth/firebaseAdmin";

export async function firebaseAuthSignInHandler(c: Context<HonoEnv>) {
  const body = await c.req.json();
  const idToken: string = (body as { idToken?: string }).idToken || "";

  const expiresIn = 60 * 60 * 24 * 15 * 1000; // 15 days

  try {
    const sessionCookie = await getAuth(firebaseAdmin).createSessionCookie(
      idToken,
      { expiresIn }
    );

    const options = {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: true,
      path: "/",
    };

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "set-cookie": serializeCookie("__session", sessionCookie, options),
      },
    });
  } catch (error) {
    console.error("createSessionCookie:", error);

    return new Response("Unauthorized Request", {
      status: 401,
    });
  }
}
