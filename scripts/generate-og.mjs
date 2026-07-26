/**
 * Generates public/og-image.png for vihrenlabs.com — the 1200x630 social
 * share card shown when the site is linked on LinkedIn/Slack/WhatsApp/etc.
 *
 * ── Why this file looks the way it does ──────────────────────────────────
 * On 2026-06-23, commit 8939088 replaced public/og-image.png with the current
 * on-brand card (dark blueprint background, Vihren peak mark, Hanken Grotesk
 * wordmark, mono capability line) — described in the commit message as
 * "rendered headless at 1:1". But the render source was never committed, and
 * THIS script was never updated to match: it still emitted the old plain
 * "Vihren"/"Labs" stacked-text design via sharp+hand-built SVG, with a stale
 * credential line that omitted AI governance entirely. The artifact and the
 * generator silently drifted apart for a month. Anyone who ran
 * `npm run generate:og` in that window would have regressed the live share
 * card back to the old design without any error or warning.
 *
 * This rewrite (2026-07-26) reverse-engineers the shipped PNG pixel-for-pixel
 * (background/text colours sampled with sharp, element bounding boxes
 * measured, fonts confirmed against src/layouts/Base.astro's Google Fonts
 * link) and renders it from the HTML/CSS template below via headless Chrome,
 * so the generator output matches what's actually live. It also carries the
 * two 2026-07-26 content updates: the capability row now leads with the two
 * front-door categories (D-060), and the em dash in the tagline is gone
 * (house de-AI style rule — no em dashes in customer-facing copy).
 *
 * THIS SCRIPT IS NOW THE SINGLE SOURCE OF TRUTH for og-image.png.
 * Regenerate it with `npm run generate:og` whenever the card's copy or
 * design needs to change. Never hand-edit the PNG directly — that's exactly
 * how the drift above happened. If you change the HTML/CSS template below,
 * re-run the script and visually diff the output against the previous
 * public/og-image.png before committing.
 *
 * Requires: sharp (devDependency, used only for the post-render dimension
 * check). Rendering itself drives Chrome/Edge over the DevTools protocol
 * using Node's built-in fetch + WebSocket — no puppeteer, no new deps.
 *
 * Run: node scripts/generate-og.mjs   (or  npm run generate:og)
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
const logoSvgPath = path.join(__dirname, '..', 'public', 'logo-mark.svg');

const W = 1200;
const H = 630;

// ── Content ─────────────────────────────────────────────────────────────
// Keep this in sync with the site's actual positioning. If the marketed
// front door or the tagline changes again, edit here and regenerate.

const EYEBROW_TEXT = 'OPERATOR-GRADE · ENTERPRISE IT';

// 2026-07-26 (D-060): capability row now leads with the two front-door
// categories — Master Data and AI-Ready Operations — ahead of the four
// adjacent/demoted lines. Was: "SAP · Master Data · AI Governance ·
// Procurement · DORA / EU AI Act".
const CAPABILITY_ROW = 'Master Data · AI-Ready Operations · SAP · Procurement · DORA / EU AI Act';

const DOMAIN_TEXT = 'vihrenlabs.com';

// 2026-07-26 (de-AI style rule): em dash removed. Was: "...enterprise IT
// stack — built from real scenarios, not consultant theory."
const TAGLINE_PRE = 'Operator-grade templates &amp; playbooks for the enterprise IT stack - built from real scenarios, ';
const TAGLINE_ACCENT = 'not consultant theory.';

// ── Template ────────────────────────────────────────────────────────────
// Fonts/weights copied from src/layouts/Base.astro's Google Fonts <link> so
// the card loads exactly what the live site loads (Hanken Grotesk 400/600/
// 700/800, JetBrains Mono 400/500/700; Inter ships too but is unused here).

const logoSvg = fs.readFileSync(logoSvgPath, 'utf8');

function buildHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; }
  body { overflow: hidden; }

  .card {
    position: relative;
    width: ${W}px;
    height: ${H}px;
    background: #080E14;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 128px 80px 63px 88px;
    font-family: 'Hanken Grotesk', sans-serif;
  }

  /* Faint warm radial glow, upper right — matches the site's --orange-glow token */
  .bg-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 780px 620px at 88% 6%, rgba(230, 126, 34, 0.16), rgba(230, 126, 34, 0) 60%);
  }

  /* Blueprint dot-grid texture — same values as .blueprint-pattern in Base.astro */
  .bg-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(51, 65, 85, 0.3) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .eyebrow-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .eyebrow-rule {
    width: 40px;
    height: 2px;
    background: #E67E22;
    display: block;
    flex-shrink: 0;
  }
  .eyebrow-text {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: 19px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #E67E22;
  }

  .brand-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 44px;
  }
  .brand-row svg {
    /* Explicit width+height (not width:auto/aspect-ratio — both proved to
       resolve inconsistently for this viewBox-only, no-width/height <svg>
       inside a flex row) to pin the on-screen box deterministically. */
    height: 138px;
    width: 112px;
    flex-shrink: 0;
    display: block;
  }
  .wordmark {
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 800;
    font-size: 118px;
    letter-spacing: -0.02em;
    line-height: 1;
    color: #FFFFFF;
    white-space: nowrap;
  }

  .tagline {
    position: relative;
    margin-top: 26px;
    max-width: 995px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 400;
    font-size: 40px;
    line-height: 1.38;
    color: #B4B8BA;
  }
  .tagline .accent {
    font-weight: 700;
    color: #E67E22;
  }

  .bottom-row {
    position: relative;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: auto;
    font-family: 'JetBrains Mono', monospace;
    gap: 24px;
  }
  .capabilities {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: #808488;
    white-space: nowrap;
  }
  .domain {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #F8FAFC;
    white-space: nowrap;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="bg-glow"></div>
    <div class="bg-dots"></div>

    <div class="eyebrow-row">
      <span class="eyebrow-rule"></span>
      <span class="eyebrow-text">${EYEBROW_TEXT}</span>
    </div>

    <div class="brand-row">
      ${logoSvg}
      <div class="wordmark">Vihren Labs</div>
    </div>

    <div class="tagline">${TAGLINE_PRE}<span class="accent">${TAGLINE_ACCENT}</span></div>

    <div class="bottom-row">
      <div class="capabilities">${CAPABILITY_ROW}</div>
      <div class="domain">${DOMAIN_TEXT}</div>
    </div>
  </div>
</body>
</html>`;
}

// ── Minimal DevTools-protocol driver (no puppeteer) ────────────────────
// Node 18+ ships global fetch and WebSocket, which is all CDP needs: launch
// Chrome/Edge headless with remote debugging, attach to a fresh page target
// over the flattened session protocol, navigate to a data: URL of the
// template above, wait for document.fonts.ready (with explicit font.load()
// calls first so loading is force-triggered rather than relying on layout
// timing), then screenshot at an exact 1200x630 / deviceScaleFactor 1.

function findBrowserExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    'No Chrome/Edge executable found. Checked: ' + candidates.join(', ') +
    '. Set CHROME_PATH to override.'
  );
}

class CdpClient {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.eventListeners = new Map(); // method -> Set<fn>
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data.toString());
      if (msg.id !== undefined && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method) {
        const listeners = this.eventListeners.get(msg.method);
        if (listeners) for (const fn of listeners) fn(msg.params);
      }
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }

  once(method, predicate = () => true) {
    return new Promise((resolve) => {
      const fn = (params) => {
        if (predicate(params)) {
          this.eventListeners.get(method).delete(fn);
          resolve(params);
        }
      };
      if (!this.eventListeners.has(method)) this.eventListeners.set(method, new Set());
      this.eventListeners.get(method).add(fn);
    });
  }
}

// On Windows, the chrome.exe process spawn() attaches to is not reliably the
// long-lived browser process (Chrome's own process/updater handoff means the
// launching PID can exit with code 0 almost immediately while the real
// browser keeps running). So instead of reading "DevTools listening on..."
// from that process's stderr, launch on a fixed known port and poll the
// HTTP endpoint until it answers — the same thing curl-after-sleep confirmed
// works reliably in this environment.
async function waitForDevToolsHttp(port, timeoutMs = 15000, intervalMs = 150) {
  const deadline = Date.now() + timeoutMs;
  let lastErr;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return res.json();
    } catch (err) {
      lastErr = err;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Timed out waiting for Chrome DevTools on port ${port}: ${lastErr}`);
}

