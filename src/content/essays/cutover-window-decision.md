---
title: "The cutover window decision nobody makes early enough"
description: "Every S/4HANA migration has a cutover window. Few project plans specify the rollback criteria in advance — and the rollback decision is the hardest call in the migration. The three questions to answer before T-Day."
date: "2026-06-04"
line: "SAP / ERP Operations"
keywords: ["S/4HANA cutover", "cutover window", "rollback criteria", "go/no-go decision", "SAP migration cutover", "cutover run sheet"]
---

Every S/4HANA migration has a cutover window.

A period of hours — typically 20-36 hours for a mid-market instance — when ECC is shut down, data is migrated, S/4 is validated, and the go/no-go decision is made.

Most project plans specify the cutover window start. Few specify the rollback criteria in advance.

**The rollback decision is the hardest call in an S/4 migration.**

Not technically — technically, it's defined by the migration tools and your backup procedures. Psychologically: after 18-24 months of project work, with 200 users waiting to test the system, with the steering committee watching the status dashboard, with the implementation partner's team assembled in a war room — making the call to roll back requires a level of pre-commitment that organizations rarely establish in advance.

The teams that handle this well have answered three questions before T-Day:

1. **What is the go/no-go decision criteria?** Not "system is stable." Specific: FI/CO posting is clean, MM goods movements are processing, SD order-to-delivery works end-to-end, critical integration tests are green. Written down. Pre-agreed by the steering committee.

2. **Who makes the call?** One person. Named in advance. With authority to call a rollback over project manager objection if the criteria aren't met. Usually the CIO or CFO — not the project manager who has been living with this for two years.

3. **What is the rollback window?** The "point of no return" varies by system and data volume. Once certain migration steps complete, a clean rollback is no longer possible. Your project team knows where that line is. Your steering committee should know it too, and sign off on it before cutover starts.

The teams that don't answer these questions in advance answer them under pressure, at 3 AM, with partial information, when the cost of being wrong is visible to everyone in the room.
