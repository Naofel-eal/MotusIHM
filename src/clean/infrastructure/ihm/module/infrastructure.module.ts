import { NgModule } from "@angular/core";
import { APIWordRepository } from "../../api/repository/api-word-repository";
import { API_WORD_REPOSITORY_TOKEN } from "./infrastructure-injection-tokens";

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {
            provide: API_WORD_REPOSITORY_TOKEN,
            useClass: APIWordRepository
        }
    ]
})
export class InfrastructureModule { }