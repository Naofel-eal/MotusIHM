import { LetterStyle } from "../enumerations/letter-style.enum";
import { Letter } from "./letter.model";

export class Word {
    private _letters: Letter[] = [];

    constructor(size: number) {
        for (let i = 0; i < size; i++) {
            this._letters.push(new Letter('', LetterStyle.EMPTY));
        }
    }

    public get letters(): Letter[] {
        return this._letters;
    }

    public set letters(letters: Letter[]) {
        this._letters = letters;
    }

    public get length(): number {
        return this._letters.length;
    }

    public get value(): string {
        return this._letters.map(letter => letter.value).join('');
    }

    public getLetterByIndex(index: number): Letter {
        return this._letters[index];
    }

    public setLetterByIndex(index: number, letter: Letter) {
        if (index >= this._letters.length) {
            throw new Error('Index out of bounds');
        }
        else {
            this._letters[index] = letter;
        }
    }

    public isComplete(): boolean {
        return this._letters.every(letter => letter.value !== '');
    }

    public isEmpty(): boolean {
        return this._letters.every(letter => letter.isEmpty());
    }

    public itIsNotFirstLetter() {
        return !this._letters[0].isEmpty();
    }

    public addLetter(letter: Letter) {
        const index: number = this._letters.findIndex(l => l.value === '');
        this._letters[index] = letter;
    }

    public removeLetter() {
        if (!this.isEmpty() && this.itIsNotFirstLetter()) {
            const index: number = this.findLastLetterIndex();
            this._letters[index].reset();
        }
    }

    public findLastLetterIndex(): number {
        let l = this._letters.length ;

        while(l--) {
            if (!this._letters[l].isEmpty() && this._letters[l].hasNoStyle()) {
                return l;
            }
        }
        return -1;
    }

    public getCurrentLetterIndex(): number {
        return this._letters.findIndex(l => l.value === '');
    }
}