import { Component, Inject } from '@angular/core';
import { GridComponent } from './component/grid/grid.component';
import { GAME_SERVICE_TOKEN } from 'src/core/application/module/core-injection-tokens';
import { IGameService } from 'src/core/application/service/game/igame-service';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SettingsComponent } from './component/settings/settings.component';
import { MessageService } from 'primeng/api';
import { RulesComponent } from './component/rules/rules.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GridComponent,
    SpeedDialModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public spinItems: any[] = [];
  private _ref: DynamicDialogRef | undefined;

  public constructor(
    @Inject(GAME_SERVICE_TOKEN) public gameService: IGameService,
    private _dialogService: DialogService,
    private _messageService: MessageService
  ) {
    this.initSpinItems();
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
          this.gameService.revealRandomUnfoundLetter();
        }
      },
      {
        icon: 'pi pi-cog',
        tooltipOptions: {
          tooltipLabel: 'Settings'
        },
        command: () => {
          this.gameService.canUserPlay = false;
          this.showSettings();
        }
      },
      {
        icon: 'pi pi-info',
        tooltipOptions: {
          tooltipLabel: 'Game rules'
        },
        command: () => {
          this.gameService.canUserPlay = false;
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
      this.gameService.canUserPlay = true;
    });
  }

  public showRules(): void {
    this._ref = this._dialogService.open(RulesComponent, {
      header: 'Game rules',
      width: 'fit-content',
      contentStyle: {"overflow": "auto"}
    });
    this._ref.onClose.subscribe(() => {
      this.gameService.canUserPlay = true;  
    });
  }
}
