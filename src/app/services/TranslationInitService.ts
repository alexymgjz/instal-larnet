import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { signInAnonymously } from 'firebase/auth';

import es from '../../assets/i18n/es.json';
import en from '../../assets/i18n/en.json';
import ca from '../../assets/i18n/ca.json';

@Injectable({ providedIn: 'root' })
export class TranslationInitService {
    constructor(
        private firestore: Firestore,
        private auth: Auth
    ) {}

    getTranslations(lang: string): Promise<any> {
        const ref = doc(this.firestore, `ajustesWeb/${lang}`);
        return getDoc(ref).then(snap => snap.data() || {});
    }

    async saveTranslations(lang: string, data: any) {
        const ref = doc(this.firestore, `ajustesWeb/${lang}`);
        await setDoc(ref, data);
    }

    async ensureTranslationsExist(langs: string[]) {
        for (const lang of langs) {
            const ref = doc(this.firestore, `ajustesWeb/${lang}`);
            console.log(ref + 'my log');
            const snap = await getDoc(ref);

            if (!snap.exists()) {
                const defaultData = lang === 'es' ? es : lang === 'en' ? en : ca;

                // Asegura que hay un usuario (anónimo si no lo hay)
                const user = this.auth.currentUser ?? (await signInAnonymously(this.auth)).user;

                const payload = {
                    ...defaultData,
                    _meta: {
                        createdAt: new Date().toISOString(),
                        createdBy: user?.uid ?? 'unknown',
                        note: 'Creado automáticamente por TranslationInitService'
                    }
                };

                console.log(`📥 Subiendo traducción para [${lang}] por el usuario [${user?.uid}]`);

                await setDoc(ref, payload);
            } else {
                console.log(`✅ Traducción ya existente para [${lang}]`);
            }
        }
    }
}
