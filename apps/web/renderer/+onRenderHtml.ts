import { renderToNodeStream } from "@vue/server-renderer";
import { escapeInject } from "vike/server";
import { getLocale } from "#modules/locales/locales.utils";
import { createVueApp } from "./App";
import generateAppHead from "./AppHead";
import { AppScriptBody } from "./AppScriptBody";

function onRenderHtml(pageContext: PageContextServer) {
  const appHead = generateAppHead(pageContext);
  const { app, store } = createVueApp(pageContext, true);
  const pageStream = renderToNodeStream(app);

  const lang = getLocale(pageContext);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${lang}" data-app-env=${import.meta.env.VITE_ENV}>
      <head>${appHead}</head>
      <body id="root">${pageStream}${AppScriptBody}</body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
      initStoreState: store.state.value,
    },
  };
}

export default onRenderHtml;
