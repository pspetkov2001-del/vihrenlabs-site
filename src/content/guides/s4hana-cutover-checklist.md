---
title: "The S/4HANA cutover checklist - the run sheet that survives 3 a.m."
description: "What an S/4HANA migration cutover checklist must contain: the readiness gates, the hour-by-hour run sheet, the master-data freeze, the data-validation checks (BP-MASS, MIGO, FBL3N), the pre-agreed rollback criteria, and the hypercare plan. From an operator who has watched cutovers fail at 4 a.m."
date: "2026-06-05"
line: "SAP / ERP Operations"
keywords: ["S/4HANA cutover checklist", "SAP cutover run sheet", "S/4HANA go-live readiness", "cutover rollback criteria", "SAP hypercare plan", "SAP ECC end of maintenance", "master data freeze", "cutover weekend"]
answer: "An S/4HANA cutover checklist has five parts: (1) a readiness matrix that gates go/no-go on objective evidence, not RAG-status opinion; (2) an hour-by-hour run sheet with a single named owner per task and explicit dependencies; (3) an enforced master-data freeze; (4) data-validation checks with pre-agreed thresholds (Business Partner conversion via BP-MASS, stock reconciliation via MIGO, GL line-item validation via FBL3N); and (5) rollback criteria agreed before cutover weekend - a named decision-maker, a specific threshold, and a time limit - plus a hypercare plan for the days after go-live. Cutovers rarely fail on technology; they fail on governance that was never written down."
stepsTitle: "The cutover checklist - the run sheet in nine moves"
steps:
  - name: "Lock the go/no-go on evidence, not RAG status"
    text: "Replace the colour-coded steering-committee slide with a readiness matrix - each item has an owner, an objective threshold, and a state that is observably done or not done. Green that means 'we think it's fine' is how cutovers get approved into failure."
  - name: "Build the hour-by-hour run sheet with single owners"
    text: "Every task on the cutover weekend has one named owner and explicit upstream dependencies. Version-control it ruthlessly: the single most common governance failure is sixty people working from a run sheet two versions behind."
  - name: "Enforce the master-data freeze with someone who can say no"
    text: "Agree the freeze date in the plan, then give one person the authority to stop the migration when data keeps arriving after it. A freeze nobody can enforce is not a control."
  - name: "Validate Business Partner conversion (BP-MASS)"
    text: "Run BP-MASS validation against the Business Partner conversion and hold it to a pre-agreed error threshold (e.g. <0.5%). BP conversion drift above threshold is the classic 'it'll improve in production' trap that surfaces as broken financials by Tuesday."
  - name: "Reconcile stock on hand (MIGO)"
    text: "Reconcile MIGO stock-on-hand against the goods-movement archive. Quantity or valuation gaps here become inventory and costing errors the business notices first."
  - name: "Validate the general ledger (FBL3N)"
    text: "Validate FBL3N general-ledger line items against legacy AP/AR and GL balances. The finance team's trust in S/4 is won or lost on whether the numbers tie out on day one."
  - name: "Pre-agree the rollback criteria - person, threshold, time limit"
    text: "Write down, before the weekend, who has authority to call a rollback to ECC, at what specific threshold, and by what time. A rollback negotiated live at 4 a.m. by twelve people is a rollback that never happens."
  - name: "Run a ninety-minute pre-mortem before go-live"
    text: "Assume the cutover has already failed and reconstruct how. One mitigation, one owner, one date per failure category. A pre-mortem finds the things a risk register never does."
  - name: "Plan hypercare as a phase, not an afterthought"
    text: "Hypercare is where the programme is actually judged. Staff it, define the incident-triage path and the criteria to exit hypercare into BAU, and keep the comms templates ready before go-live, not during the first incident."
faq:
  - q: "When does SAP ECC maintenance end?"
    a: "SAP ECC mainstream maintenance ends on 31 December 2027. But because transformation capacity is finite, the practical planning cut-off for most mid-market organizations is well before then - if you have not started scoping, the real deadline is closer than the headline date suggests."
  - q: "How long is an S/4HANA cutover window?"
    a: "The technical cutover is typically a single weekend (often 48–72 hours), but the readiness work that determines whether it holds runs for weeks before. The run sheet plans the weekend hour by hour; the readiness matrix governs whether you start at all."
  - q: "What are good S/4HANA cutover rollback criteria?"
    a: "Rollback criteria must be specific and pre-agreed: a named decision-maker with the authority to call it, an objective threshold (e.g. data-validation error rate above an agreed limit, or critical defects unresolved past a checkpoint), and a hard time limit by which the call must be made. The point is that the decision is made before the weekend, not negotiated during it."
  - q: "What master-data checks matter most in an S/4HANA migration?"
    a: "Business Partner conversion (BP-MASS), stock-on-hand reconciliation (MIGO), and general-ledger line-item validation (FBL3N) are the three that most often decide whether the business trusts the system on Monday. Each needs a pre-agreed threshold, an owner, and a sign-off."
ctaLabel: "Get the SAP Migration Operator's Pack - $129"
ctaUrl: "/products/sap-migration-operators-pack"
ctaSub: "The done-for-you version: a 52-check readiness matrix, a 46-step cutover run sheet, the data-validation gates, and the hypercare runbook - the kit a real cutover needs, instead of a Word doc someone is editing at 11 p.m. the night before go-live."
---

## Why cutovers fail on governance, not technology

I have watched S/4HANA cutovers fail at 4 a.m. on a Sunday. Not once - several times. And in none of those cases did the technology fail.

The technology was fine. What failed was the freeze date nobody had authority to enforce, the run sheet that had been revised three times and the version on the call was two behind, or the rollback criteria that lived in a slide deck but had never been turned into a decision with a named owner. Technical risk is well-instrumented - monitors, alerts, error thresholds. Governance risk is invisible until the exact moment it matters.

So the checklist above is mostly governance dressed as logistics. The data-validation steps (BP-MASS, MIGO, FBL3N) are the technical core, but the steps around them - single-owner run sheet, enforced freeze, pre-agreed rollback, pre-mortem, staffed hypercare - are what actually decide the outcome.

## The readiness matrix beats the RAG slide

A go/no-go decision made on a colour-coded slide is a decision made on opinion. "Amber, but we think it'll be green by Friday" is not evidence. Replace it with a matrix where every line has an owner, an objective threshold, and a state that is observably done or not done. When the steering committee asks "are we ready," the answer is the matrix, not a sentiment.

## Hypercare is where the programme is judged

Everyone plans the weekend. Far fewer plan the two weeks after, which is where the programme is actually judged - by whether incidents get triaged fast, whether the business keeps trusting the data, and whether there are clear criteria to exit hypercare into business-as-usual. Plan it as a phase with its own staffing, triage path, and exit criteria. The free [SAP Cutover Comms Kit](https://vihrenlabs.gumroad.com/l/dlzxfu) covers the announcements a real cutover sends; the deeper timeline reasoning is in the essay [The S/4HANA deadline math most organizations calculate wrong](/essays/ecc-end-of-maintenance-math).

*This guide is operator practice, not SAP documentation - confirm transaction behaviour and dates against your own system and SAP's published maintenance schedule.*
