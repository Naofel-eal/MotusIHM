import { WordGrid } from "src/clean/core/domain/model/word-grid/word-grid";

export interface IGameService {
    isLoading: boolean;
    wordGrid: WordGrid;

    loadNewWords(): Promise<void>

    addLetter(letter: string): void

    removeLetter(): void

    initGrid(): Promise<void>
}