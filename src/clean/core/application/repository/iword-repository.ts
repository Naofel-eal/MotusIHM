import { Language } from "../../domain/model/language/language";
import { SolutionWord } from "../../domain/model/word/solution-word";
import { UserWord } from "../../domain/model/word/user-word";

export interface IWordRepository {
    fetchSolutionWords(language: Language, numberOfWords: number): Promise<SolutionWord[]>

    validateWord(language: Language, word: UserWord): Promise<boolean>
}