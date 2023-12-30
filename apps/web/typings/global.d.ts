import _Sentry from "@sentry/browser";
import type { AppDatabase } from "server/utils/planet-scale";
import type {
  Config,
  PageContextBuiltInClientWithClientRouting,
  PageContextBuiltInServer,
} from "vike/types";
import type { Dictionary } from "../locales/locales.types";
import type { Component } from 'react'

declare global {
  type PageProps = Record<string, any>;
  type RenderMode = "SPA" | "SSR" | "HTML";
  type PageContextCommon = {
    Head?: HeadMetadata;
    Layout?: Component;
    Page?: Component;
    pageProps?: Record<string, any>;
    config?: {
      Page?: Component;
      /** configs rendered and appended into <head></head> */
      Head?: HeadMetadata;
      Layout?: Component;
      /**
       * If true, render mode is SSR or pre-rendering (aka SSG). In other words, the
       * page's HTML will be rendered at build-time or request-time.
       * If false, render mode is SPA. In other words, the page will only be
       * rendered in the browser.
       *
       * See https://vike.dev/render-modes
       * @default true
       */
      ssr?: boolean;
      /**
       * @default "SSR"
       */
      renderMode?: RenderMode;
    };
    /**
     * @default "SSR"
     */
    renderMode?: RenderMode;
    isr?: boolean | { expiration: number };
    /**
     * Internal var vike
     */
    _pageId?: string;
    abortReason?: string | { notAdmin: true };
    cookies?: Record<string, any>;
    /**
     * <html lang="${locale}">
     * @default 'vi'
     * **/
    locale: Locale;
    initStoreState: Record<string, StateTree>;
  };

  type ViteSsrConfig = Config & PageContextCommon;

  type PageContextServer = PageContextBuiltInServer<Component> & PageContextCommon;
  type PageContextClient = PageContextBuiltInClientWithClientRouting<Component> & PageContextCommon;
  type PageContext = PageContextClient | PageContextServer;

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

    isMobile: boolean;

    __vike: undefined | Record<string, Record<string, unknown>>;
  }
  interface Navigator {
    userLanguage?: string;
    browserLanguage?: string;
    systemLanguage?: string;
  }
}
