import { NgModule } from "@angular/core";
import { APIWordRepository } from "../../api/repository/api-word-repository";
import { API_WORD_REPOSITORY_TOKEN } from "./infrastructure-injection-tokens";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { CoreModule } from "src/core/application/module/core.module";

@NgModule({
    imports: [CoreModule],
    declarations: [],
    exports: [],
    providers: [
        {
            provide: API_WORD_REPOSITORY_TOKEN,
            useClass: APIWordRepository
        },
        MessageService,
        DialogService
    ]
})
export class InfrastructureModule { }