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
export class HomeComponent {
  private static readonly LETTER_ANIMATION_DURATION_IN_MS: number = 300;
  private canPlay: boolean = true;
  public title = Message.TITLE.toUpperCase();
  public items: any[] = []

  public constructor(
    public gameService: GameService, 
    public messageService: MessageService
  ) { 
    this.gameService.newGame();
    this.items = [
      {
          icon: 'pi pi-refresh',
          tooltipOptions: {
            tooltipLabel: 'Restart game'
          },
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Restarting', detail: 'Starting a new game...' });
          }
      },
      {
        icon: 'pi pi-info',
        tooltipOptions: {
          tooltipLabel: 'Game rules'
        },
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Game rules', detail: 'Find the word' });
        }
      },
      {
        icon: 'pi pi-github',
        tooltipOptions: {
          tooltipLabel: 'My Github'
        },
        target: '_blank',
        url: 'https://github.com/Naofel-eal',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Github', detail: 'Creator: Naofel EL ALOUANI' });
        }
      },
      {
        icon: 'pi pi-key',
        tooltipOptions: {
          tooltipLabel: 'Tip'
        },
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Tip', detail: 'A letter has been revealed !'})
        }
      }
  ];

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
