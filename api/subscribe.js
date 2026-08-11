/**
 * POST /api/subscribe
 *
 * Adds a subscriber to The Operator Brief newsletter and triggers
 * welcome email (which delivers the free Operator Standard PDF).
 *
 * Provider routing — preferred → fallback → LOUD failure:
 *   1. If BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID set → use Beehiiv
 *      (canonical per D-023; Beehiiv welcome sequence W1 delivers the PDF).
 *   2. Else if RESEND_API_KEY set → use Resend (legacy interim).
 *   3. Else → 503. A missing/rotated provider config must FAIL LOUDLY —
 *      the previous silent-succeed branch dropped every subscriber while
 *      the form showed success (INCIDENT-pdf-delivery-silent-fail.md,
 *      confirmed live 2026-08-07). Never return 200 on a dropped write.
 *
 * --- BEEHIIV SETUP (canonical, D-023) ---
 * Required env vars in Vercel → Settings → Environment Variables:
 *   BEEHIIV_API_KEY           — beehiiv.com → Settings → Integrations → API → create key
 *   BEEHIIV_PUBLICATION_ID    — Settings → Publication → ID at top, format pub_xxxxxxxx
 *
 * The PDF delivery happens via Beehiiv's welcome sequence (configured in the
 * Beehiiv UI per docs/beehiiv-setup-spec.md §Step 4 W1 email). This endpoint
 * just creates the subscription; Beehiiv handles email.
 *
 * --- RESEND SETUP (legacy fallback only) ---
 *   RESEND_API_KEY            — resend.com → API Keys
 *   RESEND_AUDIENCE_ID        — resend.com → Audiences → your audience ID
 *   RESEND_FROM_EMAIL         — verified sending address
 */

import { Resend } from 'resend';

const WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>You're in.</title>
<style>
  body{margin:0;padding:0;background:#080E14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ffffff}
  .wrap{max-width:560px;margin:0 auto;padding:48px 24px}
  .logo{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:#E67E22;border-radius:8px;font-weight:900;font-size:20px;color:#fff;margin-bottom:32px}
  h1{font-size:32px;font-weight:900;margin:0 0 20px;letter-spacing:-0.5px}
  p{color:rgba(255,255,255,0.55);font-size:16px;line-height:1.7;margin:0 0 16px}
  .cta{display:inline-block;background:#E67E22;color:#fff;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;margin:16px 0 8px}
  .divider{width:60px;height:3px;background:#E67E22;border:none;margin:32px 0}
  .sig{color:rgba(255,255,255,0.7);font-size:15px}
  .footer{margin-top:48px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06)}
  .footer p{font-size:12px;color:rgba(255,255,255,0.2);margin:0}
  a{color:#E67E22}
</style>
</head>
<body>
<div class="wrap">
  <div class="logo">V</div>
  <h1>You're in. Here's the Standard.</h1>
  <p>The Vihren Labs Operator Standard - 7 principles for running enterprise IT without the consulting-industry fluff. The creed every product here is held to.</p>
  <a class="cta" href="https://vihrenlabs.gumroad.com/l/bwzklq">Hold the Standard &rarr;</a>
  <p style="margin-top:24px">Then: one operator essay a week.</p>
  <p>First essay lands soon.</p>
  <hr class="divider" />
  <p class="sig">— Petko<br />Vihren Labs</p>
  <div class="footer">
    <p>You subscribed at <a href="https://www.vihrenlabs.com">vihrenlabs.com</a>.
    To unsubscribe, reply to this email with "unsubscribe" in the subject.</p>
  </div>
</div>
</body>
</html>`;

// Optional line/source dimension so a subscribe can be attributed to the
// originating product line (e.g. a future signup form on /lines/master-data
// passing line: 'master-data'). Sanitized to a short lowercase slug so it is
// safe to forward to Beehiiv as a UTM value regardless of what a caller sends;
// callers that omit it (all current callers) get the previous, unchanged
// behaviour via DEFAULT_LINE.
const DEFAULT_LINE = 'general';
const LINE_PATTERN = /^[a-z0-9-]{1,40}$/;
function sanitizeLine(raw) {
  const val = (raw ?? '').toString().trim().toLowerCase();
  return LINE_PATTERN.test(val) ? val : DEFAULT_LINE;
}

async function subscribeViaBeehiiv(email, apiKey, publicationId, line) {
  // Beehiiv Subscriptions API — https://developers.beehiiv.com/api-reference/subscriptions/create
  // Creates OR reactivates; welcome email + welcome sequence W1 (which links the PDF)
  // are configured in the Beehiiv UI per docs/beehiiv-setup-spec.md.
  const resp = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'vihrenlabs.com',
        utm_medium: 'landing-page',
        utm_campaign: 'operator-standard-leadmagnet',
        // Line/source dimension - which product line (or 'general') the
        // subscribe originated from. See sanitizeLine() above.
        utm_content: line,
      }),
    }
  );

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Beehiiv ${resp.status}: ${text.slice(0, 200)}`);
  }
  return resp.json();
}

async function subscribeViaResend(email, apiKey) {
  // Legacy path — kept as fallback until Beehiiv env vars land in Vercel.
  const resend = new Resend(apiKey);
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (audienceId) {
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
  }

  await resend.emails.send({
    from: `Petko @ Vihren Labs <${fromEmail}>`,
    to: email,
    subject: "You're on the list — Vihren Labs",
    html: WELCOME_HTML,
  });
}

export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', 'https://www.vihrenlabs.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Parse body (Vercel auto-parses JSON when Content-Type: application/json)
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid request.' }); }
  }

  const email = (body?.email ?? '').toString().trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Optional: which product line this subscribe came from. Unrecognised/absent
  // values fall back to 'general' - see sanitizeLine().
  const line = sanitizeLine(body?.line);

  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPub = process.env.BEEHIIV_PUBLICATION_ID;
  const resendKey = process.env.RESEND_API_KEY;

  try {
    // Provider priority: Beehiiv (canonical) → Resend (legacy) → 503.
    if (beehiivKey && beehiivPub) {
      await subscribeViaBeehiiv(email, beehiivKey, beehiivPub, line);
      return res.status(200).json({ success: true, provider: 'beehiiv' });
    }

    if (resendKey) {
      await subscribeViaResend(email, resendKey);
      return res.status(200).json({ success: true, provider: 'resend' });
    }

    // No provider configured — FAIL LOUDLY. The silent-succeed branch that
    // used to live here dropped every subscriber behind a success message
    // (INCIDENT-pdf-delivery-silent-fail.md, confirmed live 2026-08-07).
    // The 503 surfaces the outage to the visitor AND to the founder via
    // function logs; the form shows this error and re-enables the button.
    console.error('SUBSCRIBE OUTAGE: no newsletter provider configured (BEEHIIV_API_KEY+BEEHIIV_PUBLICATION_ID or RESEND_API_KEY) — rejecting subscribe for:', email);
    return res.status(503).json({
      error: 'Subscriptions are temporarily down. Email hello@vihrenlabs.com and we will send the PDF directly.',
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    // Surface validation errors; hide internal details
    const msg = err?.message?.includes('Invalid') || err?.message?.includes('Beehiiv 4')
      ? err.message
      : 'Something went wrong. Try again in a moment.';
    return res.status(500).json({ error: msg });
  }
}
