---
title: "EU AI Act high-risk obligations and ISO/IEC 42001: an operating checklist for CAIOs"
description: "The EU AI Act's high-risk obligations have been applicable since August 2026 and ISO/IEC 42001 is becoming the reference management system for AI. A practical checklist for AI leaders that turns both into platform controls rather than documents."
date: 2026-07-23
track: leadership
tags: ["EU AI Act", "ISO 42001", "governance", "compliance", "CAIO"]
featured: false
---

Two frameworks now define the compliance conversation for enterprise AI leaders. The EU AI Act's obligations for high-risk systems have applied since August 2026, reaching any organisation that places such systems on the EU market or whose outputs are used there. ISO/IEC 42001 has become the reference management system standard for AI, increasingly requested in procurement across the Gulf and Europe. Both are manageable if governance is built into the platform. Both are painful if it is a document written afterwards.

This is the checklist I use. The framework-by-control mapping is [here](/architecture/ai-governance-mapping).

## 1. Know what you have

- A use-case register listing every AI system in production or pilot, with owner, purpose, risk classification, data used and deployment scope.
- Classification against the AI Act's risk tiers, with rationale recorded. Most enterprise agent workflows are not high-risk; the ones touching employment, credit, education, essential services or law enforcement may be.
- Vendor and model inventory: which components are third-party, under what terms, with what documentation.

**Platform control**: the register is the source of truth the runtime enforces; nothing runs that is not registered.

## 2. Assign accountability

- Named business owner per system, with the outcome in their objectives.
- Named intervention rights: who can pause, who can relax a policy, who signs residual risk.
- A governance forum with authority, meeting monthly, with a record of decisions.

**Platform control**: owners and approvers are fields in the registry; approvals are logged.

## 3. Evidence quality and robustness

- Golden sets and evaluation results per system, versioned.
- Release gates that block deployment on quality, safety or cost regression.
- Production monitoring of quality, drift and incidents.

**Platform control**: the [evaluation methodology](/architecture/evaluation-methodology) in CI and production.

## 4. Human oversight by design

- Blast-radius classes on tools; human approval on irreversible actions.
- Clear escalation paths with service levels.
- Training for the humans in the loop so oversight is real, not a rubber stamp.

**Platform control**: the governed tool registry and approval cards.

## 5. Logging and record keeping

- End-to-end traces retained per policy: inputs, retrieved context, tool calls, model versions, outputs, approvals.
- Immutable audit of decisions and policy changes.
- Retention and access controls that satisfy data protection.

**Platform control**: tracing and audit as platform services, resident where the data must be.

## 6. Data governance

- Lineage from source to embedding to answer.
- Access control enforced in retrieval, not in prompts.
- Residency tags enforced by the router.

**Platform control**: access-aware retrieval and the sovereign tier.

## 7. Security

- Prompt-injection defense, least-privilege tool scopes, identity propagation.
- Adversarial test suites run as part of evaluation.
- Incident response runbooks that include AI-specific scenarios.

**Platform control**: the [MCP and A2A security decision](/architecture/mcp-a2a-security-boundaries).

## 8. Documentation and transparency

- Model cards, prompt versions, ADRs and system descriptions maintained as living documents in the repository.
- User-facing disclosure where the Act or policy requires it.
- Technical documentation assembled from the system, not reconstructed.

## 9. Post-market monitoring and improvement

- Weekly quality review with business owners using production samples.
- Incident logging and serious-incident reporting process.
- Continual improvement loop feeding the golden set and the policies.

**Platform control**: the run-and-expand gate of the [playbook](/architecture/forward-deployed-playbook).

## 10. Management system

- Policy, roles, risk assessment, objectives, internal audit and management review, per ISO/IEC 42001 clauses.
- Alignment with existing ISO 27001 and data protection programs so AI governance is an extension, not a parallel bureaucracy.

## The leadership point

Compliance built as documents is expensive, slow and brittle. Compliance built as platform controls is evidence on demand: every audit question becomes a query. Boards and regulators increasingly know the difference. For a CAIO, the checklist above is also a design specification for the platform, which is why I treat governance and architecture as one job.
