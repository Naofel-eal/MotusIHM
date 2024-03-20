import { NgModule } from "@angular/core";
import { SolutionWordsCache } from "src/clean/core/application/service/cache/solutionWord/solution-word-cache";
import { 
    FETCH_WORD_USECASE_TOKEN, 
    GAME_SERVICE_TOKEN, 
    SETTINGS_CACHE_SERVICE_TOKEN, 
    SOLUTION_WORD_CACHE_TOKEN, 
    VALIDATE_WORD_USECASE_TOKEN, 
    WORD_REPOSITORY_TOKEN 
} from "./core-injection-tokens";
import { FetchWordUseCase } from "src/clean/core/application/usecase/fetchWord/fetch-word-usecase";
import { ValidateWordUseCase } from "src/clean/core/application/usecase/validateWord/validate-word-usecase";
import { WordRepositoryAdapter } from "src/clean/infrastructure/api/adapter/word-repository-adapter";
import { SettingsCacheService } from "../service/cache/settings/settings-cache";
import { GameService } from "src/clean/core/application/service/game/game-service";
import { InfrastructureModule } from "src/clean/infrastructure/ihm/module/infrastructure.module";

@NgModule({
    imports: [InfrastructureModule],
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
        },
        {
            provide: SETTINGS_CACHE_SERVICE_TOKEN,
            useClass: SettingsCacheService
        },
        {
            provide: GAME_SERVICE_TOKEN,
            useClass: GameService
        }
    ]
})
export class CoreModule { }