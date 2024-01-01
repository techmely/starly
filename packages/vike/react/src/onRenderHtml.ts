import { renderToString } from "react-dom/server";
import { renderToStream } from "react-streaming/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { AppPage } from "./App";
import generateAppHead from "./AppHead";
import { AppScriptBody } from "./AppScriptBody";

const viteEnv = process.env.VITE_ENV || "production";

const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const appHead = generateAppHead(pageContext);
  const stream = pageContext.config.stream || false;
  const lang = pageContext?.metadata?.locale || pageContext?.locale || "en";
  let pageStream:
    | string
    | ReturnType<typeof dangerouslySkipEscape>
    | Awaited<ReturnType<typeof renderToStream>>;
  if (!pageContext.Page) {
    pageStream = "";
  } else {
    const page = AppPage(pageContext);
    pageStream = stream
      ? await renderToStream(page, { userAgent: pageContext.metadata?.userAgent })
      : dangerouslySkipEscape(renderToString(page));
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${lang}" data-app-env=${viteEnv}>
      <head>${appHead}</head>
      <body id="root">${pageStream}${AppScriptBody}</body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
      // initStoreState: store.state.value,
    },
  };
};

export default onRenderHtml;
