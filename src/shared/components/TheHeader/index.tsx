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
            "mx-auto flex h-18 w-[calc(100%-20px)] max-w-[1172px] items-center justify-between whitespace-nowrap px-22 transition-all sm:px-48 md:w-[calc(100%-120px)]",
            isScrolling ? "md:h-28" : "md:h-16",
          )}
        >
          <Link href="/" className="">
            <div data-block-logo>Logo</div>
          </Link>
          <div data-block-actions className="flex gap-8 md:gap-16">
            <div className="headers-action-buttons">
              <div className="flex gap-12 transition-all sm:translate-x-120">
                <a
                  href="/pricing"
                  className="relative cursor-pointer rounded-6 bg-[#212631] px-12 py-6 text-body-small-medium text-white transition-all hover:bg-[#1B1F29] active:translate-y-[0.5px] active:bg-[#171B24] sm-max:hidden opacity-0 grayscale"
                >
                  Pricing+ Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <NavHeader />
    </>
  );
};

export default TheHeader;
