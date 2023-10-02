import { Component, HostListener } from '@angular/core';
import { GameService } from '../../services/game-service/game-service.service';
import { LetterStyle } from '../../enumerations/letter-style.enum';
import { Letter } from '../../models/letter.model';

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
    if(this.isValidCharacter(event.key)) {
      this.gameService.addLetter(event.key);
      if (this.gameService.isLastColumn()) {
        this.animateLetters();
        this.gameService.moveToNextRow();
      }
    }
    else if (event.key === 'Backspace') {
      this.gameService.removeLetter();
    } 
  }

  private animateLetters() {
    for (let i = 0; i < this.gameService.solutionWord.length; i++) {
      let currentLetter: Letter = this.gameService.words[this.gameService.selectedRow].getLetterByIndex(i);
      if (this.gameService.solutionWord[i] === currentLetter.value) {
        currentLetter.style = LetterStyle.CORRECT;
      }
      else if (this.gameService.solutionWord.includes(this.gameService.words[this.gameService.selectedRow].getLetterByIndex(i).value)) {
        currentLetter.style = LetterStyle.ALMOST;
      }
      else {
        currentLetter.style = LetterStyle.INCORRECT;
      }
    }
  }

  private isValidCharacter(key: string): boolean {
    const regex: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]$/;
    return regex.test(key);
  }
}
