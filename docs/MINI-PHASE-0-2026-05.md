# vihrenlabs-site — Mini Phase 0 (4 surgical fixes before social launch)

**Authored:** 2026-05-17
**Target ship:** before 2026-06-13 (first LinkedIn essay drop, Vihren Labs Stage 2)
**Effort:** ~3 hours total (one weekend morning)
**Reference:** Visual review at `Personal OS/inbox/visual-review-2026-05-17.md` §3

---

## Context

vihrenlabs-site shipped 2026-05-16 with two pages (Home + About) on Astro + Tailwind + Vercel. The brand spec from `BRAND-ENTERPRISE-IT-OPERATOR.md` is implemented faithfully — palette, typography, voice are correct. Verdict from visual review: 7/10. Three surgical gaps block the first social-launch wave:

1. **No `og:image` meta** — LinkedIn/Slack share previews are text-only
2. **Newsletter form is placeholder** — every launch-day signup is lost
3. **Value prop buried 3 paragraphs below H1** — visitors don't grasp the offer

This plan closes those gaps in ~3 hours, before the first LinkedIn essay drops on 2026-06-13.

---

## The 4 fixes

### Fix 1 — Create `og-image.png` and wire `og:image` meta (~1 hr)

**Why:** When `vihrenlabs.com` is shared on LinkedIn or Slack, the preview card is currently text-only — no visual brand presence. The first LinkedIn essay (Stage 2) drives discovery traffic; every share without an og-image is a missed brand impression.

**Spec:**
- 1200×630 PNG, sRGB color profile
- Background: navy `#1E3D59` solid
- Wordmark: "Vihren Labs" in Inter Black 96px, white `#FFFFFF`, centered
- Tagline below wordmark: "Operator-grade templates for the enterprise IT stack." in Inter Medium 32px, light grey `#F2F3F4`
- Small orange `#E67E22` accent rule (2px × 80px) below tagline
- File optimized through TinyPNG; target <80 KB

**Tooling:**
- Figma (preferred — exports clean PNG) OR Canva (faster if Figma unfamiliar) OR even hand-crafted in any image tool
- 30-min budget for design + export + optimization

**Wire in `src/layouts/Base.astro`:**

```html
<!-- Add inside <head>, near other OG meta tags -->
<meta property="og:image" content="https://vihrenlabs.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Vihren Labs — Operator-grade templates for the enterprise IT stack" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://vihrenlabs.com/og-image.png" />
```

**File location:** `vihrenlabs-site/public/og-image.png`

---

### Fix 2 — Eyebrow value prop above H1 (~15 min)

**Why:** Hero H1 is "Built by someone who's sat on both sides." — story-driven, voice-y, good. But visitors who don't know Vihren Labs yet can't tell what the brand IS from the H1 alone. Value prop ("5 product lines") is in the Operator Voice section ~3 scroll-paragraphs down. Cold visitors leave before scrolling.

**Fix:** Add an eyebrow line above the existing H1 stating the literal offer.

**Edit `src/pages/index.astro`:**

Find the existing hero section. Above the H1 (before the line containing `<h1 ...>Built by someone</h1>` or similar), insert:

```html
<p class="text-orange font-mono text-sm tracking-[0.18em] uppercase mb-6">
  5 product lines · Procurement · Regulatory · SAP · MDM · Transformation
</p>
```

Adjust `text-orange` to whatever Tailwind class corresponds to `#E67E22` in the actual `tailwind.config.mjs` (likely `text-orange-DEFAULT` or `text-orange`).

**Result:** Eyebrow tells visitors what the brand IS in <2 seconds; H1 then delivers the story / voice.

---

### Fix 3 — Author byline pill on Home hero (~15 min)

**Why:** Brand spec calls for "15 years at a Fortune-100 IT distributor" credential surfaced. Currently only on About page. New visitors on Home don't see the authority signal before clicking through.

**Fix:** Add a small byline pill below the Hero CTA buttons.

**Edit `src/pages/index.astro`:**

Find the hero CTA button row (e.g., "Browse Shop" + "About" buttons). Below it, insert:

