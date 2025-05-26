import {Component, computed, effect, HostListener, inject, OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {ConfigStoreService} from "../../services/config-store.service";
import {LanguageService} from "../../services/language.service";
import {translateText} from "../../utils/libretranslate";
import {ConfigSchema} from "../../services/config.schema";

@Component({
  selector: 'app-main-section',
  imports: [
    TranslateModule,
    NgStyle,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css',
  standalone: true
})
export class MainSectionComponent implements OnInit {
  isScrolled: boolean = false;
  // Escuchar el evento de scroll en toda la ventana
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    this.isScrolled = scrollPosition > 100;
  }
  private languageService = inject(LanguageService);
  private configStore = inject(ConfigStoreService);

  config = computed(() => this.configStore.config());

  currentLang = signal('es');
  translatedTexts = signal<{ headline: string; subheadline: string; buttons: string[] }>({
    headline: '',
    subheadline: '',
    buttons: []
  });

 async ngOnInit() {
    await this.configStore.load();
    const activeLang = await this.languageService.getActiveLanguage();
    this.currentLang.set(activeLang ?? 'es');

    effect(() => {
      const lang = this.currentLang();
      if (lang !== 'es') {
        this.generateTranslations(lang);
      }
    });

    this.languageService.language$.subscribe((lang) => {
      this.currentLang.set(lang);
    });
  }

  private async generateTranslations(lang: string) {
    const config = this.config();
    const section = config.section_hero;

    const [headline, subheadline, ...buttons] = await Promise.all([
      translateText(section.headline.text, 'es', lang),
      translateText(section.subheadline.text, 'es', lang),
      ...section.buttons.map((btn) => translateText(btn.text, 'es', lang)),
    ]);

    this.translatedTexts.set({
      headline,
      subheadline,
      buttons
    });
  }

  getHeadlineText(): string {
    const lang = this.currentLang();
    return lang === 'es' ? this.config().section_hero.headline.text : this.translatedTexts().headline;
  }

  getSubheadlineText(): string {
    const lang = this.currentLang();
    return lang === 'es' ? this.config().section_hero.subheadline.text : this.translatedTexts().subheadline;
  }

  getButtonText(index: number): string {
    const lang = this.currentLang();
    return lang === 'es'
        ? this.config().section_hero.buttons[index].text
        : this.translatedTexts().buttons[index] ?? '';
  }
}




