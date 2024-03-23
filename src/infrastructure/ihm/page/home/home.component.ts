import { Component, HostListener, Inject } from '@angular/core';
import { GridComponent } from './component/grid/grid.component';
import { FETCH_WORD_USECASE_TOKEN, SETTINGS_CACHE_SERVICE_TOKEN } from 'src/core/application/module/core-injection-tokens';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SettingsComponent } from './component/settings/settings.component';
import { MessageService } from 'primeng/api';
import { RulesComponent } from './component/rules/rules.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Game } from 'src/core/domain/model/game/game';
import { ISettingsCacheService } from 'src/core/application/service/cache/settings/isettings-cache';
import { SettingsName } from 'src/core/application/enum/settings-name';
import { Setting } from 'src/core/domain/model/setting/setting';
import { IFetchWordUseCase } from 'src/core/application/usecase/fetchWord/ifetch-word-usecase';
import { Language } from 'src/core/domain/model/language/language';
import { Subject } from 'rxjs';
import { TextConstants } from '../../constants/text-constants';
import { asyncTimeout } from 'src/core/application/shared/async-timeout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GridComponent,
    SpeedDialModule,
    ProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public isLoading!: boolean;
  public game: Game;
  public spinItems: any[] = [];
  public keyPressEvent: Subject<string>;
  private _ref: DynamicDialogRef | undefined;

  public constructor(
    @Inject(FETCH_WORD_USECASE_TOKEN) private _fetchWordUseCase: IFetchWordUseCase,
    @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsService: ISettingsCacheService,
    private _dialogService: DialogService,
    private _messageService: MessageService
  ) {
    const numberOfGridLinesSetting: Setting<number> =  this._settingsService.getSettingByKey(SettingsName.NUMBER_OF_TRIES)!;
    this.keyPressEvent = new Subject<string>();
    this.game = new Game(numberOfGridLinesSetting.value);

    this.fetchWordsAndAddThemToTheGame(true);
    this.initSpinItems();
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

  public async fetchWordsAndAddThemToTheGame(shouldInitTheGrid: boolean) {
    this.isLoading = true

    const languageSetting: Setting<Language> = this._settingsService.getSettingByKey(SettingsName.GAME_LANGUAGE)!;
    const numberOfWordsToLoadSetting: Setting<number> = this._settingsService.getSettingByKey(SettingsName.NUMBER_OF_WORD_LOADED_AT_ONCE)!;

    this._fetchWordUseCase.execute(languageSetting.value, numberOfWordsToLoadSetting.value)
      .then(async (solutionWords) => {
        this.game.addSolutioWords(solutionWords);
        
        if(shouldInitTheGrid) {
          this.game.newGrid()
        }

        this.isLoading = false;
        this.game.canUserPlay = true;
    });
  }

  public async handleWinOrLose(event: boolean) {
    if (event) 
      this._messageService.add({ severity: 'success', summary: TextConstants.WIN, detail: TextConstants.A_NEW_GAME_WILL_START});
    else
      this._messageService.add({ severity: 'error', summary: TextConstants.LOSE, detail: TextConstants.THE_WORD_WAS + ' : ' + this.game.currentSolutionWord.value});
    
    await asyncTimeout(this._settingsService.getSettingByKey(SettingsName.DELAY_BEFORE_NEW_GAME_IN_MS)!.value);
    await this.nextWord()
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
          tooltipOptions: {
            tooltipLabel: 'New game'
          },
          command: async () => {
              await this.nextWord();
          }
      },
      {
        icon: 'pi pi-key',
        tooltipOptions: {
          tooltipLabel: 'Tip'
        },
        command: () => {
          this.game.wordGrid.revealRandomUnfoundLetter();
        }
      },
      {
        icon: 'pi pi-cog',
        tooltipOptions: {
          tooltipLabel: 'Settings'
        },
        command: () => {
          this.game.canUserPlay = false;
          this.showSettings();
        }
      },
      {
        icon: 'pi pi-info',
        tooltipOptions: {
          tooltipLabel: 'Game rules'
        },
        command: () => {
          this.game.canUserPlay = false;
          this.showRules();
        }
      },
      {
        icon: 'pi pi-github',
        tooltipOptions: {
          tooltipLabel: 'My Github'
        },
        target: '_blank',
        url: 'https://github.com/Naofel-eal'
      }
    ];
  }

  public showSettings(): void {
    this._ref = this._dialogService.open(SettingsComponent, {
      header: 'Game Settings',
      width: 'fit-content',
      contentStyle: {"overflow": "auto"}
    });
    this._ref.onClose.subscribe(() => {
      this._messageService.add({ severity: 'info', summary: 'Settings saved', detail: 'Settings have been saved ! '}); 
      this.game.canUserPlay = true;
    });
  }

  public showRules(): void {
    this._ref = this._dialogService.open(RulesComponent, {
      header: 'Game rules',
      width: 'fit-content',
      contentStyle: {"overflow": "auto"}
    });
    this._ref.onClose.subscribe(() => {
      this.game.canUserPlay = true;  
    });
  }
}
