import { piniaPersist } from "@techmely/vue-pinia-persist";
import type { App } from "vue";
import VuePinia from "./pinia.plugin";

export function useVuePlugins(pageContext: PageContext, app: App, isSSR: boolean) {
  if (!isSSR) {
    VuePinia.use(piniaPersist());
  }

  const vuePlugins = pageContext.config.plugins;
  for (const pl of vuePlugins) {
    app.use(pl.plugin, pl.options);
  }
  app.use(VuePinia);
  return { store: VuePinia };
}
