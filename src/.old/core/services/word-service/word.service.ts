import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { APIWord } from '../../models/API-word';
import { GameSettingsService } from '../game-settings/game-settings.service';
import { WordRepository } from '../word-repository/word.repository';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private gameSettingsService: GameSettingsService,
    private wordRepository: WordRepository
  ) { }

  public generateNewWords(): Observable<APIWord[]> {
    const numberOfWordsToFetch = this.gameSettingsService.numberOfWordLoadedAtOnce;
    const isoCode = "FR";
    return this.wordRepository.fetchWords(isoCode, numberOfWordsToFetch.Value).pipe(
      map(response => response.words.map(word => ({ value: word.toUpperCase() } as APIWord)))
    );
  }

  public validateWord(word: APIWord): Observable<number> {
    const isoCode = "FR";
    return this.wordRepository.validateWord(isoCode, word.value).pipe(
      map((response: HttpResponse<any>) => {
        return response.status
      }),
      catchError(error => {
        return of(error.status)
      })
    )
  }
}
