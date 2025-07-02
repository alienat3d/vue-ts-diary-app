<script setup lang="ts">
import { User } from "./types/User";
import Emoji from "./types/Emojis";
import { reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "@/components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";

const user: User = reactive({
  id: 1,
  username: "alienat3d",
  settings: [],
});

// 6.1.1 Доступ к передаваемым событием данным из payload мы можем получить через спец. переменную "$event"
const handleCreateEntry = (entry: { text: string; emoji: Emoji | null }) => {
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
