import { Inject, Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { ILanguageRepository } from "src/core/application/repository/ilanguage-repository";
import { Language } from "src/core/domain/model/language/language";
import { API_LANGUAGE_REPOSITORY_TOKEN } from "src/infrastructure/ihm/module/infrastructure-injection-tokens";
import { IAPILanguageRepository } from "../repository/iapi-language-repository";
import { APILanguageMapper } from "../mapper/APILanguageMapper";

@Injectable()
export class LanguageRepositoryAdapter implements ILanguageRepository {
    public constructor(@Inject(API_LANGUAGE_REPOSITORY_TOKEN) private apiLanguageRepository: IAPILanguageRepository) { }
    
    public getAllLanguages(): Promise<Language[]> {
        return firstValueFrom(
            this.apiLanguageRepository.getAllLanguages()
                .pipe(
                    map((response) => APILanguageMapper.toLanguages(response.languages))
                )
        );
    }
}