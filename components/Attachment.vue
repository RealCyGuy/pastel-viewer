<template>
  <div>
    <p>
      Attachment:
      <StyledLink :to="attachment.url">{{ attachment.filename }}</StyledLink>
      ({{ size }})
    </p>
    <NuxtLink v-if="attachment.is_image" :to="attachment.url">
      <img :src="attachment.url" :alt="attachment.filename" />
    </NuxtLink>
  </div>
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
