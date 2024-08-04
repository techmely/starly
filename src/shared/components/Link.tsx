import { usePageContext } from "@techmely/vike-react/usePageContext";
import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { type AvailableLanguageTag, sourceLanguageTag } from "#root/paraglide/runtime";

type Props = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
  locale?: AvailableLanguageTag;
};

const Link: FC<Props> = ({ href, locale, ...props }) => {
  const pageContext = usePageContext();
  locale = locale || (pageContext.metadata?.locale as AvailableLanguageTag);
  if (locale !== sourceLanguageTag) {
    href = `/${locale}${href}`;
  }
  return <a href={href} {...props} />;
};

export default Link;
