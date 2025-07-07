import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MainSectionComponent} from './components/main-section/main-section.component';
import {SecondSectionComponent} from './components/second-section/second-section.component';
import {ThirdSectionComponent} from './components/third-section/third-section.component';
import {TeamSectionComponent} from './components/team-section/team-section.component';
import {FooterSectionComponent} from './components/footer-section/footer-section.component';
import {TranslateModule} from '@ngx-translate/core';
import {WhatsappWidgetComponent} from "./components/whatsapp-widget/whatsapp-widget.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainSectionComponent, SecondSectionComponent, ThirdSectionComponent, TeamSectionComponent, FooterSectionComponent, TranslateModule, WhatsappWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'Instal-larnet-landing-page-official';


}
