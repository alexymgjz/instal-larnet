import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MainSectionComponent} from './components/main-section/main-section.component';
import {SecondSectionComponent} from './components/second-section/second-section.component';
import {ThirdSectionComponent} from './components/third-section/third-section.component';
import {LanguageService} from './services/language.service';
import {TeamSectionComponent} from './components/team-section/team-section.component';
import {FooterSectionComponent} from './components/footer-section/footer-section.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainSectionComponent, SecondSectionComponent, ThirdSectionComponent, TeamSectionComponent, FooterSectionComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Instal-larnet-landing-page-official';
  constructor(
    private languageService: LanguageService
  ) {}


  async ngOnInit() {
    await this.languageService.initLanguage()
  }
}
