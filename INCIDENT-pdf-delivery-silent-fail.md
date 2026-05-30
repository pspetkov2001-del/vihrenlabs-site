# INCIDENT — Vihren Labs PDF delivery silently failing

**Date opened:** 2026-05-26
**Reported by:** Founder (self-test on production site)
**Severity:** HIGH — silently dropping leads at the trust-stack's primary lead-magnet surface
**Status:** open

---

## What founder experienced

> "'get the pdf' in vihren lab → entered my email, nothing happened."

Form submitted. UI presumably showed a success state (or no failure). No PDF link arrived in email.

## Root cause (confirmed by reading `api/subscribe.js`)

The `/api/subscribe` endpoint has a **3-tier provider fallback** with the bottom tier being **silent-succeed-and-drop**:

```js
// Provider priority: Beehiiv (canonical) → Resend (legacy) → silent succeed.
if (beehiivKey && beehiivPub) {
  await subscribeViaBeehiiv(email, beehiivKey, beehiivPub);
  return res.status(200).json({ success: true, provider: 'beehiiv' });
}

if (resendKey) {
  await subscribeViaResend(email, resendKey);
  return res.status(200).json({ success: true, provider: 'resend' });
}

// Neither provider configured — silently succeed so the form UX isn't
// broken during initial setup. Subscriber is logged but not recorded.
console.warn('No newsletter provider configured (BEEHIIV_API_KEY or RESEND_API_KEY) — subscriber dropped:', email);
return res.status(200).json({ success: true, provider: 'none' });
```

**Most likely state:** Neither `BEEHIIV_API_KEY`+`BEEHIIV_PUBLICATION_ID` nor `RESEND_API_KEY` env vars are set in Vercel production. The endpoint returns 200 ("success"), the form UI succeeds, and the email is dropped to a `console.warn` in Vercel logs.

This is the textbook **"configured ≠ working"** failure (per Personal OS CLAUDE.md rule). The form is *configured* (looks fine, returns 200) but is *not working* (no subscription, no PDF, lead lost).

## Verification steps (founder, ~5 min)

1. **Open Vercel → vihrenlabs-site → Settings → Environment Variables.** Confirm what's present.
2. Possible findings:
   - **Nothing configured** → that's the bug. See "Fix paths" below.
   - **BEEHIIV_* set** → check Vercel function logs for any `Beehiiv 4xx` errors — Beehiiv key may be invalid or publication ID wrong. Also confirm the Welcome Sequence W1 email is actually configured in Beehiiv UI to attach the PDF (per `Spreadsheet OS Collection/docs/beehiiv-setup-spec.md` §Step 4).
   - **RESEND_* set** → check Vercel function logs for Resend errors + check Resend dashboard for any sends to your test email. If sent, check spam.
3. **Vercel → vihrenlabs-site → Deployments → latest → Functions tab → `/api/subscribe` → Logs.** Look for the `console.warn('No newsletter provider configured...')` line with your test email. That's the smoking gun.

## Fix paths (pick one)

### Path A — Stand up Beehiiv (canonical per D-023)
1. Create Beehiiv account if not done. Per `Spreadsheet OS Collection/docs/beehiiv-setup-spec.md`.
2. Beehiiv → Settings → Integrations → API → create API key.
3. Beehiiv → Settings → Publication → copy publication ID (`pub_xxxxxxxx` format).
4. Set up Welcome Sequence W1 in Beehiiv UI per the spec — email body must include the PDF download link (Gumroad URL: `https://vihrenlabs.gumroad.com/l/bwzklq`).
5. Vercel → vihrenlabs-site → Settings → Environment Variables → add:
   - `BEEHIIV_API_KEY` = (the key)
   - `BEEHIIV_PUBLICATION_ID` = (the ID, `pub_xxxxxxxx`)
6. Redeploy (Vercel auto-redeploys on env-var change).
7. Verify with a fresh email address — should receive welcome + PDF link within ~1-2 min.

### Path B — Stand up Resend (faster interim)
1. resend.com → API Keys → create.
2. (Optional) resend.com → Audiences → create + copy audience ID.
3. Verify your sending domain in Resend (DNS records for SPF + DKIM + DMARC).
4. Vercel → vihrenlabs-site → Settings → Environment Variables → add:
   - `RESEND_API_KEY` = (the key)
   - `RESEND_AUDIENCE_ID` = (audience ID, optional)
   - `RESEND_FROM_EMAIL` = `petko@vihrenlabs.com` (or verified address)
5. Redeploy.
6. Verify with a fresh email address — should receive the inline `WELCOME_HTML` email from subscribe.js within seconds.

### Path C — Both (canonical + safety net)
Same as Path A, plus Path B Resend env vars as the fallback if Beehiiv ever 5xx's.

## Hard-fix recommendation (after immediate verification)

The current "silent-succeed-and-drop" branch is a **landmine** — any future env var rotation that goes wrong (typo, expired key, account suspension) will silently drop leads instead of surfacing an error. Recommended code change for the next deployment:

Replace the silent-succeed branch with **either**:
- A 503 response — "Newsletter provider not configured. Email us at hello@vihrenlabs.com." (surfaces failure to UI + founder learns of misconfig immediately) — **OR**
- A `prepare_to_log_and_retry()` pattern that writes the dropped email to a persistent log/queue (Vercel KV / Upstash / a database row) so leads aren't permanently lost during outages.

The current pattern was chosen for "form UX not broken during setup" — but setup is over; production should fail loudly when provider config is missing.

## Strategy implications

This bug **affects the Standout Strategy v1 plan** directly:
- The 6 LinkedIn essays scheduled for May 27 – Jun 9 will drive traffic to vihrenlabs.com.
- A non-trivial fraction of essay readers will follow the "Get the Operator Standard PDF" CTA.
- With the current bug, **every one of those leads is silently dropped.**
- The 2026-06-09 cross-portfolio falsification gate cannot fairly measure essay performance with a broken capture flow.

**The bug should be fixed BEFORE Essay 1 ships on Wed May 27.** Path B (Resend) is fastest if Beehiiv setup isn't ready.

## Cross-references

- Endpoint source: `vihrenlabs-site/api/subscribe.js`
- Beehiiv setup spec: `Spreadsheet OS Collection/docs/beehiiv-setup-spec.md`
- Convertkit welcome sequence (alternate provider doc): `Spreadsheet OS Collection/docs/convertkit-welcome-sequence.md`
- Personal OS rule violated: `Personal OS/CLAUDE.md` — "Infrastructure: configured ≠ working" + observable-failure-modes at every boundary
- Strategy plan that depends on this working: `~/.claude/plans/create-a-specific-folder-nifty-ladybug.md` ("Standout Strategy" / Move 2.1)
- Essay 1 posting schedule (gated on this fix): `Spreadsheet OS Collection/inbox/wed-may-27-essay-1-ready-to-paste.md`

## Acknowledgement

Per Personal OS founder-report 4-step protocol: fix the bug → name the class → sweep siblings → report back. The CLASS here is "silent-success-fallback patterns in lead-capture endpoints." Worth sweeping any other lead-capture flows (Hintly /signup? MDM Engine /demo? Etsy → ConvertKit?) for the same anti-pattern.
