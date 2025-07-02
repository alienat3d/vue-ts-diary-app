<script lang="ts" setup>
import { computed, ref } from "vue";
import Emoji from "@/types/Emojis";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

// 4.4.0 Также, для порядка, следует вынести максимальное количество знаков в отдельную переменную, чтобы было удобно менять это число, если понадобится. И уже maxChars мы будем подставлять в функцию. ↓
const MAX_CHARS = 280;
const text = ref("");
const emoji = ref<Emoji | null>(null);

// * 3.0 Нам нужно отображать количество введённых пользователем знаков в сообщение, т.к. мы хотим ограничить его 280 символами. Мы могли бы добиться этого же напрямую через text.length, т.к. это реактивная реф-переменная, но для примера типизации computed-полей сделаем это через такое поле.
// 3.1.0 Если навести на "charCount", то мы увидим, что TS уже знает, что тип number, основываясь на результате, которое выдаёт это computed-поле. Поэтому совсем не обязательно указывать таким полям тип, ведь они уже работают с известными типами данных. Однако, мы всё же можем записать "computed<number>", если хотим проверить себя, что мы правильно напишем функцию, например, не забыв указать "length" после "value", с указанным явно типом TS будет в этом случае ругаться.
// ? 3.1.1 Возможно конкретный пример не так показателен относительно пользы такого подхода, но бывают более сложные примеры с двумя и более состояниями, тогда это может быть весьма полезным. ↓
const charCount = computed(() => text.value.length);

// ? Создадим ещё одно computed-поле, чтобы окрашивать в красный значения счётчика символов, когда он приближается к максимуму.
const maxCharsColor = computed<boolean>(
  () => charCount.value >= MAX_CHARS - 10,
);

// 4.1 Эта функция будет принимать аргументом события. Для событий в TS есть особый тип "Event", который мы здесь и применим.
// Go to [tsconfig.app.json]
// 4.2 Далее получим доступ к элементу textarea черед свойство "target". Когда мы наведём на переменную, куда он будет сохраняться, то там будет "EventTarget", однако мы можем добавить специфичности и, используя подсказку типа, определить его как "HTMLTextAreaElement". А значит, когда мы будем работать с textarea, то IDE сможет правильно использовать автозаполнение.
// 4.3 Теперь, когда всё правильно типизировано перейдём непосредственно к ограничению ввода поста 280-мя символами при помощи условия. И пока значение textarea не превышает 280 знаков, реактивной переменной text будет присваиваться всё, что попадает в textarea, т.е. текстовые данные в элементе textarea. Иначе text мы присвоим первые 280 введённых знаков в textarea. Теперь любой текст, который будет превышать длину в 280 знаков будет обрезаться.

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

<!-- * 4.0.1 На этом уроке мы ограничив ввод поста до 280 символов. Для начала мы заменим у элемента "textarea" атрибут `v-model="text"` на `:value="text"`. -->
<!-- 4.0.2 Затем мы будем обрабатывать ввод с клавиатуры при помощи "keyup" события и функции "handleTextInput". ↑ -->
<template>
  <form class="entry-form" @submit.prevent>
    <!-- ? 4.5 Кстати, надо наверное ещё отметить, что есть атрибут "maxlength", который тоже может сделать всё тоже самое, что мы проделали с помощью JS, но проще и компактнее, однако целью было научиться типизировать события и потренироваться. -->
    <textarea
      @keyup="handleTextInput"
      :value="text"
      placeholder="New Journal Entry for alienat3d"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <!-- 3.2 А теперь всё таки укажем вместо хардкода наше computed-поле. -->
      <!-- 4.4.1 И заодно используем эту переменную в обозначении макс. кол-ва знаков. -->
      <span :class="maxCharsColor ? 'dark-red' : ''"
        >{{ charCount }} / {{ MAX_CHARS }}</span
      >
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>

<style scoped>
.dark-red {
  color: rgb(219, 0, 0);
}
</style>
