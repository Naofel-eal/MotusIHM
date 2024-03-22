import { SolutionWord } from "src/core/domain/model/word/solution-word";
import { IFetchWordUseCase } from "./ifetch-word-usecase";
import { IWordRepository } from "../../repository/iword-repository";
import { Language } from "src/core/domain/model/language/language";
import { Inject, Injectable } from "@angular/core";
import { WORD_REPOSITORY_TOKEN } from "../../module/core-injection-tokens";

@Injectable()
export class FetchWordUseCase implements IFetchWordUseCase {
    public constructor(@Inject(WORD_REPOSITORY_TOKEN) private wordRepository: IWordRepository) { }

    public async execute(language: Language, numberOfWords: number): Promise<SolutionWord[]> {
        return await this.wordRepository.fetchSolutionWords(language, numberOfWords);
    }
    
}