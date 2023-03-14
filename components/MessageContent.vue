<template>
  <!-- discord uses white-space: pre-line in embeds hiding extra spacing -->
  <div class="break-all whitespace-pre-line">
    <render />
    <span v-if="message.edited" class="text-xs text-gray-700"> (edited)</span>
  </div>
</template>

<script setup lang="ts">
import { RuleTypesExtended } from "discord-markdown-parser";
import { type SingleASTNode } from "simple-markdown";

import { IMessage } from "~~/models/LogModel";
import DiscordLink from "./DiscordLink.vue";
import DiscordBold from "./DiscordBold.vue";
import DiscordUnderline from "./DiscordUnderline.vue";
import DiscordItalic from "./DiscordItalic.vue";
import DiscordStrikethrough from "./DiscordStrikethrough.vue";
import DiscordMention from "./DiscordMention.vue";
import DiscordInlineCode from "./DiscordInlineCode.vue";
import DiscordCodeBlock from "./DiscordCodeBlock.vue";
import DiscordQuote from "./DiscordQuote.vue";
import DiscordEmoji from "./DiscordEmoji.vue";
import DiscordTimestamp from "./DiscordTimestamp.vue";
import DiscordSpoiler from "./DiscordSpoiler.vue";

const props = defineProps<{
  message: IMessage;
}>();

const nodes = parseDiscordMarkdown(props.message.content ?? "");

const render = () => {
  return nodes.map((node) => {
    return getComponent(node);
  });
};

function getComponent(node: SingleASTNode) {
  if (!node) return null;
  const type = node.type as RuleTypesExtended;

  switch (type) {
    case "text":
      return h("span", node.content);
    case "link":
    case "url":
    case "autolink":
      return h(
        DiscordLink,
        {
          to: node.target,
        },
        () => node.content.map((n: SingleASTNode) => getComponent(n))
      );
    case "strong":
      return h(DiscordBold, { class: "font-bold" }, () =>
        node.content.map((n: SingleASTNode) => getComponent(n))
      );
    case "underline":
      return h(DiscordUnderline, { class: "underline" }, () =>
        node.content.map((n: SingleASTNode) => getComponent(n))
      );
    case "em":
      return h(DiscordItalic, () =>
        node.content.map((n: SingleASTNode) => getComponent(n))
      );
    case "strikethrough":
      return h(DiscordStrikethrough, () =>
        node.content.map((n: SingleASTNode) => getComponent(n))
      );
    case "here":
    case "everyone":
      return h(DiscordMention, () => "@" + type);
    case "channel":
      return h(DiscordMention, () => `<#${node.id}>`);
    case "role":
      return h(DiscordMention, () => `<@&${node.id}>`);
    case "user":
      return h(DiscordMention, () => `<@${node.id}>`);
    case "inlineCode":
      return h(DiscordInlineCode, () => node.content);
    case "codeBlock":
      return h(DiscordCodeBlock, {
        language: node.lang,
        content: node.content,
      });
    case "blockQuote":
      return h(DiscordQuote, () =>
        node.content.map((n: SingleASTNode) => getComponent(n))
      );
    case "br":
    case "newline":
      return h("br");
    case "emoji":
    case "twemoji":
      return h(DiscordEmoji, { emoji: node });
    case "timestamp":
      return h(DiscordTimestamp, { timestamp: node });
    case "spoiler":
      return h(DiscordSpoiler, () =>
        node.content.map((n: SingleASTNode) => getComponent(n))
      );
    default:
      return h("span", "NOT IMPLEMENTED YET: " + type);
  }
}
</script>
