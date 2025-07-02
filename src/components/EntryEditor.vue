<script lang="ts" setup>
import { computed, ref } from "vue";
import Emoji from "@/types/Emojis";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

const MAX_CHARS = 280;
const text = ref("");
const emoji = ref<Emoji | null>(null);

const charCount = computed(() => text.value.length);

const maxCharsColor = computed<boolean>(
  () => charCount.value >= MAX_CHARS - 10,
);

const handleTextInput = (evt: Event) => {
  const textarea = evt.target as HTMLTextAreaElement;

  if (textarea.value.length <= MAX_CHARS) {
    text.value = textarea.value;
  } else {
    text.value = textarea.value = textarea.value.substring(0, MAX_CHARS);
    evt.preventDefault();
  }
};
</script>

<!-- * 5.0 -->
<template>
  <form class="entry-form" @submit.prevent>
    <textarea
      @keyup="handleTextInput"
      :value="text"
      placeholder="New Journal Entry for alienat3d"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span :class="maxCharsColor ? 'red-color' : ''">
        {{ charCount }} / {{ MAX_CHARS }}
      </span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>

<style scoped>
.red-color {
  color: rgb(219, 0, 0);
}
</style>
