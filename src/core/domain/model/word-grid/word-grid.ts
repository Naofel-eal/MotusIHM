import { asyncTimeout } from "src/core/application/shared/async-timeout";
import { CorrectLetter } from "../letter/correct-letter";
import { EmptyLetter } from "../letter/empty-letter";
import { Letter } from "../letter/letter";
import { LetterUtils } from "../letter/utils/letter-utils";
import { SolutionWord } from "../word/solution-word";
import { UserWord } from "../word/user-word";

export class WordGrid {
    public canUserPlay: boolean;
    public words: UserWord[] = [];
    public currentUserWordIndex: number = 0;
    public solutionWord!: SolutionWord;

    public constructor(numberOfLines: number, solutionWord: SolutionWord) {
        this.solutionWord = solutionWord;
        for (let index = 0; index < numberOfLines; index++) {
            this.words.push(new UserWord(solutionWord.length));
        }
        this.canUserPlay = true;
    }

    public nextRow() {
        this.currentUserWordIndex += 1;
    }

    public revealRandomUnfoundLetter(): void {
        const solutionWord: string = this.solutionWord.value;
        const userWord: UserWord = this.currentUserWord;

        const indexesOfUnfoundLetters = userWord.letters
            .map((letter, index) => (letter.value === EmptyLetter.EMPTY_VALUE ? index : -1))
            .filter(index => index !== -1);

        const randomIndex: number = indexesOfUnfoundLetters[Math.floor(Math.random() * indexesOfUnfoundLetters.length)];
        const randomUnfoundLetter: string = solutionWord[randomIndex];

        userWord.setLetterByIndex(randomIndex, new CorrectLetter(randomUnfoundLetter));
    }

    public restoreValidLetters(): void {
        const previousWord: UserWord = this.previousUserWord;
        const currentUserWord = this.currentUserWord;

        previousWord.letters.forEach((currentLetter, i) => {
            if(currentLetter instanceof CorrectLetter) {
                currentUserWord.setLetterByIndex(i, currentLetter);
            }
        });
    }

    public addLetter(letter: Letter): void {
        this.currentUserWord.addLetter(letter);
    }

    public removeLetter(): void {
        this.currentUserWord.removeLetter();
    }

    public clearCurrentUserWord(): void {
        this.currentUserWord.clear();
    }

    public async animateLetters(letterAnimationDurationInMs: number): Promise<void> {
        const currentWord: UserWord = this.currentUserWord;
        const solutionWordValue: string = this.solutionWord.value;

        for (const [letterIndex, currentLetter] of currentWord.letters.entries()) {
            if (LetterUtils.isPendingLetter(currentLetter)) {
            const expectedLetter: string = solutionWordValue[letterIndex];
            let newLetter: Letter;
            
            if (currentLetter.value === expectedLetter) {
                newLetter = LetterUtils.toCorrectLetter(currentLetter);
            }
            else if (solutionWordValue.includes(currentLetter.value)) {
                newLetter = LetterUtils.toAlmostLetter(currentLetter);
            }
            else {
                newLetter = LetterUtils.toIncorrectLetter(currentLetter);
            } 

            currentWord.setLetterByIndex(letterIndex, newLetter);
            await asyncTimeout(letterAnimationDurationInMs);
            }
        }
    }

    public get previousUserWord() {
        return this.currentUserWordIndex === 0 ? this.currentUserWord : this.words[this.currentUserWordIndex - 1];
    }

    public get currentUserWord() {
        return this.words[this.currentUserWordIndex]
    }

    public get isLineCompleted() {
        return this.currentUserWord.isComplete;
    }

    public get isLastLine() {
        return this.currentUserWordIndex === this.words.length - 1
    }

    public get isCurrentWordTheSolution() {
        return this.currentUserWord.value === this.solutionWord.value;
    }
}