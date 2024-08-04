import {
  type AvailableLanguageTag,
  availableLanguageTags,
  sourceLanguageTag,
} from "#root/paraglide/runtime";

export const localeMaxAge = 31536000; // 365 days
export const localeKey = "tmlLocale";

export function extractLocale(url: string) {
  const paths = url.split("/");
  let locale: AvailableLanguageTag | undefined;
  let urlLogical: string;

  // We get locale from URL, for example `/en/about` => `en`
  const localePath = paths[1] as AvailableLanguageTag;
  const isMatchLocale = availableLanguageTags
    .filter((l) => l !== sourceLanguageTag)
    ?.includes?.(localePath);
  if (isMatchLocale) {
    locale = localePath;
    urlLogical = `/${paths.slice(2).join("/")}`;
  } else {
    urlLogical = url;
  }

  return { locale, urlLogical };
}
