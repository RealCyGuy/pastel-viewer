<template>
  <!-- sticky top-0 -->
  <header
    class="bg-white w-full text-center py-5 shadow-md z-30 flex justify-center gap-4"
  >
    <img
      class="h-14 w-14 rounded-full"
      :src="data.recipient.avatar_url"
      alt=""
    />
    <div class="flex flex-col justify-center items-start font-sans2">
      <h1 class="text-xl font-semibold">
        Modmail logs ({{ data.open ? "open" : "closed" }})
      </h1>
      <UserName :user="data.recipient" theme="custom-tooltip-higher" />
    </div>
  </header>
  <div class="mx-2 sm:mx-12 md:mx-24 lg:mx-48">
    <SectionTitle>Details</SectionTitle>
    <div class="font-sans2">
      <div>
        Id: <span class="select-all">{{ route.params.id }}</span>
      </div>
      <div>Opened: <FormattedDate :date="new Date(data.created_at)" /></div>
      <div v-if="!data.open">
        Closed:
        <FormattedDate :date="new Date(data.closed_at)"></FormattedDate>
      </div>
      <div>
        {{ messageAmount }} thread message{{ messageAmount == 1 ? "" : "s" }},
        {{ data.messages.length }} total message{{
          data.messages.length == 1 ? "" : "s"
        }}
      </div>
    </div>
    <SectionTitle>Messages</SectionTitle>
    <Messages :messages="data.messages" />
    <!-- <SectionTitle>Stats</SectionTitle>
    <p>some stats</p> -->
  </div>
</template>

<script setup lang="ts">
import { HydratedDocument } from "mongoose";

import { ILogs, IMessage } from "~/models/LogModel";

const route = useRoute();
const data: HydratedDocument<ILogs> = await $fetch(
  "/api/logs/" + route.params.id
);

if (!data.open) {
  const closeMessage = {
    author: data.closer,
    content: data.close_message,
    timestamp: data.closed_at,
    type: "close",
    message_id: "close",
  } as IMessage;
  data.messages.push(closeMessage);
}

const messageAmount = data.messages.filter(
  (message) => !["internal", "system", "close"].includes(message.type)
).length;

useServerSeoMeta({
  title: `pastel-viewer | ${route.params.id}`,
  description: `Modmail logs (${data.open ? "open" : "closed"}) for ${
    data.recipient.name
  }#${data.recipient.discriminator}. There ${
    messageAmount == 1 ? "is" : "are"
  } ${messageAmount} message${messageAmount == 1 ? "" : "s"}.`,
  ogImage: data.recipient.avatar_url,
});
</script>
