# Architekturüberblick

- **UI/UX**: MandalaNetworkView, Sigil Viewer, CREP Charts  
- **Core**: CREP Engine, Sigillin Core, Memory Governance  
- **Agents/Bus**: NATS/Memory Bus, Runner/Reports, Personhood Gates  
- **DocOps**: LLM-Orchestrierung, Guardrails/CI

```mermaid
graph TD
  subgraph UI
    A[MandalaNetworkView] --> B[Sigil Viewer]
    A --> C[CREP Charts]
  end
  subgraph Core
    D[CREP Engine]
    E[Sigillin Core]
    F[Memory Governance]
  end
  subgraph Agents_Bus
    G[NATS / Memory Bus]
    H[Runner & Reports]
    I[Personhood Gates P0–P3]
  end
  subgraph DocOps
    J[LLM Orchestration]
    K[Guardrails/CI]
  end
  B --> E
  C --> D
  D --> G
  E --> G
  G --> H
  I --> G
  H --> J
  J --> K
  K --> G
```
