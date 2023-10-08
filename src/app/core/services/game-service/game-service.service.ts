import { Injectable } from '@angular/core';
import { WordService } from '../word-service/word-service.service';
import { Word } from '../../models/word';
import { Letter } from '../../models/letter/letter.model';
import { MessageService } from 'primeng/api';
import { APIWord } from '../../models/API-word';
import { asyncTimeout } from '../../utils/async-timeout';
import { Observable, tap } from 'rxjs';
import { CorrectLetter } from '../../models/letter/correct-letter';
import { PendingLetter } from '../../models/letter/pending-letter';
import { Text } from '../../constants/text';

@Injectable()
export class GameService {
  public static readonly TEST_LIMIT: number = 7;
  public static readonly DELAY_BEFORE_NEW_GAME_IN_MS: number = 2000;
  public userWords: Word[] = [];
  public solutionWords: string[] = [];
  public currentSolutionWordIndex: number = 0;
  public currentUserWordIndex: number = 0;
  public isLoading: boolean = true;
  public isFirstGame: boolean = true;

  public constructor(
    private readonly wordService: WordService,
    private readonly messageService: MessageService
  ) {
    this.isLoading = true;
    this.generateNewWords().subscribe(() => {
      this.newGame();
    });
  }

  public async newGame(): Promise<void> {
    if (this.isFirstGame) {
      this.isFirstGame = false;
    } 
    else {
      this.currentSolutionWordIndex++;
    }

    this.resetGrid();
    if (this.mustLoadNewWords()) {
      this.generateNewWords().subscribe();
    }
  }
  
  public generateNewWords(): Observable<APIWord[]> {
    this.messageService.add({severity:'info', summary: Text.STARTING, detail: Text.FECTHING_WORD});
    const startTime: number = Date.now();

    return this.wordService.generateRandomWords().pipe(
      tap((apiWords: APIWord[]) => {
        apiWords.forEach((apiWord: APIWord) => {
          this.solutionWords.push(this.wordService.normalize(apiWord.name));
        });
        const endTime: number = Date.now();
        return this.waitAfterFetchingWords(startTime, endTime);
      })
    );
  }

  public addLetter(key: string) {
    const letter: Letter = new PendingLetter(key);
    this.userWords[this.currentUserWordIndex].addLetter(letter);
  }

  public moveToNextRow() {
    if(this.hasWon()) {
      this.win();
    }
    else if (this.isLastRow()) {
      this.lose()
    }
    else {
      this.currentUserWordIndex++;
      this.restoreValidLetters();
    }
  }

  public removeLetter() {
    this.userWords[this.currentUserWordIndex].removeLetter();
  }

  public async win() {
    this.messageService.add({severity:'success', summary: Text.WIN, detail: Text.A_NEW_GAME_WILL_START});
    await asyncTimeout(GameService.DELAY_BEFORE_NEW_GAME_IN_MS);
    this.newGame();
  }

  public async lose() {
    this.messageService.add({severity:'error', summary: Text.LOSE, detail: Text.THE_WORD_WAS + this.solutionWords[this.currentSolutionWordIndex]});
    await asyncTimeout(GameService.DELAY_BEFORE_NEW_GAME_IN_MS);
    await this.newGame();
  }

  private hasWon(): boolean {
    return this.userWords[this.currentUserWordIndex].value === this.solutionWords[this.currentSolutionWordIndex];
  }

  private isLastRow(): boolean {
    return this.currentUserWordIndex === GameService.TEST_LIMIT - 1;
  }

  private resetGrid() {
    this.currentUserWordIndex = 0;
    this.userWords = []; 
    for(let i = 0; i < GameService.TEST_LIMIT; i++) {
      this.userWords.push(new Word(this.solutionWords[this.currentSolutionWordIndex].length));
    }
  }

  private restoreValidLetters() {
    const previousWord: Word = this.userWords[this.currentUserWordIndex - 1];
    const currentUserWord = this.userWords[this.currentUserWordIndex];

    previousWord.letters.forEach((currentLetter, i) => {
      if(currentLetter instanceof CorrectLetter) {
        currentUserWord.setLetterByIndex(i, currentLetter);
      }
    });
}


  private mustLoadNewWords(): boolean {
    return this.currentSolutionWordIndex === this.solutionWords.length - 1;
  }

  private async waitAfterFetchingWords(startTime: number, endTime: number) {
    const deltaTimeInSeconds: number = (endTime - startTime) / 1000;
    if (deltaTimeInSeconds < 1) {
      await asyncTimeout((1 - deltaTimeInSeconds) * 1000);
      this.isLoading = false;
    }
    else {
      this.isLoading = false;
    }
  }
}