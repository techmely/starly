import type { HonoEnv } from "@techmely/hono";
import type { MiddlewareHandler } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { renderPage } from "vike/server";
import { localeKey, localeMaxAge } from "#root/locales/locales.utils";

export default function vikeMiddleware(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const locale = getCookie(c, localeKey);
    const userAgent = c.req.header("user-agent");
    const pageContextInit = {
      urlOriginal: c.req.url,
      metadata: {
        userAgent,
        [localeKey]: locale,
      },
    };
    if (!locale) {
      setCookie(c, localeKey, "en", {
        domain: c.env.COOKIE_DOMAIN,
        secure: true,
        httpOnly: true,
        maxAge: localeMaxAge,
      });
    }
    const pageContext = await renderPage(pageContextInit);
    const response = pageContext.httpResponse;
    if (!response) return next();
    const { getBody, statusCode, headers, earlyHints } = response;
    for (const [name, value] of headers) {
      c.header(name, value);
    }
    if ("writeEarlyHints" in c.res)
      (c.res.writeEarlyHints as any)({
        link: earlyHints.map((e) => e.earlyHintLink),
      });

    c.status(statusCode);
    const body = await getBody();
    return c.body(body);
  };
}
