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
