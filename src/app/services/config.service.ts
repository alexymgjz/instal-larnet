import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ConfigSchema } from './config.schema';
import { LanguageService } from './language.service';
import { LANGUAGE_CONFIG } from '../config/default-config';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private languageService = inject(LanguageService);
    private firestore = inject(Firestore);

    private getDocPathForLang(lang: string): string {
        return `ajustesWeb/${lang}`;
    }

    async getConfig(): Promise<ConfigSchema> {
        const lang = this.languageService.language() ?? 'es';
        const fallback = LANGUAGE_CONFIG['es'];
        const config = LANGUAGE_CONFIG[lang] ?? fallback;

        const ref = doc(this.firestore, this.getDocPathForLang(lang));
        const snap = await getDoc(ref);

        if (snap.exists()) {
            console.log(`✅ Documento Firestore encontrado para idioma ${lang}`);
            return snap.data() as ConfigSchema;
        } else {
            console.warn(`⚠️ Documento no encontrado para ${lang}. Guardando configuración por defecto`);
            await setDoc(ref, config);
            return config;
        }
    }

    async saveConfig(config: ConfigSchema): Promise<void> {
        const lang = this.languageService.language() ?? 'es';
        const ref = doc(this.firestore, this.getDocPathForLang(lang));
        await setDoc(ref, config, { merge: true });
    }

    async resetConfig(): Promise<void> {
        const lang = this.languageService.language() ?? 'es';
        const ref = doc(this.firestore, this.getDocPathForLang(lang));
        await setDoc(ref, LANGUAGE_CONFIG[lang], { merge: false });
    }
}
