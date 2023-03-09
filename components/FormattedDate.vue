<template>
  <VMenu class="inline-block" theme="custom-tooltip">
    <span class="text-gray-800">{{ formatDate(date) }}</span>
    <template #popper>
      <span>{{
        date.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      }}</span>
    </template>
  </VMenu>
</template>

<script setup lang="ts">
defineProps<{
  date: Date;
}>();
</script>
