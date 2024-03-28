import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from './component/grid/grid.component';
import { FETCH_WORD_USECASE_TOKEN, GET_ALL_LANGUAGES_USECASE_TOKEN, SETTINGS_CACHE_SERVICE_TOKEN } from 'src/core/application/module/core-injection-tokens';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SettingsComponent } from './component/settings/settings/settings.component';
import { MessageService } from 'primeng/api';
import { RulesComponent } from './component/rules/rules.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Game } from 'src/core/domain/model/game/game';
import { ISettingsCacheService } from 'src/core/application/service/cache/settings/isettings-cache';
import { SettingsCode } from 'src/core/application/enum/settings-code';
import { Setting } from 'src/core/domain/model/setting/setting';
import { IFetchWordUseCase } from 'src/core/application/usecase/fetchWord/ifetch-word-usecase';
import { Language } from 'src/core/domain/model/language/language';
import { Observable, Subject, forkJoin } from 'rxjs';
import { asyncTimeout } from 'src/core/application/shared/async-timeout';
import { IGetAllLanguagesUseCase } from 'src/core/application/usecase/getAllLanguages/iget-all-languages-usecase';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GridComponent,
    SpeedDialModule,
    ProgressSpinnerModule,
    DropdownModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = true;
  public game!: Game;
  public spinItems: any[] = [];
  public keyPressEvent!: Subject<string>;
  public revealLetterEvent!: Subject<void>;
  private _ref: DynamicDialogRef | undefined;
  public texts: any = {};

  public constructor(
    @Inject(FETCH_WORD_USECASE_TOKEN) private _fetchWordUseCase: IFetchWordUseCase,
    @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsService: ISettingsCacheService,
    @Inject(GET_ALL_LANGUAGES_USECASE_TOKEN) private _getAllLanguagesUseCase: IGetAllLanguagesUseCase,
    private _dialogService: DialogService,
    private _messageService: MessageService,
    private translateService: TranslateService
  ) { }

  public async ngOnInit(): Promise<void> {
    const numberOfGridLinesSetting: Setting<number> =  this._settingsService.getSettingByKey(SettingsCode.NUMBER_OF_TRIES)!;
    this.game = new Game(numberOfGridLinesSetting.value);
    this.keyPressEvent = new Subject<string>();
    this.revealLetterEvent = new Subject<void>();
    
    this.loadTranslations();
    await this.getLanguagesAndAddThemToTheGame();
    await this.fetchWordsAndAddThemToTheGame(true);
    this.initSpinItems();
  }

  private loadTranslations() {
    const keys = [
      'MESSAGE_SERVICE.WIN',
      'MESSAGE_SERVICE.LOSE',
      'TOOLTIP.NEW_GAME',
      'TOOLTIP.REVEAL_UNFOUND_LETTER',
      'TOOLTIP.GAME_SETTINGS',
      'TOOLTIP.GAME_RULES',
      'TOOLTIP.MY_GITHUB',
      'GAME_SETTINGS_COMPONENT.GAME_SETTINGS',
      'GAME_RULES_COMPONENT.GAME_RULES',
      'MESSAGE_SERVICE.A_NEW_GAME_WILL_START',
      'MESSAGE_SERVICE.THE_WORD_WAS',
      'GAME_RULES_COMPONENT.GAME_RULES',
      'GAME_SETTINGS_COMPONENT.GAME_SETTINGS',
      'GAME_SETTINGS_COMPONENT.SETTINGS_SAVED',
      'GAME_SETTINGS_COMPONENT.SETTINGS_HAVE_BEEN_SAVED'
    ];
    
    keys.forEach((key) => {
      // this.translateService.get(key).subscribe((value) => this.texts[key] = value)
      this.texts[key] = this.translateService.instant(key);
    });
  }
  

  @HostListener('window:keyup', ['$event'])
  public async keyEvent(event: KeyboardEvent) {
    if (!this.game.canUserPlay) {
      event.stopPropagation();
    }
    else {
      const key = event.key.toUpperCase();
      this.keyPressEvent.next(key);
    }
  }

  public async getAllLanguages(): Promise<Language[]> {
    return await this._getAllLanguagesUseCase.execute();
  }

  public async getNewWords() {
    this.isLoading = this.game.solutionWords.length === this.game.currentSolutionWordIndex || this.game.currentSolutionWordIndex === -1;
    const language: Language = this.game.selectedLanguage;
    const numberOfWordsToLoadSetting: Setting<number> = this._settingsService.getSettingByKey(SettingsCode.NUMBER_OF_WORD_LOADED_AT_ONCE)!;

    return await this._fetchWordUseCase.execute(language, numberOfWordsToLoadSetting.value);
  }

  public async getLanguagesAndAddThemToTheGame() {
    const languages: Language[] = await this.getAllLanguages();
    this.game.initLanguage(languages);
  }

  public async fetchWordsAndAddThemToTheGame(shouldInitTheGrid: boolean) {   
    const solutionWords = await this.getNewWords();
    this.game.addSolutioWords(solutionWords);
  
    if(shouldInitTheGrid) {
      this.game.newGrid()
    }

    this.isLoading = false;
    this.game.canUserPlay = true;
  }

  public async handleWinOrLose(event: boolean) {
    if (event) 
      this._messageService.add({ severity: 'success', summary: this.texts['MESSAGE_SERVICE.WIN'], detail: this.texts['MESSAGE_SERVICE.A_NEW_GAME_WILL_START']});
    else
      this._messageService.add({ severity: 'error', summary: this.texts['MESSAGE_SERVICE.LOSE'], detail: this.texts['MESSAGE_SERVICE.THE_WORD_WAS'] + ' : ' + this.game.currentSolutionWord.value});
    
    await asyncTimeout(this._settingsService.getSettingByKey(SettingsCode.DELAY_BEFORE_NEW_GAME_IN_MS)!.value);
    await this.nextWord()
  }

  public async onLanguageChange(event: any) {
    this.game.wordGrid.gameLanguage = event.value;
    const newWords = await this.getNewWords();

    this.game.handleLanguageChange(newWords);
    this.translateService.use(event.value.isoCode.toLowerCase());
    this.loadTranslations();
    this.initSpinItems();
  }

  public async nextWord() {
    if(this.game.mustLoadNewWords) {
      this.fetchWordsAndAddThemToTheGame(false);
    }
    this.game.newGrid();
    this.game.canUserPlay = true;
  }

  public initSpinItems() {
    this.spinItems = [
      {
          icon: 'pi pi-refresh',
          tooltipOptions: { tooltipLabel: this.texts['TOOLTIP.NEW_GAME'] },
          command: async () => { await this.nextWord(); }
      },
      {
          icon: 'pi pi-key',
          tooltipOptions: { tooltipLabel: this.texts['TOOLTIP.REVEAL_UNFOUND_LETTER'] },
          command: () => { this.revealLetterEvent.next(); }
      },
      {
          icon: 'pi pi-cog',
          tooltipOptions: { tooltipLabel: this.texts['TOOLTIP.GAME_SETTINGS'] },
          command: () => {
              this.game.canUserPlay = false;
              this.showSettings();
          }
      },
      {
          icon: 'pi pi-info',
          tooltipOptions: { tooltipLabel: this.texts['TOOLTIP.GAME_RULES'] },
          command: () => {
              this.game.canUserPlay = false;
              this.showRules();
          }
      },
      {
          icon: 'pi pi-github',
          tooltipOptions: { tooltipLabel: this.texts['TOOLTIP.MY_GITHUB'] },
          target: '_blank',
          url: 'https://github.com/Naofel-eal'
      }
    ];
  }

  public showSettings(): void {
    this._ref = this._dialogService.open(SettingsComponent, {
      header: this.texts['GAME_SETTINGS_COMPONENT.GAME_SETTINGS'],
      width: 'fit-content',
      contentStyle: {"overflow": "auto"},
    });
    this._ref.onClose.subscribe(() => {
      this.game.handleSettingsChanges(this._settingsService.allSettings)
      this._messageService.add({ severity: 'info', summary: this.texts['GAME_SETTINGS_COMPONENT.SETTINGS_SAVED'], detail: this.texts['GAME_SETTINGS_COMPONENT.SETTINGS_HAVE_BEEN_SAVED']}); 
      this.game.canUserPlay = true;
    });
  }

  public showRules(): void {
    this._ref = this._dialogService.open(RulesComponent, {
      header: this.texts['GAME_RULES_COMPONENT.GAME_RULES'],
      width: 'fit-content',
      contentStyle: {"overflow": "auto"}
    });
    this._ref.onClose.subscribe(() => {
      this.game.canUserPlay = true;  
    });
  }
}
