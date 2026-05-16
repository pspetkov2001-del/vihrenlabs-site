/**
 * POST /api/subscribe
 *
 * Adds a subscriber to Resend Audiences and sends a welcome email.
 *
 * Required env vars (set in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY        — from resend.com → API Keys
 *   RESEND_AUDIENCE_ID    — from resend.com → Audiences → your audience ID
 *   RESEND_FROM_EMAIL     — verified sending address, e.g. newsletter@vihrenlabs.com
 *                           (leave unset to use Resend's test address while verifying domain)
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
  <h1>You're in.</h1>
  <p>One essay a week from inside enterprise IT — SAP migrations, vendor procurement, EU regulatory compliance, master data. Concrete, vendor-side-honest, no buzzwords.</p>
  <p>First essay lands soon.</p>
  <hr class="divider" />
  <p class="sig">— Petko<br />Vihren Labs</p>
  <div class="footer">
    <p>You subscribed at <a href="https://vihrenlabs.com">vihrenlabs.com</a>.
    To unsubscribe, reply to this email with "unsubscribe" in the subject.</p>
  </div>
</div>
</body>
</html>`;

export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', 'https://vihrenlabs.com');
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Newsletter not yet configured — silently succeed in production
    // so the form UX isn't broken while env vars are being set up.
    console.warn('RESEND_API_KEY not set — subscriber not recorded:', email);
    return res.status(200).json({ success: true });
  }

  const resend = new Resend(apiKey);
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  try {
    // 1. Add to Resend Audiences (deduplicated — safe to call multiple times)
    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    }

    // 2. Send welcome email
    await resend.emails.send({
      from: `Petko @ Vihren Labs <${fromEmail}>`,
      to: email,
      subject: "You're on the list — Vihren Labs",
      html: WELCOME_HTML,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    // Surface Resend validation errors; hide internal details
    const msg = err?.message?.includes('Invalid') ? err.message : 'Something went wrong. Try again in a moment.';
    return res.status(500).json({ error: msg });
  }
}
