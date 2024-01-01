import { type Root, createRoot, hydrateRoot } from "react-dom/client";
import type { OnRenderClientSync } from "vike/types";
import { AppPage } from "./App";

// function initActions() {
//   inject();
//   const match = window.matchMedia || window.msMatchMedia;

//   window.isMobile = match?.("(pointer:coarse)").matches;
//   window.addEventListener("click", (e) => {
//     handleAnalytics(e);
//   });
// }

let app: Root;
const onRenderClient: OnRenderClientSync = (pageContext) => {
  const page = AppPage(pageContext);

  const container = document.getElementById("root");
  if (!container) throw new Error("Aww - No root element - No app");
  if (container.innerHTML !== "" && pageContext.isHydration) {
    // Hydration
    app = hydrateRoot(container, page);
  } else {
    if (!app) {
      // First rendering
      app = createRoot(container);
    } else {
      // Client routing
      const title = pageContext.data?.title || pageContext.Head?.title || "Techmely";
      document.title = title;
    }

    app.render(page);
  }
};

export default onRenderClient;
