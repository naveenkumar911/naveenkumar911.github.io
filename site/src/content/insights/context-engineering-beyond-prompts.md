---
title: "Context engineering beyond prompts: memory, retrieval and tool design"
description: "Prompt engineering optimised a string. Context engineering designs everything the model sees: what is retrieved, what is remembered, how tools describe themselves, and what is deliberately left out."
date: 2026-08-13
track: agentic
tags: ["context engineering", "RAG", "memory", "agent design"]
featured: false
---

The phrase context engineering has been over-marketed, but the work underneath it is real and it is where most production quality comes from. Prompt engineering optimised one string. Context engineering designs the entire input the model receives at each step: instructions, retrieved knowledge, memory, tool descriptions, prior steps, and the shape of all of it.

Production AI is less about maximising model intelligence and more about optimising the system around the model. The best model with poor retrieval, weak memory and confusing tool descriptions will lose to a smaller model inside a well-engineered context.

## The budget mindset

Every token in context costs money and attention. Long contexts degrade reasoning even when they fit the window. So context engineering starts from a budget per step and asks what earns its place.

- **Instructions**: the stable system prompt, versioned, cached where the provider allows.
- **Task state**: what the agent has done and decided so far, summarised.
- **Retrieved knowledge**: the few chunks that matter, re-ranked, with citations.
- **Memory**: relevant facts about this user or task, not the whole history.
- **Tools**: descriptions of the tools relevant to this step, not the whole registry.
- **Untrusted data**: clearly labelled, bounded, never mixed with instructions.

## Retrieval as context design

Retrieval quality is context quality. Hybrid dense plus lexical search, metadata filters, and a re-ranker so that fewer, better chunks reach the model. Chunking strategy per document type, because a policy document, a scanned form and a spreadsheet export should not be chunked the same way. Access-aware filtering so the model never sees what the user may not. At Circle K, tuning this layer produced a 25 percent gain in answer relevance before any model change.

## Memory as a designed artifact

Conversation memory: recent turns verbatim, older turns summarised, with summaries evaluated for faithfulness. Task memory: structured state (what was retrieved, which tools ran, what was decided) rather than a transcript. Long-term memory: explicit, scoped, consented facts with retention policies, never an unbounded log. Memory that is not designed becomes both a quality problem and a privacy problem.

## Tool descriptions are prompts

The model chooses tools based on their descriptions. Vague or overlapping descriptions cause wrong tool selection, one of the most common agent failures in my traces. Each tool description should say precisely when to use it, when not to, and what the arguments mean, with examples. Expose only the tools the step needs. Tool selection accuracy is a metric in my evaluation harness for this reason.

## Step design

Agent loops that stuff the entire history into every call are expensive and brittle. Explicit state machines (planning, retrieval, action, verification, approval) let each step receive a purpose-built context. This is why I favour graph-style orchestration over free-form loops in production.

## What to leave out

Half of context engineering is subtraction: the tool the step does not need, the chunk that is similar but irrelevant, the conversation history that no longer matters, the instruction that duplicates another. Every removal is cheaper, faster and usually more accurate.

## Measuring it

Context changes are evaluated like model changes: golden sets, layered metrics, release gates. A retrieval tweak that improves recall but blows the token budget fails the gate. The evaluation harness is the only way to make context engineering a discipline rather than a hobby.

The hype will pass. The practice of designing what the model sees, with a budget and a measurement, will remain the core skill of production AI engineering.
