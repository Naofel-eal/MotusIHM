import { SettingsCode } from "src/core/application/enum/settings-code";
import { Setting } from "../setting/setting";
import { WordGrid } from "../word-grid/word-grid";
import { SolutionWord } from "../word/solution-word";
import { Language } from "../language/language";

export class Game {
    public wordGrid!: WordGrid;
    public solutionWords: SolutionWord[] = [];
    public currentSolutionWordIndex: number;
    public numberOfLines: number;
    public availableLanguages: Language[] = [];
    public selectedLanguage!: Language;

    public constructor(numberOfLines: number) {
        this.currentSolutionWordIndex = -1;
        this.numberOfLines = numberOfLines;
    }

    public initLanguage(availableLanguages: Language[]): void {
        this.availableLanguages = availableLanguages;
        this.selectedLanguage = availableLanguages.filter((language) => language.isoCode === "FR")[0];
    }

    public nextRound(): void {
        this.currentSolutionWordIndex += 1;
        this.newGrid();
    }

    public newGrid() {
        this.currentSolutionWordIndex += 1;
        this.wordGrid = new WordGrid(this.numberOfLines, this.solutionWords[this.currentSolutionWordIndex], this.selectedLanguage);
    }

    public addSolutioWords(solutionWords: SolutionWord[]): void {
        this.solutionWords = this.solutionWords.concat(solutionWords);
    }

    public handleSettingsChanges(settings: Setting<any>[]): void {
        this.numberOfLines = settings.filter((setting) => setting.code === SettingsCode.NUMBER_OF_TRIES)[0].value;
    }

    public get mustLoadNewWords(): boolean {
        return this.solutionWords.length === 0 || this.currentSolutionWordIndex === this.solutionWords.length - 2;
    }

    public get currentSolutionWord(): SolutionWord {
        return this.solutionWords[this.currentSolutionWordIndex];
    }

    public get canUserPlay(): boolean {
        return this.wordGrid.canUserPlay;
    }

    public set canUserPlay(canPlay: boolean) {
        this.wordGrid.canUserPlay = canPlay;
    }
}