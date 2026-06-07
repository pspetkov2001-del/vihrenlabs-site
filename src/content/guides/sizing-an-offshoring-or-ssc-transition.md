---
title: "How to size an offshoring or SSC transition — the FTE math nobody teaches"
description: "Most transitions are sized with optimism, not arithmetic — and the new team is understaffed for its first six months, exactly when its reputation is set. The real method: Target FTE = annual volume ÷ productivity, then a ramp-inefficiency uplift you actually fund; choose the transition model deliberately; run knowledge transfer in four evidence-gated steps; budget the dual-running window; and declare done at BAU exit criteria, not the go-live date. Written by an operator who has run SSC and offshoring transitions."
date: "2026-06-07"
line: "Transformation & Shared Services"
keywords: ["how to calculate FTE for offshoring", "SSC transition planning", "offshoring transition", "FTE ramp uplift", "knowledge transfer plan", "BAU exit criteria", "shared services transition", "GBS transition", "lift and shift"]
answer: "Size a transition with arithmetic, not optimism. Target FTE = annual volume ÷ productivity (units per FTE per year, from the source team's actuals). Then apply a ramp-inefficiency uplift — a new team is not as fast as a mature one — and fund the higher, year-one number, not the steady state, or the team is structurally understaffed for its first six months. Choose the transition model deliberately (lift-and-shift to stabilise, then transform — not both at once). Run knowledge transfer in four steps (discovery, shadowing, reverse-shadowing, independent), advancing a process on evidence, not a calendar date. Budget the dual-running window where both teams run, with explicit decommission criteria. And declare the transition done only when each process meets its BAU exit criteria — SLA, error rate, backlog, escalation — not on the go-live date. Most failed transitions are declared finished at cutover and unravel six weeks later."
stepsTitle: "Sizing and planning a transition — six moves"
steps:
  - name: "Size the target team with arithmetic"
    text: "Target FTE = annual volume ÷ productivity. Take the real annual volume of the work (e.g. 240,000 invoices) and the source team's mature productivity (e.g. 12,000 per FTE per year). 240,000 ÷ 12,000 = 20 FTE at maturity. That is your steady-state number and the basis for the run-cost saving — but it is not what you staff in year one."
  - name: "Apply the ramp uplift — and fund it"
    text: "A team three months into a new process is not as fast as one with five years on it. Apply a ramp-inefficiency uplift (commonly +15% in year one, set from your own evidence): 20 × 1.15 = 23 FTE. Budget the 23; promise the board the 20 at maturity, not on day one. Staffing the steady-state number from day one is how a new centre earns a bad reputation in its first quarter."
  - name: "Choose the transition model deliberately"
    text: "Four models: lift-and-shift (move as-is, improve later — lowest transfer risk); lift-transform-shift (redesign then move — double the risk); build-operate-transfer (a partner runs it, then hands over); and phased/hybrid (lift-and-shift first, transform once stable). Default to phased/hybrid. The most common self-inflicted wound is choosing lift-transform-shift by accident — changing the process and the team at the same time."
  - name: "Run knowledge transfer in four evidence-gated steps"
    text: "KT runs per process in four steps: discovery (document the real process), shadowing (the learner watches), reverse-shadowing (the learner does it, the expert corrects), and independent (the learner works unsupervised, spot-checked). Advance a process on evidence — the work is right — not on a calendar date. The expensive shortcut is marking KT 'complete' on the plan date while the learner still needs the expert, who then leaves."
  - name: "Budget the dual-running window"
    text: "While the source team ramps down and the target ramps up, you pay for both. Model that peak cost week by week, and set explicit decommission criteria — 'old system off when X, Y, Z are green for two periods' — not 'until we're comfortable.' A window with no exit criteria never closes, and the run-cost saving the business case depends on never arrives."
  - name: "Define done as BAU exit criteria, not go-live"
    text: "A transition is not finished at go-live; it is finished when each process meets its BAU exit criteria — SLA adherence, error rate, backlog, escalation rate, each with a numeric threshold and a sign-off. A process that has not met its criteria stays in hypercare. Declaring victory at cutover is why most transitions unravel six weeks later."
