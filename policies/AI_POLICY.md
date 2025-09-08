# AI_POLICY (Lite)
- Grundsatz: "Jede Aktion wird vor Ausführung gegen die Policy geprüft (allow/deny/ask)."
- Defaults: on_uncertainty = ask, on_conflict = defer & log.
- Demo-Hook: Requests mit `X-AI-Action: dangerous` → HTTP 403.
