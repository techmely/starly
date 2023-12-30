import type { Dict } from "@techmely/types";
import { clientEnvs } from "#shared/helpers/client-envs";

export function logException(error: unknown, context: Dict<any>) {
  if (typeof Sentry !== "undefined") {
    if (context) {
      const scope = new Sentry.Scope();
      scope.setContext("info", context);
      Sentry.captureException(error, scope);
    } else Sentry.captureException(error);
  }
  if (clientEnvs.isDev) console.error(error);
}

export function logMessage(msg: string, context: Dict<any>) {
  if (typeof Sentry !== "undefined") {
    if (context) {
      const scope = new Sentry.Scope();
      scope.setContext("info", context);
      Sentry.captureMessage(msg, scope);
    } else Sentry.captureMessage(msg);
  }
  if (clientEnvs.isDev) console.info(msg);
}
