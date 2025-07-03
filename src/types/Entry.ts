import Emoji from "./Emojis";

export default interface Entry {
  id: string;
  body: string;
  emoji: Emoji | null;
  createdAt: Date;
  userId: number;
}
