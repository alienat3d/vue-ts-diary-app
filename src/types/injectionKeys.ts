import { InjectionKey } from "vue";
import { User } from "./User";

export const userInjectionKey = Symbol() as InjectionKey<User>;
