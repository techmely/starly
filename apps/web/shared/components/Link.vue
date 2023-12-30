<template>
  <a :href="_href" v-bind="rest" />
</template>

<script setup lang="ts">
import { type Locale, baseLocale } from '#modules/locales/locales.utils';
import { usePageContext } from '#modules/providers/vike.provider';
import type { LinkHTMLAttributes } from 'vue';

interface Props extends LinkHTMLAttributes {
  locale: Locale
}
defineOptions({
  inheritAttrs: false,
})
defineProps<Props>()

const { locale, href, ...rest } = useAttrs() as Record<string, any>
const pageContext = usePageContext()

const _href = computed<string>(() => (locale || pageContext.locale) !== baseLocale ? `/${locale}${href}` : href)

</script>