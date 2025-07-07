import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpBackend, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import {newTranslateLoader} from "../main";
import {routes} from "./app.routes";
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FirestoreTranslateLoader} from "./services/firestore-translate-loader.service";
import {getAuth, provideAuth} from "@angular/fire/auth";

import { SUPPORTED_LANGUAGES } from './config/supported-languages';
import {TranslationInitService} from "./services/TranslationInitService";

function initTranslations(service: TranslationInitService): () => Promise<void> {
    return () => service.ensureTranslationsExist(SUPPORTED_LANGUAGES);
}


const firebaseConfig = {
    apiKey: "AIzaSyCpPvpZfJb-3-iBPu22Xy9diCx0cns7agE",
    authDomain: "tarragona-network-20250523.firebaseapp.com",
    projectId: "tarragona-network-20250523",
    storageBucket: "tarragona-network-20250523.firebasestorage.app",
    messagingSenderId: "707788465058",
    appId: "1:707788465058:web:69d3e8c38828dd715008fb",
    measurementId: "G-XPJG3TYRTV"
};


export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initTranslations,
            deps: [TranslationInitService],
            multi: true
        },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),

        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'es',
                loader: {
                    provide: TranslateLoader,
                    useFactory: (firestore: Firestore) => new FirestoreTranslateLoader(firestore),
                    deps: [Firestore]
                }
            })
        ),

        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()), // ✅ << AÑADE ESTA LÍNEA
        provideFirestore(() => getFirestore()),
        provideAnalytics(() => getAnalytics())

    ]
};
