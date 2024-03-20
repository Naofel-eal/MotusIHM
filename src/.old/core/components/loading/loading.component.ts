import { Component } from '@angular/core';
import { GameService } from '../../services/game-service/game.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  providers: [],
  animations: []
})
export class LoadingComponent {
  public constructor(private gameService: GameService) { }
}
