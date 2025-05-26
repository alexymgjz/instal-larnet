import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpBackend, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import {newTranslateLoader} from "../main";
import {routes} from "./app.routes";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";


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
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),

        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'es',
                loader: {
                    provide: TranslateLoader,
                    useFactory: newTranslateLoader,
                    deps: [HttpBackend]
                }
            })
        ),

        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideAnalytics(() => getAnalytics())

    ]
};
