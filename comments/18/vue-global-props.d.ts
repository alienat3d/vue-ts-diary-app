import axios from "axios";

// 13.2 Что мы здесь делаем, так это расширяем API Vue с помощью declare module "vue". Потом мы используем interface ComponentCustomProperties для определения кастомных свойств. Мы определили кастомное свойство "$http" типа "axios". Это популярная либа для удобной работы с AJAX-запросами.
// Go to [tsconfig.app.json]
declare module "vue" {
  interface ComponentCustomProperties {
    $http: typeof axios;
  }
}
