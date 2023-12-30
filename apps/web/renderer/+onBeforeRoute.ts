import { extractLocale, getLocale } from "#modules/locales/locales.utils";

function onBeforeRoute(pageContext: PageContext) {
  const { urlLogical } = extractLocale(pageContext.urlOriginal);
  const locale = getLocale(pageContext);

  return {
    pageContext: {
      locale,
      urlLogical,
    },
  };
}

export default onBeforeRoute;
