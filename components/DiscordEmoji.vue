<template>
  <img :src="url" class="inline h-[1em] w-[1em] align-[-0.1em]" />
</template>

<script setup lang="ts">
import { type SingleASTNode } from "simple-markdown";
import twemoji from "twemoji";

const props = defineProps<{
  emoji: SingleASTNode;
}>();

let url: string;
if (props.emoji.id) {
  url = `https://cdn.discordapp.com/emojis/${props.emoji.id}.${
    props.emoji.animated ? "gif" : "png"
  }`;
} else {
  const element = twemoji.parse(props.emoji.name, {
    base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
    ext: ".svg",
    folder: "svg",
  }) as string;
  url = element.match(/src="([^"]+)"/)?.[1]!;
}
</script>
