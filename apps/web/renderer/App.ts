import { invariant } from "@techmely/utils";
import { createApp, createSSRApp, defineComponent, h, markRaw } from "vue";
import { setI18nProvider } from "#modules/providers/i18n.provider";
import { setPageProvider } from "#modules/providers/vike.provider";
import { useVuePlugins } from "#modules/vue/index.plugin";

export function createVueApp(pageContext: PageContext, isSSR: boolean) {
  const { Page } = pageContext;
  let rootComponent: Component & {
    Page: Component;
    pageProps: PageProps;
    config: ViteSsrConfig["config"];
  };

  const PageWithLayout = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {}),
      config: markRaw(pageContext.config),
    }),
    created() {
      rootComponent = this;
    },
    render() {
      const Layout = pageContext.config.Layout;
      invariant(Layout, "We need an default Layout for all");
      return h(
        Layout,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps);
          },
        },
      );
    },
  });

  const app = isSSR ? createSSRApp(PageWithLayout) : createApp(PageWithLayout);
  const { store } = useVuePlugins(pageContext, app, isSSR);
  objectAssign(app, {
    updatePageInstance: (pageContext: PageContext) => {
      rootComponent.Page = markRaw(pageContext.Page);
      rootComponent.pageProps = markRaw(pageContext.pageProps || {});
      rootComponent.config = markRaw(pageContext.config);
    },
  });

  setPageProvider(app, pageContext);
  setI18nProvider(app);

  app.config.errorHandler = (error) => {
    console.error("Oops, error:", error);
  };

  return { app, store };
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj extends object, T>(obj: Obj, objAddendum: T): asserts obj is Obj & T {
  Object.assign(obj, objAddendum);
}
