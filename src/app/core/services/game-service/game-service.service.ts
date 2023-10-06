import { Injectable } from '@angular/core';
import { WordService } from '../world-service/word-service.service';
import { Word } from '../../models/word.model';
import { Message } from '../../enumerations/message.enum';
import { LetterStyle } from '../../enumerations/letter-style.enum';
import { Letter } from '../../models/letter.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public words: Word[] = [];
  public solutionWord: string = '';
  public selectedRow: number = 0;
  public readonly testLimit: number = 7;
  public isLoading: boolean = true;

  constructor(private wordService: WordService, private messageService: MessageService) {
    this.newGame();
  }

  public newGame() {
    const startTime: number = Date.now();
    this.isLoading = true;
    this.words = [];
    this.solutionWord = '';
    this.selectedRow = 0;

    this.wordService.generateRandomWord().subscribe(response => {
      const word: string = JSON.parse(response)[0].name;
      this.solutionWord = this.wordService.normalize(word);

      for(let i = 0; i < this.testLimit; i++) {
        this.addWord();
      }

      const endTime: number = Date.now();
      const deltaTimeInSeconds: number = (endTime - startTime) / 1000;
      if (deltaTimeInSeconds < 1) {
        setTimeout(() => {
          this.isLoading = false;
        }, (1 - deltaTimeInSeconds) * 1000);
      }
      else {
        this.isLoading = false;
      }
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
    //alert(Message.WIN.toUpperCase());
    this.messageService.add({severity:'success', summary: Message.WIN, detail: Message.A_NEW_GAME_WILL_START});
    this.newGame();
  }

  public lose() {
    this.messageService.add({severity:'error', summary: Message.LOSE, detail: Message.THE_WORD_WAS + this.solutionWord});
    this.newGame();
  }

  private hasWon(): boolean {
    return this.words[this.selectedRow].value === this.solutionWord;
  }

  private isLastRow(): boolean {
    return this.selectedRow === this.testLimit - 1;
  }

  private addWord() {
    this.words.push(new Word(this.solutionWord.length));
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
}