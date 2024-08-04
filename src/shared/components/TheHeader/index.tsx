import clsx from "clsx";
import { useWindowScroll } from "react-use";
import Link from "../Link";
import NavHeader from "./NavHeader";

const SCROLL_THRESHOLD = 15;

const TheHeader = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { y } = useWindowScroll();

  useEffect(() => {
    if (y > SCROLL_THRESHOLD) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  }, [y]);

  return (
    <>
      <header
        className={clsx(
          "header fixed left-0 top-0 z-[2001] w-full transition-colors",
          isScrolling && "body-scrolled",
        )}
      >
        <div
          className={clsx(
            "mx-auto flex h-18 starly-container items-center justify-between whitespace-nowrap px-[22px] transition-all sm:px-12",
            isScrolling ? "md:h-16" : "md:h-28",
          )}
        >
          <Link href="/" className="">
            <div data-block-logo>Logo</div>
          </Link>
          <div data-block-actions className="flex gap-8 md:gap-16">
            <div className="headers-action-buttons relative left-8 overflow-hidden pr-8">
              <div
                className={clsx(
                  "flex gap-3 transition-all",
                  isScrolling ? "" : "sm:translate-x-[120px]",
                )}
              >
                <Link
                  href="/sales/take-a-tour"
                  className={clsx(
                    "relative rounded-md px-3 py-2.5 text-base transition-colors inner-border inner-border-slate-400 active:translate-y-[0.5px] hover:bg-primary-100",
                  )}
                >
                  Take a Tour
                </Link>
                <Link
                  href="/pricing"
                  className={clsx(
                    "relative cursor-pointer rounded-md bg-slate-800 px-3 py-2.5 text-base text-white transition-all hover:bg-slate-700 active:translate-y-[0.5px] active:bg-[#171B24] sm-max:hidden grayscale",
                    !isScrolling && "opacity-0",
                  )}
                >
                  Pricing+ Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <NavHeader isScrolling={isScrolling} />
    </>
  );
};

export default TheHeader;
