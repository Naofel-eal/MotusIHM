import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service/game-service.service';
import { LetterStyle } from '../../enumerations/letter-style.enum';
import { Letter } from '../../models/letter.model';
import { asyncTimeout } from '../../utils/async-timeout';
import { Message } from '../../enumerations/message.enum';
import { MessageService } from 'primeng/api';
import { fadeInOut } from '../../animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GameService, MessageService],
  animations: [fadeInOut]
})
export class HomeComponent implements OnInit {
  private static readonly LETTER_ANIMATION_DURATION_IN_MS: number = 300;
  private canPlay: boolean = true;
  public title = Message.TITLE.toUpperCase();

  public constructor(
    public gameService: GameService, 
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.gameService.newGame();
  }

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

  public isActive(rowIndex: number, colIndex: number) {
    return this.gameService.selectedRow === rowIndex && this.gameService.words[this.gameService.selectedRow].getCurrentLetterIndex() === colIndex;
  }
}
