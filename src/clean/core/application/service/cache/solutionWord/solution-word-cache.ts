import { Injectable } from "@angular/core";
import { SolutionWord } from "../../../../domain/model/word/solution-word";

@Injectable()
export class SolutionWordsCache {
    public solutionWords: SolutionWord[] = [];

    public constructor() { }

    public addSolutionWord(solutionWord: SolutionWord): void {
        this.solutionWords.push(solutionWord);
    }

    public addSolutionWords(solutionWords: SolutionWord[]): void {
        this.solutionWords = this.solutionWords.concat(solutionWords);
    }
}