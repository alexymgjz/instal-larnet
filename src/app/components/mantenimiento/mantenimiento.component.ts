import { Component,  signal} from '@angular/core';
import * as bcrypt from 'bcryptjs';
import {KeyValue, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {LanguageService} from "../../services/language.service";
import {TranslationInitService} from "../../services/TranslationInitService";
import {TranslationFieldComponent} from "../translation-field/translation-field.component";


@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  templateUrl: './mantenimiento.component.html',
  imports: [NgIf, FormsModule, NgForOf, TranslationFieldComponent, KeyValuePipe]
})
export class MantenimientoComponent {

  acceso = signal(false);
  password = '';
  private readonly passwordHashed = '$2a$12$Fd8V6dnDyavSej8fX33dsu6mMvOAmpUdn.i3vXx0R2sQfQlqTM9Ii';
  currentLang: string = 'es';
  translations: Record<string, Record<string, string>> = {};
  // translationKeys: string[] = [];

  constructor(
      private languageService: LanguageService,
      private translationService: TranslationInitService
  ) {}

  async ngOnInit() {
    this.currentLang = await this.languageService.initLanguage(); // debe devolver Promise<string>
    this.translations = await this.translationService.getTranslations(this.currentLang);
    console.log(`📥 Traducciones cargadas para el idioma [${this.currentLang}]: `, this.translations);
    // this.translationKeys = Object.keys(this.translations);
  }

  getSubKeys(sectionKey: string): string[] {
    const section = this.translations[sectionKey];
    return section ? Object.keys(section) : [];
  }

  async save() {
    try {
      await this.translationService.saveTranslations(this.currentLang, this.translations);
      alert('✅ Traducciones guardadas correctamente.');
    } catch (error) {
      console.error('Error al guardar traducciones:', error);
      alert('❌ Error al guardar traducciones.');
    }
  }

  verificarClave() {
    const esValida = bcrypt.compareSync(this.password, this.passwordHashed);
    this.acceso.set(esValida);
    if (!esValida) {
      alert('❌ Clave incorrecta');
    }
  }

  customCompareFn = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
    return (a.value.order ?? 0) - (b.value.order ?? 0);
  };
}
