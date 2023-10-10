import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIWord } from '../../models/API-word';
import { GameSettingsService } from '../game-settings/game-settings.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private static readonly apiUrl: string = "https://trouve-mot.fr/api/";

  constructor(
    private http: HttpClient,
    private gameSettingsService: GameSettingsService
  ) { }

  public generateRandomWords(): Observable<APIWord[]> {
    const defaultPath: string = WordService.apiUrl + "random/" + this.gameSettingsService.numberOfWordLoadedAtOnce.Value;
    const pathWithMaxWordLength: string = WordService.apiUrl + "sizemax/" + this.gameSettingsService.maxWordLength.Value + "/" + this.gameSettingsService.numberOfWordLoadedAtOnce.Value;
    const path: string = this.gameSettingsService.maxWordLength.Enabled ? pathWithMaxWordLength : defaultPath;
    return this.http.get<APIWord[]>(path);
  }

  public normalize(word: string): string {
    let res = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    res = res.replace(/œ/g, "oe");
    return res.replace(/ç/g, "c").toUpperCase();
  }
}
