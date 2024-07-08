import type { FC, PropsWithChildren } from "react";
import type { PageContext } from "vike/types";
import { handleAnalytics } from "#root/modules/analytics/vercel/vercel.utils";

type Props = {
  pageContext: PageContext;
};

const AppWrapper: FC<PropsWithChildren<Props>> = ({ children }) => {
  if (!import.meta.env.SSR) {
    initActions();
  }
  return <>{children}</>;
};

function initActions() {
  window.addEventListener("click", (e) => {
    handleAnalytics(e);
  });
}

export default AppWrapper;
