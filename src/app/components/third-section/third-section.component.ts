import {Component, inject, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from "@angular/common";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-third-section',
    imports: [
        TranslateModule,
        NgIf,
    ],
  templateUrl: './third-section.component.html',
  styleUrl: './third-section.component.css'
})
export class ThirdSectionComponent implements OnInit{
    private configService = inject(ConfigService);
    config: any;

    async ngOnInit() {
        this.config = await this.configService.getConfig();
    }

}
