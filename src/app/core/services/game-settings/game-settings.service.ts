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

  constructor() { }
}
