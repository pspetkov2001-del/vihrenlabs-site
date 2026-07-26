---
title: "The Vihren Labs Operator Standard - seven principles for running the enterprise IT stack"
description: "The seven principles every Vihren Labs product is held to, written from fifteen years in the operator's seat: run on the obligation not the aspiration, build governance like architecture, concrete beats abstract, vendor economics, regulation is operational not legal, the pre-mortem beats the risk register, and the catalogue compounds. The door to the whole catalogue."
date: "2026-06-05"
line: "The Operator Standard"
keywords: ["enterprise IT operations", "operator standard", "SAP S/4HANA cutover", "vendor renewal negotiation", "DORA", "EU AI Act", "IT governance", "pre-mortem", "master data quality", "enterprise IT operator"]
featured: true
---

You sit in the seat where the cutover has to work on Monday morning. You are the person who gets called at 4 AM when the migration fails. You are the one negotiating the renewal that locks in three years of spend, the one assembling the DORA register the auditor will open in six months, the one whose name is on the rollback decision when the steering committee can't agree.

You are not the consultant who designed it. You are not the vendor who sold it. You are the operator who has to make it work - and stay there when it doesn't.

I have spent fifteen years in that seat, inside global IT distribution. Not consulting - operating. I have watched enterprise IT decisions get made from the vendor side, the distribution side, and the buyer side, sometimes inside the same week. I have been in the room when procurement leads won negotiations they should have lost because they had better information, and lost ones they should have won because they didn't. I have watched SAP programmes signed off in a steering committee on a Tuesday and fall apart at 4 AM the following Sunday. I have seen compliance registers that survived every audit, and registers that fell apart the moment an auditor asked for a second document.

The seven principles below are the standard the Vihren Labs catalogue is held to. Each one is the direct inverse of a failure mode I have watched repeat - across organisations, across industries, across the last fifteen years. Read them, and one will land harder than the others. That is your door into the catalogue.

## The standard at a glance

1. **The honest business case beats the inspirational one.** Run the programme on the obligation, not the aspiration.
2. **Governance failures kill more programmes than technical failures.** Build governance with the rigour you build architecture.
3. **Concrete beats abstract.** Advice has an owner and a date. Sentiment does not.
4. **Vendor economics are not your enemy, but they are not your friend.** A renewal is a structured information-asymmetry contest.
5. **Regulation is operational, not legal.** Counsel is for interpretation; the operator owns documentation.
6. **The pre-mortem is worth more than the risk register.** Reconstruct the failure that already happened, on paper, in ninety minutes.
7. **The catalogue compounds. The consulting hour does not.** An operator who codifies their pattern-recognition compounds; everyone else restarts.

> **What I got wrong, early on.** In my first three years on the distribution side I thought the most expensive enterprise IT mistakes were the technical ones - the failed migrations, the bad architecture calls. I was wrong. The most expensive mistakes were the ones nobody noticed for two years: the renewal that auto-rolled at +18% because nobody set a calendar reminder; the compliance gap that didn't surface until the audit; the rollback criteria that were never agreed because the tech team thought governance owned it and governance thought the tech team owned it. The seven principles are written from the side of the desk where these slow, quiet costs land.

## 1. The honest business case beats the inspirational one

*Operator's takeaway: write the inspirational case for the steering committee. Run the programme on the obligation.*

Every enterprise IT programme has two business cases: the one written for the steering committee and the one the operator actually believes.

The inspirational one talks about competitive advantage, digital transformation, agility at scale. It uses the language the steering committee approved the budget for. It is not dishonest - it is incomplete. It describes the outcome everyone agreed to want, and says nothing about why the programme is actually happening.

The honest one is shorter. It usually starts with "we have to." We have to migrate off ECC because SAP ends mainstream maintenance in December 2027. We have to implement Article 50 disclosures because the enforcement date is August 2026 and the auditor will ask. We have to renegotiate the contract because the auto-renewal is in six weeks and the current terms are unsustainable. The honest business case is an obligation, a deadline, or a consequence.

The operator's case is more useful - not because it is more accurate, but because it is more durable. I have watched inspiration-driven programmes die at the first reorganisation. When the executive sponsor moves roles in February, the programme that existed because of their personal belief loses its engine overnight, and the people left holding it cannot explain to anyone why it is still on the plan. The obligation-driven programme keeps running, because the deadline didn't move when the sponsor did. A programme that runs on somebody's enthusiasm is one resignation away from cancelled.

