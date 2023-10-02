import { LetterStyle } from "../enumerations/letter-style.enum";

export class Letter {
    private _value: string;
    private _style: LetterStyle;

    constructor(letter: string, style: LetterStyle) {
        this._value = letter;
        this._style = style;
    }

    public get value(): string {
        return this._value;
    }

    public get style(): LetterStyle {
        return this._style;
    }

    public set value(letter: string) {
        this._value = letter;
    }

    public set style(style: LetterStyle) {
        this._style = style;
    }

    public reset() {
        this._value = '';
        this._style = LetterStyle.EMPTY;
    }
}