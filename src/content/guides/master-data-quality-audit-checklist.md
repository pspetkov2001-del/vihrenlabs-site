---
title: "The master data quality audit — the checks that actually matter"
description: "How to run a master data quality audit: the six dimensions worth scoring (completeness, validity, consistency, uniqueness, conformity, timeliness), how to score at field level, how to log and prioritise defects, and how to evidence the improvement over time — for the person accountable for the data, not the consultant reviewing it."
date: "2026-06-11"
line: "Master Data Operations"
keywords: ["master data quality audit checklist", "data quality metrics", "master data quality dimensions", "MDM data quality", "SAP master data quality", "data defect log", "data quality scoring", "master data remediation"]
answer: "A master data quality audit scores each critical field against six dimensions — completeness (is it populated?), validity (does it conform to the allowed format/values?), consistency (does it agree across systems?), uniqueness (are there duplicates?), conformity (does it match the governed standard?), and timeliness (is it current?). You score at field level rather than record level, log every defect with an owner and a root cause, prioritise by business impact rather than by count, and re-score on a fixed cadence so the trend is evidenced. The output is not a one-time report — it is a repeatable, banded score that proves whether quality is improving."
stepsTitle: "The audit checklist — eight moves"
steps:
  - name: "Scope to the fields that drive decisions"
    text: "Don't audit every field. Identify the master-data attributes that actually drive downstream processes — the ones that, when wrong, break ordering, invoicing, reporting, or compliance. Audit those first."
  - name: "Score completeness"
    text: "For each in-scope field, what percentage of records is populated? Completeness is the cheapest dimension to measure and often the most revealing — empty mandatory fields are a process-control gap, not a data-entry gap."
  - name: "Score validity and conformity"
    text: "Does the value conform to the allowed format, value list, or governed standard (e.g. a valid tax ID format, an approved unit of measure, a sanctioned material group)? Validity catches the values that are present but wrong."
  - name: "Score consistency across systems"
    text: "Where the same master-data object exists in more than one system, do the values agree? Cross-system inconsistency is where 'the data is fine in SAP but wrong in the catalogue' lives."
  - name: "Score uniqueness — find the duplicates"
    text: "Duplicate customers, vendors, or materials inflate spend, fragment reporting, and break matching. Score uniqueness with deterministic and fuzzy matching, and decide a survivorship rule before you merge."
  - name: "Score timeliness"
    text: "How current is the record? A field that was correct two years ago and never reviewed is a latent defect. Timeliness ties data quality to a review cadence and a named owner."
  - name: "Log every defect with owner and root cause"
    text: "A defect log that records only the error is a list. A defect log that records the error, the owning function, and the root cause is a remediation plan. Most defects trace to a missing control, not a careless user."
  - name: "Prioritise by impact, then re-score on a cadence"
    text: "Rank remediation by business impact, not defect count — a hundred cosmetic gaps matter less than one wrong tax classification. Then re-run the audit on a fixed cadence so the score is a trend line, not a snapshot."
faq:
  - q: "What are the dimensions of master data quality?"
    a: "The commonly used dimensions are completeness, validity, consistency, uniqueness, conformity (to a governed standard), and timeliness/currency. Some frameworks add accuracy and integrity. The practical point is to pick the dimensions that map to your downstream failures and score every critical field against them."
  - q: "How do you measure master data quality?"
    a: "Score at field level: for each critical attribute, measure the percentage of records that pass each dimension's rule, then roll up to a banded score per domain. Field-level scoring tells you where to act; a single record-level pass/fail does not."
  - q: "What is the difference between a data quality audit and data governance?"
    a: "The audit measures the current state of the data; governance is the operating model — owners, stewards, RACI, and forums — that keeps quality from drifting back. The audit tells you where you are; governance is how you stay there. Run the audit first, stand up governance against what it finds."
  - q: "How often should you run a master data quality audit?"
    a: "On a fixed cadence — quarterly is common for critical domains — so the score becomes a trend line that proves improvement, plus a triggered re-score after any major load, migration, or system change."
ctaLabel: "Get the Master Data Quality Audit Workbook — $79"
ctaUrl: "/products/master-data-quality-audit-workbook"
ctaSub: "The done-for-you version: 75 named master-data quality checks with field-level scoring, a defect log, and a remediation tracker — so you can run the audit, prioritise the fixes, and evidence the improvement without building the framework from scratch."
---

## Why field-level scoring beats a pass/fail report

The most common mistake in a master data quality audit is scoring at record level — "this record is clean / not clean." It hides where the problem actually is. A record can fail on one field while being perfect on twenty others, and a record-level fail tells you nothing about which field to fix or which control to add.

Field-level scoring inverts that. You learn that, say, completeness on the tax-classification field is at 62% across vendors — which points at a specific control gap in vendor onboarding, with a specific owner. That is a remediation instruction. "Vendor data is 78% clean" is not.

## Defects trace to controls, not to people

When you log a defect, record the root cause — and most root causes turn out to be a missing or unenforced control, not a careless user. A mandatory field left blank usually means the process let it through. A duplicate vendor usually means there was no match-check at creation. Fixing the data without fixing the control just means you re-run the audit next quarter and find the same defect.

This is why the audit and the operating model belong together. The audit finds the defects; a governance model — data owners, stewards, a RACI, a forum that actually meets — stops them recurring. The reasoning behind treating reporting and master data as one discipline is in the essay [Touchless ordering is a master-data achievement nobody sees](/essays/master-data-transformation-journey).

## From audit to a maturity read

Once you have a field-level score and a defect log, you can place the domain on a maturity band — and that banded read is what a steering committee actually responds to. If you want the structured version of that diagnostic, the [Master Data Management Maturity Assessment](/products/master-data-management-maturity-assessment) scores 78 anchored questions across five domains.

*This guide is operator practice — adapt the dimensions and thresholds to your own data model and governance standard.*
