<script lang="ts" setup>
import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Emoji from "@/types/Emojis";
import Entry from "@/types/Entry";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

// data
const MAX_CHARS = 280;
const body = ref("");
const emoji = ref<Emoji | null>(null);

// computed
const charCount = computed(() => body.value.length);
const maxCharsColor = computed<boolean>(
  () => charCount.value >= MAX_CHARS - 10,
);

// events
const emit = defineEmits<{
  (e: "@create", entry: Entry): void;
}>();

// methods
const handleTextInput = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement;

  if (textarea.value.length <= MAX_CHARS) {
    body.value = textarea.value;
  } else {
    body.value = textarea.value = textarea.value.substring(0, MAX_CHARS);
  }
};

const cleanUpForm = () => {
  body.value = "";
  emoji.value = null;
};

const handleSubmit = () => {
  emit("@create", {
    body: body.value,
    emoji: emoji.value,
    createdAt: new Date(),
    userId: 1,
    id: uuidv4(),
  });

  cleanUpForm();
};
</script>

<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea
      @keyup="handleTextInput"
      :value="body"
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
