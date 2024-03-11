import { Injectable } from '@angular/core';
import { WordService } from '../word-service/word.service';
import { Word } from '../../models/word';
import { Letter } from '../../models/letter/letter.model';
import { MessageService } from 'primeng/api';
import { APIWord } from '../../models/API-word';
import { asyncTimeout } from '../../utils/async-timeout';
import { Observable, forkJoin, map, tap, timer } from 'rxjs';
import { CorrectLetter } from '../../models/letter/correct-letter';
import { PendingLetter } from '../../models/letter/pending-letter';
import { TextConstants } from '../../constants/text-constants';
import { GameSettingsService } from '../game-settings/game-settings.service';

@Injectable()
export class GameService {
  public userWords: Word[] = [];
  public solutionWords: string[] = [];
  public currentSolutionWordIndex: number = 0;
  public currentUserWordIndex: number = 0;
  public isLoading: boolean = true;
  public isFirstGame: boolean = true;
  public canPlay: boolean = false;

  public constructor(
    private readonly wordService: WordService,
    private readonly messageService: MessageService,
    private gameSettingsService: GameSettingsService
  ) {
    this.init();
  }

  public init() {
    this.userWords = [];
    this.solutionWords = [];
    this.currentSolutionWordIndex = 0;
    this.currentUserWordIndex = 0;
    this.isLoading = true;
    this.isFirstGame = true;
    this.generateNewWords().subscribe(() => {
      this.newGame();
    });
  }

  public newGame(): void {
    this.canPlay = true;
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
    this.messageService.add({severity:'info', summary: TextConstants.STARTING, detail: TextConstants.FETCHING_WORD});

    return forkJoin(
    [
      this.wordService.generateNewWords(),
      timer(1000)
    ])
    .pipe(
      map(([apiWords]: [APIWord[], number]) => apiWords),
      tap((apiWords: APIWord[]) => {
        if (Array.isArray(apiWords)) {
          this.solutionWords = this.solutionWords.concat(apiWords.map(apiWord => apiWord.value));
        } else {
          console.error('apiWords n\'est pas un tableau:', apiWords);
        }
        this.isLoading = false;
      }),
    );
  }

  public async handleWinOrLose() {
    if(this.hasWon()) {
      await this.win();
    }
    else if (this.isLastRow()) {
      await this.lose()
    }
    else {
      this.moveToNextRow();
    }
  }

  public async validateWord(): Promise<boolean> {
    return new Promise((resolve) => {
      this.wordService.validateWord(this.userWords[this.currentUserWordIndex]).subscribe((status: number) => {
        switch (status) {
          case 200:
            resolve(true)
            break;
          case 404:
            this.messageService.add({severity:'error', summary: TextConstants.ERROR, detail: TextConstants.WORD_DOES_NOT_EXIST});
            resolve(false)
            break;
          default:
            this.messageService.add({severity:'error', summary: TextConstants.ERROR, detail: TextConstants.UNKNOWN_ERROR + ' : ' + status});
            resolve(false)
            break;
        }
      })
    });
  }
  
  public clearCurrentWord(): void {
    this.userWords[this.currentUserWordIndex].clear();
  }

  public addLetter(key: string) {
    const letter: Letter = new PendingLetter(key);
    this.userWords[this.currentUserWordIndex].addLetter(letter);
  }

  public moveToNextRow() { 
      this.currentUserWordIndex++;
      this.restoreValidLetters();
  }

  public removeLetter() {
    this.userWords[this.currentUserWordIndex].removeLetter();
  }

  public async win() {
    this.messageService.add({severity:'success', summary: TextConstants.WIN, detail: TextConstants.A_NEW_GAME_WILL_START});
    await asyncTimeout(this.gameSettingsService.delayBeforeNewGame.Value);
    this.newGame();
  }

  public async lose() {
    this.messageService.add({severity:'error', summary: TextConstants.LOSE, detail: TextConstants.THE_WORD_WAS + this.solutionWords[this.currentSolutionWordIndex]});
    await asyncTimeout(this.gameSettingsService.delayBeforeNewGame.Value);
    this.newGame();
  }

  public hasWon(): boolean {
    return this.userWords[this.currentUserWordIndex].value === this.solutionWords[this.currentSolutionWordIndex];
  }

  public isLastRow(): boolean {
    return this.currentUserWordIndex === this.gameSettingsService.maxNumberOfTries.Value - 1;
  }

  private resetGrid() {
    this.currentUserWordIndex = 0;
    this.userWords = []; 
    for(let i = 0; i < this.gameSettingsService.maxNumberOfTries.Value; i++) {
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

  public revealRandomUnfoundLetter() {
    const solutionWord: string = this.solutionWords[this.currentSolutionWordIndex];
    const userWord: Word = this.userWords[this.currentUserWordIndex];
    const unfoundLetterIndexes: number[] = [];
    for (let i = 0; i < solutionWord.length; i++) {
      if (userWord.letters[i].value === "") {
        unfoundLetterIndexes.push(i);
      }
    }
    const randomIndex: number = unfoundLetterIndexes[Math.floor(Math.random() * unfoundLetterIndexes.length)];
    const randomLetter: string = solutionWord[randomIndex];
    userWord.setLetterByIndex(randomIndex, new CorrectLetter(randomLetter));
    if (userWord.isComplete()) {
      this.moveToNextRow();
    }
  }
}