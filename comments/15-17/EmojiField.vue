<script lang="ts" setup>
// import { inject } from "vue";
// import { userInjectionKey } from "@/types/injectionKeys";
import UseEmojis from "@/composables/UseEmojis";

const { emojis } = UseEmojis();

// 11.5 Мы вставим объект user, при помощи метода "inject", в который помещается "userInjectionKey". Обратим внимание на то, что TS смог корректно определить тип как "User", хотя это реактивные данные из совершенно другого компонента. Однако он может быть в некоторых случаях также "undefined".
// const injectedUser = inject(userInjectionKey);

defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<!-- ? 11.6 Таким образом мы смогли передать данные в глубоко расположенный недочерний комп. без использования пропов. Ну и TS автоматически подставил "?", учитывая, что данные могли не прийти и эти данные опциональны, чтобы не вызывать ошибок. -->
<!-- 11.7 Ладно, это был лишь эксперимент на случайном глубоко расположенном комп., а теперь непосредственно к тому месту, где нам действительно нужны данные из объекта "user". -->
<!-- Go to [src\components\EntryEditor.vue] -->
<template>
  <div class="emoji-container">
    <!-- {{ injectedUser?.username }} -->
    <component
      v-for="emoji in emojis"
      :is="emoji.component"
      :key="emoji.name"
      :class="{ selected: modelValue === emoji.name }"
      @click="
        $emit(
          'update:modelValue',
          emoji.name === modelValue ? null : emoji.name,
        )
      "
    ></component>
  </div>
</template>
