---
title: "AI governance mapping: NIST AI RMF, EU AI Act, ISO/IEC 42001"
kind: "framework"
summary: "How the platform controls map to the three frameworks enterprises are asked about most, so governance is a property of the architecture rather than a document written after the fact."
status: "Adopted; basis of the AI governance standards on the government platform"
order: 6
---

## Approach

Governance that lives in a policy PDF does not survive contact with a sprint. Every control below is implemented as something in the platform: a registry field, a gate, a log, a review with an owner. The frameworks are then satisfied by construction and evidenced from the system.

## Mapping

| Platform control | NIST AI RMF | EU AI Act (high-risk obligations) | ISO/IEC 42001 |
| --- | --- | --- | --- |
| Use-case register with risk class, owner, success criterion | Map 1, Govern 1 | Risk classification, provider obligations | Clause 6 planning, Annex A controls on AI system impact |
| Golden sets and release gates | Measure 2 | Accuracy, robustness, testing | Performance evaluation, clause 9 |
| Tracing and immutable audit | Measure 2, Manage 4 | Record keeping and logging | Documentation, traceability |
| Blast-radius classes and human approval | Manage 1, Govern 2 | Human oversight | Human oversight controls |
| Guardrails, injection defense, PII handling | Manage 2 | Cybersecurity, data governance | Information security, data management |
| Model and vendor selection records | Govern 6 | Provider and deployer duties, technical documentation | Supplier relationships, third-party AI components |
| Model cards, prompt versions, ADRs | Govern 1, Map 3 | Technical documentation, transparency | Documented information |
| Incident response and runbooks | Manage 4 | Serious incident reporting | Incident management, corrective action |
| Sovereign tier and residency tags | Map 4 | Data governance | Data location and legal requirements |
| Weekly quality review with business owner | Measure 3, Manage 3 | Post-market monitoring | Continual improvement, clause 10 |

## Operating model

- **AI governance forum** monthly: owners of each use case, security, data protection, the platform lead. Reviews the register, incidents, gate exceptions and expansion requests.
- **Intervention rights** are explicit: who can pause an agent, who can relax a blast-radius policy, who signs residual risk.
- **Evidence on demand**: because controls are in the system, audit questions are answered with queries, not interviews.

## Why this matters now

The EU AI Act's high-risk system obligations have been applicable since August 2026. UAE entities increasingly align to ISO/IEC 42001 for sovereign AI programs. A leader who can show controls implemented in the architecture, rather than promised in a policy, shortens procurement, security review and board approval considerably. I expand on the operating checklist in [EU AI Act and ISO/IEC 42001: an operating checklist](/insights/eu-ai-act-iso-42001-operating-checklist).
