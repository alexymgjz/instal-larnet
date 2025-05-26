import { Component, inject, signal, computed } from '@angular/core';
import { ConfigStoreService } from '../../services/config-store.service';
import { ConfigSchema } from '../../services/config.schema';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  templateUrl: './mantenimiento.component.html',
  imports: [
    NgIf,
    NgForOf
  ]
})
export class MantenimientoComponent {
  private store = inject(ConfigStoreService);
  acceso = signal(false);
  clave = signal('');
  config = computed(() => this.store.config());

  async ngOnInit() {
    console.log('🔄 Iniciando carga de configuración...');
    await this.store.load();
    console.log('✅ Configuración cargada correctamente:', this.store.current);
  }

  verificarClave() {
    this.acceso.set(this.clave() === 'admin123');
    if (!this.acceso()) {
      alert('❌ Clave incorrecta');
    }
  }

  async guardarCambios() {
    try {
      await this.store.save(this.config());
      alert('✅ Cambios guardados correctamente.');
      this.acceso.set(false);
      this.clave.set('');
    } catch (err) {
      console.error('❌ Error al guardar:', err);
      alert('Error al guardar los cambios.');
    }
  }

  async resetConfig() {
    const confirmar = confirm('¿Deseas restaurar los valores por defecto?');
    if (!confirmar) return;

    try {
      await this.store.reset();
      alert('✅ Valores restaurados.');
    } catch (err) {
      console.error('❌ Error al restaurar:', err);
    }
  }

  addHeroButton() {
    const updated: ConfigSchema = structuredClone(this.config());
    updated.section_hero.buttons.push({
      text: 'Nuevo botón',
      link: '#',
      bgColor: 'bg-accent',
      textColor: 'text-white',
    });
    this.store.setConfig(updated);
  }

  removeHeroButton(index: number) {
    const updated: ConfigSchema = structuredClone(this.config());
    updated.section_hero.buttons.splice(index, 1);
    this.store.setConfig(updated);
  }

  updateConfigAt(path: (string | number)[], value: any): void {
    const updated: ConfigSchema = structuredClone(this.config());
    let ref: any = updated;

    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]];
    }

    ref[path[path.length - 1]] = value;
    this.store.setConfig(updated);
  }
}
