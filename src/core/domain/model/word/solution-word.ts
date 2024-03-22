export class SolutionWord {
    public letters: string[] = [];

    public constructor(word: string) {
        this.letters = word.split('');
    }

    public get Length() {                                                                              
        return this.letters.length;
    }

    public get Value() {
        return this.letters.join('');
    }
}