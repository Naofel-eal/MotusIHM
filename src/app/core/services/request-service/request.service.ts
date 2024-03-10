import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../../models/infrastructure/APIResponse';

@Injectable({
  providedIn: 'root'
})
export class WordRepository {
  private readonly apiUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  public fetchWords(isoCode: string, number: number): Observable<APIResponse> {
    const queryParams = `fetch?isocode=${isoCode}&number=${number}`;
    return this.http.get<APIResponse>(`${this.apiUrl}${queryParams}`);
  }
}
