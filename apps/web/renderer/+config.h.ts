import type { ConfigEnv } from "vike/types";
import TechmelyLayout from "#shared/layouts/techmely.vue";

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
  passToClient: ["pageProps", "locale", "initStoreState"],
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
    locale: {
      env: serverClient,
    },
    isr: {
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
  Layout: TechmelyLayout,
  locale: "en",
  renderMode: "SSR",
  plugins: [],
  initStoreState: {},
} satisfies ViteSsrConfig);
