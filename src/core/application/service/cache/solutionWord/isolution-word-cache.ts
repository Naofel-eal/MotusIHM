import { SolutionWord } from "src/core/domain/model/word/solution-word";

export interface ISolutionWordsCache {
    addSolutionWord(solutionWord: SolutionWord): void;

    addSolutionWords(solutionWords: SolutionWord[]): void;

    nextWord(): SolutionWord

    CurrentSolutionWord: SolutionWord;

    mustLoadNewWords(): boolean;
}