import { Language } from "src/clean/core/domain/model/language/language";
import { SolutionWord } from "src/clean/core/domain/model/word/solution-word";

export interface IFetchWordUseCase {
    execute(language: Language, numberOfWords: number): Promise<SolutionWord[]>
}