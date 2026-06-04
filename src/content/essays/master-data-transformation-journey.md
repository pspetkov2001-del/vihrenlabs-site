---
title: "Touchless ordering is a master-data achievement nobody sees"
description: "An operator's account of turning manual product creation into an AI-driven, rules-based, fully-automated master-data engine at distribution scale — ingestion to touchless quoting, the governance that holds it, and what actually breaks. From someone who came to master data from the reporting side, where the drift shows up first."
date: "2026-06-09"
line: "Master Data Operations"
keywords: ["master data management", "MDM", "product master data", "data governance", "SKU automation", "touchless ordering", "catalog management", "vendor onboarding", "data standardization", "GPO master data"]
featured: true
---

When a salesperson configures a quote in seconds and the order flows through without a human touching it, that looks like a sales-tooling win. It isn't. It's a master-data achievement — and master data is the function nobody wants to own until it's the thing standing between the company and its revenue.

I didn't start in master data. I came to it from the reporting side.

For years I ran vendor and customer reporting at distribution scale — point-of-sale, inventory, ageing, the rebate calculations that had to pay out to SLA for the largest hardware and software brands in the world. That seat teaches you something the org chart hides: **almost every "the report is wrong" problem is a master-data problem wearing a costume.** A rebate that doesn't reconcile, a product that lands in the wrong category, an order that can't be configured — trace it back far enough and you find one attribute, created by hand, that was wrong the day the SKU was born. I spent enough time firefighting the symptoms to want to own the cause.

So when the mandate came to own master data end-to-end — across Product, Vendor, and Customer domains — I already knew where the bodies were buried.

**The mandate, stated plainly: kill manual product creation.**

The goal wasn't "improve data quality." It was to convert a manual product-creation-and-maintenance process into an **AI-driven, rules-based, data-standards-compliant, fully automated** one — and to build the catalog platform that associates and vendors would actually run on. Not a cleaner spreadsheet. A different operating model.

The starting state, before any of it: every vendor sends their catalog in their own shape. Different field names for the same attribute, different price structures, product hierarchies that don't agree with each other or with yours. Multiply by hundreds of vendors and dozens of country operations, each with local rules — tax treatment, language, compliance flags, the "we've always done it this way" override living in one analyst's head. A new SKU was a manual event: someone read a catalog, decided what the product was, typed it in, mapped it by hand, and hoped the next person did it the same way. They didn't. The product master drifted the moment it was created, and every downstream system inherited the drift.

**The pipeline — ingestion to touchless.**

This was never one project. It was a pipeline, built and hardened stage by stage:

1. **Ingestion** — take the vendor catalog in whatever shape it arrives. Stop fighting the vendor to conform to your format; meet the catalog where it is and transform on your side.
2. **Transformation + standardization** — normalize every catalog into one internal structure. One field, one meaning, everywhere.
3. **Enrichment** — fill what the vendor didn't send: the attributes your buyers, your quoting engine, and your compliance obligations need but the source never carried.
4. **Categorization + attribute rules** — the real leverage. Rules that read a product and decide *what it is* and *which attributes apply*, so categorization stops being a human judgment call and becomes a governed, repeatable, AI-assisted decision.
5. **Mapping + local settings** — the layer everyone underestimates. The same product behaves differently across country operations; the rules have to carry the local overrides without collapsing into a pile of exceptions nobody can maintain.
6. **Dynamic SKU creation** — when ingestion, standardization, enrichment, categorization and mapping all hold, the SKU gets created automatically, correctly, the moment it's needed.
7. **Touchless quoting and ordering** — the payoff. The salesperson and the customer never see steps 1–6. They see a quote that's right and an order that flows.

The point isn't the diagram. It's the sequence: **automation is the last step, never the first.** You cannot automate SKU creation on top of master data that drifts. Automate the mess and you get the mess faster — and harder to see. The AI and the agents are powerful here, but only downstream of the rules and the standards. AI on top of ungoverned data just makes confident mistakes at scale.

**Governance is what makes it survive contact with reality.**

A pipeline is a one-time build. Governance is what keeps it true after the project team rolls off and the volume triples. The hard questions are never technical:

- *Who decides what an attribute means* when two countries disagree?
- *Who owns a category rule* — and who is allowed to add the exception that quietly breaks it for everyone else?
- *How do you prove control* when an auditor, a vendor, or a regulator asks?

Master data without an operating model — named owners, decision rights, SLAs, an escalation path, evidence of control — is a clean dataset waiting to rot. The technology was maybe a third of the work. The operating model was the rest. That's the part fifteen years of running transitions and shared-service growth actually prepared me for: aligning processes, people, technology, and data is one job, not four.

**The endpoint is a platform for the operators and the vendors — not a tidy table.**

Clean, governed, automated data is the precondition; the *experience* is the product. When the data underneath is trustworthy, you can give vendors a self-service surface to bring their catalog in, and give the internal associates tooling that doesn't fight them. The catalog platform is for the people who run the catalog and the vendors who feed it — the data quality is what makes that platform possible at all.

> **The number that made the case:** standing up a few thousand products and SKUs in the product master used to take *weeks* of manual creation. After the data standards, the categorization rules, and AI/LLM-assisted categorization, enrichment, and attribute assignment were in place, ingesting on the order of **two million vendor part numbers** — a single large vendor's full catalog — and creating the resulting products and SKUs ran in **a few hours**. Weeks to hours. That gap is not an AI achievement; it's a data-standards achievement that AI was finally allowed to run on top of.

Most enterprises treat master data as a compliance checkbox — a cost center that produces a clean file for an audit. That's backwards. Master data is the engine under everything a customer touches: the quote, the order, the catalog, the price. Get it right and the automation on top of it looks like magic. Get it wrong and no amount of sales tooling will save you — because the thing that's broken is three layers down, where nobody is looking.

That's the seat I write Vihren Labs from. Not the consultant who managed the project, not the vendor who sold the platform — the operator who owned the data when it had to be right on Monday morning.

— Petko
