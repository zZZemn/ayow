import type { User } from "./User";
import type { Word } from "./Word";

export interface DailyWord {
    id: string;
    userId: string;
    wordId: string;
    createdAt: string;

    user?: User;
    word?: Word;
}
