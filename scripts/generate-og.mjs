/**
 * Generates public/og-image.png for vihrenlabs.com
 * Run: node scripts/generate-og.mjs
 * Requires: sharp (devDependency)
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glowOrange" cx="15%" cy="55%" r="55%">
      <stop offset="0%" stop-color="#E67E22" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#E67E22" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowNavy" cx="85%" cy="25%" r="55%">
      <stop offset="0%" stop-color="#1E3D59" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#1E3D59" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D1822"/>
      <stop offset="100%" stop-color="#080E14"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>
  <rect width="${W}" height="${H}" fill="url(#glowNavy)"/>
  <rect width="${W}" height="${H}" fill="url(#glowOrange)"/>

  <!-- Subtle grid lines -->
  <g opacity="0.03" stroke="white" stroke-width="1">
    <line x1="0" y1="210" x2="${W}" y2="210"/>
    <line x1="0" y1="420" x2="${W}" y2="420"/>
    <line x1="400" y1="0" x2="400" y2="${H}"/>
    <line x1="800" y1="0" x2="800" y2="${H}"/>
  </g>

  <!-- Orange logo box -->
  <rect x="80" y="76" width="68" height="68" rx="12" fill="#E67E22"/>
  <text x="114" y="126" text-anchor="middle"
        font-family="Arial Black, Arial, sans-serif"
        font-weight="900" font-size="38" fill="white">V</text>

  <!-- Brand name -->
  <text x="80" y="252"
        font-family="Arial Black, Arial, sans-serif"
        font-weight="900" font-size="104" fill="white"
        letter-spacing="-3">Vihren</text>

  <text x="80" y="368"
        font-family="Arial Black, Arial, sans-serif"
        font-weight="900" font-size="104" fill="white"
        letter-spacing="-3">Labs</text>

  <!-- Tagline -->
  <text x="80" y="442"
        font-family="Segoe UI, Arial, sans-serif"
        font-size="28" fill="rgba(255,255,255,0.45)"
        letter-spacing="0.3">Operator-grade templates for the enterprise IT stack</text>

  <!-- Divider -->
  <rect x="80" y="480" width="100" height="3" rx="1.5" fill="#E67E22"/>

  <!-- Bottom credential line -->
  <text x="80" y="560"
        font-family="Courier New, monospace"
        font-size="18" fill="rgba(255,255,255,0.25)"
        letter-spacing="2">PROCUREMENT · SAP · REGULATORY · MDM · TRANSFORMATION</text>

  <!-- Right-side monogram watermark -->
  <text x="1070" y="580"
        text-anchor="end"
        font-family="Arial Black, Arial, sans-serif"
        font-weight="900" font-size="160" fill="rgba(30,61,89,0.35)"
        letter-spacing="-4">VL</text>
</svg>`;

try {
  await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outPath);
  console.log(`✓  og-image.png generated → ${outPath}`);
} catch (err) {
  console.error('✗  Failed to generate og-image.png:', err.message);
  process.exit(1);
}
