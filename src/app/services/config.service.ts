import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { DEFAULT_CONFIG } from '../config/default-config';
import { ConfigSchema } from './config.schema';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private firestore = inject(Firestore);
    private readonly docPath = 'ajustesWeb/principal';

    async getConfig(): Promise<ConfigSchema> {
        const ref = doc(this.firestore, this.docPath);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            console.log('✅ Documento Firestore encontrado');
            return snap.data() as ConfigSchema;
        } else {
            console.warn('⚠️ Documento no encontrado. Guardando DEFAULT_CONFIG');
            await setDoc(ref, DEFAULT_CONFIG);  // 🔁 Se guarda el default si no hay nada
            return DEFAULT_CONFIG;
        }
    }

    async saveConfig(config: ConfigSchema): Promise<void> {
        const ref = doc(this.firestore, this.docPath);
        await setDoc(ref, config, { merge: true });
    }

    async resetConfig(): Promise<void> {
        const ref = doc(this.firestore, this.docPath);
        await setDoc(ref, DEFAULT_CONFIG, { merge: false });
    }
}
