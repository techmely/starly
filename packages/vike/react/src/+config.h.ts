import type { EntityId, StringEnum } from "@techmely/types";
import type { ReactElement } from "react";
import type {
  Config,
  ConfigEnv,
  PageContextBuiltInClientWithClientRouting,
  PageContextBuiltInServer,
} from "vike/types";

type Component = (props: any) => ReactElement;

const serverClient: ConfigEnv = {
  client: true,
  server: true,
};
const clientOnly: ConfigEnv = {
  client: true,
  server: false,
};
const serverOnly: ConfigEnv = {
  client: false,
  server: true,
};

const renderModeMap: Record<RenderMode, ConfigEnv> = {
  SPA: clientOnly,
  SSR: serverClient,
  HTML: serverOnly,
};

export default ({
  passToClient: ["pageProps", "metadata", "initStoreState"],
  clientRouting: true,
  hydrationCanBeAborted: true,
  prefetchStaticAssets: "hover",
  meta: {
    Head: {
      env: serverOnly,
    },
    Layout: {
      env: serverClient,
    },
    ReactQueryProvider: {
      env: serverClient,
    },
    locale: {
      env: serverClient,
    },
    isr: {
      env: serverOnly,
    },
    stream: {
      env: serverOnly,
    },
    ssr: {
      env: { config: true },
      effect: ({ configValue }) => {
        return {
          meta: {
            Page: {
              env: configValue ? serverClient : clientOnly,
            },
          },
        };
      },
    },
    renderMode: {
      env: { config: true },
      effect: ({ configValue }) => {
        const env = renderModeMap[configValue as RenderMode];
        if (!env) {
          throw new Error(`renderMode must be one of ${Object.keys(renderModeMap).join(", ")}`);
        }
        return { meta: { Page: { env } } };
      },
    },
    plugins: {
      env: serverClient,
    },
    initStoreState: {
      env: serverClient,
    },
  },
  locale: "en",
  renderMode: "SSR",
  initStoreState: {},
} satisfies ViteSsrConfig);

declare global {
  type PageProps = Record<string, any>;
  type RenderMode = "SPA" | "SSR" | "HTML";
  type PageContextCommon = {
    Head?: HeadMetadata;
    Layout?: Component;
    Page?: Component;
    pageProps?: Record<string, any>;
    data?: Record<string, any>;
    config?: {
      Page?: Component;
      /** configs rendered and appended into <head></head> */
      Head?: HeadMetadata;
      Layout?: Component;
      ReactQueryProvider?: Component;
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
      /**
       * Whether to stream the page's HTML. Requires Server-Side Rendering (`ssr: true`).
       *
       * @default false
       *
       */
      stream?: boolean;
      renderMode?: RenderMode;
    };
    /**
     * @default "SSR"
     */
    renderMode?: RenderMode;
    isr?: boolean | { expiration: number };
    abortReason?: string | { notAdmin: true };
    metadata?: Record<StringEnum<"userAgent" | "isMobile" | "locale">, any>;
    /**
     * <html lang="${locale}">
     * @default 'en'
     * **/
    locale: StringEnum<"vi" | "en" | "cn">;
    initStoreState: Record<string, Record<EntityId, any>>;
  };

  type ViteSsrConfig = Config & PageContextCommon;

  type PageContextServer = PageContextBuiltInServer<Component> & PageContextCommon;
  type PageContextClient = PageContextBuiltInClientWithClientRouting<Component> & PageContextCommon;
  type PageContext = PageContextClient | PageContextServer;
}
