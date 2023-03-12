<template>
  <div>
    <Message
      v-for="message in messages"
      :message="message"
      :selectedMessageId="selectedMessageId"
      :messageLink="messageLink"
      @messageClick="messageClick"
    />
  </div>
</template>

<script setup lang="ts">
import { IMessage } from "~~/models/LogModel";

defineProps<{
  messages: IMessage[];
  messageLink: string;
}>();

const selectedMessageId = ref("");

function messageClick(messageId: string) {
  if (window.location.hash.slice(1) === messageId) {
    history.replaceState(null, "", window.location.pathname);
    selectedMessageId.value = "";
  } else {
    history.replaceState(null, "", `#${messageId}`);
    selectedMessageId.value = messageId;
  }
}

onMounted(() => {
  selectedMessageId.value = window.location.hash.slice(1);
});
</script>
