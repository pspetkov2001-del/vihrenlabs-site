---
title: "Governance, not agents: the operating model most AI programs skip"
description: "Most AI agent projects don't fail on the model - they fail on the operating model: no decision rights, no use-case gate, broken data, runaway cost, no owner after launch. Why the first question isn't 'which agent should we buy' but 'who owns this, and how do we decide', and what an AI Center of Excellence actually is - a thin function with a charter, a GO / PILOT / PARK gate, eval standards, a risk register, and run-and-maintain ownership across the agent lifecycle."
date: "2026-06-06"
line: "AI Adoption & Governance"
keywords: ["AI center of excellence", "AI governance", "AI operating model", "AI agent governance", "why AI projects fail", "AI use case selection", "AI adoption framework", "agentic AI", "AI risk tiers", "AI program governance", "AI CoE"]
featured: true
---

**The model is rarely the reason an AI agent project gets cancelled. The operating model usually is.**

Gartner has forecast that more than 40% of agentic-AI projects will be scrapped by the end of 2027 - and the reasons it gives are not technical. Escalating costs. Unclear business value. Inadequate risk controls. That is a forecast, not a measured outcome, so read it as a forecast. But it matches what is already visible to anyone watching these programmes from the inside: the model almost never fails first. The function around it does.

I wrote a companion piece to this one arguing that an AI agent will amplify your data problems rather than fix them. That is true, and data is one of the things that breaks. But data is only the first of five, and the other four are organisational, not technical. After fifteen years inside enterprise IT operations - standing up shared-services functions, running transformation programmes, owning master data across product, vendor, and customer domains - I have watched the same five failure modes repeat. None of them is the model.

## The same tools, opposite outcomes

Two organisations buy the same platform. Same models, same prompts, same integrations. One gets real results within a quarter. The other produces noise, loses user trust in a fortnight, and quietly cancels the budget at the next planning cycle.

The variable is almost never the technology. It is whether anyone built the function that decides which use cases get attempted, what "good enough to ship" means, who signs off the risk, what it is allowed to cost, and who runs it on the Monday after launch. The winning organisation built that function before it scaled agents. The losing one bought agents and assumed the function would assemble itself.

It does not assemble itself.

## What actually kills these programmes

Strip away the demos and the failure modes are boringly consistent:

1. **No decision rights.** Nobody can say which projects start, which stop, and who is accountable when an agent makes a bad call in production. Pilots get picked by whoever is most enthusiastic, not by where the value is.
2. **No use-case gate.** Every team wants an agent. With no objective filter - task structure, data readiness, value, risk, build effort - the programme spreads itself across a dozen weak candidates instead of two strong ones. Most of them should have been a rule, a report, or a better form.
3. **Broken data underneath.** The agent inherits every duplicate, every missing field, every disagreement between systems about who the customer is - and scales the confusion, fluently. This is the failure I covered separately, and it is real, but it is one of five.
4. **Runaway cost.** Token spend, orchestration, human-in-the-loop review, and vendor fees compound quietly. Without a three-year total-cost view, the bill arrives after the budget is committed and the value is still unproven.
5. **No owner after launch.** The pilot team disbands. The agent drifts as the underlying data and processes change. Six months later it is producing subtly wrong output that nobody is watching, and the first sign of trouble is a user complaint, not a dashboard.

Notice that four of the five are governance and ownership questions. The model is a component. The operating model is the system.

## "Which agent should we buy" is the second question

The first question is: *who owns this, and how do we decide?*

That is not a committee. It is a function - small, deliberately thin - that most programmes skip because it is less exciting than the demo. The industry has a name for it that has been around far longer than agents: a **Center of Excellence**. The label is unfashionable; the job it does is exactly what the failure modes above demand.

A working AI CoE is not a gate that says no. It is the operating model that lets the organisation say *yes, safely, repeatedly*:

- **A charter and decision rights** - what the function owns, what it delegates, who is accountable when an agent is wrong.
- **A use-case gate** - a repeatable scorecard that sorts candidates into GO / PILOT / PARK on task structure, data readiness, value, risk, and effort, so the programme spends its capacity on the few candidates that will hold.
- **Quality and evaluation standards** - a definition of done for an agent: acceptance thresholds, an eval harness, a security and red-team review before anything touches a real decision.
- **A risk register and tiers** - low / medium / high-autonomy classification, with the controls and human-in-the-loop requirements that each tier demands. (This is also where regulatory obligations land operationally - but that is documentation discipline the function owns, not a reason to route every decision through legal.)
- **Run-and-maintain ownership** - named owners, monitoring, a retirement criterion. An agent is a system in production, not a project that ends at launch.

Wrap those around a delivery lifecycle - intake, candidate selection, design, build, test and govern, roll out, run, improve, decommission - and you have the thing the cancelled projects were missing. Not a better model. A way to decide.

## The blocker rule: governance is enablement, not theatre

There is a failure mode on the other side, and it is just as fatal: the CoE that becomes a bottleneck. A function that reviews everything, approves nothing, and turns into a compliance ritual will get routed around - shadow AI appears, and you are worse off than before, because now the risk is invisible.

Good governance is fast and decisive. The use-case gate returns a verdict with a reason: GO, or PILOT with these guardrails, or PARK because the data is not ready and here is the one thing to fix first. A clear *no* with a reason is enablement. A slow *maybe* is theatre. The difference between the two is whether the function is designed to move at the speed of the work or to protect itself.

## The boring work comes first

The organisations that will get the most from AI over the next few years are not the ones with the most agents. They are the ones that stood up the operating model - the decision rights, the gate, the standards, the owners - before they scaled. Not because they were "preparing for AI," but because that is how durable functions have always been built. The agents are the easy part now. The function around them is the work, and it is the work almost nobody demos.

A lot of leadership teams are asking *which AI agent should we buy.* The more useful question is the one underneath it: *if an agent made decisions from our data, on our processes, with our cost structure, continuously and at scale - who would own the consequences, and how would we have decided to let it?*

If you cannot answer that yet, that is not a reason to wait. It is the thing to build first.

---

*This is the argument behind the [AI Center of Excellence Handbook](/products/ai-center-of-excellence-handbook) - the operating model for standing up and running the function - and the [AI Agent Use-Case Selection &amp; Feasibility Scorecard](/products/ai-agent-use-case-selection-and-feasibility-scorecard), the GO / PILOT / PARK gate itself. Both are part of the [AI Adoption &amp; Governance Operator's Pack](/products/ai-adoption-and-governance-operators-pack), which bundles the handbook with the four tools that work at each gate. Operator-grade, platform-neutral, one-time purchase. Questions? [hello@vihrenlabs.com](mailto:hello@vihrenlabs.com).*
