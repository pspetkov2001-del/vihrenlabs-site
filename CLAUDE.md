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

## Companion files
- `INCIDENT-pdf-delivery-silent-fail.md` — the lead-capture silent-drop incident
- `api/subscribe.js` — the lead-capture endpoint
- `~/Desktop/GENERAL MEMORY.txt` — global behaviour rules (L4)
- `~/Desktop/Personal OS/CLAUDE.md` — portfolio rules (L3)
