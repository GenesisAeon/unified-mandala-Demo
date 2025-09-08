import { BufferLoadRatio, ResourceKind } from './types.js';

export class BufferLoadAdapter {
  async getBLR(resource: ResourceKind, region: string): Promise<BufferLoadRatio> {
    const { available_storage: buffer, current_demand: load } = await this.fetchResourceData(resource, region);
    const ratio = buffer / (load || 1);
    const sigil = ratio >= 1 ? '💧' : '🧯';
    return {
      resource,
      region,
      buffer,
      load,
      ratio,
      sigil,
      timestamp: new Date().toISOString(),
    };
  }

  private async fetchResourceData(resource: ResourceKind, _region: string) {
    const mock = {
      soil_moisture: { available: 75, demand: 85 },
      groundwater: { available: 120, demand: 100 },
      reservoir: { available: 200, demand: 180 },
    } as const;
    const d = mock[resource];
    return { available_storage: d.available, current_demand: d.demand };
  }
}
