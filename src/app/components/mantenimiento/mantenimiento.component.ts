import { Component, inject, signal, computed } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { ConfigStoreService } from '../../services/config-store.service';
import { NgForOf, NgIf } from "@angular/common";
import { UiStateService } from "../../services/UiStateService";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  templateUrl: './mantenimiento.component.html',
  imports: [NgIf, NgForOf, FormsModule]
})
export class MantenimientoComponent {

  private readonly ui = inject(UiStateService);
  private readonly store = inject(ConfigStoreService);

  showMaintenanceModal = this.ui.showMaintenanceModal;
  acceso = signal(false);
  password = '';
  private readonly passwordHashed = '$2a$12$Fd8V6dnDyavSej8fX33dsu6mMvOAmpUdn.i3vXx0R2sQfQlqTM9Ii';

  config = computed(() => this.store.config());

  async ngOnInit() {
    console.log('🔄 Iniciando carga de configuración...');
    await this.store.load();
    console.log('✅ Configuración cargada correctamente:', this.store.current);
  }

  verificarClave() {
    const esValida = bcrypt.compareSync(this.password, this.passwordHashed);
    this.acceso.set(esValida);
    if (!esValida) {
      alert('❌ Clave incorrecta');
    }
  }

  async guardarCambios() {
    try {
      await this.store.save(this.config());
      alert('✅ Cambios guardados correctamente.');
      this.acceso.set(false);
      this.showMaintenanceModal.set(false);
    } catch (err) {
      console.error('❌ Error al guardar:', err);
      alert('Error al guardar los cambios.');
    }
  }

  async resetConfig() {
    if (!confirm('¿Deseas restaurar los valores por defecto?')) return;
    try {
      await this.store.reset();
      alert('✅ Valores restaurados.');
      this.showMaintenanceModal.set(false);
    } catch (err) {
      console.error('❌ Error al restaurar:', err);
    }
  }

  addHeroButton() {
    const updated = structuredClone(this.config());
    updated.section_hero.buttons.push({
      text: 'Nuevo botón',
      link: '#',
      bgColor: 'bg-accent',
      textColor: 'text-white',
    });
    this.store.setConfig(updated);
  }

  removeHeroButton(index: number) {
    const updated = structuredClone(this.config());
    updated.section_hero.buttons.splice(index, 1);
    this.store.setConfig(updated);
  }

  updateConfigAt(path: (string | number)[], value: any): void {
    const updated = structuredClone(this.config());
    let ref: any = updated;

    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]];
    }

    ref[path[path.length - 1]] = value;
    this.store.setConfig(updated);
  }
}
