// src/app/services/firestore-translate-loader.service.ts

import {Injectable} from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';


@Injectable()
export class FirestoreTranslateLoader implements TranslateLoader {
    constructor(private firestore: Firestore
    ) {}

    getTranslation(lang: string): Observable<any> {
        const ref = doc(this.firestore, `ajustesWeb/${lang}`);
        return from(getDoc(ref).then(snap => snap.data() || {}));
    }
}
