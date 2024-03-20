import { InjectionToken } from "@angular/core";
import { IWordRepository } from "src/clean/core/application/repository/iword-repository";
import { IAPIWordRepository } from "src/clean/infrastructure/api/repository/iapi-word-repository";

export const WORD_REPOSITORY_TOKEN = new InjectionToken<IWordRepository>('IWordRepository');
export const API_WORD_REPOSITORY_TOKEN = new InjectionToken<IAPIWordRepository>('IAPIWordRepository');