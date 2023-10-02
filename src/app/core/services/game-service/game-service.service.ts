import { Injectable } from '@angular/core';
import { WordService } from '../world-service/word-service.service';
import { Letter } from '../../models/letter.model';
import { LetterStyle } from '../../enumerations/letter-style.enum';
import { Word } from '../../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public words: Word[] = [];
  public solutionWord: string = '';
  private tryLimit: number = 0;
  public selectedRow: number = 0;
  private selectedColumn: number = 0;

  constructor(private wordService: WordService) {
    this.init();
  }

  public init() {
    this.words = [];
    this.tryLimit = 5;
    this.solutionWord = '';
    this.selectedRow = 0;
    this.selectedColumn = 0;

    this.wordService.generateRandomWord().subscribe(response => {
      const word: string = this.wordService.normalize(JSON.parse(response)[0].name);
      this.solutionWord = word;

      console.log(this.solutionWord);
      const wordLength: number = this.solutionWord.length;
      for (let i = 0; i < this.tryLimit; i++) {
        this.words.push(new Word(wordLength));
      }
    });
  }

  public addLetter(key: string) {
    this.words[this.selectedRow].letters[this.selectedColumn].value = key;
    this.selectedColumn++;
  }

  public moveToNextRow() {
    console.log(this.words[this.selectedRow]);
    this.checkForWin();
    if (!this.isLastRow()) {
      this.selectedRow++;
      this.selectedColumn = 0;
    }
    else {
      this.checkForLose();
    }
  }

  public removeLetter() {
    if (!this.isFirstColumn()) {
      this.selectedColumn--;
      this.words[this.selectedRow].letters[this.selectedColumn].reset();
    }
  }

  public checkForWin() {
    if(this.hasWon()) {
      setTimeout(() => {
        alert('You win!');
        this.init();
      }, 1)
    }
  }

  public checkForLose() {
    if (!this.hasWon()) {
      setTimeout(() => {
        alert('You lose!');
        this.init();
      }, 1)
    }
  }

  private hasWon(): boolean {
    return this.words[this.selectedRow].value === this.solutionWord;
  }

  private isLastRow(): boolean {
    return this.selectedRow === this.tryLimit - 1;
  }

  private isFirstColumn(): boolean {
    return this.selectedColumn === 0;
  }

  public isLastColumn(): boolean {
    return this.selectedColumn === this.solutionWord.length;
  }
}