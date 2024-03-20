import { UserWord } from "../word/user-word";

export class WordGrid {
    public words: UserWord[] = [];
    public currentWordIndex: number = 0;

    public constructor(numberOfWords: number, wordLength: number) {
        this.words = new Array<UserWord>(numberOfWords).fill(new UserWord(wordLength))
    }

    public get CurrentUserWord() {
        return this.words[this.currentWordIndex]
    }
}