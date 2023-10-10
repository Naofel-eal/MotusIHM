import { Injectable } from '@angular/core';
import { Setting } from '../../models/setting';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {
  public letterAnimationDurationInMs!: Setting;
  public numberOfWordLoadedAtOnce!: Setting;
  public maxWordLength!: Setting;
  public maxNumberOfTries!: Setting;
  public delayBeforeNewGame!: Setting;

  public constructor() { 
    this.init();
  }

  public init(): void {
    this.letterAnimationDurationInMs = new Setting(true, 300);
    this.numberOfWordLoadedAtOnce = new Setting(true, 10);
    this.maxWordLength = new Setting(false, 15);
    this.maxNumberOfTries = new Setting(true, 7);
    this.delayBeforeNewGame = new Setting(true, 2000);
  }

  public reset(): void {
    this.init();
  }
}
