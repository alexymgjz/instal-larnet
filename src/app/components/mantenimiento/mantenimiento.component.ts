import { Component,  signal} from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  templateUrl: './mantenimiento.component.html',
  imports: [NgIf, FormsModule]
})
export class MantenimientoComponent {

  acceso = signal(false);
  password = '';
  private readonly passwordHashed = '$2a$12$Fd8V6dnDyavSej8fX33dsu6mMvOAmpUdn.i3vXx0R2sQfQlqTM9Ii';



  verificarClave() {
    const esValida = bcrypt.compareSync(this.password, this.passwordHashed);
    this.acceso.set(esValida);
    if (!esValida) {
      alert('❌ Clave incorrecta');
    }
  }
}