async function renderOgImage() {
  const exe = findBrowserExecutable();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vihrenlabs-og-'));
  const port = 20000 + Math.floor(Math.random() * 20000);

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${port}`,
    `--window-size=${W},${H}`,
    `--user-data-dir=${userDataDir}`,
    'about:blank',
  ];

  const child = spawn(exe, args, { stdio: 'ignore', detached: true });
  child.unref();

  let cdp, browserWs;
  try {
    const versionInfo = await waitForDevToolsHttp(port);
    browserWs = new WebSocket(versionInfo.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      browserWs.addEventListener('open', resolve, { once: true });
      browserWs.addEventListener('error', reject, { once: true });
    });

    cdp = new CdpClient(browserWs);

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);

    const html = buildHtml();
    const dataUrl = 'data:text/html;charset=utf-8;base64,' + Buffer.from(html, 'utf8').toString('base64');

    const loadEvent = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url: dataUrl }, sessionId);
    await loadEvent;

    // Force-trigger the exact font/weight combinations used on the card,
    // then wait for the FontFaceSet to settle, plus a small paint-safety
    // margin. This is more reliable than trusting layout-driven font
    // loading to have started by the time `load` fires.
    const fontsReadyResult = await cdp.send('Runtime.evaluate', {
      expression: `
        (async () => {
          await Promise.all([
            document.fonts.load('800 118px "Hanken Grotesk"'),
            document.fonts.load('400 40px "Hanken Grotesk"'),
            document.fonts.load('700 40px "Hanken Grotesk"'),
            document.fonts.load('700 19px "JetBrains Mono"'),
            document.fonts.load('400 18px "JetBrains Mono"'),
          ]);
          await document.fonts.ready;
          await new Promise((r) => setTimeout(r, 300));
          return { fontsLoaded: [...document.fonts].map(f => f.family + ' ' + f.weight + ' ' + f.status) };
        })()
      `,
      awaitPromise: true,
      returnByValue: true,
    }, sessionId);

    if (fontsReadyResult?.exceptionDetails) {
      throw new Error('Font-loading evaluate failed: ' + JSON.stringify(fontsReadyResult.exceptionDetails));
    }

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: W,
      height: H,
      deviceScaleFactor: 1,
      mobile: false,
    }, sessionId);

    const { data: base64Png } = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: W, height: H, scale: 1 },
      captureBeyondViewport: false,
    }, sessionId);

    fs.writeFileSync(outPath, Buffer.from(base64Png, 'base64'));

    return fontsReadyResult?.result?.value?.fontsLoaded ?? [];
  } finally {
    // Ask Chrome to shut itself down over the protocol rather than relying on
    // OS process-killing: on Windows the PID spawn() returns is frequently
    // not the real long-lived browser process (see comment above
    // waitForDevToolsHttp), so `child.kill()` alone can leave a headless
    // instance running. Browser.close is the graceful, topology-independent
    // shutdown — this NEVER touches any Chrome window/profile the user has
    // open, since it only holds a handle to the one instance we launched
    // against a throwaway --user-data-dir on our own debugging port.
    if (cdp) {
      try { await cdp.send('Browser.close'); } catch { /* best effort */ }
    }
    if (browserWs) {
      try { browserWs.close(); } catch { /* best effort */ }
    }
    try { child.kill(); } catch { /* best effort, likely already gone */ }
    // Give the process a beat to release its lock on userDataDir before we
    // try to delete it.
    await new Promise((r) => setTimeout(r, 400));
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      // Non-fatal: a leftover temp profile dir under os.tmpdir() is harmless.
    }
  }
}

try {
  const fontsLoaded = await renderOgImage();

  const meta = await sharp(outPath).metadata();
  if (meta.width !== W || meta.height !== H) {
    throw new Error(`Output is ${meta.width}x${meta.height}, expected ${W}x${H}`);
  }

  console.log(`og-image.png generated -> ${outPath} (${meta.width}x${meta.height})`);
  const notLoaded = fontsLoaded.filter((f) => !f.includes('loaded'));
  if (notLoaded.length) {
    console.warn('WARNING: some font faces did not report status "loaded":', notLoaded);
  } else {
    console.log(`Confirmed ${fontsLoaded.length} font face(s) loaded before capture.`);
  }
} catch (err) {
  console.error('Failed to generate og-image.png:', err);
  console.error(
    'If Chrome failed to become reachable, check Task Manager for an orphaned ' +
    'chrome.exe using a --user-data-dir under your temp folder matching ' +
    '"vihrenlabs-og-*" and end it manually — Browser.close() (the normal ' +
    'cleanup path) never got a connection to send it over.'
  );
  process.exit(1);
}
