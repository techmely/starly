import "@techmely/reset-css";
import { invariant } from "@techmely/utils";
import { inject } from "@vercel/analytics";
import "#assets/styles/global.scss";
import { handleAnalytics } from "#modules/analytics/vercel/vercel.utils";
import { createVueApp } from "./App";

let app: ReturnType<typeof createVueApp>["app"];
initActions();

function onRenderClient(pageContext: PageContextClient) {
  // First rendering/hydration
  if (!app) {
    const root = document.getElementById("root");
    invariant(root, "Aww - No root No app");
    const isSsr = root.innerHTML !== "";
    const { app: _app, store } = createVueApp(pageContext, isSsr);
    app = _app;
    store.state.value = pageContext.initStoreState;
    app.mount(root);
  } else {
    // Client Routing
    app.updatePageInstance(pageContext);
    const title = pageContext.Head?.title || pageContext.config.Head?.title || "Techmely";
    document.title = title;
  }
}

function initActions() {
  inject();
  const match = window.matchMedia || window.msMatchMedia;

  window.isMobile = match?.("(pointer:coarse)").matches;
  window.addEventListener("click", (e) => {
    handleAnalytics(e);
  });
}

export default onRenderClient;
