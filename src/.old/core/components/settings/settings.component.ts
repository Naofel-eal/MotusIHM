import { Component } from '@angular/core';
import { GameSettingsService } from '../../services/game-settings/game-settings.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public constructor(
    public gameSettingsService: GameSettingsService,
    public messageService: MessageService
  ) { }

  public reset(): void {
    this.gameSettingsService.reset();
  }
}