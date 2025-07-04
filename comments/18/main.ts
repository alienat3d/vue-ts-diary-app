import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/base.css";
// 13.5 Хотя на самом деле пока мы только правильно типизировали глобальную переменную, но чтобы действительно её создать нам нужно ещё импортировать сюда либу "axios".
import axios from "axios";

// 13.6 Затем нужно поместить создание Vue-приложения в отдельную переменную "app". И уже её будем монтировать в вёрстку с помощью метода "mount".
// 13.7 Теперь перед монтированием мы можем поместить "axios" в глобальную переменную "$http" с помощью помещения её в "config.globalProperties".
// Go to []
// createApp(App).mount("#app");
const app = createApp(App);

app.config.globalProperties.$http = axios;

app.mount("#app");
