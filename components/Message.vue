<template>
  <div
    class="flex py-3 px-3 sm:px-5 mb-2 bg-white relative shadow-lg rounded-lg border-2"
    @click="$emit('messageClick', message.message_id)"
    :class="selectedMessageId === message.message_id ? 'border-gray-500' : ''"
    :id="message.message_id"
    @contextmenu="onContextMenu"
  >
    <!-- <div class="bg-green-800 w-3 h-3 absolute top-0 right-0"></div> -->
    <img
      class="h-10 w-10 rounded-full my-2 mr-3"
      :src="message.author.avatar_url"
      alt=""
    />
    <div class="flex flex-col justify-center w-full">
      <div class="text-xs sm:text-sm flex justify-between font-sans2">
        <span class="max-w-[50%]">
          <UserName :user="message.author" class="mr-2" />
          <Tag :message="message" />
        </span>
        <!-- <span class="text-gray-800">
          {{ formatDate(date) }}
        </span> -->
        <FormattedDate class="text-right" :date="date" />
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
      <MessageContent :message="message"></MessageContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContextMenu from "@imengyu/vue3-context-menu";

import { IMessage } from "~/models/LogModel";

defineEmits<{
  messageClick: (messageId: string) => void;
}>();

const props = defineProps<{
  message: IMessage;
  selectedMessageId: string;
}>();

const date = new Date(props.message.timestamp);

function onContextMenu(e: MouseEvent) {
  const element = e.target as HTMLElement;
  if (element.tagName === "IMG" || element.tagName === "A") {
    return;
  }

  // check if text is selected
  if (window.getSelection()?.toString()) {
    return;
  }

  e.preventDefault();
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: "Copy Message Text",
        onClick: () => {
          navigator.clipboard.writeText(props.message.content ?? "");
        },
      },
      {
        label: "Copy ID",
        onClick: () => {
          navigator.clipboard.writeText(props.message.message_id);
        },
      },
    ],
  });
}
</script>
