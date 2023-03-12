<template>
  <NuxtLink v-if="attachment.is_image" :to="attachment.url">
    <img :src="attachment.url" :alt="attachment.filename" />
  </NuxtLink>
  <p v-else>
    Attachment:
    <StyledLink :to="attachment.url">{{ attachment.filename }}</StyledLink> ({{
      size
    }})
  </p>
</template>

<script setup lang="ts">
import { IAttachment } from "~/models/LogModel";

const props = defineProps<{
  attachment: IAttachment;
}>();

let size = "";
if (props.attachment.size < 1024) {
  size = `${props.attachment.size} B`;
} else if (props.attachment.size < 1024 * 1024) {
  size = `${(props.attachment.size / 1024).toFixed(2)} KB`;
} else {
  size = `${(props.attachment.size / 1024 / 1024).toFixed(2)} MB`;
}
</script>
