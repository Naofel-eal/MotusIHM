import { Injectable } from '@angular/core';
import { WordService } from '../world-service/word-service.service';
import { Word } from '../../models/word.model';
import { Message } from '../../enumerations/message.enum';
import { LetterStyle } from '../../enumerations/letter-style.enum';
import { Letter } from '../../models/letter.model';
import { MessageService } from 'primeng/api';
import { APIWord } from '../../models/API-word';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public words: Word[] = [];
  public solutionWords: string[] = [];
  public selectedSolutionWord: number = 0;
  public selectedRow: number = 0;
  public readonly TEST_LIMIT: number = 7;
  public readonly DELAY_BEFORE_NEW_GAME_IN_MS: number = 3000;
  public isLoading: boolean = true;

  constructor(private wordService: WordService, private messageService: MessageService) { }

  public async newGame() {
    this.words = [];
    this.selectedRow = 0;
    if (this.isFirstGame()) {
      this.isLoading = true;
      this.generateNewWords().then((solutions: string[]) => {
        this.solutionWords = solutions;
        this.addWordsToGrid();
        console.log(this.solutionWords)
      });
    }
    else {
      this.selectedSolutionWord++;
      if (this.isLastWord()) {
        this.generateNewWords().then((solutions: string[]) => {
          this.solutionWords = this.solutionWords.concat(solutions);
        });
      }
      this.addWordsToGrid();
    }
  }

  public async generateNewWords(): Promise<string[]> {
    this.messageService.add({severity:'info', summary: Message.STARTING, detail: Message.FECTHING_WORD});
    const startTime: number = Date.now();
    return new Promise((resolve, reject) => {
      let solutions: string[] = [];
      this.wordService.generateRandomWords().subscribe(response => {
        const apiWords: APIWord[] = JSON.parse(response);
        for(let i = 0; i < apiWords.length; i++) {
          const name: string = apiWords[i].name;
          solutions.push(this.wordService.normalize(name));
        }
  
        const endTime: number = Date.now();
        this.waitAfterFetchingWords(startTime, endTime);
        resolve(solutions);
      }); 
    });
  }

  public addLetter(key: string) {
    const letter: Letter = new Letter(key, LetterStyle.EMPTY)
    this.words[this.selectedRow].addLetter(letter);
  }

  public moveToNextRow() {
    if(this.hasWon()) {
      this.win();
    }
    else if (this.isLastRow()) {
      this.lose()
    }
    else {
      this.selectedRow++;
      this.restoreValidLetters();
    }
  }

  public removeLetter() {
    this.words[this.selectedRow].removeLetter();
  }

  public win() {
    this.messageService.add({severity:'success', summary: Message.WIN, detail: Message.A_NEW_GAME_WILL_START});
    setTimeout(() => {
      this.newGame();
    }, this.DELAY_BEFORE_NEW_GAME_IN_MS);
  }

  public lose() {
    this.messageService.add({severity:'error', summary: Message.LOSE, detail: Message.THE_WORD_WAS + this.solutionWords[this.selectedSolutionWord]});
    setTimeout(() => {
      this.newGame();
    }, this.DELAY_BEFORE_NEW_GAME_IN_MS);
  }

  private hasWon(): boolean {
    return this.words[this.selectedRow].value === this.solutionWords[this.selectedSolutionWord];
  }

  private isLastRow(): boolean {
    return this.selectedRow === this.TEST_LIMIT - 1;
  }

  private addWordsToGrid() {
    this.words = []; 
    for(let i = 0; i < this.TEST_LIMIT; i++) {
      this.words.push(new Word(this.solutionWords[this.selectedSolutionWord].length));
    }
  }

  private restoreValidLetters() {
    const previousWord: Word = this.words[this.selectedRow - 1];
    for(let i = 0; i < previousWord.letters.length; i++) {
      const currentLetter: Letter = previousWord.getLetterByIndex(i); 
      if(currentLetter.style === LetterStyle.CORRECT) {
        this.words[this.selectedRow].setLetterByIndex(i, currentLetter)
      }
    }
  }

  private isFirstGame(): boolean {
    return this.solutionWords.length === 0;
  }

  private isLastWord(): boolean {
    return this.selectedSolutionWord === this.solutionWords.length - 1;
  }

  private waitAfterFetchingWords(startTime: number, endTime: number) {
    const deltaTimeInSeconds: number = (endTime - startTime) / 1000;
    if (deltaTimeInSeconds < 1) {
      setTimeout(() => {
        this.isLoading = false;
      }, (1 - deltaTimeInSeconds) * 1000);
    }
    else {
      this.isLoading = false;
    }
  }
}