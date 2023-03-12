<template>
  <span
    class="rounded bg-gray-200"
    :class="opened ? '' : 'text-transparent cursor-pointer'"
    @click="opened = true"
    ><slot
  /></span>
</template>

<script setup lang="ts">
const opened = ref(false);
</script>
