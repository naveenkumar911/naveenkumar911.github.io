---
title: "Governed Agent Platform: reference architecture"
kind: "reference-architecture"
summary: "The layered architecture I use for enterprise agentic AI: channels, gateway, orchestration, governed tools, retrieval, model router with a sovereign tier, memory, guardrails, and an evaluation and observability plane that gates releases."
status: "Adopted across the government platform; derived from Circle K and copilot platform work"
order: 1
---

## Purpose

Most enterprise agent programs stall between pilot and production because the agent was built, but the platform around it was not. This reference architecture separates what changes per use case (prompts, tools, golden sets) from what must be built once and governed (runtime, security, evaluation, observability, cost).

## Layers

```mermaid
flowchart TB
  subgraph ch [Channels]
    WEB[Web and mobile]
    CHAT[Teams Slack WhatsApp]
    APIC[APIs and batch]
  end
  ch --> GW[Gateway auth RBAC tenancy quotas]
  GW --> ORCH[Orchestration runtime state machines planning verification HITL]
  ORCH --> TOOLS[Governed tool registry MCP contracts scopes blast radius]
  ORCH --> RET[Retrieval hybrid re-ranking access aware]
  ORCH --> ROUTER[Model router task class cost budget residency]
  ROUTER --> FRONTIER[Frontier APIs regional]
  ROUTER --> TUNED[Fine tuned open models]
  ROUTER --> SOV[Sovereign tier on prem air gapped]
  ORCH --> MEM[Memory conversation task long term]
  ORCH --> GUARD[Guardrails input output policy PII injection]
  subgraph plane [Evaluation and observability plane]
    TRACE[Tracing]
    SLO[SLOs cost error budgets]
    EVAL[Golden sets regression release gates]
    AUDIT[Audit log decisions approvals]
  end
  ORCH --> plane
  TOOLS --> AUDIT
  GOV[Governance policy owners risk classes standards] -.-> ORCH
  GOV -.-> TOOLS
  GOV -.-> plane
```

## Component responsibilities

| Layer | Owns | Does not own |
| --- | --- | --- |
| Gateway | Identity, RBAC, tenancy, quotas, request shaping | Business logic |
| Orchestration runtime | Workflow state, planning, tool dispatch, verification, human approval | Tool implementations |
| Governed tool registry | Tool contracts, permission scopes, blast-radius class, versioning | Agent reasoning |
| Retrieval | Ingestion, chunking, indexing, hybrid search, re-ranking, ACL filtering | Which documents are authoritative (business owns) |
| Model router | Model selection by task class, cost budget, residency tag; caching; fallbacks | Prompt content |
| Memory | Conversation, task and long-term memory with scoping and retention | Retrieval of documents |
| Guardrails | Input and output policy, PII handling, injection defense, refusal behaviour | Evaluation of quality |
| Evaluation and observability plane | Tracing, SLOs, cost, golden sets, regression gates, audit | Fixing what it finds (teams own) |
| Governance | Risk classes, standards, owners, intervention rights | Day-to-day operation |

## Non-functional requirements I set by default

- Every agent action is attributable: who asked, which model, which tools, which data, who approved.
- Every tool declares a blast-radius class; irreversible actions require approval until a documented track record justifies relaxing it.
- Every workflow has a golden set and a release gate before it serves real users.
- Residency-tagged workloads never leave the sovereign tier.
- Cost per request and latency percentiles are SLOs with owners.

## Adoption path

1. Stand up gateway, runtime, one tool, one retrieval source, tracing and one golden set. Ship one workflow.
2. Add the router with two models and a cost budget. Add the release gate.
3. Add the sovereign tier if residency demands it. Add memory.
4. Open the platform to product teams with a template repository and review gates.

## Related

- [Forward-Deployed Playbook](/architecture/forward-deployed-playbook)
- [Evaluation methodology](/architecture/evaluation-methodology)
- [MCP and A2A security boundaries](/architecture/mcp-a2a-security-boundaries)
- [Model routing and cost optimization](/architecture/model-routing-and-cost-optimization)
