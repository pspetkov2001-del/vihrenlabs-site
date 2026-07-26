# Content fact review - flagged 2026-07-22, partially actioned

Raised during the 22-article voice pass. Every item below was **left exactly as
written in the content** - the rewrite was forbidden from changing facts. These
need a human decision. Ordered by risk.

> **Resolutions 2026-07-26:** Item 1 FIXED on both pages, verified against the
> EUR-Lex text of Regulation (EU) 2022/2554 (CELEX 32022R2554): Art 28(4)(c) =
> pre-contract identification of concentration risk "as referred to in Article
> 29"; Art 29 = "Preliminary assessment of ICT concentration risk at entity
> level"; Art 28(3) = the register of information (entity / sub-consolidated /
> consolidated levels); Art 28(5) is about information security standards (the
> original flag's "termination grounds" guess was also wrong - termination is
> 28(7)). Operator Standard now cites Article 29; register-completeness essay
> now anchors register=28(3), risk lens=Article 29. The Operator Standard's
> dollars/euros mismatch (item under "minor") also fixed - currency-neutral
> phrasing. The EBA 30% threshold flag (item 2 area) remains OPEN.

## 1. Possible DORA article misattribution (HIGH - affects two pages) - RESOLVED 2026-07-26, see note above

- `src/content/essays/dora-ict-register-completeness.md`
  > "Article 28(5) is explicit that competent authorities assess ICT
  > concentration risk at both entity and sector level..."
- `src/content/essays/the-operator-standard.md` (cornerstone page)
  > "**DORA Article 28(5)** concentration-risk assessment"

In Regulation (EU) 2022/2554 the pre-contract concentration-risk assessment duty
appears to sit in **Article 28(4)(c)**, and the entity-level preliminary
concentration-risk assessment in **Article 29**. Article 28(5) deals with
contractual/termination grounds. Verify against the consolidated text.

Why it matters: both pages sell on citing real article numbers. This is the one
error type that damages the positioning directly.

## 2. Unsourced EBA threshold (HIGH)

`src/content/essays/dora-ict-register-completeness.md`
> "(The EBA treats more than 30% of ICT spend on a single provider as a flag.)"

Could not be tied to a published EBA instrument. EBA/GL/2019/02 discusses
concentration risk qualitatively, without a numeric spend trigger. This is the
only hard figure in that section, so it is load-bearing. Source it, attribute it
as your own rule of thumb, or drop it.

## 3. Arithmetic that does not tie out (HIGH - the target reader will check)

`src/content/essays/vendor-side-rfp-observations.md`
> "A 10% discount ... might be worth EUR 15,000. An uncapped auto-renewal
> escalating at 8% a year on that same contract costs you EUR 40,000 and more."

If 10% over three years is EUR 15,000, the base is ~EUR 50,000/yr. An 8% annual
escalation on that base compounds to roughly EUR 12,000 over three years, not
EUR 40,000. The EUR 40,000 figure needs a bigger contract or a longer horizon.

## 4. Internal contradiction (MEDIUM)

`src/content/guides/pmo-status-that-doesnt-lie.md`
Body says "A defensible PMO status is built on **four** disciplines", but
`stepsTitle` says "**Six** moves..." and `steps[]` has six entries. The extra two
(budget-burn-vs-progress, escalate-the-decision) appear in the body only as
sub-points. Decide which number is right - the HowTo schema ships the six.

## 5. Figures that may measure different things (MEDIUM)

`src/content/guides/it-vendor-saas-tco.md`
FAQ says licence price understates real cost by **20-40%**; the body says the
true three-year cost is **30-60%** higher than the quote. Possibly two different
measures, but they sit on one page and a reader will compare them.

## 6. Dating / framing that goes stale (MEDIUM)

- `guides/eu-ai-act-deployer-checklist.md` - framed throughout as preparation
  "ahead of 2 August 2026". That date is now imminent; from 2 August the page
  reads as out of date. Decide when to reframe to "as of".
- `essays/ecc-end-of-maintenance-math.md` - "the practical deadline ... was
  closer to the middle of 2025" (also in the frontmatter description). Reads as
  already-missed rather than as a warning. Re-anchor or mark as retrospective.
- `essays/ecc-end-of-maintenance-math.md` - the 2023/2024 cohort years and
  "entering the market now" drift as the page ages.

## 7. Worth periodic re-verification (LOW)

- SAP ECC mainstream maintenance ending **31 December 2027** - re-check against
  SAP's published schedule; extended and customer-specific maintenance tracks
  run beyond it and a reader may raise them.
- The Gartner "**more than 40%** of agentic-AI projects scrapped by end of 2027"
  forecast - correctly hedged as a forecast in the text, but it is a dated
  third-party projection.
- `essays/governance-not-agents.md` - the "**fifteen years**" tenure claim should
  stay consistent with how tenure is stated site-wide.
- `guides/eu-ai-act-deployer-checklist.md` - "the high-risk regime applies from
  2 August 2026" is a compression; Annex I safety-component high-risk systems
  run on a later date. The sentence hedges with "some provisions phasing in
  later", but a supervisor could read it as over-broad. Counsel check.

## 8. Cosmetic (LOW)

`essays/the-operator-standard.md` - "the cost of the template is measured in
**dollars**", while the rest of the essay and the catalogue price in euros on an
EU-facing site.
