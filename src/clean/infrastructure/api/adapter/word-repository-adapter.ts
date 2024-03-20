import { IWordRepository } from "src/clean/core/application/repository/iword-repository";
import { SolutionWord } from "src/clean/core/domain/model/word/solution-word";
import { IAPIWordRepository } from "../repository/iapi-word-repository";
import { Inject, Injectable } from "@angular/core";
import { UserWord } from "src/clean/core/domain/model/word/user-word";
import { Language } from "src/clean/core/domain/model/language/language";
import { API_WORD_REPOSITORY_TOKEN } from "../../ihm/module/infrastructure-injection-tokens";
import { firstValueFrom, map } from "rxjs";
import { APIWordMapper } from "../mapper/APIWordMapper";


@Injectable()
export class WordRepositoryAdapter implements IWordRepository {
    public constructor(@Inject(API_WORD_REPOSITORY_TOKEN) private apiWordRepository: IAPIWordRepository) { }

    public fetchSolutionWords(language: Language, numberOfWords: number): Promise<SolutionWord[]> {
        return firstValueFrom(this.apiWordRepository.fetchSolutionWords(language.isoCode, numberOfWords)
            .pipe(
                map((response) => APIWordMapper.toSolutionWords(response.words))
            ));
    }

    public async validateWord(language: Language, word: UserWord): Promise<boolean> {
        return firstValueFrom(
            this.apiWordRepository.validateWord(language.isoCode, word.Value)
            .pipe(
                map((status) => status === 200)
            )
        );
    }
}