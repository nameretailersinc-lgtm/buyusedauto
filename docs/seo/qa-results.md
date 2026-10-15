# Global SEO upgrade QA results

## Phase 1 baseline — 2026-10-15

Source: `fa3895c5800f3024d4be415f3f7ba3781d0c54a7`; branch `seo-global-upgrade`. These results precede application changes.

| Command | Actual result |
| --- | --- |
| `npm ci --cache .npm-cache --prefer-offline --no-audit --no-fund` | Failed: Windows EPERM/ENOTEMPTY dependency directory errors; interrupted first attempt |
| `npm install --ignore-scripts --cache .npm-cache --prefer-offline --no-audit --no-fund --package-lock=false` | Exit 0; added 605 packages; optional-package cleanup warning |
| `npm run lint` | Exit 0; no ESLint errors |
| `npm test` | Exit 0; 3 test files, 47 tests passed; reported duration 1.57 s |
| `npm run build` | Exit 0; compiled successfully, TypeScript passed, generated 47/47 static build entries (includes infrastructure routes, not 47 content pages) |
| `npm run typecheck` | Exit 0 |

`TEST_BASE_URL=http://127.0.0.1:3100 npm run test:e2e` (environment set with PowerShell): exit 0; all 16 Playwright tests passed in 1.1 minutes. Coverage includes every original calculator's rendering and numeric validation, loan URL restoration/comparison/CSV, fuel conversion, checklist restoration/reset/printing, tax resource selection, navigation, no-JavaScript content, consent, responsive behavior, dark theme and axe accessibility checks. The axe checks reported no violations for their selected WCAG tags on the representative templates tested. These assertions establish a regression baseline, not a complete formula review.

Local production server: `http://127.0.0.1:3100`, launched with `npm run start -- --hostname 127.0.0.1 --port 3100`; ready in 308 ms. Next emitted a standalone-output warning recommending the standalone server entrypoint. These local command timings are observations, not production performance claims.

Existing browser tests captured screenshots at 1440 and 390 px. Required 360/768/1280 screenshots remain pending; these existing captures do not satisfy that requirement. `git diff --check` passed before the baseline commit.

Fresh Lighthouse, full link/sitemap/robots/canonical/hreflang checks, structured-data validation and responsive screenshots are pending the audit phase. Historical reports are not presented as current results. The browser suite includes accessibility assertions; this baseline does not constitute a complete WCAG audit.

## Phase 2 audit — 2026-10-15

Application code unchanged. `TEST_BASE_URL=http://127.0.0.1:3100 SEO_AUDIT_OUTPUT=reports/seo-global-baseline.json npm run audit:seo` (PowerShell environment assignments): summary reports 37 content pages, 34 canonical sitemap URLs, 148 internal destinations and eight editorial images; no failures, warnings or duplicate-paragraph signals. The command also checks canonical/H1/metadata, robots, grouped sitemap membership, redirect/404 safeguards and parsed schema semantics. Hosted structured-data validation and actual search indexing remain unverified. No hreflang is expected until genuine localized equivalents exist.

`TEST_BASE_URL=http://127.0.0.1:3100 npm run audit:lighthouse`: initial sandbox attempt exited 1 with Chromium debugging ECONNRESET. Retry outside sandbox exited 0. Fresh mobile simulated-throttling scores for home, loan and inspection guide are each performance 95, accessibility 100, best practices 100, SEO 100. LCP respectively 2876.94 / 2910.50 / 2809.91 ms; CLS zero on all three; TBT 73.5 / 61 / 66.82 ms. Evidence: `reports/lighthouse-summary.json`; exact observations and caveats in `technical-audit.md`. This is a single lab run per template, not field CWV or measured INP.

The keyword CSV and map are planning artifacts with UNVERIFIED metrics. Country-database exports are unavailable; public sources support terminology discovery only. No demand, keyword difficulty or CPC values were invented. Application build/lint/unit/browser results from Phase 1 remain the code baseline because no application changes occurred in this phase.

Responsive production captures completed for home, loan and inspection guide at each of 360/768/1280 px (nine PNG files in `reports/seo-baseline/screenshots/`). All nine requests returned 200 and no horizontal document overflow was detected. Machine observations are saved in `reports/seo-baseline/responsive.json`; screenshots alone do not establish full manual visual/accessibility conformance. The successful Lighthouse summary is also preserved separately under `reports/seo-baseline/` for subsequent implementation comparison.

CSV integrity checks passed: 75 rows in each file, all quantitative demand metrics UNVERIFIED, no duplicate keyword/country/language keys, one provisional primary per cluster and matching research/map target assignments. A first PowerShell check used scalar `.Count` and incorrectly flagged a primary-count error; array-normalized validation passed without CSV changes. `git diff --check` passed. No new code tests were added for this documentation/audit phase.
