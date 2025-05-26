import { Component } from '@angular/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-team-section',
  imports: [
    SlickCarouselModule,
    TranslateModule
  ],
  templateUrl: './team-section.component.html',
  styleUrl: './team-section.component.css'
})
export class TeamSectionComponent {

}
