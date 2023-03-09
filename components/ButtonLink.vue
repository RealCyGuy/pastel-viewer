<template>
  <NuxtLink
    :to="to"
    class="px-3 py-2 shadow-lg rounded-lg duration-200 hover:shadow-sm focus:shadow-sm border-1"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>
