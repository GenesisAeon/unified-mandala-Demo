# UnifiedMandala Demo – Handbuch (Lightweight)

## Was ist das?
Ein „atmendes“ Demo: KPIs (HVI/BLR), Sigillin-Sprache, CREP-Resonanz. Fokus: **Demo > Perfektion**.

## Schnellstart (5 Min)
```bash
pnpm i
cp .env.example .env   # NOAA/USGS optional setzen
pnpm dev               # Server & SPA
# Dann: http://localhost:3000/metrics.html
```

## Endpunkte

* `GET /api/live/hvi/:site` → { hvi, sigil }
* `GET /api/live/teleconnections` → ENSO-Signal
* `GET /api/metrics/snapshot` → Mini-Dashboard JSON

## Sigillin-Legende

* HVI: 🟢 <0.3 · 🟠 0.3–0.6 · 🔴 ≥0.6
* BLR: 💧 ≥1.2 · 🚨 0.8–1.2 · 🧯 ≤0.8

## CREP-Guardrails

* `pnpm crep:check` (soft-fail im Demo)
