import type { FC, PropsWithChildren } from "react";
import type { PageContext } from "vike/types";
import { handleAnalytics } from "#root/shared/libs/analytics/vercel/vercel.utils";

import "#root/assets/styles/nprogress.css";

type Props = {};

const AppWrapper: FC<PropsWithChildren<Props>> = ({ children }) => {
  if (!import.meta.env.SSR) {
  }
  return <>{children}</>;
};

function initActions() {
  window.addEventListener("click", (e) => {
    handleAnalytics(e);
  });
}

export default AppWrapper;
