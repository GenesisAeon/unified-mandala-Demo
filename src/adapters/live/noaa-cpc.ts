// Minimal ONI/ENSO CSV-Fetch + Parser (NOAA CPC); fällt auf Mock zurück
import { setTimeout as wait } from "node:timers/promises";

export interface ONIEntry { date: string; value: number }
export interface TeleconnectionLive { index: "ENSO"; phase: string; strength: number; updated: string }

const ONI_URL = process.env.NOAA_ONI_URL ?? "https://example.invalid/oni.csv"; // setzbar per .env
const FETCH_TIMEOUT_MS = 8000;

export async function fetchONI(): Promise<ONIEntry[]> {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), FETCH_TIMEOUT_MS);
    const resp = await fetch(ONI_URL, { signal: ctl.signal });
    clearTimeout(t);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = await resp.text();
    return parseONICsv(text);
  } catch {
    // Fallback (sanfte Demo)
    return [
      { date: "2025-06", value: -0.7 },
      { date: "2025-07", value: -1.0 },
      { date: "2025-08", value: -1.2 }
    ];
  }
}

export function oniToSignal(oni: ONIEntry[]): TeleconnectionLive {
  const last = oni.at(-1)!;
  const strength = last.value;
  const phase = strength < -0.5 ? "La Niña" : strength > 0.5 ? "El Niño" : "Neutral";
  return { index: "ENSO", phase, strength, updated: new Date().toISOString() };
}

function parseONICsv(csv: string): ONIEntry[] {
  return csv
    .split(/\r?\n/).map(l => l.trim()).filter(Boolean)
    .map(line => {
      const [date, value] = line.split(/[,;\s]+/);
      return { date, value: Number(value) };
    })
    .filter(r => !Number.isNaN(r.value));
}
