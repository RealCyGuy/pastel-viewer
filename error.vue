<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-sans2 gap-4"
  >
    <h1 class="text-3xl">Error {{ error.statusCode }}</h1>
    <h2 class="text-2xl">{{ error.message }}</h2>
    <ButtonLink to="/">Go Home</ButtonLink>
  </div>
</template>

<script setup lang="ts">
import { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();
onMounted(() => {
  console.error(props.error);
});
</script>
