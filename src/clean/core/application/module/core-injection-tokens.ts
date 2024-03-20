import { InjectionToken } from "@angular/core";
import { IWordRepository } from "src/clean/core/application/repository/iword-repository";
import { ISolutionWordsCache } from "src/clean/core/application/service/cache/solutionWord/isolution-word-cache";
import { IFetchWordUseCase } from "src/clean/core/application/usecase/fetchWord/ifetch-word-usecase";
import { IValidateWordUseCase } from "src/clean/core/application/usecase/validateWord/ivalidate-word-usecase";

export const SOLUTION_WORD_CACHE_TOKEN = new InjectionToken<ISolutionWordsCache>('ISolutionWordsCache');
export const WORD_REPOSITORY_TOKEN = new InjectionToken<IWordRepository>('IWordRepository');
export const FETCH_WORD_USECASE_TOKEN = new InjectionToken<IFetchWordUseCase>('IFetchWordUseCase');
export const VALIDATE_WORD_USECASE_TOKEN = new InjectionToken<IValidateWordUseCase>('IValidateWordUseCase');