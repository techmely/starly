import React from "react";
import type { PageContext } from "vike/types";
import { PageContextProvider } from "./PageContextProvider";

export function AppPage(pageContext: PageContext) {
  const Layout = pageContext.config.Layout || PassThrough;
  const QueryProvider = pageContext.config.QueryProvider || PassThrough;
  const { Page, pageProps } = pageContext;

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <QueryProvider pageContext={pageContext}>
          <Layout>{Page ? <Page {...pageProps} /> : null}</Layout>
        </QueryProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function PassThrough({ children }: any) {
  return <>{children}</>;
}
