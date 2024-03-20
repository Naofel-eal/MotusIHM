import { Language } from "src/clean/core/domain/model/language/language";
import { UserWord } from "src/clean/core/domain/model/word/user-word";
import { IValidateWordUseCase } from "./ivalidate-word-usecase";
import { IWordRepository } from "../../repository/iword-repository";
import { Inject, Injectable } from "@angular/core";
import { WORD_REPOSITORY_TOKEN } from "../../module/core-injection-tokens";

@Injectable()
export class ValidateWordUseCase implements IValidateWordUseCase {
    public constructor(@Inject(WORD_REPOSITORY_TOKEN) private wordRepository: IWordRepository) { }

    public async execute(language: Language, word: UserWord): Promise<boolean> {
        return await this.wordRepository.validateWord(language, word);
    }
}