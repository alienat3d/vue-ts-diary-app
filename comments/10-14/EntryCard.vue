<script lang="ts" setup>
import Entry from "@/types/Entry";
import UseEmojis from "@/composables/UseEmojis";
import DateDisplay from "./DateDisplay.vue";
const { findEmoji } = UseEmojis();

// 9.1 Пропишем пропы самому компоненту с помощью метода "defineProps" (что называют "объявление во время выполнения кода" ("runtime declaration")), передав туда объект. Ещё мы хотим, чтобы комп. принимал пропы, которые отвечают требованиям interface "Entry". Но, когда мы указываем пропу "entry" тип "Entry", то TS ругается, потому, что interface это неподходящий структурный элемент для использования во время выполнения кода. Альтернативой является т.н. "объявление основанное на типе" ("type based declaration").
// 9.2 Мы используем дженерик и поместив в него объект, описывающий пропы, которые мы собираемся поддерживать этим компонентом.
// 9.3 Кстати, мы всё ещё можем использовать также и встроенные типы внутри, однако именно "type based declaration" предпочтителен, когда мы указываем типы во время выполнения кода. Мы также не можем использовать оба вида типизации.
/* defineProps({
  entry: { type: Entry },
}); */
// 9.4.0 Мы также могли бы объявить оба пропа вместе в interface.
/* interface Props {
  entry: Entry;
  someProp: string;
} */
defineProps<{
  entry: Entry;
}>();

// 9.4.1 И тогда поместить уже название interface в дженерик. Однако, также стоит помнить, что пойдя таким путём мы должны описывать interface для пропов в том же файле, где мы его хотим использовать и не может быть импортирован из-вне из-за ограничений работы компилятора.
// const props = defineProps<Props>();

// ? 9.5 Но есть и одна неприятная черта такого объявления пропов — отсутствие возможности задать значение пропов по умолчанию. Однако это можно обойти с помощью "Reactivity Transform". А выглядеть это будет так:
/* const { entry, someProp = "Default Value" } = defineProps<{
  entry: Entry;
  someProp: string;
}>(); */
</script>

<!-- 9.6 Пора переходить непосредственно к заполнению шаблона. -->
<!-- Go to [src\App.vue] -->
<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(entry.emoji)"></component>
      <div class="entry-text">{{ entry.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :date="entry.createdAt" class="mr-2" />
      |
      <span class="ml-2">alienat3d</span>
    </div>
  </div>
</template>
