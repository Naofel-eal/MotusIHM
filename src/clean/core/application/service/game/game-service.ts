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

@Injectable()
export class GameService implements IGameService {
    public isLoading: boolean = true;
    public wordGrid!: WordGrid;
  
    public constructor(
        @Inject(FETCH_WORD_USECASE_TOKEN) private _fetchWordUseCase: IFetchWordUseCase,
        @Inject(VALIDATE_WORD_USECASE_TOKEN)  private _validateWordUseCase: IValidateWordUseCase,
        @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsCache: ISettingsCacheService,
        @Inject(SOLUTION_WORD_CACHE_TOKEN) private _solutionWordsCache: ISolutionWordsCache
    ) { }
    
    public async initGrid(): Promise<void> {
        await this.loadNewWords();

        const currentSolutionWord = this._solutionWordsCache.CurrentSolutionWord;
        const numberOfLinesSetting = this._settingsCache.getSettingByKey(SettingsName.NUMBER_OF_TRIES);

        this.wordGrid = new WordGrid(numberOfLinesSetting!.Value, currentSolutionWord.Length);
        this.isLoading = false;
    }

    public async loadNewWords(): Promise<void> {
        const language = this._settingsCache.getSettingByKey(SettingsName.GAME_LANGUAGE)!.Value;
        const numberOfWordsToLoad = this._settingsCache.getSettingByKey(SettingsName.NUMBER_OF_WORD_LOADED_AT_ONCE)!.Value;
        
        const words = await this._fetchWordUseCase.execute(language, numberOfWordsToLoad);
        this._solutionWordsCache.addSolutionWords(words);
    }
  
    public addLetter(letter: string): void {
        this.wordGrid.CurrentUserWord.addLetter(new PendingLetter(letter));
    }
    
    public removeLetter(): void {
        this.wordGrid.CurrentUserWord.removeLetter();
    }
}