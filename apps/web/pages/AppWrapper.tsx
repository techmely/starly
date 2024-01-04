import { inject } from "@vercel/analytics";
import { handleAnalytics } from "#modules/analytics/vercel/vercel.utils";

import type { FC, PropsWithChildren } from "react";
import type { PageContext } from "vike/types";

function initActions() {
  inject();
  window.addEventListener("click", (e) => {
    handleAnalytics(e);
  });
}
type Props = {
  pageContext: PageContext;
};

const AppWrapper: FC<PropsWithChildren<Props>> = ({ children }) => {
  console.log("import.meta.env.SSR", import.meta.env.SSR);
  if (!import.meta.env.SSR) {
    initActions();
  }
  console.log("HELLO WORLD");
  return <>{children}</>;
};

export default AppWrapper;
