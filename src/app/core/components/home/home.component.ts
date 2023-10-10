import { Component, HostListener } from '@angular/core';
import { GameService } from '../../services/game-service/game-service.service';
import { Letter } from '../../models/letter/letter.model';
import { asyncTimeout } from '../../utils/async-timeout';
import { MessageService } from 'primeng/api';
import { fadeInOut, growInOut } from '../../animations/animations';
import { LetterUtils } from '../../utils/letter-utils';
import { TextConstants } from '../../constants/text-constants';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RulesComponent } from '../rules/rules.component';
import { SettingsComponent } from '../settings/settings.component';
import { GameSettingsService } from '../../services/game-settings/game-settings.service';
import { Setting } from '../../models/setting';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOut, growInOut],
  providers: [DialogService]
})
export class HomeComponent {
  private static readonly LETTER_ANIMATION_DURATION_IN_MS: number = 300;
  public title: string = TextConstants.TITLE.toUpperCase();
  private canPlay: boolean = true;
  public items: any[] = [];
  public ref: DynamicDialogRef | undefined;

  public constructor(
    public gameService: GameService,
    private dialogService: DialogService,
    public messageService: MessageService,
    private gameSettingsService: GameSettingsService
) { 
    this.items = [
      {
          icon: 'pi pi-refresh',
          tooltipOptions: {
            tooltipLabel: 'Restart game'
          },
          command: () => {
              this.gameService.newGame();
          }
      },
      {
        icon: 'pi pi-key',
        tooltipOptions: {
          tooltipLabel: 'Tip'
        },
        command: () => {
          this.gameService.revealRandomUnfoundLetter();
        }
      },
      {
        icon: 'pi pi-cog',
        tooltipOptions: {
          tooltipLabel: 'Settings'
        },
        command: () => {
          this.canPlay = false;
          this.showSettings();
        }
      },
      {
        icon: 'pi pi-info',
        tooltipOptions: {
          tooltipLabel: 'Game rules'
        },
        command: () => {
          this.canPlay = false;
          this.showRules();
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
          this.messageService.add({ severity: 'info', summary: 'Github', detail: 'Creator: Naofel EL ALOUANI' });
        }
      }
    ];
  }

  @HostListener('window:keyup', ['$event'])
  public async keyEvent(event: KeyboardEvent) {
    if (!this.canPlay) {
      return;
    }
    const key = event.key.toUpperCase();
    if(this.isValidCharacter(key)) {
      this.gameService.addLetter(key);
      if (this.gameService.userWords[this.gameService.currentUserWordIndex].isComplete()) {
        this.canPlay = false;
        await this.animateLetters();
        this.gameService.moveToNextRow();
        this.canPlay = true;
      }
    }
    else if (key === 'BACKSPACE') {
      this.gameService.removeLetter();
    } 
  }

  private async animateLetters(): Promise<void> {
    const currentWords = this.gameService.userWords[this.gameService.currentUserWordIndex];
    const solutionWord: string = this.gameService.solutionWords[this.gameService.currentSolutionWordIndex];

    for (const [letterIndex, currentLetter] of currentWords.letters.entries()) {
      if (LetterUtils.isPendingLetter(currentLetter)) {
        const expectedLetter: string = solutionWord[letterIndex];
        let newLetter: Letter;

        if (currentLetter.value === expectedLetter) {
          newLetter = LetterUtils.toCorrectLetter(currentLetter);
        }
        else if (solutionWord.includes(currentLetter.value)) {
          newLetter = LetterUtils.toAlmostLetter(currentLetter);
        }
        else {
          newLetter = LetterUtils.toIncorrectLetter(currentLetter);
        }
        currentWords.setLetterByIndex(letterIndex, newLetter);
        await asyncTimeout(this.gameSettingsService.letterAnimationDurationInMs.Value);
      }
    }
}

  private isValidCharacter(key: string): boolean {
    const regex: RegExp = /^[a-zA-Z]$/;
    return regex.test(key);
  }

  public isActive(rowIndex: number, colIndex: number): boolean {
    return this.gameService.currentUserWordIndex === rowIndex && this.gameService.userWords[this.gameService.currentUserWordIndex].getCurrentLetterIndex() === colIndex;
  }

  public showRules(): void {
    this.ref = this.dialogService.open(RulesComponent, {
      header: 'Game rules',
      width: 'fit-content',
      contentStyle: {"overflow": "auto"}
    });
    this.ref.onClose.subscribe(() => {
      this.canPlay = true;  
    });
  }

  public showSettings(): void {
    const maxWordLengthBeforeSettings: Setting = new Setting(this.gameSettingsService.maxWordLength.Enabled, this.gameSettingsService.maxWordLength.Value);

    this.ref = this.dialogService.open(SettingsComponent, {
      header: 'Game Settings',
      width: 'fit-content',
      contentStyle: {"overflow": "auto"}
    });
    this.ref.onClose.subscribe(() => {
      if(this.gameSettingsService.maxWordLength !== maxWordLengthBeforeSettings) {
        this.gameService.init();
      }
      else {
        this.messageService.add({ severity: 'info', summary: 'Settings saved', detail: 'Settings have been saved ! '}); 
        this.gameService.newGame();
      }
      this.canPlay = true;
    });
  }
}