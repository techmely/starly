import { inject } from "vue";
import type { Locale } from "#modules/locales/locales.utils";

import type { App } from "vue";

type I18n = {
  locale: Ref<Locale>;
  updateLocale: (l: Locale) => void;
};

const $i18nKey = Symbol("__techmely__i18n__");

export function useI18n() {
  const i18n = inject<I18n>($i18nKey);
  if (!i18n) throw new Error("setI18nProvider() not called in parent");
  return i18n;
}

export function setI18nProvider(app: App) {
  const locale = ref<Locale>("en");

  function updateLocale(l: Locale) {
    locale.value = l;
  }

  app.provide($i18nKey, { locale, updateLocale });
}
