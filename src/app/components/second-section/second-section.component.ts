import {Component, inject, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgForOf, NgIf} from "@angular/common";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-second-section',
    imports: [
        TranslateModule,
        NgForOf,
        NgIf
    ],
  templateUrl: './second-section.component.html',
  styleUrl: './second-section.component.css'
})
export class SecondSectionComponent implements OnInit {
    private configService = inject(ConfigService);
    config: any;

    async ngOnInit() {
        this.config = await this.configService.getConfig();
    }
}
