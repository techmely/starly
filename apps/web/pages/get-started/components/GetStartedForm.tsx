// <!-- <template>
//   <div class="">
//     <div class="mb-4">
//       <p class="text-xl">{{ t.gsFormTitle() }}</p>
//       <p class="text-lg">{{ t.gsFormSubtile() }}</p>
//     </div>
//     <div class="flex items-center gap-2">
//       <Button v-for="p of providers"
//         class="p-2 border border-gray-300 rounded-md hover:bg-primary-50/50 hover:border-primary-500"
//         @click="p.action">
//         <SvgUse :id="p.name" customPath="/svg/social-media.svg" class="w-6 h-6" />
//       </Button>
//     </div>
//     <!-- <Expandable expanded={!!state.providerErrorMsg}>
//         <div id="firebase-auth-error" class="pt-4 text-sm text-red-500">
//           {state.providerErrorMsg}
//         </div>
//       </Expandable> -->
//     <div class="mt-4 mb-2 flex items-center gap-2 w-full">
//       <div class="grow bg-gray-200 h-[1px]" />
//       <span class="text-sm text-gray-500">{{ t.gsFormOr() }}</span>
//       <div class="grow bg-gray-200 h-[1px]" />
//     </div>
//     <Form autocomplete="off" class="space-y-6" @submit="handleRegisterWithEmail">
//       <Field v-slot="{ componentField }" name="email" class="inline-block">
//         <FormItem class="py-5">
//           <FormLabel for="label">Title</FormLabel>
//           <FormControl>
//             <Input type="email" placeholder="Nhập email" v-bind="componentField" />
//           </FormControl>
//           <FormMessage name="email" />
//         </FormItem>
//       </Field>
//       <Field v-slot="{ componentField }" name="password" class="inline-block">
//         <FormItem>
//           <FormLabel for="label">Title</FormLabel>
//           <FormControl>
//             <Input type="password" :placeholder="t.gsFormEmail" autocomplete="new-password"
//               v-bind="componentField" />
//           </FormControl>
//           <FormMessage name="password" />
//         </FormItem>
//       </Field>
//       <div class="text-sm text-gray-500 italic">
//         <span>{{ t.gsFormAgreement() }}</span>
//         <a href="/legal/privacy-policy" target="_blank" rel="noreferrer" class="text-primary-500">
//           {{ t.gsFormAgreement1() }}
//         </a>
//         <span>{{ t.gsFormAgreement2() }}</span>
//         <span>
//           <a href="/legal/terms-of-service" target="_blank" rel="noreferrer" class="text-primary-500">
//             {{ t.gsFormAgreement3() }}
//           </a>
//         </span>
//         <span>{{ t.gsFormAgreement4() }}</span>
//       </div>
//       <Button type="submit" class="w-full">
//         {{ t.gsFormBtnSubmit() }}
//       </Button>
//     </Form>
//   </div>
// </template>

// <script setup lang="ts">
// import * as t from '#modules/locales/paraglide/messages'
// import { track } from "@vercel/analytics";
// import { Form, Field } from 'vee-validate';

// const emailRegisterSchema = object({
//   email: string([minLength(1, ""), email("")]),
//   password: string([minLength(8, ""), maxLength(255, "")]),
// });

// const providers = [
//   {
//     name: "google",
//     async action() {
//       track("sign_in_google");
//       // await actions.signInWithProvider({ locale, provider: "google" });
//     },
//   },
//   {
//     name: "github",
//     async action() {
//       track("sign_in_github");
//       // await actions.signInWithProvider({ locale, provider: "github" });
//     },
//   },

//   {
//     name: "facebook",
//     async action() {
//       track("sign_in_facebook");
//       // await actions.signInWithProvider({ locale, provider: "facebook" });
//     },
//   },
// ];

// const handleRegisterWithEmail = () => { }

// </script> -->
