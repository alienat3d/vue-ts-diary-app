import Emoji from "./Emojis";

// 7.1 Внутрь у нас будут помещаться типы text и emoji, также для emoji следует импортировать уже созданный ранее тип Emoji.
// 7.2 Также название "text" выглядит слегка непонятным, поэтому переименуем его в "body".
// 7.3 И, раз уж мы хотим отображать дату каждого сообщение, то добавим и свойство "createdAt".
// 7.4 А ещё в настоящем веб-приложении у данных обычно есть "userId", чтобы привязать данные к конкретному пользователю, которых их создал, а также "id" самой записи.
// Go to [src\components\EntryEditor.vue]
export default interface Entry {
  id: string;
  body: string;
  emoji: Emoji | null;
  createdAt: Date;
  userId: number;
}
