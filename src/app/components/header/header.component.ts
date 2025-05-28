import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FirebaseApp} from "@angular/fire/app";
import {MantenimientoComponent} from "../mantenimiento/mantenimiento.component";
import {UiStateService} from "../../services/UiStateService";
import {ConfigStoreService} from "../../services/config-store.service";
@Component({
  selector: 'app-header',
  imports: [
    NgClass,
    TranslateModule,
    UpperCasePipe,
    FormsModule,
    NgForOf,
    NgIf,
    MantenimientoComponent,
    MantenimientoComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true}
)
export class HeaderComponent implements OnInit {
  activeChild: string = 'app-section-1'; // Estado para controlar qué componente hijo está activo
  isMenuOpen = false;
  private ui = inject(UiStateService);
  showMaintenanceModal = this.ui.showMaintenanceModal;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  setActiveChild(child: string): void {
    this.activeChild = child;
  }


  selectedLanguage: string = '';



   languageControl = new FormControl('');
   availableLanguages: string[] | undefined ;

  constructor(private languageService: LanguageService) {
    // Sincroniza el idioma actual con el formControl
    effect(() => {
      const currentLang = this.languageService.language();
      if (this.languageControl.value !== currentLang) {
        this.languageControl.setValue(currentLang, { emitEvent: false });
      }
    });

    // Cambios del usuario → actualizan el servicio
    this.languageControl.valueChanges.subscribe((lang) => {
      if (lang && lang !== this.languageService.language()) {
        this.languageService.setLanguage(lang);
      }
    });
  }

  ngOnInit(): void {
    this.availableLanguages = this.languageService.getAvailableLanguages();

    // Valor inicial desde signal o localStorage (según lo que uses en LanguageService)
    const lang = this.languageService.language() ?? 'es';
    this.selectedLanguage = lang;
    this.languageControl.setValue(lang, { emitEvent: false });

    // Actualiza el select si el idioma cambia desde otro lugar
    effect(() => {
      const lang = this.languageService.language();
      if (this.languageControl.value !== lang) {
        this.languageControl.setValue(lang, { emitEvent: false });
      }
    });

    // Actualiza el idioma si el usuario cambia el select manualmente
    this.languageControl.valueChanges.subscribe((newLang) => {
      if (newLang && this.languageService.includeLanguage(newLang)) {
        this.languageService.setLanguage(newLang);
      }
    });
  }




  isInitialized = false;



  openMaintenanceModal() {
    this.showMaintenanceModal.set(true)
    this.isMenuOpen = false; // Cierra menú mobile si estaba abierto
  }

  closeMaintenanceModal() {
    this.showMaintenanceModal.set(false)
  }




  isLoading = false;
  async onLanguageChange(lang: string) {
    if (lang !== this.languageService.language()) {
      this.isLoading = true;
      this.languageService.setLanguage(lang);
      await this.configStore.load();
      this.selectedLanguage = lang; // ← ahora sí, después de tener todo cargado
      this.isLoading = false;
    }
  }



  private configStore = inject(ConfigStoreService);
  readonly currentLang = signal('es');
  readonly config = computed(() => this.configStore.config());

  translatedTexts = signal<{menu: string; services: string; team: string ; maintenance: string}>({
    menu: '',
    services: '',
    team: '',
    maintenance: ''
  });

  getMenuText(): string {
      const lang = this.currentLang();
      return lang === 'es' ? this.config().section_header.home : this.translatedTexts().menu;
  }

}
