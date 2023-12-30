<template>
  <li class="relative group">
    <Button v-if="isDropdown" data-testid="nav-parent" @click="$emit('item-click')">
      {{ name }}
    </Button>
    <Button v-else as="a" :href="href" data-testid="nav-parent" class="hover:bg-primary">
      {{ name }}
    </Button>
  </li>
</template>

<script setup lang="ts">
type Props = {
  name?: string;
  href?: string;
  isDropdown?: boolean;
};

defineProps<Props>()

defineEmits(['item-click'])

</script>