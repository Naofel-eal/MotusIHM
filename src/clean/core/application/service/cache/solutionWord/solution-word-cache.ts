import { Injectable } from "@angular/core";
import { SolutionWord } from "../../../../domain/model/word/solution-word";
import { ISolutionWordsCache } from "./isolution-word-cache";

@Injectable()
export class SolutionWordsCache implements ISolutionWordsCache {
    public solutionWords!: SolutionWord[];
    private _solutionWordIndex!: number;

    public constructor() {
        this.solutionWords = []
        this._solutionWordIndex = 0
    }

    public get CurrentSolutionWord(): SolutionWord {
        return this.solutionWords[this._solutionWordIndex];
    }

    public addSolutionWord(solutionWord: SolutionWord): void {
        this.solutionWords.push(solutionWord);
    }

    public addSolutionWords(solutionWords: SolutionWord[]): void {
        this.solutionWords = this.solutionWords.concat(solutionWords);
    }

    public nextWord(): SolutionWord {
        this._solutionWordIndex += 1;
        return this.CurrentSolutionWord;
    }
}