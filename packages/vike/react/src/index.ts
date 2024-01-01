import type { Config, ConfigEnv } from "vike/types";

import onBeforeRoute from "./onBeforeRoute";
import onHydrationEnd from "./onHydrationEnd";
import onPageTransitionEnd from "./onPageTransitionEnd";
import onPageTransitionStart from "./onPageTransitionStart";
// import onPrerenderStart from "./+onPrerenderStart";

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
  onRenderHtml: "import:@techmely/vike-react/onRenderHtml:onRenderHtml",
  onRenderClient: "import:@techmely/vike-react/onRenderClient:onRenderClient",
  onBeforeRoute,
  onHydrationEnd,
  onPageTransitionStart,
  onPageTransitionEnd,
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
} satisfies Config);

export * from "./typings/head.d";
export * from "./typings/vike.d";
