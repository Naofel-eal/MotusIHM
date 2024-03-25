import { Language } from "src/core/domain/model/language/language";

export class APILanguageMapper {
    public static toLanguages(languageIsoCodes: string[]): Language[] {
        return languageIsoCodes.map((languageIsoCode) => new Language(languageIsoCode))
    } 
}