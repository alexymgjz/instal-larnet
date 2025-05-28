import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageSignalService {
     currentLang = signal('es');

    get(): string {
        return this.currentLang();
    }

    set(lang: string): void {
        this.currentLang.set(lang);
    }

    asSignal(): Signal<string> {
        return this.currentLang;
    }
}
