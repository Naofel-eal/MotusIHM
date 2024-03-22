import { WordGrid } from "src/core/domain/model/word-grid/word-grid";
import { SolutionWord } from "src/core/domain/model/word/solution-word";
import { UserWord } from "src/core/domain/model/word/user-word";

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

    nextRow(): Promise<void>;

    onKeyPress(event: KeyboardEvent): Promise<void>

    handleCompleteWord(): Promise<void>

    animateLetters(): Promise<void>

    restoreValidLetters(): void

    revealRandomUnfoundLetter(): void

    get hasWin(): boolean

    get isLastRow(): boolean;

    get CurrentSolutionWord(): SolutionWord;

    get CurrentUserWord(): UserWord;
}