```html
<div class="mt-8 inline-flex items-center gap-3 px-4 py-2 bg-navy-light/40 border border-orange/20 rounded-full font-mono text-xs text-grey-light">
  <span class="w-2 h-2 rounded-full bg-orange"></span>
  Built by Petko Petkov · 15 years vendor-side (Fortune-100 IT distributor)
</div>
```

Adjust class names to match actual `tailwind.config.mjs` token names. The intent: small monospace pill, navy translucent bg, orange dot indicator, monospace text.

**Result:** Authority signal visible above the fold. Reinforces "operator who's actually been there" positioning.

---

### Fix 4 — Wire ConvertKit newsletter form (~1.5 hrs)

**Why:** Current Home page Section 9 has placeholder text "Newsletter landing shortly — follow LinkedIn." Every launch-day signup that would have happened is lost. Newsletter signup is the single highest-value conversion on a content-led brand site (enables nurture; subscribers convert to product buyers at 5-15× cold-traffic rates).

**Founder action (15 min):**
1. Sign up for ConvertKit free tier at https://convertkit.com (if not done already)
2. Create a form named "Vihren Labs — Operator field notes"
3. Get the form embed code from ConvertKit dashboard → Forms → Embed → "HTML form" tab
4. Copy the form's `data-uid` value and form ID

**Engineering (~1 hr):**

**NEW `src/components/NewsletterForm.astro`:**

```astro
---
// ConvertKit-embedded newsletter signup form.
// Get CONVERTKIT_FORM_ID + CONVERTKIT_UID from ConvertKit dashboard.
const FORM_ID = "REPLACE_ME";    // e.g., "1234567"
const FORM_UID = "REPLACE_ME";   // e.g., "a1b2c3d4e5"
---

<form
  action={`https://app.convertkit.com/forms/${FORM_ID}/subscriptions`}
  method="post"
  data-sv-form={FORM_ID}
  data-uid={FORM_UID}
  data-format="inline"
  data-version="5"
  class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
>
  <input
    type="email"
    name="email_address"
    required
    placeholder="you@company.com"
    class="flex-1 px-4 py-3 rounded-md bg-navy-light/40 border border-orange/30 text-grey-light placeholder:text-grey-mid font-mono text-sm focus:outline-none focus:border-orange"
  />
  <button
    type="submit"
    class="px-6 py-3 rounded-md bg-orange hover:bg-orange-dark text-white font-mono text-sm font-medium transition-colors"
  >
    Get field notes →
  </button>
</form>

<p class="text-xs text-grey-mid font-mono text-center mt-3">
  Operator field notes. ~1 essay per week. No spam, unsubscribe any time.
</p>

<script src="https://f.convertkit.com/ckjs/ck.5.js" defer is:inline></script>
```

**Replace placeholder block in `src/pages/index.astro`:**

Find the existing newsletter placeholder section (the one that says "Newsletter landing shortly"). Replace with:

```astro
---
import NewsletterForm from '../components/NewsletterForm.astro';
---

<!-- ... in the page body ... -->
<section class="py-24 px-6 bg-navy-dark">
  <div class="max-w-2xl mx-auto text-center">
    <p class="text-orange font-mono text-sm tracking-[0.18em] uppercase mb-4">
      Operator field notes
    </p>
    <h2 class="text-3xl sm:text-4xl font-bold text-grey-light mb-4">
      Real lessons from real cutover nights.
    </h2>
    <p class="text-grey-mid mb-8 max-w-lg mx-auto">
      One essay a week from inside enterprise IT — SAP migrations, vendor procurement, EU regulatory.
      Concrete, vendor-side-honest, no buzzwords.
    </p>
    <NewsletterForm />
  </div>
