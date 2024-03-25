import { Language } from "src/core/domain/model/language/language";

export interface IGetAllLanguagesUseCase {
    execute(): Promise<Language[]>
}