Write the inspirational case to get the budget. Then put it away and run the programme on the honest one. Every actual decision - prioritisation, resourcing, scope - should be made against the obligation, not the aspiration.

## 2. Governance failures kill more programmes than technical failures

*Operator's takeaway: build governance with the same rigour you build technical architecture. Runsheet, freeze, rollback - name owners and pre-agree decisions before T-day.*

I have watched SAP S/4HANA cutovers fail at 4 AM on Sunday morning. Not once - several times. And in none of those cases did the technology fail.

The technology was fine. What failed was this: the master data freeze date was agreed in the project plan but not enforced by anyone with authority to stop the migration when data kept arriving after the cutover date. Or the runsheet had been updated three times in the week before go-live and the version people were working from was two versions behind. Or the rollback criteria - the specific thresholds that would trigger a decision to roll back to ECC - were documented in a slide deck, but nobody had pre-agreed who had the authority to call the rollback and at what point. So at 4 AM, when the criteria had technically been met, the decision was being negotiated in a Teams call with twelve people, none of whom wanted to be the one who made the call. A rollback negotiated live at 4 AM by twelve people is a rollback that never happens.

Technical risk is well-instrumented: monitoring tools, alerting, automated tests, error-rate thresholds. When something breaks technically, it usually shows up in a dashboard. Governance risk is invisible until the moment it matters. There is no monitor for "the runsheet owner is working from the wrong version."

Build governance with the same rigour you build technical architecture. The cutover runsheet is the artifact that determines whether sixty people on a 3 AM call know what to do next. The master data freeze is a control, and controls need owners who can enforce them - a freeze nobody can enforce is just a date in the plan. The rollback criteria are a pre-agreed decision - a named person, a specific threshold, a time limit. Write them down before you start, when the room is calm and nobody's reputation is on the line yet. This is the discipline behind the [SAP Migration Operator's Pack](/products/sap-migration-operators-pack) - and, increasingly, behind AI: most agent programmes fail on the operating model, not the model, which is the whole argument of [governance, not agents](/essays/governance-not-agents).

## 3. Concrete beats abstract

*Operator's takeaway: if a piece of advice cannot be turned into a checklist row with an owner and a date, it is sentiment dressed as advice.*

I have been handed more compliance checklists than I can count with a row on them that reads "ensure adequate data retention controls are in place." That row is useless. Not because the intent is wrong - because nobody knows what "adequate" means, nobody knows what "in place" means, and there is no way to tell when it is done. It survives review after review precisely because it cannot be failed.

A checklist that says "retention period documented for each personal-data category in the ROPA per **GDPR Article 30**; reviewed quarterly by the data owner; deletion procedure confirmed in writing by IT; evidence stored in the DPIA register alongside the processing activity" is operable. Someone can own it. Someone can check it. An auditor can verify it. It has a state - done or not done - and the state is observable.

That is the difference between advice and sentiment. Advice has an owner and a date. Sentiment does not.

Vihren Labs templates name what the operator actually has to do. In SAP migrations: not "improve master data quality" but **MASS/MASSD** runs against the Business Partner conversion, **MB52** stock-on-hand reconciliation, **FBL3N** general-ledger line-item validation against legacy balances - each with a threshold, an owner, and a sign-off date. In compliance: not "comply with EU regulation" but **DORA Article 29** preliminary ICT concentration-risk assessment, **GDPR Article 30** records-of-processing cadence, **EU AI Act Annex III** high-risk inventory. In procurement: not "negotiate the renewal" but the notice-period clause, the auto-renewal trigger date, the vendor's fiscal-quarter close.

If a piece of advice cannot be turned into a checklist row with an owner and a date, it is sentiment dressed as advice.

## 4. Vendor economics are not your enemy, but they are not your friend

*Operator's takeaway: a renewal is not adversarial. It is a structured information-asymmetry contest. The party with better information wins.*

Distributors, software vendors, and resellers all have economic incentives that are partially aligned with yours and partially not. Pretending the misalignment does not exist is the most expensive mistake in enterprise IT procurement.

