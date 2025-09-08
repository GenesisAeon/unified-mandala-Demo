// BLR = storage / demand, Sigils: 💧 ≥1.2 | 🚨 (0.8..1.2) | 🧯 ≤0.8
export interface BLRInput {
  storage: number;
  demand: number;
}

export function calculateBLR(input: BLRInput) {
  const blr = input.storage / (input.demand || 1);
  const sigil = blr <= 0.8 ? '🧯' : blr < 1.2 ? '🚨' : '💧';
  return { blr, sigil };
}
