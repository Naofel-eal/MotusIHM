import { WordGrid } from "src/clean/core/domain/model/word-grid/word-grid";
import { SolutionWord } from "src/clean/core/domain/model/word/solution-word";
import { UserWord } from "src/clean/core/domain/model/word/user-word";

export interface IGameService {
    isLoading: boolean;
    canUserPlay: boolean;
    wordGrid: WordGrid;

    loadNewWords(): Promise<void>;

    validateCurrentUserWord(): Promise<boolean>;

    addLetter(letter: string): void;

    removeLetter(): void;

    init(): Promise<void>;

    clearCurrentUserWord(): void;

    newGame(wait: boolean): Promise<void>;

    nextRow(): void;

    get hasWin(): boolean

    get isLastRow(): boolean;

    get CurrentSolutionWord(): SolutionWord;

    get CurrentUserWord(): UserWord;
}