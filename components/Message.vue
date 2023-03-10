<template>
  <div
    class="flex py-3 px-3 sm:px-5 mb-2 bg-white relative shadow-lg rounded-lg border-2 border-black"
    @click="$emit('messageClick', message.message_id)"
    :class="selectedMessageId === message.message_id ? '' : 'border-opacity-0'"
    :id="message.message_id"
  >
    <!-- <div class="bg-green-800 w-3 h-3 absolute top-0 right-0"></div> -->
    <img
      class="h-10 w-10 rounded-full my-2 mr-3"
      :src="message.author.avatar_url"
      alt=""
    />
    <div class="flex flex-col justify-center w-full">
      <div class="text-xs sm:text-sm flex justify-between font-sans2">
        <span>
          <UserName :user="message.author" />
          <Tag :message="message" />
        </span>
        <!-- <span class="text-gray-800">
          {{ formatDate(date) }}
        </span> -->
        <FormattedDate :date="date" />
        <!-- <VMenu class="inline-block" theme="custom-tooltip">
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
        </VMenu> -->
      </div>
      <!-- discord uses white-space: pre-line in embeds hiding extra spacing -->
      <p class="break-all whitespace-pre-line" ref="content">
        {{ message.content
        }}<span v-if="message.edited" class="text-xs text-gray-700">
          (edited)</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import twemoji from "twemoji";

import { IMessage } from "~/models/LogModel";

defineEmits<{
  messageClick: (messageId: string) => void;
}>();

const props = defineProps<{
  message: IMessage;
  selectedMessageId: string;
}>();

const date = new Date(props.message.timestamp);

const content = ref();
onMounted(() => {
  twemoji.parse(content.value);
});
</script>
