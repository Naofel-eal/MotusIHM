import { Component, HostListener } from '@angular/core';
import { GameService } from '../../services/game-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GameService]
})
export class HomeComponent {
  constructor(public gameService: GameService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(/^[a-zA-Z-]$/.test(event.key)) {
      this.gameService.addLetter(event.key);
    }
    else if (event.key === 'Backspace') {
      this.gameService.removeLetter();
    } 
  }
}
