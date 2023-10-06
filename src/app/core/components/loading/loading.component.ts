import { Component } from '@angular/core';
import { GameService } from '../../services/game-service/game-service.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  providers: [GameService]
})
export class LoadingComponent {
  public rows: number[] = [];
  public columns: number[] = [];
  private tableSize: number = 0;

  public constructor(private gameService: GameService) {
    this.tableSize = this.gameService.testLimit;
    this.rows = Array(this.tableSize).fill(0);
    this.columns = Array(this.tableSize).fill(0);
  }
}
