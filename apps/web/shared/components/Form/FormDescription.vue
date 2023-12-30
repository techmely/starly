<script lang="ts" setup>
import clsx from 'clsx'
import { useAttrs } from 'vue'
import { useFormField } from './useFormField'

defineOptions({
  inheritAttrs: false,
})

const { formDescriptionId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <p :id="formDescriptionId" :class="clsx('text-sm text-muted-foreground', className ?? '')"
    v-bind="rest">
    <slot />
  </p>
</template>