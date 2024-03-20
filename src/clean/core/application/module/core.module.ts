import { NgModule } from "@angular/core";
import { SolutionWordsCache } from "src/clean/core/application/service/cache/solutionWord/solution-word-cache";
import { 
    FETCH_WORD_USECASE_TOKEN, 
    SOLUTION_WORD_CACHE_TOKEN, 
    VALIDATE_WORD_USECASE_TOKEN, 
    WORD_REPOSITORY_TOKEN 
} from "./core-injection-tokens";
import { FetchWordUseCase } from "src/clean/core/application/usecase/fetchWord/fetch-word-usecase";
import { ValidateWordUseCase } from "src/clean/core/application/usecase/validateWord/validate-word-usecase";
import { WordRepositoryAdapter } from "src/clean/infrastructure/api/adapter/word-repository-adapter";

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {
            provide: SOLUTION_WORD_CACHE_TOKEN,
            useClass: SolutionWordsCache
        },
        {
            provide: WORD_REPOSITORY_TOKEN,
            useClass: WordRepositoryAdapter
        },
        {
            provide: FETCH_WORD_USECASE_TOKEN,
            useClass: FetchWordUseCase
        },
        {
            provide: VALIDATE_WORD_USECASE_TOKEN,
            useClass: ValidateWordUseCase
        }
    ]
})
export class CoreModule { }