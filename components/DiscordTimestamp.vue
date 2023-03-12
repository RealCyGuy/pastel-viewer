<template>
  <VMenu class="inline-block" theme="custom-tooltip">
    <span class="rounded bg-gray-200 px-0.5">{{ formattedDate }}</span>
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
  </VMenu>
</template>

<script setup lang="ts">
import { type SingleASTNode } from "simple-markdown";

const props = defineProps<{
  timestamp: SingleASTNode;
}>();

const date = new Date(parseInt(props.timestamp.timestamp) * 1000);
const formattedDate = ref("");

const format: "t" | "T" | "f" | "F" | "d" | "D" | "R" = props.timestamp.format;

const DATE_TYPE_FORMATS = {
  t: { timeStyle: "short" },
  T: { timeStyle: "medium" },
  d: { dateStyle: "short" },
  D: { dateStyle: "long" },
  f: { dateStyle: "long", timeStyle: "short" },
  F: { dateStyle: "full", timeStyle: "short" },
  R: { style: "long", numeric: "auto" },
} as const;

const RELATIVE_DATE_CONVERSION = {
  60000: ["second", 1000],
  3600000: ["minute", 60000],
  86400000: ["hour", 3600000],
  604800000: ["day", 86400000],
  2419200000: ["week", 604800000],
  29030400000: ["month", 2419200000],
  290304000000: ["year", 29030400000],
} as const;

function formatRelativeDate(time: string, difference: number): string {
  if (difference < 0) {
    return `in ${time}`;
  } else {
    return `${time} ago`;
  }
}

function getRelativeDate(date: Date): [string, number] {
  const difference = Date.now() - date.getTime();
  const diffAbsolute = Math.abs(difference);

  if (diffAbsolute < 5000) {
    return ["Just now", 1000];
  }

  for (const [time, [unit, per]] of Object.entries(RELATIVE_DATE_CONVERSION)) {
    if (diffAbsolute < Number(time)) {
      const amount = Math.round(diffAbsolute / per);

      return [
        formatRelativeDate(
          `${amount} ${unit}${amount === 1 ? "" : "s"}`,
          difference
        ),
        unit === "second" ? 1000 : 60 * 1000,
      ];
    }
  }

  return [
    formatRelativeDate(
      `${Math.floor(diffAbsolute / 290304000000)} years`,
      difference
    ),
    -1,
  ];
}

if (props.timestamp.format === "R") {
  const [relative, interval] = getRelativeDate(date);
  formattedDate.value = relative;
} else {
  formattedDate.value = date
    .toLocaleString(
      undefined,
      DATE_TYPE_FORMATS[format] as Intl.DateTimeFormatOptions
    )
    .replace("at ", "");
}

let intervalId: number | undefined;

function updateRelativeDate() {
  const [relative, interval] = getRelativeDate(date);
  formattedDate.value = relative;

  if (interval !== -1) {
    window.clearInterval(intervalId);
    intervalId = window.setInterval(updateRelativeDate, interval);
  }
}

onMounted(() => {
  if (props.timestamp.format === "R") {
    updateRelativeDate();
  }
});
</script>
