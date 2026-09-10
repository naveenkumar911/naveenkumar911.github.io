---
title: "Enterprise AI Copilot platform with streaming, memory, retrieval, agent workflows and RBAC"
client: "Enterprise platform delivered across engagements"
role: "Architect and full-stack lead"
period: "2023 - 2025"
industry: "Enterprise technology"
summary: "Designed and built a reusable enterprise copilot platform: React front end, FastAPI back end, LangGraph agent workflows, PostgreSQL and Redis, Azure OpenAI; streaming responses, conversational memory, document retrieval, role-based access and production monitoring. Became the template for later agentic deployments."
outcomes:
  - { value: "streaming", label: "sub-second first token" }
  - { value: "RBAC", label: "access-aware retrieval" }
  - { value: "reusable", label: "template for later platforms" }
stack: ["React", "TypeScript", "FastAPI", "LangGraph", "PostgreSQL", "Redis", "Azure OpenAI", "Azure AI Search", "Container Apps", "Docker"]
tracks: ["platform", "head-of-ai", "fde"]
featured: false
order: 5
verify:
  - "Which engagement(s) this platform was deployed in, and any usage numbers you can share"
---

## Problem

Every new AI use case was being built as a one-off chatbot with its own auth, its own retrieval and no monitoring. Leadership wanted one platform that product teams could build on, with security and observability handled once.

## Architecture

```mermaid
flowchart LR
  UI[React copilot UI streaming SSE] --> API[FastAPI gateway auth RBAC]
  API --> WF[LangGraph workflows chat retrieval agents]
  WF --> RAG[Azure AI Search plus pgvector access aware]
  WF --> AOAI[Azure OpenAI model deployments]
  WF --> MEM[Conversation memory Redis Postgres]
  WF --> TOOLS[Tool adapters enterprise APIs]
  API --> OBS[Monitoring tracing usage cost]
  ADMIN[Admin console prompts tools policies] --> API
```

## Key capabilities

- **Streaming responses** over server-sent events with token-level rendering and tool-call status, so users see progress instead of a spinner.
- **Conversational memory** with summarisation and per-user, per-workspace scoping stored in Redis (hot) and PostgreSQL (durable).
- **Access-aware retrieval**: documents carry ACLs at index time; retrieval filters by the caller's roles before ranking, so RBAC is enforced in the data path rather than in the prompt.
- **Agent workflows** as LangGraph state machines with explicit nodes for planning, tool use, verification and human approval.
- **Admin console** for prompt versions, tool registration, policy toggles and usage reporting.
- **Production monitoring**: request tracing, token and cost accounting per team, latency SLOs, error alerting.

## Decisions

**Enforce authorization in retrieval, not in prompts.** Prompt-level "do not reveal" instructions are not a security control. ACL filtering at query time is.

**Workflows as explicit state machines.** Free-form agent loops were hard to debug and impossible to explain to security reviewers. LangGraph graphs made every path inspectable and testable.

**Platform team owns the runtime; product teams own prompts and tools.** This division let several teams ship copilots without re-solving auth, memory, streaming or monitoring.

## Outcome

The platform became the template for later agentic deployments, including the government platform, where the same separation of runtime, tools and governance carried over. It cut the time from "approved use case" to "in users' hands" from months to weeks.
