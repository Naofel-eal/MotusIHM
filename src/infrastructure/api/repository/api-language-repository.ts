import { Observable, delayWhen, retryWhen, timer } from "rxjs";
import { IGetAllLanguagesAPIResponse } from "../model/iget-all-languages";
import { IAPILanguageRepository } from "./iapi-language-repository";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class APILanguageRepository implements IAPILanguageRepository {
    private readonly baseUrl = 'http://localhost:8080/';
    private readonly getAllLanguagesRoute = this.baseUrl.concat('languages');

    public constructor(private _httpClient: HttpClient) { }
    
    getAllLanguages(): Observable<IGetAllLanguagesAPIResponse> {
        return this._httpClient.get<IGetAllLanguagesAPIResponse>(this.getAllLanguagesRoute)
            .pipe(
                retryWhen((errors) => errors.pipe(
                    delayWhen(() => timer(5000)),
        )));
    }
    
}