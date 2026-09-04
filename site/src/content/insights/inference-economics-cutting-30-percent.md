---
title: "Inference economics: how we cut AI infrastructure cost 30 percent without losing quality"
description: "Inference is the dominant AI cost centre. The four levers, in the order to pull them, that delivered a 30 percent infrastructure reduction on a government-scale agentic platform, with quality gated the whole way."
date: 2026-08-07
track: platform
tags: ["inference", "cost optimization", "model routing", "FinOps"]
featured: true
---

Inference engineering is the fastest-rising specialisation in AI hiring for a simple reason: the bill arrived. Teams that reached production with "use the best model for everything" are now facing costs that scale with adoption. The fix is architectural. On the platform I lead, four levers produced about 30 percent infrastructure savings with no measured quality regression. The decision record is [here](/architecture/model-routing-and-cost-optimization); this is the order I pull the levers and why.

## First, measure per workflow

You cannot optimise what you meter in aggregate. Cost per request per workflow, split into model, retrieval, tooling and infrastructure, is the starting point. On most platforms this reveals that a small number of high-volume, narrow workflows account for most of the spend, and that they are running on models far more capable than the task requires.

## Lever 1: Cache

Cheapest lever, lowest risk. Exact-match caching for repeated queries. Semantic caching for near-duplicates, with the similarity threshold validated against the golden set so cached answers are actually correct for the new query. Provider-side prompt caching for long stable system prompts and repeated retrieved context. Cache hit rates on FAQ-style workflows are high, and the savings are immediate.

## Lever 2: Trim the context

Every token costs. Re-ranking so fewer, better chunks reach the model. Summarised conversation memory. Tool outputs truncated to what the step needs. Tool descriptions limited to the tools the step can use. This lever also improves quality; long contexts degrade reasoning.

## Lever 3: Route by task class

Classify requests: extraction, classification, routing, grounded Q&A, open reasoning, generation. For each class, find the cheapest model that passes the class golden set. Route there; escalate on low confidence. Most high-volume traffic turns out to be narrow tasks that mid-tier or small models handle at a fraction of the cost. Frontier flagships are reserved for the hard tail.

## Lever 4: Right-size with fine-tuning

For the highest-volume narrow classes, LoRA or QLoRA fine-tune an open-weight model. The training cost is recovered within weeks at production volume. Quality is proven on the class golden set before any traffic is routed. Serve with vLLM or a managed endpoint depending on residency and operations preferences. This is also the lever that enables a sovereign tier for restricted workloads.

## Make cost a gate

None of this holds without a gate. Cost per request per workflow is an SLO with a budget and an owner, and it is part of the CI release gate beside quality. A proposed "better model" change that breaks the budget fails the gate exactly as a quality regression would. This prevents the slow creep back to flagship-for-everything.

## What the numbers looked like

On the government platform the sequence was: caching and context trimming first (fast wins, no model risk), routing second (largest structural saving), fine-tuning third for two high-volume classes. Combined, infrastructure cost fell about 30 percent while latency dropped 40 percent, because smaller models and shorter contexts are also faster.

## The FinOps conversation with leadership

Executives do not need the routing diagram. They need three numbers per workflow: cost per request, budget, and trend, alongside the quality score. Present cost and quality together, always. A cost reduction that hides a quality regression is a liability; a cost increase that buys a measurable quality gain is a decision leadership can make consciously.

Inference cost is now a first-class architectural concern. Treating it as one, with metering, levers and gates, is what separates platforms that scale from platforms that get paused when finance sees the invoice.
