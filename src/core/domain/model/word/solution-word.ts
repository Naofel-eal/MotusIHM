export class SolutionWord {
    public letters: string[] = [];

    public constructor(word: string) {
        this.letters = word.split('');
    }

    public get length() {                                                                              
        return this.letters.length;
    }

    public get value() {
        return this.letters.join('');
    }
}