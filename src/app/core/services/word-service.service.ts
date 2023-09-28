import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiURL: string = "https://trouve-mot.fr/api/random"
  public solutionWord: string = '';

  constructor(private http: HttpClient) { }

  public generateRandomWord(): Observable<string> {
    return this.http.get(this.apiURL, { responseType: 'text' })
  }
}
