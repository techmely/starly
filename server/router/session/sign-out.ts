import { serializeCookie } from "@techmely/utils";
import type { Context } from "hono";

export async function firebaseAuthSignOutHandler(_c: Context<HonoEnv>) {
  return new Response(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": serializeCookie("__session", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        expires: new Date(1),
        path: "/",
      }),
    },
  });
}
