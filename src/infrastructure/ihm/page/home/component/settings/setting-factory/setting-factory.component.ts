import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/core/application/module/core.module';
import { Language } from 'src/core/domain/model/language/language';
import { Setting } from 'src/core/domain/model/setting/setting';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {SliderModule} from 'primeng/slider';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-setting-factory',
  standalone: true,
  imports: [
    CoreModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    SliderModule,
    ButtonModule
  ],
  templateUrl: './setting-factory.component.html',
  styleUrl: './setting-factory.component.css'
})
export class SettingFactoryComponent {
  @Input({required: true})
  public setting!: Setting<any>;

  public constructor() { }

  public get isSettingTypeOfNumber() {
    return typeof this.setting.defaultValue === "number";
  }

  public get isSettingTypeOfLanguage() {
    return this.setting.defaultValue instanceof Language;
  }

  public validateNumberInput(event: any): void {
    console.log("oui")
    const input = event.target;
    if (!this._isNumber(input.value)) 
      this.setting.reset();
  }

  public onReset(): void {
    this.setting.reset();
  }

  private _isNumber(value?: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }
}
