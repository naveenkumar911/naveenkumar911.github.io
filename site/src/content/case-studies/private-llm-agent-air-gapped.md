---
title: "Local and private LLM agent for offline, air-gapped document intelligence"
client: "Data-sovereign and privacy-constrained environments"
role: "Architect and builder"
period: "2024 - Present"
industry: "Government, regulated enterprise"
summary: "Ollama and Llama-family models packaged as a fully offline agent for document Q&A and automation, optimized for low latency and data privacy in environments where no data may leave the machine or network. Used as the sovereign fallback pattern in larger platforms."
outcomes:
  - { value: "0", label: "external calls at runtime" }
  - { value: "CPU / single GPU", label: "deployable footprint" }
  - { value: "pattern", label: "sovereign fallback in larger platforms" }
stack: ["Ollama", "Llama", "llama.cpp", "vLLM", "FastAPI", "pgvector / local vector store", "Docker", "quantized models"]
tracks: ["sovereign", "platform"]
featured: false
order: 7
verify:
  - "Where this was deployed (specific team or environment) if you can share it; the description keeps it general"
---

## Why it matters

Some conversations in government and regulated industries end at "the data cannot leave this room". A portfolio of cloud-only patterns fails that test. This agent exists so that grounded document Q&A and light automation can run with zero external dependencies, and so that the larger platforms I design always have a sovereign fallback.

## Design

```mermaid
flowchart LR
  DOCS[Local documents PDFs Office scans] --> ING[Offline ingestion OCR chunking]
  ING --> VS[Local vector store pgvector or embedded]
  USER[Analyst UI or CLI] --> AG[Local agent FastAPI]
  AG --> VS
  AG --> LLM[Ollama Llama quantized llama.cpp vLLM]
  AG --> TOOLS[Local tools file search structured lookups]
  AG --> LOG[Local audit log]
```

- Quantized Llama-family models served through Ollama or llama.cpp on CPU or a single GPU; vLLM where a GPU is available and throughput matters.
- Embeddings computed locally; vector store kept on the same host or network segment.
- Agent loop with retrieval, citation and structured tool calls, no outbound network permission at the container level.
- Local audit log of prompts, retrieved chunks and outputs for review.

## Trade-offs I make explicit

- Smaller models mean narrower reasoning; the agent is scoped to grounded Q&A, extraction and routing, not open-ended research.
- Latency is tuned through quantization, prompt caching and short context windows rather than raw model size.
- Evaluation uses the same golden-set approach as the cloud platforms, so quality is measured rather than assumed.

## Where it fits

In the [governed agent platform reference architecture](/architecture/governed-agent-platform), this is the "sovereign tier" behind the model router: workloads tagged as restricted are routed here automatically. In the [data sovereignty article](/insights/data-sovereignty-llm-systems-gulf) I describe how this tier changes procurement and risk conversations with public-sector stakeholders.
