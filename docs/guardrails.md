# CREP Guardrails (Coherence · Resonance · Emergence · Poetics)

**Zweck:** Sanfte Leitplanken für Code, Sigille und Agenten-Integration.
**Arbeitsweise:** Prüft geänderte Dateien gegen CREP- und Ethik-Heuristiken.
**Modi:**
- `soft`: loggt nur (First-Start > Perfektion)
- `auto`: bricht bei `severity >= threshold` ab
- `hard`: bricht immer bei Verstößen ab

**Schnellstart**
```bash
pnpm guardrails:check
CREP_GUARDRAILS_MODE=auto CREP_FAIL_ON=medium pnpm guardrails:check
```

**Konfiguration:** `tools/governance/crep-guardrails.config.yaml`
**CI:** `.github/workflows/guardrails.yml`
