<script lang="ts" setup>
import { inject } from "vue";
import { userInjectionKey } from "@/types/injectionKeys";
import Entry from "@/types/Entry";
import UseEmojis from "@/composables/UseEmojis";
import DateDisplay from "./DateDisplay.vue";

const user = inject(userInjectionKey);

const { findEmoji } = UseEmojis();

defineProps<{
  entry: Entry;
}>();
</script>

<!-- 11.10 Нам нужно также добавить пользователя динамически в карточку записи. -->
<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(entry.emoji)"></component>
      <div class="entry-text">{{ entry.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :date="entry.createdAt" class="mr-2" />
      |
      <span class="ml-2">{{ user?.username || "anonymous" }}</span>
    </div>
  </div>
</template>
