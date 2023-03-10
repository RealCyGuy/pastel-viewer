<template>
  <div
    class="min-h-screen bg-white text-black selection:bg-green-200 flex flex-col"
  >
    <div class="flex-1">
      <NuxtPage />
    </div>
    <footer class="flex justify-center py-3 font-sans2">
      <StyledLink to="https://github.com/realcyguy/pastel-viewer"
        >pastel-viewer</StyledLink
      >
      &nbsp;by&nbsp;
      <StyledLink to="https://realcyguy.netlify.app">cyrus yip</StyledLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import "~/assets/css/styles.css";
</script>
