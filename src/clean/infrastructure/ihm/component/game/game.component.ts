import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { GAME_SERVICE_TOKEN } from "src/clean/core/application/module/core-injection-tokens";
import { IGameService } from "src/clean/core/application/service/game/igame-service";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  public isLoading: boolean = true;
  
  public constructor(@Inject(GAME_SERVICE_TOKEN) public gameService: IGameService) {
    this.gameService.initGrid();
  }
}
