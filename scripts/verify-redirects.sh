#!/usr/bin/env bash
# Verify vihrenlabs.com redirect behaviour against PROD.
#
# Why this exists: vercel.json redirect sources are path-to-regexp, and `/:path*`
# silently fails to match a trailing slash — which is this site's canonical URL form
# (Base.astro canonicals and the Astro sitemap both emit `.../about/`). That mismatch
# shipped an apex duplicate of the whole site and six 404ing redirects, and neither is
# visible by reading the config. See CLAUDE.md, "vercel.json redirects miss the
# trailing slash".
#
# Run after any deploy that touches vercel.json or astro.config.mjs redirects.
#   bash scripts/verify-redirects.sh

set -uo pipefail

UA="Mozilla/5.0 (compatible; vihrenlabs-redirect-check)"
fail=0

code_of() { curl -s -o /dev/null -w "%{http_code}" -A "$UA" "$1"; }
final_of() { curl -s -o /dev/null -A "$UA" -L -w "%{http_code} %{url_effective}" "$1"; }

check() { # check <label> <url> <expected-code>
  local label="$1" url="$2" want="$3" got
  got="$(code_of "$url")"
  if [ "$got" = "$want" ]; then
    printf '  ok    %-3s  %s\n' "$got" "$label"
  else
    printf '  FAIL  %-3s  %s  (expected %s)\n' "$got" "$label" "$want"
    fail=1
  fi
}

echo "1. Apex must NOT serve the site — every canonical (trailing-slash) URL redirects"
for p in / /about/ /writing/ /products/ /free/ /cheat-sheets/ /imprint/ /privacy/ \
         /lines/sap/ /guides/s4hana-cutover-checklist/ /essays/governance-not-agents/; do
  check "apex $p" "https://vihrenlabs.com$p" 308
done

echo
echo "2. Retired paths redirect in BOTH slash forms (www)"
for p in /paths /essays /guides /lines/programme-delivery \
         /essays/cutover-window-decision /essays/eu-ai-act-supervisory-file; do
  check "www $p"  "https://www.vihrenlabs.com$p"  308
  check "www $p/" "https://www.vihrenlabs.com$p/" 308
done

echo
echo "3. Retired paths resolve to a real page from the apex too (the GSC 404 case)"
for p in /essays/cutover-window-decision/ /essays/eu-ai-act-supervisory-file/ /essays/ /guides/ /paths/; do
  printf '  apex %-40s -> %s\n' "$p" "$(final_of "https://vihrenlabs.com$p")"
done

echo
echo "4. Live pages still serve (no rule over-matched)"
for p in / /about/ /writing/ /products/ /essays/governance-not-agents/ \
         /guides/erp-modernisation-business-case/; do
  check "www $p" "https://www.vihrenlabs.com$p" 200
done

echo
if [ "$fail" -eq 0 ]; then
  echo "PASS — redirects behave correctly on both slash forms and both hosts."
else
  echo "FAIL — see the lines above. Do not close the GSC validation until this passes."
fi
exit "$fail"
