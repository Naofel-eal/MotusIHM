import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/core/application/module/core.module';
import { Language } from 'src/core/domain/model/language/language';
import { Setting } from 'src/core/domain/model/setting/setting';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {SliderModule} from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-setting-factory',
  standalone: true,
  imports: [
    CoreModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    SliderModule,
    ButtonModule,
    TranslateModule
  ],
  templateUrl: './setting-factory.component.html',
  styleUrl: './setting-factory.component.css'
})
export class SettingFactoryComponent implements OnInit {
  @Input({required: true})
  public setting!: Setting<any>;
  public selectedLanguage!: Language;
  public settingLabel!: string;

  public constructor(private translateService: TranslateService) { }

  public ngOnInit(): void {
    this.settingLabel = 'GAME_SETTINGS_COMPONENT.' + this.setting.code;
  }

  public get isSettingTypeOfNumber() {
    return typeof this.setting.defaultValue === "number";
  }

  public onReset(): void {
    this.setting.reset();
  }
}
