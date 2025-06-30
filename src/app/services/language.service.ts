import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);

  private readonly supportedLanguages: string[] = ['es', 'en', 'ca'];
  readonly language: WritableSignal<string> = signal('es');

  constructor() {
    this.initLanguage();
  }

  async initLanguage() {
    let langToUse = this.language(); // ✅ lectura del valor actual de la signal

    if (!langToUse) {
      const browserLang = this.translate.getBrowserLang();
      if (browserLang && this.includeLanguage(browserLang)) {
        langToUse = browserLang;
      } else {
        langToUse = 'es';
      }
    }

    this.setLanguage(langToUse);
  }

  setLanguage(lang: string) {
    this.language.set(lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  getLanguage(): string {
    return this.language(); // ✅ correcto
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
