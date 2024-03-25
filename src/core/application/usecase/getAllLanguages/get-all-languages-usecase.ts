import { Inject, Injectable } from "@angular/core";
import { IGetAllLanguagesUseCase } from "./iget-all-languages-usecase";
import { LANGUAGE_RERPOSITORY_TOKEN } from "../../module/core-injection-tokens";
import { ILanguageRepository } from "../../repository/ilanguage-repository";
import { Language } from "src/core/domain/model/language/language";

@Injectable()
export class GetAllLanguagesUseCase implements IGetAllLanguagesUseCase {
    public constructor(@Inject(LANGUAGE_RERPOSITORY_TOKEN) private languageRepository: ILanguageRepository) { }

    public async execute(): Promise<Language[]> {
        return await this.languageRepository.getAllLanguages();
    }
}