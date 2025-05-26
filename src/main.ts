import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {registerLocaleData} from '@angular/common';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
export function newTranslateLoader(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
