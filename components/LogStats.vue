<template>
  <div class="font-sans2">
    <p>Average response time: {{ averageResponseTimeFormatted }}</p>
    <p>
      Average thread message length: {{ averageThreadMessageLength }} characters
    </p>
    <p>Message types:</p>
    <Pie
      :data="messageTypesChart"
      :options="{ responsive: false }"
      class="max-w-md"
    ></Pie>
  </div>
</template>

<script setup lang="ts">
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { ILogs } from "~/models/LogModel";

const props = defineProps<{
  log: ILogs;
}>();

let previousTimestamp: Date | undefined;
let totalResponseTime = 0;
let counted = 0;

let messageTypes: any = {};

let totalThreadMessageLength = 0;
let threadMessages = 0;
props.log.messages?.forEach((message) => {
  if (
    message.type === "thread_message" &&
    !previousTimestamp &&
    !message.author.mod
  ) {
    previousTimestamp = new Date(message.timestamp);
  } else if (
    message.type === "thread_message" &&
    previousTimestamp &&
    message.author.mod
  ) {
    totalResponseTime +=
      new Date(message.timestamp).getTime() - previousTimestamp.getTime();
    previousTimestamp = undefined;
    counted++;
  }

  const type =
    message.type === "thread_message" && message.author.mod
      ? "reply"
      : message.type;
  messageTypes[type] = (messageTypes[type] || 0) + 1;

  if (message.type === "thread_message") {
    totalThreadMessageLength += message.content?.length || 0;
    threadMessages++;
  }
});

const averageResponseTime = totalResponseTime / (counted || 1);
let averageResponseTimeFormatted: string;
if (averageResponseTime < 1000 * 60) {
  averageResponseTimeFormatted = `${(averageResponseTime / 1000).toFixed(
    2
  )} seconds`;
} else if (averageResponseTime < 1000 * 60 * 60) {
  averageResponseTimeFormatted = `${(averageResponseTime / 1000 / 60).toFixed(
    2
  )} minutes`;
} else {
  averageResponseTimeFormatted = `${(
    averageResponseTime /
    1000 /
    60 /
    60
  ).toFixed(2)} hours`;
}

const messageTypesRemapped: any = {
  reply: {
    label: "Staff",
    backgroundColor: "#A7F3D0",
  },
  thread_message: {
    label: "Recipient",
    backgroundColor: "#34D399",
  },
  anonymous: {
    label: "Anonymous reply",
    backgroundColor: "#FCD34D",
  },
  internal: {
    label: "Internal message",
    backgroundColor: "#FBBF24",
  },
  system: {
    label: "Note",
    backgroundColor: "#3B82F6",
  },
  close: {
    label: "Close message",
    backgroundColor: "#EF4444",
  },
};

ChartJS.register(ArcElement, Tooltip, Legend);
const messageTypesChart: any = {
  labels: Object.keys(messageTypes).map(
    (key) => messageTypesRemapped[key].label
  ),
  datasets: [
    {
      data: Object.values(messageTypes),
      backgroundColor: Object.keys(messageTypes).map(
        (key) => messageTypesRemapped[key].backgroundColor
      ),
    },
  ],
};

const averageThreadMessageLength = (
  totalThreadMessageLength / threadMessages
).toFixed(2);
</script>
