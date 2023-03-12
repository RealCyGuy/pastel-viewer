<template>
  <div class="max-w-full rounded bg-gray-100 p-2 my-0.5">
    <code class="whitespace-pre-wrap" v-html="highlighted.value"></code>
  </div>
</template>

<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const props = defineProps<{
  language: string;
  content: string;
}>();

const language = props.language || "plaintext";

const highlighted = hljs.highlight(props.content, {
  language: language,
  ignoreIllegals: true,
});
</script>
