import { Language } from "src/core/domain/model/language/language";
import { UserWord } from "src/core/domain/model/word/user-word";

export interface IValidateWordUseCase {
    execute(isoCode: Language, word: UserWord): Promise<boolean>;
}