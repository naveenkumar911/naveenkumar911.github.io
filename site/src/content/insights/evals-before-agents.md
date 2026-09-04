---
title: "Evals before agents: golden sets and regression suites that catch silent failures"
description: "Building a RAG system or an agent is table stakes in 2026. Knowing whether it got better after the last change is the differentiator. How I build evaluation that engineers use and business owners trust."
date: 2026-08-22
track: agentic
tags: ["evaluation", "LLM evals", "observability", "quality"]
featured: true
---

Hiring managers in 2026 have stopped being impressed by "I built a RAG system". Everyone has. The question that separates candidates, and teams, is: how do you know it works, and how do you know the last change did not make it worse?

I have built the evaluation harness behind every agentic system I have shipped. The methodology is documented in full [here](/architecture/evaluation-methodology); this is the reasoning.

## Silent failure is the default

LLM systems fail quietly. A prompt tweak improves one category of questions and degrades another. A model upgrade changes the tone and breaks a downstream parser. A retrieval index rebuild drops a document type. None of these throw errors. Users just start getting worse answers, and trust erodes before anyone notices.

Traditional testing does not catch this because outputs are non-deterministic and "correct" is a judgment. Evaluation has to be built for that.

## Golden sets owned by the business

The foundation is a golden set per workflow: inputs, expected answers or actions, required citations, tags for category and difficulty. The critical design choice is who owns it. When engineers build the golden set alone, "accuracy" means something different to them than to the Director whose process it is. When the business owner curates it, quality becomes a shared number.

On the government platform I run, each workflow's golden set is signed off by its Director and refreshed weekly from sampled production traces. That practice is why accuracy improvements of 30 to 40 percent were accepted as real by the people who own the outcomes.

## Layered metrics

Evaluate the system in layers so you know where a regression came from:

- **Retrieval**: recall and precision at k, citation coverage. Deterministic.
- **Generation**: groundedness, faithfulness, relevance, hallucination rate. Judge-based, calibrated.
- **Agent behaviour**: right tools, right arguments, efficient steps, correct end state, no unsafe attempts. Trace assertions.
- **Safety**: injection resistance, PII leakage, policy refusals. Adversarial sets.
- **Operations**: latency percentiles, cost per request. Telemetry.

A "better model" that improves generation but doubles cost fails the gate. That is intentional.

## Calibrated judges

LLM-as-judge is essential at scale and dangerous when uncalibrated. Validate every judge against a human-labelled subset until agreement is good enough for the decision it drives. Version the judge prompt and model. Re-validate when either changes. Use pairwise comparison for "which is better" and absolute scores for gates.

## Gates, not dashboards

The regression suite runs in CI on every prompt, retrieval or model change, in the same repository as the agent. A failing gate blocks the merge and shows which golden items regressed. This is the practice that ended silent regressions on my platforms: the engineer who changes a prompt sees the consequences in their pull request, not in a complaint two weeks later.

## Production as the test set

Sampled traces, stratified by workflow and outcome, are reviewed weekly with the business owner. Interesting cases become golden items. Drift in inputs, retrieval hit rates or judge scores triggers alerts. The golden set stays honest because production keeps feeding it.

## Why this is a hiring signal

When I interview senior AI engineers, I ask them to describe how they knew their last system worked. The strong answers describe golden sets, gates and production sampling. The weak answers describe demos. Hiring managers for the roles that pay at the top of the market are asking the same question. Evaluation and observability infrastructure is now one of the highest-paid platform specialisations for a reason: it is what makes everything else safe to ship.
