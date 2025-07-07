import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { Input } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-translation-field',
  imports: [
    FormsModule,
    NgForOf
  ],
  standalone: true,
  template: `
    <div *ngFor="let key of getKeys(data)" class="ml-4 mt-2">
      <label class="block text-xs text-gray-500 mb-1">{{ key }}</label>

      @if (isObject(data[key])) {
        <app-translation-field [data]="data[key]" />
      } @else {
        <textarea
          [(ngModel)]="data[key]"
          class="border rounded px-2 py-1 w-full text-sm"
          rows="2"
        ></textarea>
      }
    </div>
  `,
  styleUrl: './translation-field.component.css'
})
export class TranslationFieldComponent {
  @Input() data!: Record<string, any>;


  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}
