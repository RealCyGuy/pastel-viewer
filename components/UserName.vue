<template>
  <VMenu class="inline-block" :theme="theme">
    <span class="select-all">{{ user.name }}#{{ user.discriminator }}</span>
    <template #popper>
      <span class="select-all">{{ user.id }}</span>
    </template>
  </VMenu>
</template>

<script setup lang="ts">
import { IUser } from "~/models/LogModel";

// defineProps<{
//   user: IUser;
//   style?: string;
// }>();

interface Props {
  user: IUser;
  theme?: string;
}

withDefaults(defineProps<Props>(), {
  theme: "custom-tooltip",
});
</script>
