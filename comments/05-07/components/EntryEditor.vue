<script lang="ts" setup>
import { ref } from "vue";
import Emoji from "@/types/Emojis";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

// * 2.0.0 На прошлом уроке мы рассмотрели работу с реактивной переменной в которую помещают массивы и объекты ("reactive"), но у нас также есть ещё "ref" для других типов данных. Итак, создадим реактивную переменную ref.
// 2.0.2 В данном случае TS сам смог определить тип данных и, в целом, лучше воздержаться указания типа там, где это действительно требуется, т.к. это увеличивает количество кода и только затруднит его прочтения. А так это понятно и так, что реактивная переменная с кавычками валидный тип данных для текста.
const text = ref("");

// 2.1.0 Однако есть случаи, когда и для рефа нужно указать конкретный тип данных. Возьмём для примера ещё одну реф-переменную для поля эмодзи.
// 2.1.3 Здесь удобно будет использовать "union types" для лимитирования возможных значений, которые должны попадать в эту переменную-реф.
// 2.1.4 Также и в папке types создадим ещё один файл, где будут содержаться в виде "union types" все названия наших SVG-иконок.
// Go to [src\types\Emojis.ts]
// 2.1.5 После того, как мы описали все опции, то подставим этот файл типов в качестве типа для emoji. Теперь при наведении на тип "Emoji" мы можем быстро узнать все виды эмодзи, которые у нас есть, что само по себе очень удобно.
// 2.1.6 Чтобы определить emoji как тип Emoji реактивная переменная запишем Ref<Emoji | null>, либо мы можем использовать дженерик на ref, тогда не придётся импортировать тип Ref.
// const emoji: Ref<Emoji | null> = ref(null);
const emoji = ref<Emoji | null>(null);

// 2.1.7 Теперь IDE не только поможет нам перечислив все возможные названия для эмодзи в выпадающем контекстном списке, но и подчеркнёт красным, если попытаемся записать значением что-то, что не находится в списке типа "Emoji" или не является null.
emoji.value = null;
</script>
<template>
  <form class="entry-form" @submit.prevent>
    <!-- 2.0.1 Затем мы привяжем textarea с переменной ref при помощи "v-model". -->
    <textarea
      v-model="text"
      placeholder="New Journal Entry for danielkelly_io"
    ></textarea>
    <!-- 2.1.1 Привяжем комп. EmojiField к переменной-реф с помощью v-model. -->
    <!-- 2.1.2 Итак, пару слов как работает этот компонент: в "./assets/icons/emojis/" есть ряд SVG-картинок с различными эмодзи, которые называются "...-emoji.svg", и по этому префиксу комп будет определять какую картинку использовать с помощью переменной-реф emoji, куда будет попадать префикс выбранной эмодзи. Т.е. в них всегда будет содержаться лишь одна из этих эмодзи. ↑ -->
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>0 / 280</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
