import type _Sentry from "@sentry/browser";

declare global {
  type MixPanelInitConfig = {
    debug: boolean;
    track_pageview: boolean;
    persistence: "localStorage" | "cookie" | "memory";
  };
  type MixPanelConfig = {
    init: (token: string, options?: MixPanelInitConfig) => void;
    track: (eventName: string, params?: any) => void;
  };
  const mixpanel: MixPanelConfig;
  const Sentry: typeof _Sentry;

  interface Window {
    msMatchMedia(media: string): MediaQueryList;
    trackEvent(eventName: string, params?: any): void;
    google: {
      accounts: {
        id: {
          initialize({ client_id: string, "data-itp_support": boolean, callback });
          prompt();
        };
      };
    };
  }
  interface Navigator {
    userLanguage?: string;
    browserLanguage?: string;
    systemLanguage?: string;
  }
}
