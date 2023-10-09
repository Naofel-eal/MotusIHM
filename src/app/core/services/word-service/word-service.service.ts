import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIWord } from '../../models/API-word';
import { GameSettingsService } from '../game-settings/game-settings.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor(
    private http: HttpClient,
    private gameSettingsService: GameSettingsService
  ) { }

  public generateRandomWords(): Observable<APIWord[]> {
    return this.http.get<APIWord[]>(this.gameSettingsService.apiURL + this.gameSettingsService.numberOfWordLoadedAtOnce)
  }

  public normalize(word: string): string {
    let res = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    res = res.replace(/œ/g, "oe");
    return res.replace(/ç/g, "c").toUpperCase();
  }
}
