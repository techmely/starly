import { invariant } from "@techmely/utils";
import type { App } from "vue";
import { inject } from "vue";

const $page = Symbol("__techmely__page__");

export function usePageContext() {
  const pageContext = inject<PageContext>($page);
  invariant(pageContext, "usePageContext need to wrap a provider in app");
  return pageContext;
}

export function setPageProvider(app: App, pageContext: PageContext) {
  const pageContextReactive = reactive(pageContext);
  app.provide($page, pageContextReactive);
}
