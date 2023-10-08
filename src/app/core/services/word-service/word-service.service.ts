import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIWord } from '../../models/API-word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiURL: string = "https://trouve-mot.fr/api/random/"
  private readonly numberOfLoadedWords: number = 3;

  constructor(private http: HttpClient) { }

  public generateRandomWords(): Observable<APIWord[]> {
    return this.http.get<APIWord[]>(this.apiURL + this.numberOfLoadedWords)
  }

  public normalize(word: string): string {
    const res = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return res.replace(/ç/g, "c").toUpperCase();
  }
}
