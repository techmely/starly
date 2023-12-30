<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import clsx from 'clsx';

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue"
    :class="clsx('flex w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm ring-offset-green-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-green-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')">
</template>
