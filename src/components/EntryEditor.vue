<script lang="ts" setup>
import { computed, ref } from "vue";
import Emoji from "@/types/Emojis";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

// ? 5.2 Для улучшения читабельности кода сгруппируем отдельные смысловые части и подпишем группы комментарием.
// data
const MAX_CHARS = 280;
const text = ref("");
const emoji = ref<Emoji | null>(null);

// computed
const charCount = computed(() => text.value.length);
const maxCharsColor = computed<boolean>(
  () => charCount.value >= MAX_CHARS - 10,
);

// 5.1 Нам также нужно зарегистрировать наше новое событие в секции "script" при помощи "defineEmits" метода.
// ? 5.3 Но как же работают кастомные события. Для рассмотрения этого механизма в подробностях перейдём в родит. комп.
// Go to [src\App.vue]
// 5.5 Мы могли бы сделать наши кастомные события более видимыми в коде, если добавим в начало какой-то символ, пусть им будет "@".
// * 6.0 На прошлом уроке мы уже зарегистрировали кастомное событие, но мы можем его улучшить указав ему тип, прописав внутри настройки. Мы укажем названия события для "evt", а также дадим произвольное имя для payload - "entry" и опишем подробно его содержимое. Чтобы описать несколько кастомных событий можно продублировать эту строчку в "{}" и описать новое.
// Go to [src\App.vue]
// events
// defineEmits(["@create"]);
defineEmits<{
  (e: "@create", entry: { text: string; emoji: Emoji | null }): void;
  // (e: "@someOtherEvent", payload: string): void;
}>();

// methods
const handleTextInput = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement;

  if (textarea.value.length <= MAX_CHARS) {
    text.value = textarea.value;
  } else {
    text.value = textarea.value = textarea.value.substring(0, MAX_CHARS);
  }
};
</script>

<!-- * 5.0 Теперь, когда мы подготовили функционал текста и эмодзи, пора создать кастомное событие "create" для передачи в род. комп., а в payload мы передадим данные из text & emoji. ↑ -->
<template>
  <form class="entry-form" @submit.prevent="$emit('@create', { text, emoji })">
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