I have been in renewal conversations from both sides of the desk - as the person at the distributor or vendor trying to close, and as the person at the buyer trying to get the best terms. The information asymmetry is enormous and almost entirely in the vendor's favour. The vendor knows their floor price. They know whether the deal is registered and what margin protection it affords. They know whether it is end of quarter. They know your renewal date down to the day, because it is in their CRM and they set a reminder sixty days out. Most buyers walk in knowing the price on the last invoice.

A renewal is not adversarial - it is a structured information-asymmetry contest, and the party with better information wins. "Better information" means knowing the notice period in the contract, the difference between list price and floor price, when the vendor's quarter ends, which features you actually use, and what a competitive alternative would cost.

The operator-grade fix is not "negotiate harder." It is "know what you are negotiating about." Most buyers who lose money on renewals don't lose it because they negotiate badly - they lose it because they walk in two weeks before the auto-renewal, when all leverage has expired. That is what the [IT Vendor & SaaS Procurement TCO](/products/it-vendor-and-saas-procurement-tco) is built to prevent.

## 5. Regulation is operational, not legal

*Operator's takeaway: counsel is for interpretation. The operator owns documentation. Conflate the two and you pay too much and move too slowly.*

DORA Article 28 is in force. The EU AI Act enforcement schedule is live. NIS2 transposition deadlines are active. These are not abstract legal risks - they are operational requirements with specific deadlines, specific evidence artefacts, and specific consequences.

I have watched both versions of this play out in the same organisation. The operator who treats regulatory compliance as a legal function will pay €5,000–€20,000 for a counsel review of a register template that should have cost €200 to build internally. The operator who treats it as a documentation function - building the register, mapping the data flows, maintaining the change log, naming the evidence - produces something an auditor can open on a laptop and walk through in thirty minutes.

Counsel is for the edge cases where the regulation is genuinely ambiguous. Counsel is not for producing a ROPA template, documenting which sub-processors a SaaS product uses, or formatting an Article 50 disclosure for a website chatbot. Those are documentation tasks - accuracy and discipline, not legal judgement. The operator who routes every compliance task through legal review pays too much and moves too slowly. The supervisor at the inspection does not care how expensive the counsel review was; they care whether the evidence is there. That is the posture behind the [EU AI Act SME Compliance Starter](/products/eu-ai-act-sme-compliance-starter).

## 6. The pre-mortem is worth more than the risk register

*Operator's takeaway: a risk register lists what could go wrong. A pre-mortem narrates what already did. Only one is actionable.*

Risk registers list things that could go wrong. They are written at the start of a programme, by the people most likely to underestimate the risks - because they are also the people who need the programme approved. I have never seen a risk register catch the thing that actually took a programme down. I have read plenty of them afterwards, and the line was usually there, phrased so softly that nobody acted on it.

Pre-mortems start from the assumption that the programme has already failed. The facilitator asks: it is six months from now, the programme has gone badly wrong - what happened? The output is not a list of risks that might occur; it is a narrative reconstruction of a failure, written by people who are not protecting anyone's investment in the original plan.

The difference is striking. A risk register says "data migration could exceed planned timeline." A pre-mortem says: the Business Partner conversion error rate was 12% in the dress rehearsal, the basis team flagged it but the project manager said it would be lower in production, nobody escalated to the steering committee, the cutover started on schedule, by Tuesday the UK business had stopped trusting the financial data in S/4 and were running parallel in ECC - so the cutover had effectively failed even though nobody had formally declared a rollback.

The first is a slide. The second is actionable: it names specific people, specific decisions, specific points where a different action would have changed the outcome. Every major programme should run a ninety-minute pre-mortem before go-live. The output is simple - one mitigation, one owner, one date per failure category. That list is the most valuable document in the project file.

## 7. The catalogue compounds. The consulting hour does not.

*Operator's takeaway: an operator who codifies pattern-recognition into a re-usable template builds an asset that compounds across every project, every hire, every audit.*

Consulting hours are perishable. You pay for expertise, the engagement ends, and the expertise leaves with the consultant. What remains is whatever was documented during the engagement - and documentation is usually the last thing that gets done in a project running over time and budget.

Spreadsheets, playbooks, and checklists are not perishable. An operator who codifies their pattern-recognition into a re-usable template - and keeps it current - builds an asset that compounds across every subsequent project, hire, and audit. The cutover runsheet from the first migration becomes the template for the second. The renewal tracker built for one estate becomes the standard across the team. The compliance checklist for one regulation becomes the model for the next.

