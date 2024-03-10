import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { APIWord } from '../../models/API-word';
import { GameSettingsService } from '../game-settings/game-settings.service';
import { WordRepository } from '../request-service/request.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private gameSettingsService: GameSettingsService,
    private requestService: WordRepository
  ) { }

  public generateNewWords(): Observable<APIWord[]> {
    const numberOfWordsToFetch = this.gameSettingsService.numberOfWordLoadedAtOnce;
    const isoCode = "FR";
    return this.requestService.fetchWords(isoCode, numberOfWordsToFetch.Value).pipe(
      map(response => response.words
        .map(word => ({ value: word.toUpperCase() } as APIWord)))
    );
  }
}
