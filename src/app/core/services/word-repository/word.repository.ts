import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { FetchWordAPIResponse } from '../../models/infrastructure/FetchWordAPIResponse';

@Injectable({
  providedIn: 'root'
})
export class WordRepository {
  private readonly apiUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  public fetchWords(isoCode: string, number: number): Observable<FetchWordAPIResponse> {
    const queryParams = `fetch?isocode=${isoCode}&number=${number}`;
    return this.http.get<FetchWordAPIResponse>(`${this.apiUrl}${queryParams}`);
  }

  public validateWord(isoCode: string, word: string): Observable<HttpResponse<any>> {
    const queryParams = `validate?isocode=${isoCode}&word=${word}`;
    return this.http.get<any>(`${this.apiUrl}${queryParams}`, { observe: 'response' });  
  }
}
