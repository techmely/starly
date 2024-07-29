import TheFooter from "../components/TheFooter";
import TheHeader from "../components/TheHeader";
import NavBanner from "../components/TheHeader/NavBanner";

import "#root/assets/styles/nprogress.css";
import "#root/assets/styles/global.scss";
import "@techmely/reset-css"

export default function DefaultLayout({ children }) {
  return (
    <>
      <NavBanner />
      <TheHeader />
      {children}
      <TheFooter />
    </>
  );
}
