import {TranslateLoader} from '@ngx-translate/core';

import { Observable, of} from 'rxjs';
import * as frLanguage from 'src/assets/i18n/fr.json';
import * as enLanguage from 'src/assets/i18n/en.json';

export class CustomTranslationLoader implements TranslateLoader {
  constructor() { }

  getTranslation(langCountry: string): Observable<any> {
    switch (langCountry) {
      case 'fr':
        return of(frLanguage)
      
      case 'en':
        return of(enLanguage)

      default:
        return of(frLanguage)
    }
  }
}