This is why Vihren Labs exists. Fifteen years of pattern-recognition - what actually fails in SAP migrations, what actually moves vendors in renewals, what actually satisfies an auditor, what actually makes a pre-mortem find something - codified into templates anyone in the operator's seat can use, modify, and keep current. The cost of building it from scratch is measured in weeks; the cost of the template is a line item you stop noticing.

## How the seven principles compose - one operator's week

These are not seven separate ideas. They compound. A single week inside an enterprise IT estate will surface most of them in sequence.

**Monday - the renewal.** An account executive emails a "renewal preview": 11% uplift, locked for two years if signed by month-end. The honest case (Principle 1) is "we have to renew because this is the system of record and we cannot migrate in six weeks." The TCO model shows the true three-year cost including the bolt-on and the 0.4 FTE admin (Principle 3 - concrete, not "it's expensive"). The vendor's information advantage is real (Principle 4) - but your workbook says: counter at zero uplift, extend the sandbox at no cost, accept 4% only if both extensions are in writing. The saving is captured in the renewal pipeline so the next cycle starts from a documented baseline.

**Tuesday - the EU AI Act review.** "Are we ready for August 2?" Regulation as operational (Principle 5) means the answer is not "let me get legal on the line" - it is "let me show you the inventory, the risk classification, and the disclosure texts we published last week." Counsel time is reserved for the one Annex III edge case where HR is using a CV-screening plugin.

**Thursday - the SAP cutover gate review.** Two weekends before go-live, Business Partner conversion is at 4.2% - above the 0.5% threshold pre-agreed at the steering committee. The risk register said "data migration could exceed timeline" (Principle 6 - a slide). The pre-mortem said exactly what is now happening (actionable). The escalation path was pre-agreed (Principle 2). The basis lead pulls the trigger; the cutover slips two weeks; the business trusts the data in production. The cost of the slip is far less than going live with bad master data.

**Friday - the vault.** The renewal tracker becomes the template for the next renewal. The cutover runsheet becomes the basis for the next system upgrade. The AI Act inventory becomes the master inventory for the GDPR Article 30 update. The consulting hours that touched each were perishable; the artifacts compound (Principle 7). Six months from now, the next person who walks into the seat opens a folder and finds twelve workbooks that describe how this organisation actually operates.

A renewal that uses only Principle 4 without Principle 3 produces hand-waving. A pre-mortem (6) without governance (2) produces a list nobody acts on. A catalogue (7) without operational regulation (5) produces templates that quote the wrong articles. The standard is not seven good ideas - it is seven mutually reinforcing ones, applied in the order the work actually arrives.

## Where to start

If you read this far, one of the seven principles probably landed harder than the others. That is the place to start.

- **Principles 2 + 3, applied to data** (governance + concrete) - start with [Master Data Operations](/lines/master-data). Bad master data is the failure mode underneath most of the others.
- **Principle 2, applied to AI** (governance before agents) - the [AI Center of Excellence Handbook](/products/ai-center-of-excellence-handbook) is the operating model; the [AI Adoption & Governance Operator's Pack](/products/ai-adoption-and-governance-operators-pack) bundles it with the tools at each gate.
- **Principles 1 + 4** (the honest case + vendor economics) - start with [Procurement & Vendor Management](/products).
- **Principles 3 + 5** (concrete + regulation as operational) - start with the [Regulatory & Compliance](/products) line.
- **Principles 2 + 6** (governance + pre-mortem) - start with [SAP / ERP Operations](/products).
- **Principle 7** (the catalogue compounds) - browse the [full catalogue](/products) and pick whichever line matches the most expensive next project on your desk.

The standard is the same across all of them. The size of the buyer changes; the rigour does not. If you want the step-by-step versions, the [operator guides](/writing) walk the cutover, the master-data audit, and the EU regulatory registers in detail.

---

*Vihren Labs publishes operator-grade templates for the enterprise IT stack. Every product is built from real scenarios - real T-codes, real article numbers, real cutover-night failure modes. Questions, or a number that doesn't match the regulation as written? [hello@vihrenlabs.com](mailto:hello@vihrenlabs.com). I update.*
