// ui-state.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiStateService {
    showMaintenanceModal = signal(false);
}
