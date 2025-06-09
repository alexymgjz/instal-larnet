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
        LANGUAGE_CONFIG['es']
    );

    readonly config = computed(() => this.configSignal());
    current: ConfigSchema = LANGUAGE_CONFIG['es'];

    constructor() {
        effect(() => {
            const lang = this.languageService.language();
            if (this.wasLoadedFromRemote(lang)) return;

            const fallback = LANGUAGE_CONFIG['es'];
            const defaultConfig = LANGUAGE_CONFIG[lang] ?? fallback;

            this.configSignal.set(defaultConfig);
            this.current = defaultConfig;
        });
    }

    async load(): Promise<void> {
        const lang = this.languageService.language();
        const remote = await this.configService.getConfig();

        const loaded = remote && Object.keys(remote).length > 0
            ? remote
            : LANGUAGE_CONFIG[lang] ?? LANGUAGE_CONFIG['es'];

        this.configSignal.set(loaded);
        this.current = loaded;
        this.markAsLoadedFromRemote(lang);
    }

    async save(newConfig: ConfigSchema): Promise<void> {
        await this.configService.saveConfig(newConfig);
        this.configSignal.set(newConfig);
        this.current = newConfig;
    }

    async reset(): Promise<void> {
        const lang = this.languageService.language();
        await this.configService.resetConfig();

        const resetConfig = LANGUAGE_CONFIG[lang] ?? LANGUAGE_CONFIG['es'];
        this.configSignal.set(resetConfig);
        this.current = resetConfig;

        this.clearLoadedFromRemote(lang);
    }

    setConfig(newConfig: ConfigSchema): void {
        this.configSignal.set(newConfig);
        this.current = newConfig;
    }

    // 🔽 Helpers de persistencia (localStorage)
    private getStorageKey(lang: string): string {
        return `config_loaded_${lang}`;
    }

    private markAsLoadedFromRemote(lang: string): void {
        localStorage.setItem(this.getStorageKey(lang), 'true');
    }

    private wasLoadedFromRemote(lang: string): boolean {
        return localStorage.getItem(this.getStorageKey(lang)) === 'true';
    }

    private clearLoadedFromRemote(lang: string): void {
        localStorage.removeItem(this.getStorageKey(lang));
    }

}
