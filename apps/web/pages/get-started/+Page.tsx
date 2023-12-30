{
  /* <template>
  <section class="tml-container pt-8">
    <div class="flex gap-4">
      <div class="grow">
        <h1 class="text-5xl leading-[1.25]">
          {{ t.gsTitle() }}
          <span>{{ t.gsTitle1() }}</span>
        </h1>
      </div>
      <GetStartedForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import * as t from '#modules/locales/paraglide/messages'
import GetStartedForm from './components/GetStartedForm.vue';

</script> */
}

import React from "react";

type Props = {
  locale: string;
};

const Page: React.FC<Props> = (props) => {
  return <div>Index Page</div>;
};

export default Page;
