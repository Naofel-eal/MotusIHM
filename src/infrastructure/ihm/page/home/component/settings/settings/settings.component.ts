import { Component, Inject, OnInit } from '@angular/core';
import { SETTINGS_CACHE_SERVICE_TOKEN } from 'src/core/application/module/core-injection-tokens';
import { ISettingsCacheService } from 'src/core/application/service/cache/settings/isettings-cache';
import { SettingFactoryComponent } from '../setting-factory/setting-factory.component';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Setting } from 'src/core/domain/model/setting/setting';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [
    SettingFactoryComponent,
    ButtonModule,
    ScrollPanelModule
  ],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public allSettings: Setting<any>[];
  public resetSettingsLabel: string = '';

  public constructor(
    @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsCacheService: ISettingsCacheService,
    private translateService: TranslateService
  ) {
    this.allSettings = this._settingsCacheService.allSettings;
  }

  public ngOnInit(): void {
   this.resetSettingsLabel = this.translateService.instant('GAME_SETTINGS_COMPONENT.RESET_SETTINGS');
  }

  public onReset(): void {
    this._settingsCacheService.resetAllSettings();
  }
}