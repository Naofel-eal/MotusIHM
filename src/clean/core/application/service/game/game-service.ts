import { Inject, Injectable } from "@angular/core";
import { FETCH_WORD_USECASE_TOKEN, SETTINGS_CACHE_SERVICE_TOKEN, SOLUTION_WORD_CACHE_TOKEN, VALIDATE_WORD_USECASE_TOKEN } from "../../module/core-injection-tokens";
import { IFetchWordUseCase } from "../../usecase/fetchWord/ifetch-word-usecase";
import { IValidateWordUseCase } from "../../usecase/validateWord/ivalidate-word-usecase";
import { ISettingsCacheService } from "../cache/settings/isettings-cache";
import { SettingsName } from "../../enum/settings-name";
import { PendingLetter } from "src/clean/core/domain/model/letter/pending-letter";
import { WordGrid } from "src/clean/core/domain/model/word-grid/word-grid";
import { IGameService } from "./igame-service";
import { ISolutionWordsCache } from "../cache/solutionWord/isolution-word-cache";
import { asyncTimeout } from "../../shared/async-timeout";
import { UserWord } from "src/clean/core/domain/model/word/user-word";
import { SolutionWord } from "src/clean/core/domain/model/word/solution-word";
import { MessageService } from "primeng/api";
import { TextConstants } from "../../enum/text-constants";
import { Language } from "src/clean/core/domain/model/language/language";

@Injectable()
export class GameService implements IGameService {
    public isLoading: boolean = true;
    public canUserPlay: boolean = false;
    public wordGrid!: WordGrid;
  
    public constructor(
        @Inject(FETCH_WORD_USECASE_TOKEN) private _fetchWordUseCase: IFetchWordUseCase,
        @Inject(VALIDATE_WORD_USECASE_TOKEN)  private _validateWordUseCase: IValidateWordUseCase,
        @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsCache: ISettingsCacheService,
        @Inject(SOLUTION_WORD_CACHE_TOKEN) private _solutionWordsCache: ISolutionWordsCache,
        public messageService: MessageService
    ) { }
    
    public async init(): Promise<void> {
        const start_time = Date.now();

        await this.initGrid();
        
        const timeToLoad = Date.now() - start_time;
        await asyncTimeout(1500 - timeToLoad);
        this.isLoading = false;
        this.canUserPlay = true;
    }

    public async initGrid(): Promise<void> {
        if (this._solutionWordsCache.mustLoadNewWords()) {
            await this.loadNewWords();
        }

        const currentSolutionWord = this._solutionWordsCache.CurrentSolutionWord;
        const numberOfLinesSetting = this._settingsCache.getSettingByKey(SettingsName.NUMBER_OF_TRIES);

        this.wordGrid = new WordGrid(numberOfLinesSetting!.Value, currentSolutionWord.Length);
    }

    public async loadNewWords(): Promise<void> {
        const language = this._settingsCache.getSettingByKey(SettingsName.GAME_LANGUAGE)!.Value;
        const numberOfWordsToLoad = this._settingsCache.getSettingByKey(SettingsName.NUMBER_OF_WORD_LOADED_AT_ONCE)!.Value;
        
        const words = await this._fetchWordUseCase.execute(language, numberOfWordsToLoad);
        this._solutionWordsCache.addSolutionWords(words);
    }
  
    public async validateCurrentUserWord(): Promise<boolean> {
        const language: Language = this._settingsCache.getSettingByKey(SettingsName.GAME_LANGUAGE)!.Value;
        const userWord = this.wordGrid.CurrentUserWord;

        return await this._validateWordUseCase.execute(language, userWord);
    }   

    public addLetter(letter: string): void {
        this.wordGrid.CurrentUserWord.addLetter(new PendingLetter(letter));
    }
    
    public removeLetter(): void {
        this.wordGrid.CurrentUserWord.removeLetter();
    }

    public clearCurrentUserWord(): void {
        this.wordGrid.CurrentUserWord.clear();
    }

    public async newGame(wait: boolean): Promise<void> {
        if (this.hasWin) {
            this.messageService.add({severity:'success', summary: TextConstants.WIN, detail: TextConstants.A_NEW_GAME_WILL_START});
        }
        else {
            this.messageService.add({severity:'error', summary: TextConstants.LOSE, detail: TextConstants.THE_WORD_WAS + this.CurrentSolutionWord});
        }

        if (wait) {
            await asyncTimeout(this._settingsCache.getSettingByKey(SettingsName.DELAY_BEFORE_NEW_GAME_IN_MS)!.Value);
        }
        this._solutionWordsCache.nextWord();
        this.initGrid();
    }

    public nextRow(): void {
        this.wordGrid.nextRow();
    }

    public get hasWin(): boolean {
        return this.CurrentUserWord.Value === this._solutionWordsCache.CurrentSolutionWord.Value;
    }

    public get CurrentSolutionWord(): SolutionWord {
        return this._solutionWordsCache.CurrentSolutionWord;
    }

    public get CurrentUserWord(): UserWord {
        return this.wordGrid.CurrentUserWord;
    }

    public get isLastRow(): boolean {
        return this.wordGrid.CurrentWordIndex === this.wordGrid.words.length - 1;
    }
}