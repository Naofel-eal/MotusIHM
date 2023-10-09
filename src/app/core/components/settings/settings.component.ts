import { Component } from '@angular/core';
import { GameSettingsService } from '../../services/game-settings/game-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public constructor(public gameSettingsService: GameSettingsService) { }

  public reset(): void {
    this.gameSettingsService.reset();
  }
}
