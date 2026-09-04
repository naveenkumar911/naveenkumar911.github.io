---
title: "Why 88 percent of agent pilots die, and the six gates that fix it"
description: "Most agent pilots never reach production. The causes are organisational and architectural, not model quality. The gate structure I use to get agents into production with owners, metrics and controls."
date: 2026-08-25
track: agentic
tags: ["agentic AI", "pilot to production", "delivery", "forward deployed"]
featured: true
---

Roughly 88 percent of AI agent pilots never reach production, according to 2026 industry analyses, and the ones that do share one trait: named ownership. Having taken agents to production in a government entity and a Fortune 500 retailer, I recognise the failure modes. Almost none of them are about the model.

## How pilots actually die

**No baseline.** The pilot "works" but nobody measured the process before it, so nobody can prove improvement, so nobody funds production.

**No owner.** The AI team built it; the business team tolerates it; when it misbehaves nobody is accountable, so it is quietly switched off.

**Unscoped autonomy.** The agent can read and write everything, so security blocks it. Or it can only read, so it delivers no operational value.

**Demo data.** The pilot ran on a clean sample. Production data has duplicates, scanned PDFs, Arabic and English in the same document, and access controls.

**No evaluation.** Quality was assessed by watching demos. When the prompt changes, nobody knows if it got better or worse.

**No operating model.** No runbook, no on-call, no incident process, no cost budget. The first outage ends the program.

**No handover.** The consultants leave and the system decays.

## Six gates

I run every engagement through six gates. Each has an artifact, an owner and an exit criterion. The full version is in the [Forward-Deployed Playbook](/architecture/forward-deployed-playbook); the summary:

1. **Discovery.** Exit when an executive sponsor signs a success criterion with a measured baseline and a named business owner. If no one will own the outcome, stop.
2. **Scoped slice.** Exit when the golden set exists and the owner agrees it represents the job. Choose the highest value, lowest blast-radius slice.
3. **Working POC.** Exit when the metric moves on the golden set with real data, and every failure mode has a mitigation plan.
4. **Production ready.** Exit when security, residency, guardrails, tracing, SLOs, regression gates, runbooks and a cost model are green or have accepted risks with owners.
5. **Cutover.** Exit when the baseline metric improves in production with a staged rollout, no open severity-one incidents, and confirmed adoption.
6. **Run and expand.** Never exits. Weekly trace sampling, monthly cost and quality review, expansion candidates re-enter at gate two.

## Why gates work where enthusiasm fails

Gates convert the vague question "is this ready?" into a checklist with owners. They surface the organisational failures (no owner, no baseline) in week one instead of month nine. They give security a way to approve autonomy per tool class instead of vetoing agents wholesale. They make the handover a deliverable rather than an afterthought.

They also protect the team from the opposite failure: shipping something that works in a demo into a production environment that will destroy it.

## The autonomy question

The single most useful design decision in getting agents approved is the blast-radius class on every tool: read, write-reversible, write-irreversible, external-egress. Irreversible actions require human approval by default. This lets a Director approve an agent that does real work today, and expand its autonomy next quarter based on a track record, rather than debating "agents yes or no" for a year.

## What this looked like in practice

At Circle K, the first slice was grounded answers for the support function, measured on resolution time. It took weeks, not months, and it produced the metric that funded everything after it: resolution time down 40 percent, and eventually $600K a year in savings across the program. On the government platform, the same gates took an agentic platform from a first workflow to more than ten thousand requests a day at 98 percent uptime, with a Director signing each expansion.

The model mattered. The gates mattered more.
