---
title: "Decision rights before models: the five conditions for enterprise AI"
description: "AI rarely fails because the model is too weak. It fails because nobody decided what the AI is allowed to do. Five conditions that separate AI activity from AI transformation."
date: 2026-09-04
track: executive
tags: ["AI leadership", "governance", "operating model", "CAIO"]
linkedin: "https://www.linkedin.com/posts/naveen-kumar-29014b143_aileadership-caio-artificialintelligence-activity-7501527039263506432-fUGm"
featured: true
---

AI does not fail in enterprises because the model is too weak. In most organisations I have worked with, it fails because nobody decided what the AI is actually allowed to do.

I have watched organisations spend heavily on models, copilots, agents, data platforms and AI talent, and then discover that the real bottleneck was never technology. It was decision rights.

## The questions nobody assigned

- Who owns the outcome?
- Who defines success?
- Who decides whether an AI use case should scale?
- Who approves the risk?
- Who stops it when it starts behaving unexpectedly?

And the most important one: who has the authority to say "do not automate this"?

When these are unassigned, every AI initiative becomes a negotiation between enthusiasm and fear, and the default outcome is a pilot that never ends.

## Five conditions that have to hold together

Over time I have become convinced that successful enterprise AI needs five things working at once. Remove any one and you get activity without transformation.

**1. A clearly defined business problem.** Not "use GenAI in customer service" but "reduce time to resolve store support tickets by 30 percent within two quarters". If the problem cannot be written as a metric with a baseline, it is not ready.

**2. An accountable business owner.** A named person outside the AI team whose objectives include the outcome. On the government platform I lead, every workflow has a Director who signs the success criteria and reviews quality monthly. That single practice did more for adoption than any model upgrade.

**3. The right AI architecture.** Right, not maximal. A governed platform with retrieval, evaluation, observability and blast-radius controls lets you say yes to autonomy incrementally. A chatbot bolted onto a data lake does not.

**4. Measurable economic value.** Baseline, counterfactual, end-to-end cost. I wrote about this separately in [measuring AI ROI backwards](/insights/measuring-ai-roi-backwards). Time saved is not value created until you can say what happened to the time.

**5. Explicit governance and intervention boundaries.** Where the AI acts, where humans decide, who can pause it, and what happens when it is wrong. In my platforms this is literal: every tool declares a blast-radius class and irreversible actions require approval until a track record earns relaxation.

## Activity is not transformation

You can have a hundred AI pilots and zero meaningful transformation. You can have an impressive AI roadmap and no measurable enterprise value.

The organisations that will win the next phase of AI will not necessarily be the ones deploying the most models. They will be the ones that can repeatedly answer four questions:

- Where should AI act?
- Where should humans decide?
- How do we measure the outcome?
- What happens when we are wrong?

That is the difference between experimenting with AI and operating AI as an enterprise capability.

## What this looks like in practice

On the platform I currently run, the decision-rights work happened before the architecture work. We built a use-case register with owner, risk class and success criterion for every candidate. We defined intervention rights: who pauses, who relaxes policy, who signs residual risk. Then we built the platform to enforce those decisions in software: registry, gates, audit, approvals.

The result is not just a working system serving more than ten thousand requests a day. It is a system a Director can defend to a Minister, because every question about what the AI is allowed to do has an answer and an owner.

If you are a CEO or board member evaluating an AI leader, ask them who owns the outcomes of the systems they have shipped. If the answer is "the AI team", the transformation has not started.
