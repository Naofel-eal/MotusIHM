import { CommonModule } from "@angular/common";
import { Component, HostListener, Inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpeedDialModule } from "primeng/speeddial";
import { ToastModule } from "primeng/toast";
import { SettingsName } from "src/clean/core/application/enum/settings-name";
import { TextConstants } from "src/clean/core/application/enum/text-constants";
import { GAME_SERVICE_TOKEN, SETTINGS_CACHE_SERVICE_TOKEN } from "src/clean/core/application/module/core-injection-tokens";
import { ISettingsCacheService } from "src/clean/core/application/service/cache/settings/isettings-cache";
import { IGameService } from "src/clean/core/application/service/game/igame-service";
import { asyncTimeout } from "src/clean/core/application/shared/async-timeout";
import { Letter } from "src/clean/core/domain/model/letter/letter";
import { PendingLetter } from "src/clean/core/domain/model/letter/pending-letter";
import { LetterUtils } from "src/clean/core/domain/model/letter/utils/letter-utils";
import { UserWord } from "src/clean/core/domain/model/word/user-word";
import { fadeInOut, letterAnimation } from "../../animations/animations";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    SpeedDialModule,
    ToastModule
  ],
  providers: [
    MessageService,
    DialogService
  ],
  animations: [fadeInOut, letterAnimation],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  public isLoading: boolean = true;
  public spinItems: any[] = [];
  
  public constructor(
    @Inject(GAME_SERVICE_TOKEN) public gameService: IGameService,
    @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsCacheService: ISettingsCacheService,
    public messageService: MessageService,
  ) {
    this.gameService.init();
    this.initSpinItems();
  }

  @HostListener('window:keyup', ['$event'])
  public async keyEvent(event: KeyboardEvent) {
    if (!this.gameService.canUserPlay) {
      event.stopPropagation();
      return;
    }

    const key = event.key.toUpperCase();

    if (LetterUtils.isLetterValid(key)) {
      this.gameService.CurrentUserWord.addLetter(new PendingLetter(key));

      if (this.gameService.CurrentUserWord.IsComplete) {
        this.gameService.canUserPlay = false;
  
        const isWordValid = await this.gameService.validateCurrentUserWord();

        if (isWordValid) {
          await this.animateLetters();
  
          if(this.gameService.isLastRow || this.gameService.hasWin) {
            await this.gameService.newGame(true);
          }
          else {
            this.gameService.nextRow();
          }
        }
        else {
          await asyncTimeout(1000);
          this.gameService.clearCurrentUserWord();
        }
      }
    }
    else if (key === 'BACKSPACE') {
      this.gameService.removeLetter();
    }
    this.gameService.canUserPlay = true;
  }

  public initSpinItems() {
    this.spinItems = [
      {
          icon: 'pi pi-refresh',
          tooltipOptions: {
            tooltipLabel: 'New game'
          },
          command: () => {
              this.gameService.newGame(false);
          }
      },
      {
        icon: 'pi pi-key',
        tooltipOptions: {
          tooltipLabel: 'Tip'
        },
        command: () => {
          // this.gameService.revealRandomUnfoundLetter();
        }
      },
      {
        icon: 'pi pi-cog',
        tooltipOptions: {
          tooltipLabel: 'Settings'
        },
        command: () => {
          // this.gameService.canPlay = false;
          // this.showSettings();
        }
      },
      {
        icon: 'pi pi-info',
        tooltipOptions: {
          tooltipLabel: 'Game rules'
        },
        command: () => {
          // this.gameService.canPlay = false;
          // this.showRules();
        }
      },
      {
        icon: 'pi pi-github',
        tooltipOptions: {
          tooltipLabel: 'My Github'
        },
        target: '_blank',
        url: 'https://github.com/Naofel-eal',
        command: () => {
          // this.messageService.add({ severity: 'info', summary: 'Github', detail: 'Creator: Naofel EL ALOUANI' });
        }
      }
    ];
  }

  private async animateLetters(): Promise<void> {
    const currentWord: UserWord = this.gameService.CurrentUserWord;
    const solutionWordValue: string = this.gameService.CurrentSolutionWord.Value;

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
        await asyncTimeout(this._settingsCacheService.getSettingByKey(SettingsName.LETTER_ANIMATION_DURATION_IN_MS)!.Value);
      }
    }
  }
}
