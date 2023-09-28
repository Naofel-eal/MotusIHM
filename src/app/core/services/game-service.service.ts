import { Injectable } from '@angular/core';
import { WordService } from './word-service.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public words: string[][] = [];
  private tryLimit: number = 5;
  public solutionWord: string = '';
  private selectedRow: number = 0;
  private selectedColumn: number = 0;

  constructor(private wordService: WordService) {
    this.wordService.generateRandomWord().subscribe(response => {
      const word: string = JSON.parse(response)[0].name;
      this.solutionWord = word;

      console.log(this.solutionWord);
      const wordLength: number = this.solutionWord.length;
      for (let i = 0; i < this.tryLimit; i++) {
        this.words.push(Array(wordLength).fill(''));
      }
    });
  }

  public addLetter(key: string) {
    if (this.selectedRow < this.tryLimit) {
      if(this.selectedColumn < this.solutionWord.length) {
        this.words[this.selectedRow][this.selectedColumn] = key;
        this.selectedColumn++;
      }
      else {
        this.selectedRow++;
        this.selectedColumn = 0;
        this.words[this.selectedRow][this.selectedColumn] = key;
        this.selectedColumn++;
      }
    }
    else {
      alert('You have reached the limit of tries');
    }

    if (this.words[this.selectedRow].join('') === this.solutionWord) {
      alert('You won!');
    }
  }

  public removeLetter() {
    if (this.selectedColumn > 0) {
      this.selectedColumn--;
      this.words[this.selectedRow][this.selectedColumn] = '';
    }
  }
}
