<script lang="ts">
// @ts-ignore this works fine
import { formatRelative } from "date-fns";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    date: { type: Date, required: true },
  },
  computed: {
    formatted(): string {
      // @ts-ignore this works fine
      return formatRelative(this.date, Date.now());
    },
  },
  // * 13.0 Иногда бывает полезно создать переменную, доступную глобально во всём приложении. Например, может быть "$http" свойство для выполнения AJAX запросов. Мы можем создавать такие глобальные свойства во Vue с помощью interface "ComponentCustomProperties".
  // 13.1 Нам также нужно создать спец. файл типов в корне [vue-global-props.d.ts]. Причём не важно как он называется, мы всего лишь назвали его так, чтобы название было понятным, главное же здесь — ".d.ts".
  // Go to [vue-global-props.d.ts]
  // 13.4 Теперь ошибка пропала и глоб. переменная "$http" имеет тип "Axios Static".
  // Go to [src\main.ts]
  // 13.8 Убедимся через Dev Tools, что теперь Axios работает и запросы отправляются после чего можно её удалить, ведь она нам тут на самом деле не нужна и была использована лишь для примера.
  // ? 13.9 В реальных проектах глобальные переменные не так уж часто применяются, однако сторонние библиотеки их частенько используют, поэтому эти знания не будут лишними.
  mounted() {
    // this.$http("https://zapl.in");
  },
});
</script>
<template>
  <div>{{ formatted }}</div>
</template>
