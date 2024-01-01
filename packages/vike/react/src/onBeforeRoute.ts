import type { OnBeforeRouteSync } from "vike/types";

const onBeforeRoute: OnBeforeRouteSync = (pageContext) => {
  // const { urlLogical } = extractLocale(pageContext.urlOriginal);
  // const locale = getLocale(pageContext);

  return {
    pageContext: {
      // locale,
      // urlLogical,
    },
  };
};

export default onBeforeRoute;
