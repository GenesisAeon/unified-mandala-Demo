# 🜂 UnifiedMandala — Kurz-README (Präsentationsfähig)

> „Ein Betriebssystem, das atmet – ein Mandala, das denkt.“

**Zweck dieses Repos**  
Holistisches, modulares Framework für symbolische KI, CREP-Logik und ethische Agenten-Workflows.

## TL;DR (60s)
- Start: `pnpm install && pnpm dev` (oder `docker compose up`)
- Einstieg: **index.html** (Landing-Page) + **HANDBUCH.md** („Erste 30 Minuten“)
- Architektur: **ARCHITECTURE.md** (Mermaid)
- Governance: **GOVERNANCE.md** (Personhood P0–P3, Guardrails)

### Start (lokal)
```bash
pnpm install
pnpm start
```
API testen: `/api/kpi/list`, `/api/crep/resonance`, `/api/hydro/hvi/Nile`

![UI Preview](docs/demo/ui-home.svg)

## Kernideen
- **CREP**: Coherence, Resonance, Emergence, Poetics (0–1) → Priorisierung & Reflexion
- **Sigillin**: symbolische Anker (Konfigs, Rituale, Trigger)
- **EventBus**: NATS (prod) / Memory (dev), Schema-Validation, Personhood-Gates
- **DocOps**: Reports & Guardrails, menschenzentrierte Dokumentation

## Schnelllinks
- HANDBUCH.md – Onboarding
- QUICKSTART.md – Demo in 5–10 Min
- ARCHITECTURE.md – Diagramme
- GOVERNANCE.md – Ethik/Policies
- AGENTS_WORKFLOW.md – Agenten & Runner
- docs/PITCH.md – One-Pager
- docs/demo/RELEASE-GATE.md – Demo-Checklist
- docs/ProgramFlow.svg – Program-Flow

## Installation
This repo is primarily a Node.js/TypeScript application (no published
PyPI package yet):
```bash
pnpm install
```
A `pyproject.toml` is included for GenesisAeon ecosystem release tooling
consistency, but `pip install unified-mandala-demo` is not yet meaningful
since there is no Python source to package.

## Usage / Quick Start
```bash
pnpm install
pnpm start
# then:
curl http://localhost:3000/api/kpi/list
curl http://localhost:3000/api/crep/resonance
curl http://localhost:3000/api/hydro/hvi/Nile
```

## Role in the GenesisAeon Ecosystem
`unified-mandala-Demo` (P-MANDALA-DEMO) is the demo/visualization layer
for `unified-mandala`, exposing its CREP/Sigillin/EventBus concepts
through a runnable API and UI for onboarding and presentation purposes.

## Citation
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.PLACEHOLDER.svg)](https://doi.org/10.5281/zenodo.PLACEHOLDER)

DOI will be assigned automatically on first GitHub Release once
Zenodo–GitHub integration is enabled for this repo.

## License
Dual-licensed:
- Source code: GPL-3.0-or-later — see [LICENSE-CODE](./LICENSE-CODE)
- Documentation: CC BY 4.0 — see [LICENSE-DOCS](./LICENSE-DOCS)

See [LICENSE](./LICENSE) for details.
