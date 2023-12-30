export const getLanguage = (): string =>
  navigator.userLanguage ||
  (navigator.languages?.length && navigator.languages[0]) ||
  navigator.language ||
  navigator.browserLanguage ||
  navigator.systemLanguage ||
  "vi";
