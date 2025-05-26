import {inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CommonService} from "./common.service";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  translate = inject(TranslateService);
  common = inject(CommonService);
  private defaultLanguage: string = 'en';
  private languages: string[];
  private languageSubject: Subject<string> = new Subject<string>();
  language$ = this.languageSubject.asObservable();

  constructor() {
    this.languages = ['es', 'en','ca'];
  }

  async initLanguage() {
    const currentLanguage = await this.common.getItem('locale');
    if (currentLanguage) {
      await this.setDefaultLanguage(currentLanguage);
    } else {
      const browserLanguage = this.translate.getBrowserLang();
      if (browserLanguage) {
        if (this.includeLanguage(browserLanguage)) {
          await this.setDefaultLanguage(browserLanguage);
        }else {
          await this.setDefaultLanguage(this.defaultLanguage);
        }
      }else{
        await this.setDefaultLanguage(this.defaultLanguage);
      }
    }
  }

  async setDefaultLanguage(language: string) {
    this.defaultLanguage = language;
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.languageSubject.next(language);
    await this.common.setItem('locale', language);
  }

  getDefaultLanguage(): string {
    return this.defaultLanguage;
  }
  getAvailableLanguages(): string[] {
    return this.languages;
  }
  async getActiveLanguage(): Promise<string | null> {
    return await this.common.getItem('locale');
  }

  // Nuevo método para cambiar el idioma
  async changeLanguage(language: string) {
   await this.setDefaultLanguage(language);
  }

  includeLanguage(language: string): boolean {
    return this.languages.includes(language);
  }

}
