export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const baseLocale: Locale = "en";
export const localeMaxAge = 31536000; // 365 days
export const localeKey = "tmlLocale";

export function getLocale(pageContext: PageContext): Locale {
  return pageContext?.cookies?.[localeKey] ?? pageContext?.locale ?? baseLocale;
}

export function extractLocale(url: string) {
  const paths = url.split("/");
  let locale: Locale | undefined;
  let urlLogical: string;

  // We get locale from URL, for example `/en/about` => `en`
  const localePath = paths[1] as Locale;
  const isMatchLocale = locales.filter((l) => l !== baseLocale)?.includes?.(localePath);
  if (isMatchLocale) {
    locale = localePath;
    urlLogical = `/${paths.slice(2).join("/")}`;
  } else {
    urlLogical = url;
  }

  return { locale, urlLogical };
}