faq:
  - q: "How do you calculate FTE for an offshoring or SSC transition?"
    a: "Target FTE = annual volume ÷ productivity (units per FTE per year), using the source team's mature productivity. Then apply a ramp-inefficiency uplift for year one — a new team is slower than a mature one — and fund that higher number. For example, 240,000 invoices ÷ 12,000 per FTE = 20 FTE at maturity; with a 15% ramp uplift you fund 23 for the first year. The 20 is the business-case saving; the 23 is what you actually staff."
  - q: "What is the ramp uplift and why does it matter?"
    a: "It is the extra headcount a new team needs before it reaches the source team's productivity. A team in its first months produces fewer units per person, so sizing to mature productivity leaves you structurally understaffed exactly when quality matters most — the first month-end, when the new centre's reputation is set. The uplift is not padding; it is the arithmetic of a new team. Make it explicit so finance funds the ramp instead of discovering it as an overrun."
  - q: "What are the four transition models?"
    a: "Lift-and-shift (move the process as-is, improve later — lowest transfer risk); lift-transform-shift (redesign the process, then move it — much higher risk because you change the what and the who at once); build-operate-transfer (a partner builds and runs it, then hands it to you later); and phased/hybrid (lift-and-shift first to stabilise, transform once BAU is solid). Most real transitions should be phased/hybrid; the default mistake is attempting lift-transform-shift without meaning to."
  - q: "When is a transition actually 'done'?"
    a: "When each in-scope process meets its BAU exit criteria — SLA adherence, error rate, backlog, and escalation rate, each at an agreed numeric threshold, signed off — not on the go-live date. Go-live is the start of stabilisation, not the end of the transition. The most common failure is declaring a transition finished at cutover; it then unravels in the weeks after, in front of the customer, because the exit criteria were never the definition of done."
ctaLabel: "Get the Transition Management Operator's Workbook — $179"
ctaUrl: "/products/transition-management-operators-workbook"
ctaSub: "The done-for-you version: an 18-tab Excel workbook that runs the whole transition — scope, process discovery, the FTE and ramp-curve maths, knowledge transfer, UAT, parallel run, go-live readiness, hypercare and BAU exit — plus a 15-page, 12-phase delivery handbook and SOP + engagement templates."
featured: false
---

## Most transitions are sized with optimism, not arithmetic

I have run shared-service and offshoring transitions, and the most common, most expensive mistake is made before the work even starts: the target team is sized to the source team's *mature* productivity. The new team is then understaffed for its first six months — exactly when quality matters most and the centre's reputation is being set.

The fix is arithmetic.

## The FTE math, worked

**Target FTE = annual volume ÷ productivity.** Take a real example — accounts payable:

- Annual volume: 240,000 invoices.
- Mature productivity (from the source site's actuals): 12,000 invoices per FTE per year.
- **Base FTE** = 240,000 ÷ 12,000 = **20**.
- **Ramp uplift, year one (+15%):** 20 × 1.15 = **23**.

The two numbers do different jobs. The **20** is your steady-state target — the basis for the run-cost saving you promise the board. The **23** is what you actually staff and fund in year one, because a team three months in is not as fast as one with five years on the process. **Budget the 23; promise the 20 at maturity.** Staffing the 20 from day one is how a new centre builds a backlog and a bad reputation in its first quarter.

## The two traps after the maths

- **Dual-running.** While the source ramps down and the target ramps up, you pay for both. Model that peak, and set explicit decommission criteria — not "until we're comfortable." A window with no exit never closes.
- **Declaring victory at go-live.** A transition is done when each process meets its **BAU exit criteria** — SLA, error rate, backlog, escalation — not on the cutover date. Go-live is the start of stabilisation, not the end of the transition.

Get the maths honest, fund the ramp, and run knowledge transfer on evidence rather than a calendar, and the transition lands stable instead of on time and broken.

---

*Part of **The Job, Decoded** — the operator's series on what enterprise-operations roles actually are. This is the SSC / GBS transition manager, decoded.*
