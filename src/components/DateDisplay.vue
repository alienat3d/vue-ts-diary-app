<!-- * 12.0 Экскурс в "TypeScript with Vue" был бы не полным без рассмотрения применения с Options API. Так что рассмотрим также и эту опцию на примере комп. "DateDisplay", который как раз таки написан на более старом Options API. -->
<script lang="ts">
// @ts-ignore this works fine
// import Entry from "@/types/Entry";
import { formatRelative } from "date-fns";
import { defineComponent, PropType } from "vue";

// 12.1 Обратим также внимание, что теперь мы определяем настройки компонента внутри функции "defineComponent", которая позволяет корректно выводить типы для компонентов.
export default defineComponent({
  // 12.2.1 Однако, если мы хотим указать тип более специфично, например импортировав сюда тип Entry, то мы не можем это просто так сделать, т.к. это объявление пропов во время выполнения кода. Но мы можем указать тип пропа как Object и использовать PropType, чтобы уточнить тип. ↓
  props: {
    date: { type: Date, required: true },
    // date: { type: Object as PropType<Entry>, required: true },
  },
  // 12.3 Если навести на "formatted", то TS определит это методом, который возвращает строку. Это правда. ↓
  // 12.6 Но, если мы хотим явно указать computed-полю тип, то можно сделать это через типизацию результата.
  computed: {
    formatted(): string {
      // @ts-ignore this works fine
      return formatRelative(this.date, Date.now());
    },
  },
  // 12.7 Помимо пропов и computed-полей мы можем определять тип и для событий, используя секцию "emits", в этой секции каждое событие это функция, а их аргументы это событийная "полезная нагрузка" (или payload). Типизация payload это как типизация других аргументов функций.
  // 12.8 Если же на нужно выполнить какую-то валидацию во время выполнения кода, то можно сделать это внутри этой функции.
  // 12.9 Либо же, если нам нужна только валидация TypeScript на этапе создания, то можно просто вернуть true.
  // Go to [src\components\EntryCard.vue]
  /* emits: {
    doSomething(payload: Entry) {
      // return payload.body && payload.createdAt;
      return true;
    },
  }, */
  // 12.2.0 Добавим также хук "mounted", чтобы рассмотреть детально типы выводимых пропов и computed-полей. Если навести на "this.date", то мы увидим тип, указанный выше в секции props.
  // 12.2.2 Теперь, если навести на "date", то мы увидим, что его тип поменялся на Entry.
  // 12.4 Если навести на "this.formatted", то мы также увидим, что и тут он определил как строку.
  /* mounted() {
    this.date;
    this.formatted;
  }, */
});
</script>

<!-- 12.5 Если навести на "formatted" здесь, то и здесь правильно определится строка. -->
<template>
  <div>{{ formatted }}</div>
</template>
