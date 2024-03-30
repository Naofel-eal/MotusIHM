import { Component } from '@angular/core';
import pkg from '../../../../package.json';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'Tusmo'.toUpperCase();
  public version: string = pkg.version;

  public constructor(translateService: TranslateService) {
    translateService.addLangs(['fr', 'us']);
    translateService.setDefaultLang('fr');
    translateService.use('fr');
  }
}