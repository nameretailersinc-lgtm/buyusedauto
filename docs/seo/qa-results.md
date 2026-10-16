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

## Phase 3 financial implementation — 2026-10-15

| Check | Actual result |
| --- | --- |
| `npm run lint` | Exit 0 on final application sources |
| `npm test` | Exit 0; 3 files, 64 tests passed (47 baseline, 17 added cases); final run reported 853 ms |
| `npm run build` | Exit 0; TypeScript and static generation completed, 47/47 build entries |
| `npm run typecheck` | Exit 0 after final build |
| `TEST_BASE_URL=http://127.0.0.1:3100 npm run test:e2e` | Exit 0; 16 tests passed in 1.1 minutes, including all original tools and updated zero-financing behavior |
| `TEST_BASE_URL=http://127.0.0.1:3100 SEO_AUDIT_OUTPUT=reports/seo-global-phase3.json npm run audit:seo` | Exit 0; 37 pages, 34 sitemap URLs, 148 internal destinations, eight images; zero failures/warnings/duplicate-paragraph signals |
| HTTP artifact comparison and HTML assertions | Same route paths as baseline; early-payoff explanation, UNVERIFIED assumption label and dated CFPB citations present in server HTML |
| `git diff --check` | Passed |

The intentional behavior change is that excess down payment/trade credit produces no loan and reports unallocated credit instead of an error. The original invalid-term and input-error contracts still pass. Required boundary tests exercise 0% interest, 1/84/96-month terms, zero/excess down financing, negative equity, extra payments above balance, final cents, extreme scales and invalid inputs. Independent payment reference solves discounted cash flows by bisection instead of copying the production formula; principal/payment conservation is also checked. Inherited condition/trim keys are rejected. No new market terms, lender rates or tax tables were asserted.

The existing browser suite again passes its representative mobile/dark-theme axe assertions and print/CSV/share/restoration workflows. Phase 3 did not rerun Lighthouse or the full 360/768/1280 screenshot matrix; Phase 2 values/captures remain the baseline, not post-change performance measurements. Final performance/responsive evidence is still required after subsequent UI work. Country-specific calculation behavior, real analytics/account reporting and external rich-result validation are not covered by this phase.

## Phase 4 ownership comparison and finance guide — 2026-10-15

| Check | Actual result |
| --- | --- |
| `npm test` | Exit 0; 69 tests across three files, including five new ownership comparison cases; reported 769 ms |
| `npm run lint` | Exit 0 on final sources |
| `npm run build` | Exit 0 on final sources; TypeScript completed and 47/47 static build entries generated |
| `npm run typecheck` | Exit 0 before final comparison-only CSS refinement; final build also passed TypeScript |
| Full `TEST_BASE_URL=http://127.0.0.1:3100 npm run test:e2e` | Exit 0; all 18 tests passed in 1.2 minutes after fixing a new ambiguous locator and table-focus issue |
| Final targeted browser rerun after scoped comparison-table wrapping CSS | `npm run test:e2e -- --grep 'new versus used\|interest walkthrough'`: exit 0; two affected tests passed in 8.4 s, including focus, no table overflow at 360 px and axe assertions |
| HTTP audit | Exit 0; `reports/seo-global-phase4.json`: 37 pages, 34 sitemap URLs, 148 internal destinations and eight images; zero failures/warnings/duplicate-paragraph signals |
| Route inventory comparison | Same content paths as the original baseline; all eleven original tools retained |
| Final responsive/axe capture script | Exit 0; six captures (ownership with saved comparison and updated interest guide, each at 360/768/1280 px). HTTP 200 and no document overflow in all six; no comparison-table overflow at all three widths; no selected-tag axe violations on mobile ownership with comparison active |

New browser coverage checks that saved assumptions remain fixed, current new-car inputs are distinct, unequal ownership period/distance suppress comparison totals/export, matching inputs restore comparison, CSV downloads, and the current vehicle label/input URL reloads without pretending to restore tab-local saved data. The new no-JavaScript test verifies the interest walkthrough and ownership method remain server-rendered, and the Article language/date agree with the US guide. Existing loan, fuel, checklist, export, URL restoration, navigation, consent and responsive tests still pass.

Initial findings and fixes: the first new content test failed because `article` also matched related cards; it now targets `.editorial-prose`. An initial screenshot/axe harness required an explicit browser context and was corrected. The mobile comparison initially failed `scrollable-region-focusable`; labeled keyboard-focusable regions fixed that issue. Subsequent visual review prompted scoped table wrapping so both vehicle columns fit a phone; final affected tests and captures pass. No assertion was weakened to ignore a violation.

