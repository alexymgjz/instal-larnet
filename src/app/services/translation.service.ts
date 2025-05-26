import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
    private http = inject(HttpClient);
    private readonly API_URL = 'https://libretranslate.de/translate';

    private translatedTextsSignal = signal<Record<string, string>>({});
    translatedTexts = computed(() => this.translatedTextsSignal());

    /**
     * Traduce y guarda el resultado en `translatedTextsSignal`.
     * @param key Clave interna del texto (ej. 'hero.headline')
     * @param text Texto en castellano a traducir
     * @param targetLang Idioma destino (ej. 'en', 'ca', 'fr')
     */
    async translateText(key: string, text: string, targetLang: string): Promise<void> {
        if (!text || !targetLang || targetLang === 'es') return;

        try {
            const result = await this.http.post<any>(this.API_URL, {
                q: text,
                source: 'es',
                target: targetLang,
                format: 'text'
            }).toPromise();

            const updated = { ...this.translatedTextsSignal() };
            updated[key] = result.translatedText;
            this.translatedTextsSignal.set(updated);
        } catch (error) {
            console.error(`❌ Error traduciendo "${text}" a "${targetLang}":`, error);
        }
    }

    /**
     * Devuelve una traducción ya guardada (si existe).
     */
    getTranslatedText(key: string): string | null {
        return this.translatedTextsSignal()[key] ?? null;
    }

    /**
     * Limpia todas las traducciones en memoria.
     */
    clear(): void {
        this.translatedTextsSignal.set({});
    }
}
