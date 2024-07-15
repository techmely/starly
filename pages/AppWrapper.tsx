import type { FC, PropsWithChildren } from "react";
import { handleAnalytics } from "#root/shared/libs/analytics/vercel/vercel.utils";
import { Inspector } from "react-dev-inspector";

import "#root/assets/styles/nprogress.css";

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  if (!import.meta.env.SSR) {
  }
  return (
    <>
      <Inspector />
      {children}
    </>
  );
};

function initActions() {
  window.addEventListener("click", (e) => {
    handleAnalytics(e);
  });
}

export default AppWrapper;
