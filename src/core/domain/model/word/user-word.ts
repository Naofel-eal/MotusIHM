import { CorrectLetter } from "../letter/correct-letter";
import { EmptyLetter } from "../letter/empty-letter";
import { Letter } from "../letter/letter";
import { LetterUtils } from "../letter/utils/letter-utils";

export class UserWord {
    public letters: Letter[] = [];

    public constructor(size: number) {
        this.letters = new Array<Letter>(size).fill(new EmptyLetter());
    }

    public get length(): number {
        return this.letters.length;
    }

    public get value(): string {
        return this.letters.map(letter => letter.value).join('');
    }

    public get currentLetterIndex(): number {
        return this.letters.findIndex(l => l.value === '');
    }

    public get lastLetterIndex(): number {
        let length = this.letters.length ;
        while(length--) {
            if (!LetterUtils.isEmptyLetter(this.letters[length]) && LetterUtils.isPendingLetter(this.letters[length])) {
                return length;
            }
        }
        return -1;
    }

    public get isComplete(): boolean {
        return this.letters.every(letter => !LetterUtils.isEmptyLetter(letter));
    }

    public get isEmpty(): boolean {
        return this.letters.every(letter => LetterUtils.isEmptyLetter(letter));
    }

    public get isFirstLetterEmpty(): boolean {
        return LetterUtils.isEmptyLetter(this.letters[0]);
    }

    public getLetterByIndex(index: number): Letter {
        return this.letters[index];
    }

    public setLetterByIndex(index: number, letter: Letter) {
        if (index >= this.letters.length) {
            throw new Error('Index out of bounds');
        }
        else {
            this.letters[index] = letter;
        }
    }

    public addLetter(letter: Letter): void {
        const index: number = this.letters.findIndex(l => LetterUtils.isEmptyLetter(l));
        this.letters[index] = letter;
    }

    public removeLetter(): void {
        if (!this.isEmpty && !this.isFirstLetterEmpty) {
            const index: number = this.lastLetterIndex;
            if (index !== -1) {
                this.letters[index] = new EmptyLetter();
            }
        }
    }

    public clear() {
        for (let i = 0; i < this.letters.length; i++) {
            if(!(this.letters[i] instanceof CorrectLetter))
                this.letters[i] = new EmptyLetter();
        }
    }
}