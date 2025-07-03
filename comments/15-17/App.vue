<script setup lang="ts">
import { provide, reactive } from "vue";
import { User } from "./types/User";
import Entry from "./types/Entry";
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "@/components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import { userInjectionKey } from "./types/injectionKeys";

// * 11.0 Настало время сделать доступным объект "user" и заодно рассмотреть в деталях работу с provide/inject функциями Vue. Для начала нам нужно импортировать встроенный во вью спец. тип "InjectionKey". Этот interface может быть использован для синхронизации вставляемого значения между отдающим комп. и принимающим.
// 11.1 Для начала создадим символ, чтобы удостовериться, что ключ вставляемых данных уникален. Используя подсказку типа мы укажем, что это тип "InjectionKey" с аргументом interface "User".
// const userInjectionKey = Symbol() as InjectionKey<User>;

const user: User = reactive({
  id: 1,
  username: "alienat3d",
  settings: [],
});

// 11.2 Затем мы используем функцию "provide", чтобы предоставить доступ к объекту "user" всем дочерним компонентам компонента "App" (что есть все комп. проекта, т.к. App является корневым). Первый аргументом будет идти как раз этот ключ вставки данных, а вторым сам объект с данными.
provide(userInjectionKey, user);

// 11.3 Затем, в любом дочернем компоненте компонента App мы теперь можем вызвать функцию "inject" вместе с ключом, чтобы иметь доступ к объекту "user". Но, чтобы сделать ключ доступным между различными компонентами, мы должны определить и экспортировать его из отдельного файла.
// Go to [src\types\injectionKeys.ts]
// 11.4 Итак, какой бы комп. нам испытать, куда вставить объект user? Как насчёт "EmojiField", т.к. он является глубоко зарытым в структуре компонентом, являющимся не прямым дочерним "App", а дочерним "EntryEditor"
// Go to [src\components\EmojiField.vue]
// const injectedUser = inject(userInjectionKey, user);

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
