// {
//   /* <template>
//   <div class="grid w-full h-100vh items-center justify-center">
//     <div class="tml-container space-y-xl">
//       <h1 class="text-center text-3xl text-red-6">Oops! ERROR DURING RENDERING</h1>
//       <div class="flex justify-center">
//         <a class="text-center underline text-xl text-blue-500" target="_blank"
//           rel="noopener noreferrer" href="https://github.com/techmely/techmely/issues/new/choose">
//           ➡ Please report this bug for us to fix it!
//         </a>
//       </div>
//       <div class="bg-red-2 text-red-8 rounded mb-4">{{ abortReason }}</div>
//     </div>
//   </div>
// </template>

// <script setup lang="ts">
// import { usePageContext } from '#modules/providers/vike.provider';

// const pageContext = usePageContext()
// let { is404, abortReason } = pageContext
// if (!abortReason) {
//   abortReason = is404 ? 'Page not found.' : 'Some thing went wrong'
// }
// </script>#modules/providers/vike.provider */
// }

import React, { type FC } from "react";

type Props = {
  locale: string;
};

const Page: FC<Props> = (props) => {
  return <div>Index Page</div>;
};

export default Page;
