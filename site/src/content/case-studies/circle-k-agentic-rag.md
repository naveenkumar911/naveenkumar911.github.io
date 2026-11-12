---
title: "Agentic RAG and real-time LLM inference from POC to production at a Fortune 500 retailer"
client: "Circle K with Huloop.ai"
role: "Lead AI Solutions Architect and Forward Deployed Engineer"
period: "Jul 2022 - Apr 2025"
industry: "Retail and convenience"
summary: "Embedded with retail business and engineering teams to take agentic RAG and real-time LLM inference from proof of concept to production: $2M per year in savings, support resolution time down 40%, answer relevance up 25%, with fine-tuned and right-sized models cutting inference cost."
outcomes:
  - { value: "$2M", label: "annual savings" }
  - { value: "-40%", label: "support resolution time" }
  - { value: "+25%", label: "answer relevance" }
  - { value: "POC to prod", label: "with CI/CD, monitoring, runbooks" }
stack: ["OpenAI", "Claude", "Llama", "LangChain", "LangGraph", "FAISS", "Pinecone", "FastAPI", "MLflow", "PEFT/LoRA/QLoRA", "n8n", "Zoho CRM", "WhatsApp Business API"]
tracks: ["fde", "head-of-ai", "fractional"]
featured: true
order: 2
verify:
  - "Named workstreams (store-operations knowledge assistant, supply and pricing automation, text-to-SQL analytics) are consistent with resume bullets and Key Projects; confirm names and scope"
  - "Breakdown of the $2M into support deflection, automation and inference savings is illustrative; adjust proportions if you know them"
---

## Context

A large convenience retailer had knowledge scattered across Confluence, operational manuals, CRM and ERP data, and a support function absorbing repetitive questions from stores and internal teams. Several teams had run GenAI demos; none had reached production. Huloop.ai brought me in as the embedded architect and engineer to own the path from discovery to production.

## Forward-deployed approach

1. **Discovery workshops** with store operations, support, supply chain and finance. Output: a ranked list of use cases with a baseline metric, an owner and a success criterion each.
2. **Scope the first slice** to the highest-value, lowest-blast-radius problem: grounded answers over operational documentation for the support function, measured on resolution time and answer relevance.
3. **Build the POC myself in two weeks**, then harden with the client's engineers so they could own it.
4. **Production cutover** with CI/CD, monitoring, runbooks and a handover plan. Only then expand to agentic workflows.

## Architecture

```mermaid
flowchart LR
  CH[Support console Slack WhatsApp] --> API[FastAPI inference service]
  API --> AG[LangGraph agent planner tool use]
  AG --> HR[Hybrid retrieval FAISS Pinecone BM25]
  HR --> RR[Cross-encoder re-ranker]
  AG --> TL[Tools Confluence CRM ERP Text to SQL]
  AG --> MR[Model router OpenAI Claude fine-tuned Llama]
  API --> ML[MLflow model registry experiments]
  API --> MON[Monitoring alerts runbooks]
  N8N[n8n automations supply pricing CRM] --> TL
  N8N --> WA[WhatsApp Business API]
  N8N --> ZH[Zoho CRM]
```

## Key decisions

**Hybrid retrieval with re-ranking before any model upgrade.** The first accuracy jump came from retrieval quality, not from a bigger model: dense plus lexical retrieval, metadata filters, and a cross-encoder re-ranker lifted answer relevance 25% on the golden set.

**Fine-tune and right-size where volume is high.** PEFT/LoRA/QLoRA fine-tuned Llama models handled classification, extraction and routing at a fraction of frontier-API cost. Frontier models were reserved for open-ended reasoning. Inference cost fell while quality held.

**Agentic RAG only after grounded RAG was stable.** Tool-augmented agents (web search, calculators, internal APIs, text-to-SQL) were added once retrieval, evals and monitoring were in place, so agent failures were diagnosable.

**Automation through n8n for ops workflows.** Multi-step agent workflows integrated WhatsApp, Zoho CRM and external APIs with LLM-based extraction and decisions, retries, error handling and monitoring; automated supply chain and pricing operations at more than 1,000 tasks per month.

## What shipped

- Production agentic RAG assistant over Confluence and operational documentation with citations.
- Real-time LLM inference services on FastAPI with MLflow-backed model management, CI/CD, monitoring and runbooks.
- Retail text-to-SQL assistant for self-service analytics over retail data.
- n8n agent automations for supply chain, pricing and CRM operations.
- Fine-tuned, right-sized models for high-volume tasks.

## Outcomes

- $2M per year in cost savings across support deflection, operations automation and inference cost reduction.
- Support resolution time down 40%; answer relevance up 25%.
- A client engineering team able to run and extend the platform after handover.

## What this taught me about forward deployment

The engagement succeeded because success criteria were agreed before a line of code, the first slice was small enough to ship in weeks, and handover was designed in from the start. Those three practices became the backbone of the six-gate playbook I use today.
