<script lang="ts" setup>
import { computed, inject, onMounted, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Emoji from "@/types/Emojis";
import Entry from "@/types/Entry";
import { userInjectionKey } from "@/types/injectionKeys";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

// data
const MAX_CHARS = 280;
const body = ref("");
const emoji = ref<Emoji | null>(null);
const user = inject(userInjectionKey);

// * 10.0 Было бы неплохо сделать так, чтобы при загрузки нашего приложения происходила бы автоматическая фокусировка на textarea (мы могли бы сделать это и с помощью HTML атрибута, но нам нужно потренировать рефы шаблона). Итак создадим переменную реф "textarea". Используем дженерик для типизации в конкретный "HTML-элемент" или "null". "null" необходим здесь, т.к. элемент не будет существовать, пока его не подключат к DOM. ↓
// template refs
const textarea = ref<HTMLTextAreaElement | null>(null);

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

// 10.2 Осталось с помощью хука "onMounted" фокусироваться на textarea в момент подключения элемента к DOM.
onMounted(() => textarea.value?.focus());
</script>

<!-- 10.1 Далее, чтобы нам привязать эту переменную реф к элементу "textarea" мы добавим ему атрибут "ref" со значением в виде названия этой переменной. ↑ -->
<!-- 11.8 Нам нужно подставить никнейм пользователя в HTML-шаблон и сделаем мы это при помощи provide/inject метода, который только что рассмотрели. -->
<!-- 11.9 Также стоит учесть, что у нас может быть неавторизированный пользователь и для него нужно отображать "anonymous". -->
<!-- Go to [src\components\EntryCard.vue] -->
<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea
      @keyup="handleTextInput"
      ref="textarea"
      :value="body"
      :placeholder="`New Journal Entry for ${user?.username || 'anonymous'}`"
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
