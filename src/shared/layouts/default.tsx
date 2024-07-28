import TheFooter from "../components/TheFooter";
import TheHeader from "../components/TheHeader";
import NavBanner from "../components/TheHeader/NavBanner";

export default function DefaultLayout({ children }) {
  return (
    <>
      <NavBanner />
      <TheHeader />
      <main className="starly-container">{children}</main>
      <TheFooter />
    </>
  );
}
