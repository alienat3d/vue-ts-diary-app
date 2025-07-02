<script setup lang="ts">
import { User } from "./types/User";
import { reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";

const user: User = reactive({
  id: 1,
  username: "alienat3d",
  settings: [],
});
</script>

<!-- ? 5.4 Когда мы начнём писать Vue-директиву "v-on" (сокр. @), то увидим целый длинный список разнообразных событий. Среди них также появился наш новый "create". Однако, если мы попытаемся найти "create" на другом компоненте, то увидим, что автозаполнение не работает, т.к. мы его там не регистрировали. -->
<!-- Go to [src\components\EntryEditor.vue] -->
<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor />
    <ul>
      <li>
        <EntryCard />
      </li>
    </ul>
  </main>
</template>
