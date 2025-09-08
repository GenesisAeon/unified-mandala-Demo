import { BLRMetric, Threshold } from "./types";
import { toSigil } from "./sigil";

export function computeBLR(storage: number, demand: number, th: Threshold): BLRMetric {
  const ratio = demand > 0 ? storage / demand : Infinity;
  const sigil = toSigil(ratio, { ...th, direction: "low_is_bad" });
  return { storage, demand, ratio, sigil: ratio < 1 ? "🧯" : sigil };
}
