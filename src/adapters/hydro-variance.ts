// HVI = σ/μ, Sigils: 🟢 <0.3 | 🟠 <0.6 | 🔴 ≥0.6
import { mean, standardDeviation as std } from 'simple-statistics';

export interface HVIInput {
  region: string;
  values: number[];
}

export function calculateHVI(input: HVIInput) {
  const mu = mean(input.values);
  const sigma = std(input.values);
  const hvi = sigma / (mu || 1);
  const sigil = hvi >= 0.6 ? '🔴' : hvi >= 0.3 ? '🟠' : '🟢';
  return { region: input.region, hvi, sigil };
}
