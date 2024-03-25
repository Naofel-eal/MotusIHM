import { InjectionToken } from "@angular/core";
import { IWordRepository } from "src/core/application/repository/iword-repository";
import { IFetchWordUseCase } from "src/core/application/usecase/fetchWord/ifetch-word-usecase";
import { IValidateWordUseCase } from "src/core/application/usecase/validateWord/ivalidate-word-usecase";
import { ISettingsCacheService } from "../service/cache/settings/isettings-cache";
import { ILanguageRepository } from "../repository/ilanguage-repository";
import { IGetAllLanguagesUseCase } from "../usecase/getAllLanguages/iget-all-languages-usecase";

export const WORD_REPOSITORY_TOKEN = new InjectionToken<IWordRepository>('IWordRepository');
export const FETCH_WORD_USECASE_TOKEN = new InjectionToken<IFetchWordUseCase>('IFetchWordUseCase');
export const VALIDATE_WORD_USECASE_TOKEN = new InjectionToken<IValidateWordUseCase>('IValidateWordUseCase');
export const SETTINGS_CACHE_SERVICE_TOKEN = new InjectionToken<ISettingsCacheService>('ISettingsCacheService');
export const LANGUAGE_RERPOSITORY_TOKEN = new InjectionToken<ILanguageRepository>('ILanguageRepository');
export const GET_ALL_LANGUAGES_USECASE_TOKEN = new InjectionToken<IGetAllLanguagesUseCase>('IGetAllLanguagesUseCase');