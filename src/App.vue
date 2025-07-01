<script setup lang="ts">
import { User } from "./types/User";
import { reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";

// * 1.0 Если рассмотреть интерфейс приложения, то можно заметить, что там есть никнейм пользователя, как в плейсхолдере текста, так и внизу рядом с датой отправления сообщения. Представим, что эти данные к нам пришли от настоящего залогиненого пользователя. А данные этого пользователя находятся в реактивной переменной user компонента "App", в которой находится объект со свойствами "id" & "username".
// 1.1 Мы можем увидеть, что TS уже определил тип данных обоих свойств как числовой и строковый. Но, когда мы работаем со значениями, которые не могут быть на 100% определены как массив, то мы может подсказать сами их тип TS, используя указания типа.
// 1.2 Но для такого типа данных, как пользователь, наверное будет лучше всего использовать interface для описания типа этих данных и в нём описать все типы внутри этого объекта.
/* interface User {
  id: number;
  username: string;
  settings: string[];
} */

// 1.3 Теперь достаточно указать в качестве типа для user новый "User" interface. Теперь уже и подсказка типа для свойства settings избыточна.
// ? 1.4 Чтобы сделать interface более универсальными, лучше создать отдельную папку для типов и импортировать их оттуда. [src\types\User.ts]
const user: User = reactive({
  id: 1,
  username: "alienat3d",
  // settings: [] as string[],
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
