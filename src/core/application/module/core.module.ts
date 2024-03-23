import { NgModule } from "@angular/core";
import { 
    FETCH_WORD_USECASE_TOKEN, 
    SETTINGS_CACHE_SERVICE_TOKEN, 
    VALIDATE_WORD_USECASE_TOKEN, 
    WORD_REPOSITORY_TOKEN 
} from "./core-injection-tokens";
import { FetchWordUseCase } from "src/core/application/usecase/fetchWord/fetch-word-usecase";
import { ValidateWordUseCase } from "src/core/application/usecase/validateWord/validate-word-usecase";
import { WordRepositoryAdapter } from "src/infrastructure/api/adapter/word-repository-adapter";
import { SettingsCacheService } from "../service/cache/settings/settings-cache";
import { InfrastructureModule } from "src/infrastructure/ihm/module/infrastructure.module";

@NgModule({
    imports: [
        InfrastructureModule,
    ],
    declarations: [],
    exports: [],
    providers: [
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
        }
    ]
})
export class CoreModule { }