import { usePageContext } from "@techmely/vike-react/usePageContext";
import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { type Locale, baseLocale } from "#root/locales/locales.utils";

type Props = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
  locale?: Locale;
};

const Link: FC<Props> = ({ href, locale, ...props }) => {
  const pageContext = usePageContext();
  locale = locale || (pageContext.metadata?.locale as Locale);
  if (locale !== baseLocale) {
    href = `/${locale}${href}`;
  }
  return <a href={href} {...props} />;
};

export default Link;
