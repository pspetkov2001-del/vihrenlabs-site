# Vihren Labs site — repository contract for Claude sessions

This file encodes vihrenlabs-site-specific durable rules. Global behaviour rules
live in `~/Desktop/GENERAL MEMORY.txt`; portfolio-level rules in
`~/Desktop/Personal OS/CLAUDE.md`. Lesson routing follows
`~/Desktop/Personal OS/protocols/lesson-routing.md` — route each lesson to the
surface where it is re-read at the decision moment; **repo-specific gotchas land
HERE** (an agent reads this file on entry to the repo).

Stack: Astro + Tailwind, deployed on Vercel. This is the Vihren Labs B2B
top-of-funnel site (essays + the Operator Standard lead magnet).

---

## Gotchas — read before you touch lead capture or deploy

### Lead capture can silently drop subscribers (incident — verify before trusting)

`api/subscribe.js` has a 3-tier provider fallback whose bottom tier is
**silent-succeed-and-drop**: if neither Beehiiv (`BEEHIIV_API_KEY` +
`BEEHIIV_PUBLICATION_ID`) nor Resend (`RESEND_API_KEY`) env vars are set in
Vercel, the endpoint returns `200 {success:true, provider:'none'}` and the email
is dropped to a `console.warn`. The form UX looks fine; the subscriber and the
PDF never arrive — the textbook "configured ≠ working" failure.

- Full write-up, verification steps, and fix paths: `INCIDENT-pdf-delivery-silent-fail.md`
  (flagged open 2026-05-26 — confirm the current Vercel env state before trusting the funnel).
- Verify empirically with a fresh **external** email (per the portfolio
  "configured ≠ working — empirical test before launch" rule), not by reading config.
- Hard fix when this code is next touched: replace the silent-succeed branch with
  a `503` (or a persistent dropped-lead queue) so a misconfigured/rotated key
  fails LOUDLY instead of silently dropping leads.

### Silent-success fallbacks are a class — sweep, don't spot-fix

The incident's class is "silent-success fallback in a lead-capture endpoint."
Any submit/capture endpoint here must surface provider failures explicitly
(structured error + log + user-facing message); never `return 200` on a dropped
write. Same observable-failure-mode rule as the portfolio CLAUDE.md.

---

## SEO: the editorial title is NOT the SERP title (added 2026-09-10)

Essays and guides carry long, deliberately editorial `title` and `description` frontmatter -
they are the on-page H1 and the card blurb, and they are *supposed* to read like his writing.
They are not SERP copy. Google trims a `<title>` past ~60 characters and a meta description
past ~158, and `Base.astro` appends `" · Vihren Labs"` (+15 chars) to every non-home title,
so before this pass **every one of the 22 content pages shipped a snippet Google cut mid-word
or rewrote**: descriptions ran 299-519 chars, rendered titles up to 93.

The fix is a decoupling, not a rewrite:

- `seoTitle` and `seoDescription` are OPTIONAL frontmatter on both collections. They feed
  ONLY `<title>`, `<meta name="description">` and `og:description`. The page keeps rendering
  `title`/`description` for the H1 and the listing cards, unchanged.
- **When `seoTitle` is set it is used verbatim with NO brand suffix** - on an informational
  query the brand name earns nothing and costs 15 of the ~60 characters shown.
- Omit either field and the page behaves exactly as it did before they existed.
- **The guard is the Zod `.max()` in `src/content/config.ts`** (60 / 165). An over-long value
  fails `npm run build`, not the SERP. Don't relax it; write a shorter line.

**Do not mechanically truncate a title to fit.** A dangling fragment ("...repeat from the",
"...look for in DORA and") reads worse in a SERP than a long title Google trims itself. If
there is no clean structural break, leave the field unset and write it by hand. Eight items
were deliberately left unset on that basis - `grep -L seoTitle src/content/*/*.md` finds them.

## Companion files
- `INCIDENT-pdf-delivery-silent-fail.md` — the lead-capture silent-drop incident
- `api/subscribe.js` — the lead-capture endpoint
- `~/Desktop/GENERAL MEMORY.txt` — global behaviour rules (L4)
- `~/Desktop/Personal OS/CLAUDE.md` — portfolio rules (L3)
