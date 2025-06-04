import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-whatsapp-widget',
  imports: [
    NgIf
  ],
  templateUrl: './whatsapp-widget.component.html',
  styleUrl: './whatsapp-widget.component.css',
  standalone: true,
})
export class WhatsappWidgetComponent {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  get whatsappLink(): string {
    const phone = '34653539081'; // Sin +
    const message = encodeURIComponent('Hola, me gustaría más información');
    return `https://wa.me/${phone}?text=${message}`;
  }
}
