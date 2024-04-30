import { invariant } from "@techmely/utils";
import type Elysia from "elysia";
import { renderPage } from "vike/server";
import { localeKey, localeMaxAge } from "#root/locales/locales.utils";
import { serverEnvs } from "../utils/server-envs";

export default async function vikeMiddleware() {
  return (app: Elysia) => {
    app.get("*", async ({ request, cookie, headers, set }) => {
      const locale = cookie[localeKey];
      const pageContextInit = {
        urlOriginal: request.url,
        metadata: {
          userAgent: headers["user-agent"],
          [localeKey]: locale.toString(),
        },
      };
      const pageContext = await renderPage(pageContextInit);
      const response = pageContext.httpResponse;
      locale.domain;
      if (!locale.toString()) {
        locale.value = "en";
        locale.domain = serverEnvs.VITE_COOKIE_DOMAIN;
        locale.secure = true;
        locale.httpOnly = true;
        locale.maxAge = localeMaxAge;
      }

      invariant(response, "Do not have response");
      set.status = response.statusCode;
    });
    return app;
  };
}
