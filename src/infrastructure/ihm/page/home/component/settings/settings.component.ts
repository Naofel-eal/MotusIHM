import { Component, Inject } from '@angular/core';
import { SETTINGS_CACHE_SERVICE_TOKEN } from 'src/core/application/module/core-injection-tokens';
import { ISettingsCacheService } from 'src/core/application/service/cache/settings/isettings-cache';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public constructor(
    @Inject(SETTINGS_CACHE_SERVICE_TOKEN) public settingsCacheService: ISettingsCacheService,
  ) { }

  public reset(): void {
    this.settingsCacheService.resetAllSettings();
  }
}