import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './clean/infrastructure/ihm/app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
