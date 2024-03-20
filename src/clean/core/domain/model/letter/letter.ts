export abstract class Letter {
    public value: string;
    public htmlClass: string;

    protected constructor(letter: string, htmlClass: string) {
        this.value = letter;
        this.htmlClass = htmlClass;
    }
}