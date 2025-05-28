import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private common = inject(CommonService);

  private readonly supportedLanguages: string[] = ['es', 'en', 'ca'];
  readonly language: WritableSignal<string> = signal('es');

  constructor() {
    this.initLanguage();
  }

  async initLanguage() {
    let langToUse = await this.common.getItem('locale');

    if (!langToUse) {
      const browserLang = this.translate.getBrowserLang();
      if (browserLang && this.includeLanguage(browserLang)) {
        langToUse = browserLang;
      } else {
        langToUse = 'es';
      }
    }

    this.setLanguage(langToUse); // ✅ langToUse es ahora siempre un string
  }


  setLanguage(lang: string) {
    this.language.set(lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.common.setItem('locale', lang);
    console.log(lang  +'ini' + '')
  }

  getLanguage(): string {
    return this.language(); // ← lectura actual del idioma
  }

  getAvailableLanguages(): string[] {
    return this.supportedLanguages;
  }

  includeLanguage(language: string): boolean {
    return this.supportedLanguages.includes(language);
  }

  async changeLanguage(language: string) {
    if (this.includeLanguage(language)) {
      this.setLanguage(language);
    }
  }
}
