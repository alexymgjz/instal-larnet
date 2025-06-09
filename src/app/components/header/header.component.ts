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
  activeChild: string = 'app-section-1';
  isMenuOpen = false;
  isLoading = false;

  private readonly ui = inject(UiStateService);
  private readonly configStore = inject(ConfigStoreService);
  private readonly languageService = inject(LanguageService);

  showMaintenanceModal = this.ui.showMaintenanceModal;

  languageControl = new FormControl('');
  availableLanguages: string[] = [];
  selectedLanguage = '';

  readonly config = computed(() => this.configStore.config());
  readonly currentLang = computed(() => this.languageService.language());

  translatedTexts = signal<{ menu: string; services: string; team: string; maintenance: string }>({
    menu: '',
    services: '',
    team: '',
    maintenance: ''
  });

  ngOnInit(): void {
    this.availableLanguages = this.languageService.getAvailableLanguages();

    const initialLang = this.languageService.language() ?? 'es';
    this.languageControl.setValue(initialLang, { emitEvent: false });

    // Cuando el usuario cambia manualmente el selector
    this.languageControl.valueChanges.subscribe(async (lang) => {
      if (!lang || lang === this.languageService.language()) return;

      this.isLoading = true;
      this.languageService.setLanguage(lang);
      await this.configStore.load();
      this.updateTranslatedTexts(lang); // opcional si tienes textos dinámicos
      this.isLoading = false;
    });
  }

  private updateTranslatedTexts(lang: string) {
    if (lang === 'es') {
      this.translatedTexts.set({ menu: '', services: '', team: '', maintenance: '' });
    } else {
      const config = this.config();
      this.translatedTexts.set({
        menu: config.section_header.home,
        services: config.section_header.services,
        team: config.section_header.team,
        maintenance: config.section_header.maintenance
      });
    }
  }


  private async loadConfigAndTranslations(lang: string) {
    this.isLoading = true;
    await this.configStore.load();

    if (lang !== 'es') {
      const config = this.config();
      this.translatedTexts.set({
        menu: config.section_header.home,
        services: config.section_header.services,
        team: config.section_header.team,
        maintenance: config.section_header.maintenance
      });
    } else {
      this.translatedTexts.set({
        menu: '',
        services: '',
        team: '',
        maintenance: ''
      });
    }

    this.selectedLanguage = lang;
    this.isLoading = false;
  }

  getMenuText(): string {
    const lang = this.currentLang();
    return lang === 'es' ? this.config().section_header.home : this.translatedTexts().menu;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveChild(child: string): void {
    this.activeChild = child;
  }

  openMaintenanceModal(): void {
    this.showMaintenanceModal.set(true);
    this.isMenuOpen = false;
  }

  closeMaintenanceModal(): void {
    this.showMaintenanceModal.set(false);
  }

}
