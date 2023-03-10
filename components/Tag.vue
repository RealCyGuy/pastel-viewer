<template>
  <span
    v-if="tag"
    class="text-white rounded px-2 py-0.5 inline-block"
    :class="bg"
    >&ZeroWidthSpace;{{ tag }}</span
  >
</template>

<script setup lang="ts">
import { IMessage } from "~/models/LogModel";

const props = defineProps<{
  message: IMessage;
}>();

let tag = "";
let bg = "bg-pastel-green";
switch (props.message.type) {
  case "thread_message":
    if (props.message.author.mod) {
      tag = "Reply";
    }
    break;
  case "anonymous":
    tag = "Anonymous";
    break;
  case "internal":
    tag = "Internal";
    bg = "bg-pastel-orange";
    break;
  case "system":
    tag = "Note";
    bg = "bg-pastel-blue";
    break;
  case "close":
    tag = "Close";
    bg = "bg-pastel-red";
    break;
  default:
    break;
}
</script>
