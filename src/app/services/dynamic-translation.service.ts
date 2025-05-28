import { inject, Injectable, effect, computed } from '@angular/core';
import { ConfigStoreService } from './config-store.service';
import { TranslationService } from './translation.service';
import { LanguageSignalService } from './language-signal.service';
import { ConfigSchema } from './config.schema';

@Injectable({ providedIn: 'root' })
export class DynamicTranslationService {
    private configStore = inject(ConfigStoreService);
    private translationService = inject(TranslationService);
    private langSignal = inject(LanguageSignalService);

    private config = computed(() => this.configStore.config());
    private lang = computed(() => this.langSignal.currentLang());

    constructor() {
        effect(() => {
            const lang = this.lang();
            if (lang === 'es') return; // No traducir si es español

            const conf = this.config();
            // Hero
            this.translationService.translateText('hero.headline', conf.section_hero.headline.text, lang);
            this.translationService.translateText('hero.subheadline', conf.section_hero.subheadline.text, lang);
            conf.section_hero.buttons.forEach((btn, i) => {
                this.translationService.translateText(`hero.button.${i}`, btn.text, lang);
            });
        });
    }

    // Métodos públicos de acceso
    getHeroHeadline(): string {
        return this.lang() === 'es'
            ? this.config().section_hero.headline.text
            : this.translationService.getTranslatedText('hero.headline') ?? '';
    }

    getHeroSubheadline(): string {
        return this.lang() === 'es'
            ? this.config().section_hero.subheadline.text
            : this.translationService.getTranslatedText('hero.subheadline') ?? '';
    }

    getHeroButton(index: number): string {
        return this.lang() === 'es'
            ? this.config().section_hero.buttons[index]?.text ?? ''
            : this.translationService.getTranslatedText(`hero.button.${index}`) ?? '';
    }


}
