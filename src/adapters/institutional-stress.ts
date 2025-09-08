// Weiche Indikatoren, Sigil: 📈 >15 | 📉 >5 | 📊 sonst
export interface StressInput {
  priceAnomaly: number;
  harvestAnomaly: number;
  supplyChainDelay: number;
}

export function calculateStress(input: StressInput) {
  const stress = (Math.abs(input.priceAnomaly) + Math.abs(input.harvestAnomaly) + input.supplyChainDelay) / 3;
  const sigil = stress > 15 ? '📈' : stress > 5 ? '📉' : '📊';
  return { stress, sigil };
}
