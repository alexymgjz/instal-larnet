import { Injectable, inject, signal, computed, WritableSignal, effect } from '@angular/core';
import { ConfigService } from './config.service';
import { ConfigSchema } from './config.schema';
import { LANGUAGE_CONFIG } from '../config/default-config';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class ConfigStoreService {
    private readonly languageService = inject(LanguageService);
    private readonly configService = inject(ConfigService);

    private readonly configSignal: WritableSignal<ConfigSchema> = signal(
        LANGUAGE_CONFIG['es'] // idioma por defecto
    );

    readonly config = computed(() => this.configSignal());
    current: ConfigSchema = LANGUAGE_CONFIG['es'];

    constructor() {
        // reactivo al cambio de idioma
        effect(() => {
            const lang = this.languageService.language();
            const fallback = LANGUAGE_CONFIG['es'];
            const configByLang = LANGUAGE_CONFIG[lang] ?? fallback;
            this.configSignal.set(configByLang);
            this.current = configByLang;
        });
    }

    async load() {
        const remote = await this.configService.getConfig();
        this.current = remote && Object.keys(remote).length > 0
            ? remote
            : LANGUAGE_CONFIG[this.languageService.language()] ?? LANGUAGE_CONFIG['es'];
        this.configSignal.set(this.current);
    }

    async save(newConfig: ConfigSchema) {
        await this.configService.saveConfig(newConfig);
        this.configSignal.set(newConfig);
        this.current = newConfig;
    }

    async reset() {
        const lang = this.languageService.language();
        await this.configService.resetConfig();
        const resetConfig = LANGUAGE_CONFIG[lang] ?? LANGUAGE_CONFIG['es'];
        this.configSignal.set(resetConfig);
        this.current = resetConfig;
    }

    setConfig(newConfig: ConfigSchema) {
        this.configSignal.set(newConfig);
        this.current = newConfig;
    }
}
