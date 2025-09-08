import { TeleconnectionSignal } from './types.js';

export class TeleconnectionAdapter {
  async getTeleconnectionSignals(): Promise<TeleconnectionSignal[]> {
    return [await this.enso(), await this.iod(), await this.nao()].filter(Boolean) as TeleconnectionSignal[];
  }

  private async enso(): Promise<TeleconnectionSignal> {
    const mockONI = -1.2;
    return {
      index: 'ENSO',
      phase: mockONI < -0.5 ? 'La Niña' : mockONI > 0.5 ? 'El Niño' : 'Neutral',
      strength: mockONI,
      impact_score: this.impact('ENSO', mockONI),
      sigil: '🛰️',
      forecast_days: 90,
      timestamp: new Date().toISOString(),
    };
  }

  private async iod(): Promise<TeleconnectionSignal> {
    const v = 0.8;
    return {
      index: 'IOD',
      phase: v > 0.4 ? 'Positive' : v < -0.4 ? 'Negative' : 'Neutral',
      strength: v,
      impact_score: this.impact('IOD', v),
      sigil: '🛰️',
      forecast_days: 60,
      timestamp: new Date().toISOString(),
    };
  }

  private async nao(): Promise<TeleconnectionSignal> {
    const v = -0.6;
    return {
      index: 'NAO',
      phase: v > 0.5 ? 'Positive' : v < -0.5 ? 'Negative' : 'Neutral',
      strength: v,
      impact_score: this.impact('NAO', v),
      sigil: '🛰️',
      forecast_days: 30,
      timestamp: new Date().toISOString(),
    };
  }

  private impact(index: 'ENSO' | 'IOD' | 'NAO', value: number): number {
    const w = { ENSO: 0.3, IOD: 0.25, NAO: 0.2 }[index];
    return Math.min(Math.abs(value) * w, 1);
  }
}
