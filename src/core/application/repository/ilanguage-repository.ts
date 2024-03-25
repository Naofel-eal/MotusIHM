import { Language } from "src/core/domain/model/language/language";

export interface ILanguageRepository {
    getAllLanguages(): Promise<Language[]>
}