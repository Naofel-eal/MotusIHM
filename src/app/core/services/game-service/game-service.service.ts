import { Injectable } from '@angular/core';
import { WordService } from '../world-service/word-service.service';
import { Letter } from '../../models/letter.model';
import { LetterStyle } from '../../enumerations/letter-style.enum';
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

  constructor(private wordService: WordService) {
    this.init();
  }

  public init() {
    this.words = [];
    this.solutionWord = '';
    this.selectedRow = 0;
    this.selectedColumn = 0;

    this.wordService.generateRandomWord().subscribe(response => {
      const word: string = this.wordService.normalize(JSON.parse(response)[0].name);
      this.solutionWord = word;

      console.log(this.solutionWord);
      const wordLength: number = this.solutionWord.length;
      this.addWord();
    });
  }

  public addLetter(key: string) {
    this.words[this.selectedRow].letters[this.selectedColumn].value = key;
    this.selectedColumn++;
  }

  public moveToNextRow() {
    if(this.hasWon()) {
      this.win();
    }
    else {
      this.selectedRow++;
      this.selectedColumn = 0;
      this.addWord();
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

  private hasWon(): boolean {
    return this.words[this.selectedRow].value === this.solutionWord;
  }

  private isFirstColumn(): boolean {
    return this.selectedColumn === 0;
  }

  public isLastColumn(): boolean {
    return this.selectedColumn === this.solutionWord.length;
  }

  private addWord() {
    this.words.push(new Word(this.solutionWord.length));
  }
}