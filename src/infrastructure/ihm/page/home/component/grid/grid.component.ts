import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { Subject } from "rxjs";
import { SettingsCode } from "src/core/application/enum/settings-code";
import { SETTINGS_CACHE_SERVICE_TOKEN, VALIDATE_WORD_USECASE_TOKEN } from "src/core/application/module/core-injection-tokens";
import { ISettingsCacheService } from "src/core/application/service/cache/settings/isettings-cache";
import { asyncTimeout } from "src/core/application/shared/async-timeout";
import { IValidateWordUseCase } from "src/core/application/usecase/validateWord/ivalidate-word-usecase";
import { PendingLetter } from "src/core/domain/model/letter/pending-letter";
import { LetterUtils } from "src/core/domain/model/letter/utils/letter-utils";
import { Setting } from "src/core/domain/model/setting/setting";
import { WordGrid } from "src/core/domain/model/word-grid/word-grid";
import { fadeInOut, letterAnimation } from "src/infrastructure/ihm/animations/animations";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],
  animations: [fadeInOut, letterAnimation],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit, OnDestroy {
  @Input({ required: true}) 
  public wordGrid!: WordGrid;
  
  @Input({required: true})
  public keyPressEvent!: Subject<string>

  @Input({required: true})
  public revealLetterEvent!: Subject<void>

  @Output() 
  public hasWin = new EventEmitter<boolean>()

  public spinItems: any[] = [];
  
  public constructor(
    @Inject(VALIDATE_WORD_USECASE_TOKEN) private _validateWordUseCase: IValidateWordUseCase,
    @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsService: ISettingsCacheService,
    public messageService: MessageService,
    private translateService: TranslateService
  ) { }

  public ngOnInit(): void {
    this.keyPressEvent.asObservable().subscribe(async (pressedKey) => {
      await this.onKeypress(pressedKey);
    })

    this.revealLetterEvent.asObservable().subscribe(async () => {
      this.wordGrid.revealRandomUnfoundLetter();
      if (this.wordGrid.isLineCompleted) {
        await this.handleCompletedWord();
      }
    });
  }

  public ngOnDestroy(): void {
      this.keyPressEvent.unsubscribe();
      this.revealLetterEvent.unsubscribe();
  }

  public async onKeypress(pressedKey: string) {
    this.wordGrid.canUserPlay = false;
    if (LetterUtils.isLetterValid(pressedKey)) {
      this.wordGrid.addLetter(new PendingLetter(pressedKey));

      if (this.wordGrid.isLineCompleted) {
          await this.handleCompletedWord();
          return;
      }
    }
    else if (pressedKey === 'BACKSPACE') {
      this.wordGrid.removeLetter();
    }
    this.wordGrid.canUserPlay = true;
  }

  public async handleCompletedWord() {
    this.wordGrid.canUserPlay = false;
    const isWordValid: boolean = await this.validateCurrentUserWord();
    if (isWordValid) {
        const letterAnimationDurationInMs: Setting<number> = this._settingsService.getSettingByKey(SettingsCode.LETTER_ANIMATION_DURATION_IN_MS)!;
        await this.wordGrid.animateLetters(letterAnimationDurationInMs.value);

        if (this.wordGrid.isLastLine || this.wordGrid.isCurrentWordTheSolution) {
          this.hasWin.emit(this.wordGrid.isCurrentWordTheSolution);
          return;
        }
        else {
          this.wordGrid.nextRow();
        }
    }
    else {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('MESSAGE_SERVICE.ERROR'), detail: this.translateService.instant('MESSAGE_SERVICE.WORD_DOES_NOT_EXIST')});
        await asyncTimeout(this._settingsService.getSettingByKey(SettingsCode.DELAY_BEFORE_ERASE_LETTERS)!.value);
        this.wordGrid.clearCurrentUserWord();
    }
    this.wordGrid.canUserPlay = true;
  }

  public async validateCurrentUserWord(): Promise<boolean> {
    return await this._validateWordUseCase.execute(this.wordGrid.gameLanguage, this.wordGrid.currentUserWord);
  }
}
