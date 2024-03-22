import { Observable, catchError, delay, delayWhen, map, of, retryWhen, switchMap, timer} from "rxjs";
import { IAPIWordRepository } from "./iapi-word-repository";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FetchWordAPIResponse } from "../model/FetchWordAPIResponse";

@Injectable()
export class APIWordRepository implements IAPIWordRepository {
    private readonly baseUrl = 'http://localhost:8080/';
    private readonly fetchWordRoute = this.baseUrl.concat('fetch');
    private readonly validateWordRoute = this.baseUrl.concat('validate');

    public constructor(private _httpClient: HttpClient) { }

    public fetchSolutionWords(isoCode: string, numberOfWords: number): Observable<FetchWordAPIResponse> {
        const params = new HttpParams()
            .set('isocode', isoCode)
            .append('number', numberOfWords.toString());
        
        return this._httpClient.get<FetchWordAPIResponse>(this.fetchWordRoute, {params})
            .pipe(
                retryWhen((erreurs) => erreurs.pipe(
                    delayWhen(() => timer(5000)),
                    )
                )
            );
    }

    public validateWord(isoCode: string, word: string): Observable<number> {
        let queryParams = new HttpParams()
            .set('isocode', isoCode)
            .append('word', word);

        return this._httpClient.get<void>(
            this.validateWordRoute, 
            {
                params: queryParams,
                observe: 'response'
            }
        ).pipe(
            map(response => response.status),
            catchError(error => {
                return of(error.status)
            })
        );
    }
}