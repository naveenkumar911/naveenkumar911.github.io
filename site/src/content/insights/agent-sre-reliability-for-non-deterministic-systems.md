---
title: "Agent SRE: SLOs, circuit breakers and rollback for non-deterministic systems"
description: "Agents are production systems with a new failure surface. How to run them with the discipline of site reliability engineering: SLOs that include quality and cost, circuit breakers on tools, blast-radius containment and incident response."
date: 2026-08-19
track: agentic
tags: ["agent SRE", "reliability", "observability", "operations"]
featured: false
---

An agent in production is a distributed system with a non-deterministic component in the middle and permission to touch other systems. It deserves the operational discipline we give any production service, plus controls for the failure modes that are new. I call this agent SRE, and it is how the platforms I run hold 98 percent uptime while doing real work.

## SLOs that include quality and cost

Classical SLOs cover availability and latency. Agent SLOs need three more dimensions:

- **Quality**: groundedness or task-success rate on sampled production traffic, measured by the same calibrated judges used in evaluation.
- **Cost**: cost per request per workflow against budget.
- **Safety**: rate of blocked unsafe action attempts and policy refusals, which should be low and stable; spikes indicate either attack or drift.

Each SLO has an error budget and an owner. Burning the quality budget triggers the same response as burning the availability budget: freeze changes, investigate, fix.

## Tracing is not optional

Every request is traced end to end: prompt versions, retrieved chunks, tool calls with arguments and results, model, tokens, cost, latency, approvals. Without this, incident response is guesswork. With it, most incidents are diagnosed in minutes. Langfuse and Grafana are my defaults; the principle matters more than the tools.

## Circuit breakers on tools and models

Tools fail, rate-limit and return garbage. Models degrade, time out and change behaviour after silent provider updates. The runtime needs:

- **Per-tool circuit breakers** that open on error rate or latency and return a controlled failure to the agent, which then escalates rather than retrying blindly.
- **Model fallbacks** through the router: if the primary model is unavailable or its quality score drops, route to a fallback with known behaviour.
- **Budget breakers**: a workflow that exceeds its cost budget in a window is throttled or paused, not allowed to run up the bill.

## Blast-radius containment

The blast-radius class on every tool (read, write-reversible, write-irreversible, external-egress) is a reliability control as much as a security one. When something goes wrong, the maximum damage is bounded by the classes the workflow was allowed to use. Reversible writes carry a rollback path, so recovery is an operation, not an investigation.

## Rollback for the non-deterministic parts

Prompts, retrieval configuration, judge versions and model choices are all versioned and deployable independently. A quality regression that slipped past the gate is rolled back like a bad code deploy. This requires treating prompts as code with review and versioning, which is a cultural change for teams used to editing them in a console.

## Incident response, adapted

Runbooks cover the agent-specific scenarios: quality drop, cost spike, tool outage, suspected injection, provider model change. On-call has the authority to pause a workflow. Post-incident reviews add cases to the golden set and, where needed, tighten tool policies.

## Drift detection

Inputs drift, documents change, users find new ways to ask. Monitor input distributions, retrieval hit rates and judge scores over time. Alert on shifts, and feed the shifted samples into weekly review.

## Why this matters for leaders

Enterprises are moving from pilots to production faster than their operating models are adapting. The programs that survive year two are the ones that treated agents as production systems from the start: SLOs with owners, tracing, breakers, contained blast radius, rollback and incident process. It is unglamorous, and it is the difference between an agent that runs a workflow and one that gets switched off after the first bad week.
