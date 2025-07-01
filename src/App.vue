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

console.log(user);
</script>

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
