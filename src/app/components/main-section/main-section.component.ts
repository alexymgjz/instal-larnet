import {Component,HostListener, inject} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {LanguageService} from "../../services/language.service";
import {translateText} from "../../utils/libretranslate";

@Component({
  selector: 'app-main-section',
  imports: [
    TranslateModule,
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css',
  standalone: true
})
export class MainSectionComponent{
  isScrolled: boolean = false;
  // Escuchar el evento de scroll en toda la ventana
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    this.isScrolled = scrollPosition > 100;
  }
}




