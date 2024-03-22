import { CommonModule } from "@angular/common";
import { Component, HostListener, Inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpeedDialModule } from "primeng/speeddial";
import { ToastModule } from "primeng/toast";
import { GAME_SERVICE_TOKEN, SETTINGS_CACHE_SERVICE_TOKEN } from "src/core/application/module/core-injection-tokens";
import { ISettingsCacheService } from "src/core/application/service/cache/settings/isettings-cache";
import { IGameService } from "src/core/application/service/game/igame-service";
import { fadeInOut, letterAnimation } from "src/infrastructure/ihm/animations/animations";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],
  animations: [fadeInOut, letterAnimation],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  public isLoading: boolean = true;
  public spinItems: any[] = [];
  
  public constructor(@Inject(GAME_SERVICE_TOKEN) public gameService: IGameService) {
    this.gameService.init();
  }

  @HostListener('window:keyup', ['$event'])
  public async keyEvent(event: KeyboardEvent) {
    await this.gameService.onKeyPress(event);
  }
}
