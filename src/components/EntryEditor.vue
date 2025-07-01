<script lang="ts" setup>
import { ref } from "vue";
import Emoji from "@/types/Emojis";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

const text = ref("");
const emoji = ref<Emoji | null>(null);
</script>
<template>
  <form class="entry-form" @submit.prevent>
    <textarea
      v-model="text"
      placeholder="New Journal Entry for alienat3d"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>0 / 280</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
