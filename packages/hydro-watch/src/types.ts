import { z } from "zod";

export const TimePoint = z.object({
  t: z.string(),          // ISO-8601
  v: z.number().finite()  // Messwert (z.B. Abfluss, mm)
});
export type TimePoint = z.infer<typeof TimePoint>;

export type Sigil = "🟢" | "🟠" | "🔴" | "🧯" | "🛰️";

export interface Threshold {
  warn: number;  // Schwelle für 🟠
  alarm: number; // Schwelle für 🔴
  direction?: "high_is_bad" | "low_is_bad" | "two_sided";
}

export interface HVIMetric {
  mean: number;
  stdev: number;
  hvi: number;   // σ/μ
  sigil: Sigil;
}

export interface BLRMetric {
  storage: number; // verfügbare Speicher (mm, hm³ …)
  demand: number;  // Bedarf
  ratio: number;   // storage / demand
  sigil: Sigil;
}

export interface TeleconnectionSnapshot {
  nino34?: number; // °C Anomalie
  iod?: number;    // DMI
  nao?: number;    // Index
  region?: string; // z.B. "nile"
}

export interface TeleImpact {
  score: number;   // -1..+1 (negativ=Trocken, positiv=Nass)
  drivers: Record<string, number>;
  sigil: Sigil;
}
