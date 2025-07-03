<script setup lang="ts">
import { User } from "./types/User";
import { reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "@/components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import Entry from "./types/Entry";

const user: User = reactive({
  id: 1,
  username: "alienat3d",
  settings: [],
});

// 6.1.1 Доступ к передаваемым событием данным из payload мы можем получить через спец. переменную "$event".
// * 7.0 На этом уроке займёмся рефакторингом и улучшим все случаи, где мы пока использовали в качестве типа именованный объект, чтобы определить запись "entry" журнала. А заодно мы сможем получить представление как TS может быть полезен в рефакторинге, помогая не забывать изменять при этом определённые элементы. Итак для этого создадим ещё один файл с interface.
// Go to [src\types\Entry.ts]
// 7.8 Здесь мы также заменим типизацию через объект на новый interface.
// const handleCreateEntry = (entry: { text: string; emoji: Emoji | null }) => {
const handleCreateEntry = (entry: Entry) => {
  console.log(entry);
};
</script>

<!-- ? 5.4 Когда мы начнём писать Vue-директиву "v-on" (сокр. @), то увидим целый длинный список разнообразных событий. Среди них также появился наш новый "create". Однако, если мы попытаемся найти "create" на другом компоненте, то увидим, что автозаполнение не работает, т.к. мы его там не регистрировали. -->
<!-- Go to [src\components\EntryEditor.vue] -->
<!-- 6.1.0 Наступило время применить кастомное событие "@create" здесь. Мы будем слушать это событие, т.е. сигнал, отправляемый дочерним комп. родительскому по событию submit, при сохранении формы, и тогда будет вызываться функция "handleCreateEntry". ↑ -->
<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create="handleCreateEntry" />
    <ul>
      <li>
        <EntryCard />
      </li>
    </ul>
  </main>
</template>
