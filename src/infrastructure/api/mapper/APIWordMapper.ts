import { SolutionWord } from "src/core/domain/model/word/solution-word";

export class APIWordMapper {
    public static toSolutionWords(apiWords: string[]): SolutionWord[] {
        return apiWords.map((apiWord) => new SolutionWord(apiWord.toUpperCase()))
    } 
}