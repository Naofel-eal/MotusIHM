import { Component, Inject } from '@angular/core';
import { SETTINGS_CACHE_SERVICE_TOKEN } from 'src/core/application/module/core-injection-tokens';
import { ISettingsCacheService } from 'src/core/application/service/cache/settings/isettings-cache';
import { SettingFactoryComponent } from '../setting-factory/setting-factory.component';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Setting } from 'src/core/domain/model/setting/setting';

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
export class SettingsComponent {
  public allSettings: Setting<any>[];
  public constructor(
    @Inject(SETTINGS_CACHE_SERVICE_TOKEN) private _settingsCacheService: ISettingsCacheService,
  ) {
    this.allSettings = this._settingsCacheService.allSettings;
  }

  public onReset(): void {
    this._settingsCacheService.resetAllSettings();
  }
}