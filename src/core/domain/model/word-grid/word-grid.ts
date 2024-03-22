import { UserWord } from "../word/user-word";

export class WordGrid {
    public words: UserWord[] = [];
    public CurrentWordIndex: number = 0;

    public constructor(numberOfWords: number, wordLength: number) {
        for (let index = 0; index < numberOfWords; index++) {
            this.words.push(new UserWord(wordLength));
        }
    }

    public nextRow() {
        this.CurrentWordIndex += 1;
    }

    public get PreviousUserWord() {
        return this.CurrentWordIndex === 0 ? this.CurrentUserWord : this.words[this.CurrentWordIndex - 1];
    }

    public get CurrentUserWord() {
        return this.words[this.CurrentWordIndex]
    }
}