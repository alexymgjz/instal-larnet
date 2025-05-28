import {Component, inject, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-footer-section',
    imports: [
        TranslateModule,
    ],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.css'
})
export class FooterSectionComponent implements OnInit{
    private configService = inject(ConfigService);
    config: any;

    async ngOnInit() {
        this.config = await this.configService.getConfig();
    }
}
