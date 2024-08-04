import { Hono } from "hono";
// import { firebaseAuthSignInHandler } from "./sign-in";
// import { firebaseAuthSignOutHandler } from "./sign-out";

const route = new Hono<HonoEnv>();

// route.post("/sign-in", firebaseAuthSignInHandler);
// route.post("/sign-out", firebaseAuthSignOutHandler);

export const sessionRouter = route;
