<script setup lang="ts">
import { reactive } from "vue";
import { User } from "./types/User";
import Entry from "./types/Entry";
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "@/components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";

const user: User = reactive({
  id: 1,
  username: "alienat3d",
  settings: [],
});

const entries: Entry[] = reactive([]);

const handleCreateEntry = (entry: Entry) => {
  entries.unshift(entry);
};
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create="handleCreateEntry" />
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard :entry="entry" />
      </li>
    </ul>
  </main>
</template>
