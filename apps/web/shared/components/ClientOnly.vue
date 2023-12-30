<template>
  <template v-if="isMounted">
    <slot />
  </template>
  <template v-else>
    <slot name="fallback">
      <div>Loading...</div>
    </slot>
  </template>
</template>

<script setup lang="ts">
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>