import { TeleconnectionSnapshot, TeleImpact, Threshold } from "./types";
import { toSigil } from "./sigil";

export function computeTeleImpact(s: TeleconnectionSnapshot, th: Threshold): TeleImpact {
  const w = regionWeights(s.region ?? "nile");
  const drivers: Record<string, number> = {};
  drivers["ENSO"] = w.enso * (s.nino34 ?? 0);
  drivers["IOD"]  = w.iod  * (s.iod ?? 0);
  drivers["NAO"]  = w.nao  * (s.nao ?? 0);
  const raw = drivers["ENSO"] + drivers["IOD"] + drivers["NAO"];
  const clamped = Math.max(-1, Math.min(1, raw));
  const sig = toSigil(Math.abs(clamped), { ...th, direction: "two_sided" });
  const sigil = sig === "🟢" ? "🟢" : "🛰️";
  return { score: clamped, drivers, sigil };
}

function regionWeights(region: string) {
  if (region.toLowerCase().includes("nile")) {
    return { enso: -0.6, iod: 0.4, nao: 0.1 };
  }
  return { enso: 0.0, iod: 0.0, nao: 0.0 };
}
