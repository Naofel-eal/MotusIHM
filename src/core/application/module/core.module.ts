import { NgModule } from "@angular/core";
import { 
    FETCH_WORD_USECASE_TOKEN, 
    GET_ALL_LANGUAGES_USECASE_TOKEN, 
    LANGUAGE_RERPOSITORY_TOKEN, 
    SETTINGS_CACHE_SERVICE_TOKEN, 
    VALIDATE_WORD_USECASE_TOKEN, 
    WORD_REPOSITORY_TOKEN 
} from "./core-injection-tokens";
import { FetchWordUseCase } from "src/core/application/usecase/fetchWord/fetch-word-usecase";
import { ValidateWordUseCase } from "src/core/application/usecase/validateWord/validate-word-usecase";
import { WordRepositoryAdapter } from "src/infrastructure/api/adapter/word-repository-adapter";
import { SettingsCacheService } from "../service/cache/settings/settings-cache";
import { LanguageRepositoryAdapter } from "src/infrastructure/api/adapter/language-repository-adapter";
import { GetAllLanguagesUseCase } from "../usecase/getAllLanguages/get-all-languages-usecase";

@NgModule({
    imports: [],
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
        },
        {
            provide: LANGUAGE_RERPOSITORY_TOKEN,
            useClass: LanguageRepositoryAdapter
        },
        {
            provide: GET_ALL_LANGUAGES_USECASE_TOKEN,
            useClass: GetAllLanguagesUseCase
        }
    ]
})
export class CoreModule { }