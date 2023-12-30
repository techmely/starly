<script setup lang="ts">
import buttonVariants from './button'
import clsx from 'clsx'


interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <component :is="as" :class="clsx(buttonVariants({ variant, size }), $attrs.class ?? '')">
    <slot />
  </component>
</template>