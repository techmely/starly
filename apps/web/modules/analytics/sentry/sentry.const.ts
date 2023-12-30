import type { BrowserOptions } from "@sentry/browser";
import { isBrowser } from "@techmely/utils";

export const sentryConfigs: BrowserOptions = {
  dsn: "https://f9083504fce069f5a06d97f00d0c8ba3@o4505709099483136.ingest.sentry.io/4505709102301184",
  tracesSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  release: isBrowser
    ? document.querySelector("html")?.getAttribute("data-app-version") || "0.0.0"
    : undefined,
  environment: import.meta.env.MODE,
  autoSessionTracking: true,
  ignoreErrors: [
    // Facebook borked
    "fb_xd_fragment",
    // Ad blocker
    "Failed to load resource: net::ERR_FAILED",
    "TypeError: Cannot read properties of undefined (reading 'apply')",
    "TypeError: Cannot read properties of null (reading 'Error')",
    "Cannot read property 'Error' of null",
  ],
  denyUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /facebook\.com/,
    /connect\.facebook\.net\/en_us\/all\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
  ],
};
