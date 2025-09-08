import { HydroVarianceIndex } from './types.js';

export class HydroVarianceAdapter {
  async getHVI(region: string, days = 365): Promise<HydroVarianceIndex> {
    const { values } = await this.fetchStreamflowVariance(region, days);
    const mean = this.mean(values);
    const variance = this.variance(values, mean);
    const hvi = variance / (mean || 1);
    const thresholds = { stable: 0.3, elevated: 0.6, critical: 1.0 };
    const sigil = hvi <= thresholds.stable ? '🟢' : hvi <= thresholds.elevated ? '🟠' : '🔴';
    return {
      region,
      value: hvi,
      threshold_low: thresholds.stable,
      threshold_high: thresholds.critical,
      sigil,
      timestamp: new Date().toISOString(),
    };
  }

  private async fetchStreamflowVariance(_region: string, days: number) {
    const mockValues = Array.from({ length: days }, (_, i) =>
      100 + Math.sin(i / 14) * 25 + (Math.random() - 0.5) * 35
    );
    return { values: mockValues };
  }

  private mean(values: number[]) {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  private variance(values: number[], mean: number) {
    return values.reduce((acc, v) => acc + (v - mean) * (v - mean), 0) / values.length;
  }
}