Evidence: `reports/seo-phase4/responsive.json`, six full-page PNGs under `reports/seo-phase4/screenshots/`, and `reports/seo-phase4/comparison-360.png`. The detail capture can include fixed navigation/result chrome due to element screenshot stitching; full-page captures and actual browser assertions are the layout evidence. Automated checks and these captures are not a full manual accessibility certification.

Fresh local mobile Lighthouse completed successfully before the final comparison-only wrapping CSS. Single-run observations: homepage performance 92 / LCP 2976.60 ms / TBT 144.5 ms; loan 96 / 2814.23 ms / 41.5 ms; inspection guide 89 / 2894.15 ms / 282.64 ms. Accessibility, best practices and SEO each scored 100 on all three, with CLS 0. Summary preserved at `reports/seo-phase4/lighthouse-summary.json`. Scores vary with local activity; do not infer a causal improvement/regression or passing field CWV. The final comparison CSS and active ownership scenario were checked with responsive/axe browser tests, not a separate Lighthouse run. No field INP, production metrics or hosted rich-result validation is claimed.

## Phase 5 Pakistan bundle — 2026-10-16

| Check | Actual result |
| --- | --- |
| `npm test` | Exit 0; four files, 75 tests passed; final run reported 1.06 s |
| `npm run lint` | Exit 0 after calculation data was separated from JSX rendering; no lint suppression added |
| `npm run build` | Exit 0; TypeScript completed, 52/52 static build entries generated, including three Pakistan pages and sitemap infrastructure |
| `TEST_BASE_URL=http://127.0.0.1:3100 npm run test:e2e` | Final run exit 0; all 20 tests passed in 1.3 minutes |
| Full SEO/HTTP audit | `SEO_AUDIT_OUTPUT=reports/seo-global-phase5.json npm run audit:seo`: exit 0; 40 content routes, 37 sitemap URLs, 154 internal destinations, eight images; no failures, warnings or duplicate-paragraph signals |
| Sitemap-only site checker | `npm run check:site`: exit 0; 37 canonical pages, 151 checked internal destinations, no failures/warnings; `reports/site-audit.json` |
| Original URL comparison | Every original baseline content path retained; three deliberate Pakistan content routes added |
| Invalid Pakistan routes | `/pk/not-a-page` and `/pk/guides/not-a-guide` return 404 |
| Responsive and axe capture script | Exit 0; nine captures across calculator and both guides at 360/768/1280 px; all return 200, no document overflow; zero selected-tag axe violations on each mobile page |
| Country selector | Explicit US → PK and PK → US navigation passed; no automatic geolocation routing implemented |
| Keyword artifacts | Both CSVs retain 75 rows; Pakistan owners updated to implemented paths; demand metrics remain UNVERIFIED |

New pure-function cases cover the fixed manual benchmark/spread scenario, invalid combined rate, Ijarah cash/refund reconciliation, distinct rental versus ownership purchases, incompatible deposit assumptions, fractional-cent/nonfinite amounts, and malformed numeric schedules. Browser checks exercise all three modes, quote-field clearing on mode changes, malformed schedule error states, mobile axe and server-rendered explanations/guide text. Canonicals and sitemap country segments are checked; no false hreflang equivalences are asserted. Existing export, URL restoration, comparison, checklist, navigation, no-JavaScript and consent tests pass.

Initial failures were corrected rather than excluded: React's lint rule rejected JSX construction inside calculation try/catch, so the catch now handles calculation data only. New browser locators initially matched the footer's share status and Next's route announcer as well as the calculator result/error; both now target the calculator section. The final full suite passes with the financial expectations unchanged.

Screenshots and observations: `reports/seo-phase5/screenshots/` (nine PNGs) and `reports/seo-phase5/responsive.json`. These are local automated checks, not exhaustive manual WCAG certification. The unrelated owner-added logo asset is not part of this change.

Fresh local mobile Lighthouse used the existing audit runner with only its target list/output paths changed in an ignored temporary runner (`.npm-cache/lighthouse-pk.mjs`). Final command `TEST_BASE_URL=http://127.0.0.1:3100 node .npm-cache/lighthouse-pk.mjs` exited 0 outside the sandbox after browser regression finished. Summary: `reports/seo-phase5/lighthouse-summary.json`; raw HTML/JSON remain in `.npm-cache/lighthouse-pk-*` locally.

| Page | Performance / accessibility / best practices / SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- |
| Pakistan calculator | 90 / 100 / 100 / 100 | 2904.37 ms | 0 | 251 ms |
| Pakistan contract guide | 97 / 100 / 100 / 100 | 2544.64 ms | 0 | 57 ms |

These single local lab runs do not establish passing field CWV; INP and actual production performance remain unmeasured. No Google-hosted rich-result result, bank-offer reconciliation, live KIBOR, current fee/tax table, Urdu review, actual GSC/GA result or AdSense approval is claimed. `git diff --check` passed before committing the checkpoint.
