import { Injectable, signal, computed } from '@angular/core';
import { ConfigService } from './config.service';
import { DEFAULT_CONFIG } from '../config/default-config';
import { ConfigSchema } from './config.schema';

@Injectable({ providedIn: 'root' })
export class ConfigStoreService {
    private readonly configSignal = signal<ConfigSchema>({ ...DEFAULT_CONFIG });
    readonly config = computed(() => this.configSignal());
    public current: ConfigSchema = { ...DEFAULT_CONFIG };

    constructor(private configService: ConfigService) {}

    async load() {
        const remote = await this.configService.getConfig();
        this.current = remote && Object.keys(remote).length > 0 ? remote : { ...DEFAULT_CONFIG };
        this.configSignal.set(this.current);
    }

    async save(newConfig: ConfigSchema) {
        await this.configService.saveConfig(newConfig);
        this.configSignal.set(newConfig);
        this.current = newConfig;
    }

    async reset() {
        await this.configService.resetConfig();
        this.configSignal.set({ ...DEFAULT_CONFIG });
        this.current = { ...DEFAULT_CONFIG };
    }

    setConfig(newConfig: ConfigSchema) {
        this.configSignal.set(newConfig);
        this.current = newConfig;
    }
}
