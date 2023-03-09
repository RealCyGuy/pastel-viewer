<template>
  <NuxtLink
    :to="to"
    class="duration-500 relative before:absolute before:left-0 before:bottom-0.5 before:w-full before:h-0.5 before:bg-pastel-pink z-10 hover:before:h-full focus:before:h-full hover:before:bottom-0 focus:before:bottom-0 before:duration-300 inline-block before:-z-10 hover:text-white focus:text-white"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>