</section>
```

**Verification:**
1. Submit a test email to the form
2. Confirm subscriber lands in ConvertKit dashboard within 30 seconds
3. Confirm the ConvertKit "Welcome" email (if configured) fires

---

## Files affected

**NEW:**
- `vihrenlabs-site/public/og-image.png` — 1200×630 brand share image
- `vihrenlabs-site/src/components/NewsletterForm.astro` — ConvertKit embed

**MODIFIED:**
- `vihrenlabs-site/src/layouts/Base.astro` — add og:image meta tags
- `vihrenlabs-site/src/pages/index.astro` — eyebrow value prop above H1, author byline pill, replace newsletter placeholder with NewsletterForm import

---

## Out of scope (deferred to August /products + /essays build)

- Workbook screenshots (brand spec calls for them; defer until /products page exists)
- Per-product detail pages (`/products/[slug]`) — August T-042
- Essays archive (`/essays/[slug]`) — August T-043
- Gumroad overlay widget on Buy buttons — August T-042
- Plausible analytics or Vercel Analytics — August T-044
- Sitemap + robots.txt — August T-044
- Google Search Console submission — August T-044

---

## Verification

**End of Fix 1 — og-image (target +1 hr after start):**
1. `vihrenlabs.com/og-image.png` returns 200, file <80 KB
2. Paste `vihrenlabs.com` into LinkedIn post composer (draft, don't publish) — preview shows navy og-image with wordmark
3. Same paste into Slack DM — preview shows the same image
4. https://www.opengraph.xyz/ scanner shows valid og:image + og:image:width + og:image:height

**End of Fix 2 — eyebrow value prop (target +15 min):**
5. Home page loads on mobile (Chrome DevTools 375×667 viewport)
6. Eyebrow line visible above H1 within the first viewport-height (no scroll required)
7. Text reads "5 product lines · Procurement · Regulatory · SAP · MDM · Transformation"
8. No layout overflow on 320px-wide viewport

**End of Fix 3 — author byline pill (target +15 min):**
9. Pill visible below Hero CTA buttons
10. Orange dot indicator + monospace text render cleanly
11. Pill width contracts to content (not full-width band)
12. On mobile, pill stays on one line OR wraps gracefully

**End of Fix 4 — newsletter (target +1.5 hr):**
13. Submit test email "test+phase0@petko.dev" to form
14. ConvertKit dashboard shows the test subscriber within 30 seconds
15. If ConvertKit Welcome email is configured, it arrives within 1 minute
16. Form on mobile: input full-width, button below (sm:flex-row stacks correctly)
17. Form on desktop: input + button on one row

---

## Risks

| # | Risk | Mitigation |
|---|---|---|
| R-VL-1 | og-image design takes longer than 1 hr (Figma learning curve) | Fall back to text-only version: navy bg + Inter Black wordmark only, skip tagline. Production quality not required for v1. |
| R-VL-2 | ConvertKit form ID lookup unclear | Detailed ConvertKit docs: https://help.convertkit.com/en/articles/4317261-html-form. If stuck >20 min, message ConvertKit support. |
| R-VL-3 | Eyebrow value prop wording too long on mobile | Test at 375px width. If overflow, shorten to "5 product lines · Operator-grade." |
| R-VL-4 | Tailwind class names don't match config | Open `tailwind.config.mjs`, confirm exact token names. If `text-orange` doesn't exist, it might be `text-orange-DEFAULT` or `text-[#E67E22]`. |
| R-VL-5 | Scope creep ("while I'm in there, let me redo the hero") | Hard rule: Mini Phase 0 = 4 fixes. Nothing else. Anything beyond gets a v1 ticket in `docs/` for next iteration. |

---

## Falsification trigger

If by 2026-06-20 (one week after first LinkedIn essay), the site shows:
- ZERO newsletter signups attributable to LinkedIn traffic (Plausible/Vercel Analytics referrer check)
- AND LinkedIn essay reach <100 impressions

→ the issue is NOT the site; it's the LinkedIn distribution. Don't iterate on the site. Iterate on LinkedIn essay format / timing / hashtags first.

Compliance hard fail: N/A (no regulated content on the site yet).

---

## Day-30 retrospective (target 2026-07-13, one month post-fix)

Review:
- Newsletter signup count (target: ≥10 from organic + LinkedIn)
- Bounce rate on Home (target: <70%)
- Time on About page (target: median >30 seconds — indicates the credibility story lands)
- Top referrers (LinkedIn vs Google vs direct)
- Plan adjustments for August /products + /essays build based on these signals
