<template>
  <div>
    <h1>{{ error.name }}</h1>
    <h2>{{ error.message }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: Error;
}>();
</script>
