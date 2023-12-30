import {
  type H3Event,
  getCookie,
  getRequestURL,
  setResponseHeader,
  setResponseHeaders,
  setResponseStatus,
  writeEarlyHints,
} from "h3";
import { renderPage } from "vike/server";

import { invariant } from "@techmely/utils";
import { localeKey, localeMaxAge } from "#modules/locales/locales.utils";
import { serverEnvs } from "#server/utils/server-envs";

export default async function vikeMiddleware(event: H3Event) {
  const locale = getCookie(event, localeKey);

  const pageContextInit = {
    urlOriginal: getRequestURL(event).toString(),
    cookies: { [localeKey]: locale },
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
