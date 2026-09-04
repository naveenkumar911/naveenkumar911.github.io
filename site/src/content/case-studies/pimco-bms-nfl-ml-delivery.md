---
title: "Embedded ML delivery for asset management, pharma and sports media"
client: "PIMCO, Bristol Myers Squibb, NFL (client engagements)"
role: "Senior Forward Deployed Engineer"
period: "Jan 2020 - Jul 2022"
industry: "Asset management, pharmaceuticals, sports media"
summary: "Embedded with client teams to deliver enterprise analytics, forecasting, fraud detection and ML solutions for decision-making and operations. Built and productionized ML pipelines end to end and transitioned them with documentation and knowledge transfer."
outcomes:
  - { value: "3", label: "regulated or high-visibility clients" }
  - { value: "end to end", label: "feature engineering to monitoring" }
  - { value: "handover", label: "documented, owned by client teams" }
stack: ["Python", "SQL", "PostgreSQL", "scikit-learn", "PyTorch", "MLflow", "Airflow-style orchestration", "Docker", "CI/CD"]
tracks: ["fde"]
featured: false
order: 6
verify:
  - "Which of forecasting, fraud detection and analytics mapped to which client; the text below keeps it deliberately general. Add specifics only if you are cleared to share them."
---

## The pattern

Three very different clients, one delivery pattern: embed with the client team, define requirements and acceptance criteria with the actual stakeholders, build production-grade pipelines rather than notebooks, and leave the client owning the system.

## What I built

- **Forecasting** models and pipelines feeding operational and planning decisions, with backtesting frameworks and drift monitoring.
- **Fraud and anomaly detection** pipelines with feature stores, threshold tuning against business cost curves and analyst feedback loops.
- **Enterprise analytics** pipelines (Python, SQL/PostgreSQL) covering ingestion, feature engineering, training, deployment and monitoring under MLOps practices.

```mermaid
flowchart LR
  SRC[Client data sources] --> FE[Feature pipelines SQL Python]
  FE --> TR[Training and experiment tracking MLflow]
  TR --> REG[Model registry and approval]
  REG --> SRV[Batch and API serving]
  SRV --> MON[Monitoring drift performance]
  MON --> FE
  STK[Client stakeholders acceptance criteria] -.-> TR
```

## What regulated clients taught me

- Acceptance criteria written with the business are the only definition of done that survives an audit.
- Reproducibility (versioned data, features, models, code) is a delivery requirement, not an engineering nicety.
- Knowledge transfer is part of the build: documentation, walkthroughs and shadowing so the client team runs the system after you leave.

These habits carried directly into the agentic era: evaluation gates, ADRs and runbooks are the same discipline applied to non-deterministic systems.
