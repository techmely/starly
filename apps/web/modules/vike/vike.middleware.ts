import { invariant } from "@techmely/utils";
import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { renderPage } from "vike/server";
import { serverEnvs } from "#server/utils/server-envs";
import { localeKey, localeMaxAge } from "../../locales/locales.utils";

export default async function vikeMiddleware(res: HttpResponse, req: HttpRequest) {
  const cookie = req.getHeader("cookie");

  const pageContextInit = {
    urlOriginal: req.getUrl(),
    metadata: {
      userAgent: getHeader(event, "user-agent"),
      [localeKey]: locale,
    },
  };

  const pageContext = await renderPage(pageContextInit);
  const response = pageContext.httpResponse;
  if (!locale) {
    setResponseHeader(
      event,
      "Set-Cookie",
      `${localeKey}=${"en"}; Domain=${
        serverEnvs.VITE_COOKIE_DOMAIN
      }; Secure; HttpOnly; Max-Age=${localeMaxAge}`,
    );
  }
  invariant(response, "Do not have response");
  writeEarlyHints(
    event,
    response.earlyHints.map((e) => e.earlyHintLink),
  );
  setResponseStatus(event, response.statusCode);
  setResponseHeaders(event, Object.fromEntries(response.headers ?? []));

  return response?.getBody();
}
