// // import { baseLocale, locales } from "#modules/locales/locales.utils";

// const onPrerenderStart = ({ pageContexts }) => {
//   const _pageContexts: PageContextServer[] = [];
//   for (const pc of pageContexts) {
//     for (const locale of locales) {
//       let { urlOriginal } = pc;
//       if (locale !== baseLocale) {
//         urlOriginal = `/${locale}${pc.urlOriginal}`;
//       }
//       _pageContexts.push({ ...pc, urlOriginal, locale });
//     }
//   }

//   return {
//     prerenderContext: {
//       pageContexts: _pageContexts,
//     },
//   };
// };

// export { onPrerenderStart };
