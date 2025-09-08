# Governance & Ethik (Kurzfassung)

## Personhood-Levels (P0–P3)
- P0: öffentlich, P1: Nutzer, P2: Maintainer, P3: Admin/Sensitive
- Gate erzwingt: Topic × Level → erlaubt/gesperrt

## Policies (YAML) & Guardrails (CI)
- Menschenlesbare YAML-Regeln + Schema-Validation
- Guardrails verhindern Gate-Weitung, prüfen CREP-Ranges & Sigillin-Schema
- Issue-Referenz & Release-Notes für Nachvollziehbarkeit

## Merge-Checkliste
- [ ] CI/Guardrails grün
- [ ] CREP-Werte ∈ [0,1]
- [ ] Sigillin valide (Schema, Crosslinks)
- [ ] Changes dokumentiert (CHANGESET + Release-Notes)
