import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {
  public readonly apiURL: string = "https://trouve-mot.fr/api/random/"
  public letterAnimationDurationInMs: number = 300;
  public numberOfWordLoadedAtOnce: number = 10;
  public minWordLength: number = 3;
  public maxWordLength: number = 15;
  public maxNumberOfTries: number = 7;
  public delayBeforeNewGame: number = 2000;

  public constructor() { }

  public reset(): void {
    this.letterAnimationDurationInMs = 300;
    this.numberOfWordLoadedAtOnce = 10;
    this.minWordLength = 3;
    this.maxWordLength = 15;
    this.maxNumberOfTries = 7;
    this.delayBeforeNewGame = 2000;
  }
}
