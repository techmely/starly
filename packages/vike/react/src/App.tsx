import React from "react";
import { PageContextProvider } from "./PageContextProvider";

export function AppPage(pageContext: PageContext) {
  const Layout = pageContext.config.Layout || PassThrough;
  const ReactQueryProvider = pageContext.config.ReactQueryProvider || PassThrough;
  const { Page, pageProps } = pageContext;

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ReactQueryProvider pageContext={pageContext}>
          <Layout>{Page ? <Page {...pageProps} /> : null}</Layout>
        </ReactQueryProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj extends object, T>(obj: Obj, objAddendum: T): asserts obj is Obj & T {
  Object.assign(obj, objAddendum);
}

function PassThrough({ children }: any) {
  return <>{children}</>;
}
