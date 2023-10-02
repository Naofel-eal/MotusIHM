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

  public normalize(word: string): string {
    const res = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return res.replace(/ç/g, "c").toUpperCase();
  }
}
