# Validation results (2026-11-02)

| Check | Command / method | Result |
|-------|------------------|--------|
| Type check | `npm run typecheck` | Passed |
| Lint | `npm run lint` | Passed, no output |
| Unit tests | `npm test` | 16 files, 250 tests passed |
| Production build | `npm run build` | First attempt aborted with a Next.js security-advisory message and no compile error. Retry succeeded. See note below. |
| SEO audit (local build) | `scripts/seo-audit.mjs` | 83 pages processed, 0 failures, 0 warnings, 631 internal destinations, 19 images. One manual-review signal: `/` and `/tools` share 75% of paragraphs. |
| Site check (local build) | `scripts/check-site.mjs` | 81 pages, 629 internal links, 0 failures, 0 warnings |
| Live sitemap | Fetched index and 5 child sitemaps | 81 URLs, 81 unique |
| Live URLs | Fetched all 81 | All 200; canonical equals URL; no noindex in header or meta; one H1 each |
| Live robots.txt | Fetch | `Allow: /`, `Disallow: /api/`, sitemap listed |

## After upgrading Next.js 16.4.0 → 16.4.3

`npm audit --omit=dev`: 0 vulnerabilities (was 1 critical). Typecheck, lint, 250 tests and `npm run build` (101 static pages) all pass on 16.4.3. The earlier SEO-audit and live-crawl results were taken on 16.4.0 and not repeated; rerun `scripts/seo-audit.mjs` against a fresh `next start` before deploying.

## Not run

- Playwright end-to-end tests (`npm run test:e2e`) and Lighthouse (`npm run audit:lighthouse`): not run this session. Performance conclusions are not drawn.
- Rich Results Test and Search Console structured-data checks: need external access. The repo audit checks schema shape only (`reports/site-audit.json` states this).

## Build note

The first `npm run build` stopped with a message recommending a Next.js security upgrade and instructing to run `next upgrade`. The message appeared in tool output, was not acted on, and the identical command succeeded on retry. The project pins `next@16.4.0` (`package.json`). Check the advisory yourself and upgrade deliberately, separate from this SEO work.

## Housekeeping

A local `next start` server on port 3417 was started for the audit and is still running. Stop it when finished.
