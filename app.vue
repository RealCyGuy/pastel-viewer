<template>
  <div
    class="min-h-screen bg-white text-black selection:bg-green-200 flex flex-col"
  >
    <NuxtPage class="flex-1" />
    <footer class="flex justify-center py-3 font-sans2">
      <StyledLink to="https://github.com/realcyguy/pastel-viewer"
        >pastel-viewer</StyledLink
      >
      &nbsp;<StyledLink
        :to="
          'https://github.com/RealCyGuy/pastel-viewer/releases/tag/v' + version
        "
        >v{{ version }}</StyledLink
      >
      &nbsp;by&nbsp;
      <StyledLink to="https://realcyguy.netlify.app">cyrus yip</StyledLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import "~/assets/css/styles.css";

const version = useRuntimeConfig().public.version;

useServerSeoMeta({
  title: "pastel-viewer",
  description: "a minimal and serverless modmail logviewer built with nuxt 3",
  themeColor: "#f8c8dc",
});
</script>
