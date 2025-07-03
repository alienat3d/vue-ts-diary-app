<script lang="ts" setup>
import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Emoji from "@/types/Emojis";
import Entry from "@/types/Entry";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

// ? 5.2 Для улучшения читабельности кода сгруппируем отдельные смысловые части и подпишем группы комментарием.
// data
const MAX_CHARS = 280;
// 7.8 Поменяем также здесь "text" на "body", чтобы придерживаться одной стилистики, а также при помощи TS починим все места ниже в коде, где это будет нужно после этого изменения.
// const text = ref("");
const body = ref("");
const emoji = ref<Emoji | null>(null);

// computed
const charCount = computed(() => body.value.length);
const maxCharsColor = computed<boolean>(
  () => charCount.value >= MAX_CHARS - 10,
);

// 5.1 Нам также нужно зарегистрировать наше новое событие в секции "script" при помощи "defineEmits" метода.
// ? 5.3 Но как же работают кастомные события. Для рассмотрения этого механизма в подробностях перейдём в родит. комп.
// Go to [src\App.vue]
// 5.5 Мы могли бы сделать наши кастомные события более видимыми в коде, если добавим в начало какой-то символ, пусть им будет "@".
// * 6.0 На прошлом уроке мы уже зарегистрировали кастомное событие, но мы можем его улучшить указав ему тип, прописав внутри настройки. Мы укажем названия события для "evt", а также дадим произвольное имя для payload - "entry" и опишем подробно его содержимое. Чтобы описать несколько кастомных событий можно продублировать эту строчку в "{}" и описать новое.
// Go to [src\App.vue]
// 7.5 Теперь мы используем новый interface "Entry", вместо типизацией объектом, как делали до того. ↓
// 8.1 Итак, начнём с рефакторинга кастомного события, мы можем поместить его регистрацию в переменную для доступа к ней.
// events
// defineEmits(["@create"]);
const emit = defineEmits<{
  // (e: "@create", entry: { text: string; emoji: Emoji | null }): void;
  (e: "@create", entry: Entry): void;
  // (e: "@someOtherEvent", payload: string): void;
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

// 8.4.0 Также создадим функцию, которая будет возвращать "body" & "emoji" на исходные значения после создания записи.
const cleanUpForm = () => {
  body.value = "";
  emoji.value = null;
};

// * 8.0 В качестве ДЗ создадим метод, который будет очищать введённый текст и сбрасывать выбранный эмодзи после отправки записи, также произведём рефакторинг кастомного события и подключим либу "uuid" для генерации случайных чисел для "id" записей. ↑
// 8.2 Создадим новый метод для сохранения записи "handleSubmit". Куда мы перенесём $emit функцию из вёрстки, но переименуем её уже в "emit" (без $, как было в вёрстке).
// 8.3 Теперь у нас появились некоторые ошибки в свойства "body" & "emoji". Дело в том, что в секции "script" рефы больше не распаковываются автоматически, т.ч. нам нужно добавлять им ".value" для корректной работы. Кстати, и здесь нам помог снова TypeScript, ругаясь на ошибки, без него можно было вполне их пропустить. ↑
// 8.4.1 Которую будем вызывать в конце выполнения функции "handleSubmit".
// 8.5 Также, можно заметить, что мы уже добавили автоматическую генерацию случайного хеша для поля "id" с помощью библиотеки "uuid".
// Go to [src\App.vue]
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

<!-- * 5.0 Теперь, когда мы подготовили функционал текста и эмодзи, пора создать кастомное событие "create" для передачи в род. комп., а в payload мы передадим данные из text & emoji. ↑ -->
<!-- 7.6 Теперь нам нужно также починить свойство "text", т.к. в interface мы его переименовали в "body". Ок, мы можем присвоить "text" "body", однако TS продолжает ругаться, потому, что не хватает ещё некоторых свойств, что мы добавили в interface: "id", "createdAt", "userId". "createdAt" - это текущее время и дата. "userId" пока пропишем хардкодом. "id" будет случайным числом (в настоящем веб-приложении недостаточно просто использовать "Math.random()", а обычно используют какую-то либу вроде "uuid", например). -->
<!-- ? 7.7 По моему это просто прекрасно как TS помогает разобраться с ошибками, не прибегая к тому, чтобы открывать браузер и углубляться в ошибки в консоли. Но и это ещё не всё, чем он может быть полезен при рефакторинге. Если мы в поиске наберём "Errors" и найдём View: Focus Problems (Errors, Warnings, Infos) то откроется вкладка проблем, где мы увидим также, что родительский элемент [src\App.vue] также требует корректировки. ↑ -->
<!-- Go to [src\App.vue] -->
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
