<script lang="ts" setup>
import { computed, ref } from "vue";
import Emoji from "@/types/Emojis";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

const text = ref("");
const emoji = ref<Emoji | null>(null);

// * 3.0 Нам нужно отображать количество введённых пользователем знаков в сообщение, т.к. мы хотим ограничить его 280 символами. Мы могли бы добиться этого же напрямую через text.length, т.к. это реактивная реф-переменная, но для примера типизации computed-полей сделаем это через такое поле.
// 3.1.0 Если навести на "charCount", то мы увидим, что TS уже знает, что тип number, основываясь на результате, которое выдаёт это computed-поле. Поэтому совсем не обязательно указывать таким полям тип, ведь они уже работают с известными типами данных. Однако, мы всё же можем записать "computed<number>", если хотим проверить себя, что мы правильно напишем функцию, например, не забыв указать "length" после "value", с указанным явно типом TS будет в этом случае ругаться.
// ? 3.1.1 Возможно конкретный пример не так показателен относительно пользы такого подхода, но бывают более сложные примеры с двумя и более состояниями, тогда это может быть весьма полезным. ↓
const charCount = computed(() => text.value.length);
</script>
<template>
  <form class="entry-form" @submit.prevent>
    <textarea
      v-model="text"
      placeholder="New Journal Entry for alienat3d"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <!-- 3.2 А теперь всё таки укажем вместо хардкода наше computed-поле. -->
      <span>{{ charCount }} / 280</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
