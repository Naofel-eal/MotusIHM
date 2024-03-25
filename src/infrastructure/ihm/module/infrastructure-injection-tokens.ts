import { InjectionToken } from "@angular/core";
import { IAPILanguageRepository } from "src/infrastructure/api/repository/iapi-language-repository";
import { IAPIWordRepository } from "src/infrastructure/api/repository/iapi-word-repository";

export const API_WORD_REPOSITORY_TOKEN = new InjectionToken<IAPIWordRepository>('IAPIWordRepository');
export const API_LANGUAGE_REPOSITORY_TOKEN = new InjectionToken<IAPILanguageRepository>('IAPILanguageRepository');