import type { EntityId, StringEnum } from "@techmely/types";
import type { ReactElement } from "react";

type Component = (props: any) => ReactElement;

declare global {
  type PageProps = Record<string, any>;
  type RenderMode = "SPA" | "SSR" | "HTML";
  namespace VikePackages {
    interface ConfigVikeReact {
      Layout?: Component;
      Page?: Component;
      QueryProvider?: Component;
      Head?: HeadMetadata;
      pageProps?: Record<string, any>;
      metadata?: Record<StringEnum<"userAgent" | "isMobile" | "locale">, any>;
      /**
       * <html lang="${locale}">
       * @default 'en'
       * **/
      locale: StringEnum<"vi" | "en" | "cn">;
      initStoreState: Record<string, Record<EntityId, any>>;
      /**
       * @default "SSR"
       */
      /**
       * Whether to stream the page's HTML. Requires Server-Side Rendering (`ssr: true`).
       *
       * @default false
       *
       */
      stream?: boolean;
      data?: Record<string, any>;
      isr?: boolean | { expiration: number };
      abortReason?: string | { notAdmin: true };
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
      renderMode?: RenderMode;
    }
  }

  namespace Vike {
    interface PageContext {
      Head?: HeadMetadata;
      Layout?: Component;
      Page?: Component;
      pageProps?: Record<string, any>;
      data?: Record<StringEnum<'title'>, any>;
      /**
       * @default "SSR"
       */
      renderMode?: RenderMode;
      isr?: boolean | { expiration: number };
      abortReason?: string | { notAdmin: true };
      metadata?: Record<StringEnum<"userAgent" | "isMobile" | "locale">, any>;
      /**
       * Whether to stream the page's HTML. Requires Server-Side Rendering (`ssr: true`).
       *
       * @default false
       *
       */
      stream?: boolean;
      /**
       * <html lang="${locale}">
       * @default 'en'
       * **/
      locale: StringEnum<"vi" | "en" | "cn">;
      initStoreState: Record<string, Record<EntityId, any>>;
    }
  }
  interface Window {
    __vike?: Record<string, Record<string, unknown>>;
  }
}
export { };
