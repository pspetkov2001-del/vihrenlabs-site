---
title: "The cutover-window decision nobody makes early enough"
description: "Every S/4HANA migration has a cutover window — and the rollback decision inside it is the hardest call in the whole project, not technically but psychologically. The three questions the best teams answer before T-Day: the written go/no-go criteria, who holds the call, and where the point-of-no-return actually sits."
date: "2026-06-04"
line: "SAP / ERP Operations"
keywords: ["SAP S/4HANA migration", "SAP cutover", "go/no-go decision", "cutover rollback", "ECC to S/4HANA", "cutover window", "hypercare", "migration runbook", "steering committee", "cutover planning", "ECC 2027"]
---

Every SAP S/4HANA migration has a cutover window: a period of hours — typically 20-36 for a mid-market instance, a full weekend for a larger one — when ECC is shut down, data is migrated, S/4HANA is validated, and the go/no-go decision is made. Everything before it is preparation. Everything after it is recovery.

Most project plans specify when the cutover window *starts*. Far fewer specify, in advance, the criteria for *rolling back*. And that omission is where good migrations quietly become bad ones.

## The rollback call is the hardest decision in the project — and it isn't technical

Technically, rollback is defined: it's your backup procedure and the migration tooling. You restore ECC from the T-1 backup, re-point the integrations, reopen the posting periods, unlock the users. The runbook can be written on a page.

The hard part is psychological. After 18-24 months of project work, with a couple hundred users waiting to test, the steering committee watching the status dashboard, and the implementation partner's team assembled in a war room at 6 a.m., making the call to *roll back* requires a level of pre-commitment that organisations rarely establish beforehand. The pressure in the room all points one direction: proceed. Which is exactly why the decision has to be made — on paper, calmly — weeks before anyone is in that room.

The teams that handle this well have answered three questions before T-Day.

## 1. What is the go/no-go decision criteria?

Not "the system is stable." That's a feeling, and feelings lose to sunk cost at 3 a.m. The criteria have to be specific and binary:

- FI/CO posting is clean — a manual journal posts, GL balances display, the payment proposal runs.
- MM goods movements process — goods receipt against an open PO, goods issue.
- SD order-to-cash works end to end — create order, delivery, post goods issue, invoice.
- The Day-1-critical interfaces (bank files, EDI, e-invoicing) are wired and smoke-tested.
- Master-data quality gates are green — the AR/AP/GL objects at a 0% error threshold, customer/vendor master at or below their pre-agreed limit.

Put it on one page as a scorecard, pre-agreed by the steering committee at T-2 weeks, with a smoke-test pass rate threshold (≥95% across critical areas) attached. At the call, you read the scorecard. You don't negotiate it — that conversation already happened, when everyone was calm.

The rule that prevents most failed go-lives: **the default is no-go if validation isn't complete by the go/no-go time.** Teams under pressure default to "we'll keep working." A delayed go-live is recoverable. A failed one is not.

## 2. Who makes the call?

One person. Named in advance. With the authority to call a rollback over the project manager's objection if the criteria aren't met. Usually the Sponsor with CIO concurrence — deliberately *not* the project manager who has been living with this for two years and has every incentive to push through. The whole point of naming the decider early is to insulate the decision from the person most emotionally invested in proceeding.

## 3. Where is the point of no return?

A clean rollback is only possible up to a certain point. Once specific migration steps complete — once transactional data is loaded and the first postings happen in S/4 — restoring ECC stops being clean. Your project team knows where that line sits. The steering committee should know it too, and sign off on it *before* cutover starts, because the rollback window has to fit inside the cutover window with hours to spare. If your plan doesn't leave ≥12 hours of buffer for a rollback to complete before Monday business hours, it doesn't have a real rollback option — it has a hope.

And rehearse it. The single best predictor of a team freezing at the go/no-go call is a rollback that was never run. Execute it once in a mock cutover, so the no-go branch is muscle memory, not theory.

## The pattern

The teams that answer these three questions in advance make a calm, evidenced decision at 6 a.m. against a scorecard everyone already agreed to. The teams that don't answer them in advance answer them under pressure, at 3 a.m., with partial information, in front of an audience, when the cost of being wrong is visible to everyone in the room.

The difference isn't talent or tooling. It's whether the hardest decision was made while it was still easy. That discipline — the readiness matrix, the quality gates, the written go/no-go scorecard, the rehearsed rollback — is what I built into the [SAP / ERP Operations line](/products): the cutover workbook that holds the evidence, and the playbook that explains why each gate sits where it does.
