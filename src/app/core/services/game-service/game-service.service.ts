import { Injectable } from '@angular/core';
import { WordService } from '../world-service/word-service.service';
import { Word } from '../../models/word.model';
import { Message } from '../../enumerations/message.enum';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public words: Word[] = [];
  public solutionWord: string = '';
  public selectedRow: number = 0;
  private selectedColumn: number = 0;
  private testLimit: number = 0;

  constructor(private wordService: WordService) {
    this.init();
  }

  public init() {
    this.words = [];
    this.solutionWord = '';
    this.selectedRow = 0;
    this.selectedColumn = 0;
    this.testLimit = 7;

    this.wordService.generateRandomWord().subscribe(response => {
      const word: string = JSON.parse(response)[0].name;
      this.solutionWord = this.wordService.normalize(word);

      for(let i = 0; i < this.testLimit; i++) {
        this.addWord();
      }
    });
  }

  public addLetter(key: string) {
    this.words[this.selectedRow].letters[this.selectedColumn].value = key.toUpperCase();
    this.selectedColumn++;
  }

  public moveToNextRow() {
    if(this.hasWon()) {
      this.win();
    }
    else {
      if (this.isLastRow()) {
        this.lose()
      }
      else {
        this.selectedRow++;
        this.selectedColumn = 0;
      }
    }
  }

  public removeLetter() {
    if (!this.isFirstColumn()) {
      this.selectedColumn--;
      this.words[this.selectedRow].letters[this.selectedColumn].reset();
    }
  }

  public win() {
    setTimeout(() => {
      alert(Message.WIN);
      this.init();
    }, 1)
  }

  public lose() {
    setTimeout(() => {
      alert(Message.LOSE);
      this.init();
    }, 1)
  }

  private hasWon(): boolean {
    return this.words[this.selectedRow].value === this.solutionWord;
  }

  private isFirstColumn(): boolean {
    return this.selectedColumn === 0;
  }

  public isLastColumn(): boolean {
    return this.selectedColumn === this.solutionWord.length;
  }

  private isLastRow(): boolean {
    return this.selectedRow === this.testLimit - 1;
  }

  private addWord() {
    this.words.push(new Word(this.solutionWord.length));
  }
}