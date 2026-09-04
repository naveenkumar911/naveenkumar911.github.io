---
title: "Computer-use and browser agents: where they are production-ready and where they are not"
description: "Agents that operate software through the screen are the most hyped capability of 2026. A practical readiness assessment for enterprise leaders: which workflows qualify today, which do not, and what controls are required."
date: 2026-08-10
track: agentic
tags: ["computer use", "browser agents", "automation", "readiness"]
featured: false
---

Agents that operate software the way a person does, by looking at the screen and clicking, are the capability enterprise leaders ask me about most in 2026. The demos are compelling. The production reality is narrower, and the difference matters when you are deciding what to fund.

## Why the appeal is real

Most enterprise work happens in systems without good APIs: legacy portals, vendor tools, government forms, partner extranets. Traditional automation broke every time the UI changed. Agents that perceive the screen and reason about it promise to automate the long tail that RPA never reached.

## Where it is ready

Workflows with these properties are working in production today, including in automations I have shipped through browser-capable tools:

- **Read-heavy**: gathering information, checking status, extracting data from portals.
- **Reversible or verifiable**: the result can be checked against a source of truth before anything downstream happens.
- **Bounded**: a known set of sites and screens, not the open web.
- **Tolerant of latency**: minutes are acceptable; sub-second is not required.
- **Low blast radius**: a mistake costs a retry, not money or a contract.

Examples: QA and usability checks on internal sites, verification of vendor portal data against ERP records, form-filling into legacy systems with a human confirmation step, monitoring regulatory sites for changes.

## Where it is not

- **Irreversible financial actions** without human approval. The failure modes (misread field, wrong record, unexpected dialog) are too plausible.
- **Open-web tasks** where content is untrusted. Prompt injection through web pages is a live threat; an agent reading arbitrary sites with the ability to act is an incident waiting to happen.
- **High-volume, low-latency** processes. Screen-based agents are slow and expensive per step compared with an API integration; if an API exists, use it.
- **Anything you cannot evaluate.** If you cannot build a golden set of tasks with verifiable end states, you cannot know the success rate, and success rates for multi-step screen tasks are still far from 100 percent.

## Controls that make the ready cases safe

- Blast-radius classification as for any tool: screen actions that write are write-irreversible unless proven otherwise.
- Sandboxed browser profiles with scoped credentials, never the operator's own session.
- Allowlisted domains; no navigation outside the workflow's sites.
- Step-level verification: after each action, check state against expectation before continuing.
- Human approval cards for anything that commits, pays, signs or sends.
- Full trace with screenshots for audit and for building the golden set.
- Circuit breakers on repeated failures; escalate, do not loop.

## A decision rule

If an API exists, integrate. If it does not and the workflow is read-heavy, bounded and verifiable, pilot a screen agent with the controls above. If it involves irreversible actions on untrusted content, wait, or redesign the workflow so the irreversible step is a human decision with the agent's evidence attached.

## The leadership point

Computer-use agents will expand the automatable surface of the enterprise substantially over the next two years. The organisations that benefit will be the ones that already have the platform disciplines in place: tool contracts, blast-radius classes, evaluation, tracing, approvals. Screen agents are new tools inside the same governed architecture, not a reason to build a new one.
