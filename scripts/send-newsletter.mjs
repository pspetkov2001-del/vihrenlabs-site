/**
 * Send a newsletter to all Resend Audience subscribers.
 *
 * Usage:
 *   node scripts/send-newsletter.mjs --subject "Your subject" --file essays/my-essay.html
 *
 * Or with inline HTML:
 *   node scripts/send-newsletter.mjs --subject "Your subject" --html "<p>Hello</p>"
 *
 * Required env vars (can use a local .env file — see below):
 *   RESEND_API_KEY
 *   RESEND_AUDIENCE_ID
 *   RESEND_FROM_EMAIL   (e.g. newsletter@vihrenlabs.com)
 *
 * .env setup (local only — never commit .env):
 *   cp .env.example .env  and fill in your values
 *
 * DRY RUN (preview without sending):
 *   DRY_RUN=1 node scripts/send-newsletter.mjs --subject "Test" --file essays/draft.html
 */

import { Resend } from 'resend';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// --- Load .env if present (simple key=value parsing, no dotenv dep needed) ---
const envPath = resolve(process.cwd(), '.env');
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

// --- Parse CLI args ---
const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };

const subject   = get('--subject');
const filePath  = get('--file');
const inlineHtml = get('--html');
const isDryRun  = process.env.DRY_RUN === '1';

if (!subject) {
  console.error('Error: --subject is required.\n  Example: node scripts/send-newsletter.mjs --subject "Your subject" --file essays/my-essay.html');
  process.exit(1);
}
if (!filePath && !inlineHtml) {
  console.error('Error: provide --file <path> or --html "<html>"');
  process.exit(1);
}

let html;
if (filePath) {
  const abs = resolve(process.cwd(), filePath);
  if (!existsSync(abs)) { console.error(`File not found: ${abs}`); process.exit(1); }
  html = readFileSync(abs, 'utf8');
} else {
  html = inlineHtml;
}

// --- Validate env ---
const apiKey     = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;
const fromEmail  = process.env.RESEND_FROM_EMAIL;

if (!apiKey)     { console.error('Missing RESEND_API_KEY'); process.exit(1); }
if (!audienceId) { console.error('Missing RESEND_AUDIENCE_ID'); process.exit(1); }
if (!fromEmail)  { console.error('Missing RESEND_FROM_EMAIL'); process.exit(1); }

// --- Fetch subscriber count for preview ---
const resend = new Resend(apiKey);

console.log('\n─────────────────────────────────────');
console.log('  Vihren Labs · Newsletter Broadcast');
console.log('─────────────────────────────────────');
console.log(`  Subject  : ${subject}`);
console.log(`  From     : Petko @ Vihren Labs <${fromEmail}>`);
console.log(`  Audience : ${audienceId}`);
if (isDryRun) console.log('\n  ⚠  DRY RUN — no emails will be sent\n');

if (isDryRun) {
  console.log('HTML preview (first 500 chars):');
  console.log(html.slice(0, 500) + (html.length > 500 ? '…' : ''));
  console.log('\n✓  Dry run complete. Set DRY_RUN=0 or unset to send for real.');
  process.exit(0);
}

// --- Confirm before sending ---
const { createInterface } = await import('readline');
const rl = createInterface({ input: process.stdin, output: process.stdout });
const answer = await new Promise(resolve => rl.question('\nType "send" to broadcast, anything else to abort: ', resolve));
rl.close();

if (answer.trim().toLowerCase() !== 'send') {
  console.log('Aborted.');
  process.exit(0);
}

// --- Send broadcast via Resend ---
try {
  const broadcast = await resend.broadcasts.create({
    audienceId,
    from: `Petko @ Vihren Labs <${fromEmail}>`,
    subject,
    html,
  });

  await resend.broadcasts.send(broadcast.data.id);

  console.log(`\n✓  Broadcast sent! ID: ${broadcast.data.id}`);
  console.log('  Check resend.com → Broadcasts for delivery stats.');
} catch (err) {
  console.error('\n✗  Send failed:', err.message);
  process.exit(1);
}
