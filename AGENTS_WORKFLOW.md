# Agenten & Workflow

## Eventing
- NATS als produktionsreifer Bus (Memory-Fallback für Dev)
- Schema-Validation (AJV), retry/backpressure empfohlen
- Optional: OTEL Tracing (Jaeger/Tempo)

## Runner & Reports
- Subprozesse für Modelle/Adapter
- Artefakte: `runs/<ts>/artifacts/...`
- HTML-Reports (Mermaid + Charts) zur Nachvollziehbarkeit

## LLM-Orchestrierung (optional)
- Mistral → Architektur/Policy/Tests
- Claude → Ethik/Docs/Onboarding
- Aggregation → CHANGESET → `git apply` → Guardrails

## Für Menschen
- `index.html` als Start
- `HANDBUCH.md` + `QUICKSTART.md` für Einstieg/Demo
