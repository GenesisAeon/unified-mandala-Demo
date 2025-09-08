// ENSO/IOD/NAO → Impact-Score, Sigil: 🛰️ bei starker Fernwirkung (>1.5), sonst 🌍
export interface TeleconnectionInput {
  enso: number;
  iod: number;
  nao: number;
  region: string;
}

export function calculateImpactScore(input: TeleconnectionInput) {
  const score = Math.abs(input.enso) + Math.abs(input.iod) + Math.abs(input.nao);
  const sigil = score > 1.5 ? '🛰️' : '🌍';
  return { region: input.region, score, sigil };
}
