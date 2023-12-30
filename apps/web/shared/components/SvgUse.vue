<template>
  <svg role="img" :aria-label="label || 'Present Icon'" v-bind="rest">
    <use :href="svgPath" />
  </svg>
</template>

<script setup lang="ts">
import { type SVGAttributes, computed, useAttrs } from 'vue';


type SvgId =
  | "brand-twitter"
  | "brand-linkedin"
  | "brand-facebook"
  | "brand-telegram"
  | "brand-zalo"
  | "brand-facebook"
  | "brand-telegram"
  | "outline-clock"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "chevron-up"
  | "close-outline"
  | "facebook"
  | "google"
  | "github"
  // In case you want to pass icon id dynamic
  | (string & {});

interface SvgUseProps extends /* @vue-ignore */ SVGAttributes {
  id: SvgId;
  label?: string;
  customPath?: string;
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SvgUseProps>()
const { role, ...rest } = useAttrs()

const svgPath = computed(() => props.customPath ? `${props.customPath}#${props.id}` : `/svg/common.svg#${props.id}`)

</script>
