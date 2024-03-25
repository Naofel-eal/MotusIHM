export class Language {
    public isoCode: string = '';
    public flag: string = ''

    public constructor(isoCode: string) {
        this.isoCode = isoCode;
        this.flag = this._isoCodeToEmojiFlag(isoCode);
    }

    private _isoCodeToEmojiFlag(isoCode: string): string {
        const firstChar = isoCode.charCodeAt(0) - 65 + 0x1F1E6;
        const secondChar = isoCode.charCodeAt(1) - 65 + 0x1F1E6;
        return String.fromCodePoint(firstChar, secondChar);
    }

    public get fullName(): string {
        return this.flag + ' ' + this.isoCode;
    }
}