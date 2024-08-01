import clsx from "clsx";

type Props = {
  isScrolling: boolean;
};

const NavHeader = ({ isScrolling }: Props) => {
  return (
    <nav
      className={clsx(
        "header-nav !fixed z-[2000] transition-all md:z-[2001] center-x md-max:pointer-events-none md-max:inset-0 md-max:top-0 md-max:flex md-max:w-[100vw] md-max:scale-105 md-max:flex-col md-max:p-20 md-max:pt-96 md-max:opacity-0 md-max:blur-[5px] md-max:bg-background",
        isScrolling ? "top-4" : "top-[42px]",
      )}
    >
      <ul
        className={clsx(
          "items-center gap-16 md:flex md:text-body-small-medium md-max:flex-1 md-max:text-title-h3",
          isScrolling && "lg-max:[&>*:nth-child(n+3)]:hidden",
        )}
      >
        <li className="relative block rounded-6 px-12 py-6 before:scale-90 before:opacity-0 before:transition-all before:overlay hover:before:scale-100 hover:before:opacity-100 before:bg-neutral-opaque-8">
          <a href="#products" className="hover:text-primary">
            Products
          </a>
          <a href="#solutions" className="hover:text-primary">
            Solutions
          </a>
          <a href="/feeds" className="hover:text-primary">
            Community Feeds
          </a>
          <a href="#resources" className="hover:text-primary">
            Resources
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavHeader;
