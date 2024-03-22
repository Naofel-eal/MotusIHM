import { Language } from "src/core/domain/model/language/language";
import { SolutionWord } from "src/core/domain/model/word/solution-word";

export interface IFetchWordUseCase {
    execute(language: Language, numberOfWords: number): Promise<SolutionWord[]>
}