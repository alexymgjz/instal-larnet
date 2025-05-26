import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';
import {FormsModule} from '@angular/forms';
import {FirebaseApp} from "@angular/fire/app";
import {MantenimientoComponent} from "../mantenimiento/mantenimiento.component";
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true}
)
export class HeaderComponent implements OnInit {
  activeChild: string = 'app-section-1'; // Estado para controlar qué componente hijo está activo
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  setActiveChild(child: string): void {
    this.activeChild = child;
  }
  availableLanguages: string[] = [];
  currentLanguage: string = '';
  selectedLanguage: string = '';

  constructor(private languageService: LanguageService,private firebaseApp: FirebaseApp) {}

  async ngOnInit() {
    this.currentLanguage = await this.languageService.getActiveLanguage() || this.languageService.getDefaultLanguage();
    this.selectedLanguage = this.currentLanguage;
    this.availableLanguages = this.languageService.getAvailableLanguages();
    console.log(this.availableLanguages);

    this.isInitialized = !!this.firebaseApp.name; // Si tiene nombre, está inicializado
    console.log('Firebase app name:', this.firebaseApp.name);
  }

  isInitialized = false;



  async onLanguageChange(selectedLanguage: string) {
    if (selectedLanguage !== this.currentLanguage) {
      await this.languageService.changeLanguage(selectedLanguage);
      this.currentLanguage = selectedLanguage;
    }
  }
  showMaintenanceModal = false;

  openMaintenanceModal() {
    this.showMaintenanceModal = true;
    this.isMenuOpen = false; // Cierra menú mobile si estaba abierto
  }

  closeMaintenanceModal() {
    this.showMaintenanceModal = false;
  }


}
