import { Component, HostListener } from '@angular/core';
import { GameService } from '../../services/game-service/game-service.service';
import { LetterStyle } from '../../enumerations/letter-style.enum';
import { Letter } from '../../models/letter.model';
import { asyncTimeout } from '../../utils/async-timeout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GameService]
})
export class HomeComponent {
  private static readonly LETTER_ANIMATION_DURATION_IN_MS: number = 300;
  private canPlay: boolean = true;

  public constructor(public gameService: GameService) { }

  @HostListener('window:keyup', ['$event'])
  public async keyEvent(event: KeyboardEvent) {
    if (!this.canPlay) {
      return;
    }
    const key = event.key.toUpperCase();
    if(this.isValidCharacter(key)) {
      this.gameService.addLetter(key);
      if (this.gameService.words[this.gameService.selectedRow].isComplete()) {
        this.canPlay = false;
        await this.animateLetters();
        this.gameService.moveToNextRow();
        this.canPlay = true;
      }
    }
    else if (key === 'BACKSPACE') {
      this.gameService.removeLetter();
    } 
  }

  private async animateLetters() {
    const userWordLength: number = this.gameService.words[this.gameService.selectedRow].letters.length;

    for (let letterIndex = 0; letterIndex < userWordLength; letterIndex++) {
      const currentLetter: Letter = this.gameService.words[this.gameService.selectedRow].getLetterByIndex(letterIndex);

      if (currentLetter.style === LetterStyle.EMPTY) {
        const expectedLetter: string = this.gameService.solutionWord[letterIndex];
        if (currentLetter.value === expectedLetter) {
          currentLetter.style = LetterStyle.CORRECT;
        }
        else if (this.gameService.solutionWord.includes(currentLetter.value)) {
          currentLetter.style = LetterStyle.ALMOST;
        }
        else {
          currentLetter.style = LetterStyle.INCORRECT;
        }
        await asyncTimeout(HomeComponent.LETTER_ANIMATION_DURATION_IN_MS);
      }
    }
  }

  private isValidCharacter(key: string): boolean {
    const regex: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]$/;
    return regex.test(key);
  }
}
