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
}