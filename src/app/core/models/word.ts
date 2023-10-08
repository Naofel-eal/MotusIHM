import { LetterUtils } from "../utils/letter-utils";
import { EmptyLetter } from "./letter/empty-letter";
import { Letter } from "./letter/letter.model";

export class Word {
    public letters: Letter[] = [];

    public constructor(size: number) {
        for (let i = 0; i < size; i++) {
            this.letters.push(new EmptyLetter());
        }
    }

    public get length(): number {
        return this.letters.length;
    }

    public get value(): string {
        return this.letters.map(letter => letter.value).join('');
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

    public isComplete(): boolean {
        return this.letters.every(letter => letter.value !== '');
    }

    public isEmpty(): boolean {
        return this.letters.every(letter => LetterUtils.isEmptyLetter(letter));
    }

    public isFirstLetterEmpty(): boolean {
        return LetterUtils.isEmptyLetter(this.letters[0]);
    }

    public addLetter(letter: Letter): void {
        const index: number = this.letters.findIndex(l => LetterUtils.isEmptyLetter(l));
        this.letters[index] = letter;
    }

    public removeLetter(): void {
        if (!this.isEmpty() && !this.isFirstLetterEmpty()) {
            const index: number = this.findLastLetterIndex();
            if (index !== -1) {
                this.letters[index] = new EmptyLetter();
            }
        }
    }

    public findLastLetterIndex(): number {
        let length = this.letters.length ;
        while(length--) {
            if (!LetterUtils.isEmptyLetter(this.letters[length]) && LetterUtils.isPendingLetter(this.letters[length])) {
                return length;
            }
        }
        return -1;
    }

    public getCurrentLetterIndex(): number {
        return this.letters.findIndex(l => l.value === '');
    }
}