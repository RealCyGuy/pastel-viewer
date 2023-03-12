<template>
  <NuxtLink :to="to" class="text-blue-500 hover:text-blue-200 underline"
    ><slot
  /></NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>
