import { invariant } from "@techmely/utils";
import type { MiddlewareHandler } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { renderPage } from "vike/server";
import { localeKey, localeMaxAge } from "#root/locales/locales.utils";
import { serverEnvs } from "../utils/server-envs";

export function vike(): MiddlewareHandler {
  return async (c, next) => {
    const locale = getCookie(c, localeKey);

    const pageContextInit = {
      urlOriginal: c.req.url,
      metadata: {
        userAgent: c.req.header("user-agent"),
        [localeKey]: locale,
      },
    };
    const pageContext = await renderPage(pageContextInit);
    const response = pageContext.httpResponse;
    if (!locale) {
      setCookie(c, localeKey, "en", {
        domain: serverEnvs.VITE_COOKIE_DOMAIN,
        secure: true,
        httpOnly: true,
        maxAge: localeMaxAge,
      });
    }

    invariant(response, "Do not have response");
    c.res.status(response.statusCode);

    await next();
  };
}
