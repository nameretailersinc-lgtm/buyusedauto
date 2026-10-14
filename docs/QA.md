# Verification record

Local production verification on October 14, 2026. Build uses Next.js 16.4.0; browser checks use installed Microsoft Edge. These checks do not establish production deployment, field Core Web Vitals, legal approval, or independent editorial review.

## Completed checks

- ESLint: passed. Generated browser/Lighthouse output is excluded from source linting.
- TypeScript `tsc --noEmit`: passed.
- Vitest: 42 tests passed across calculator edge cases and content integrity.
- Production build: passed; 46 generated routes including content and crawl endpoints.
- HTTP/SEO audit: 36 sitemap pages and 138 internal destinations, zero failures and zero warnings. Checks cover canonical URLs, unique metadata, one H1, JSON-LD shape and visible FAQ content, fragments, crawl endpoints, OG image, unknown-route 404, and permanent slash redirects.
- Eleven browser tests passed in the final full-suite run: toolkit filters/search, keyboard and mobile navbar, live homepage calculation, every calculator's validation/reset, URL restoration, comparisons and CSV, fuel conversion, inspection checklist, state tax resources, tracking disabled before consent, mobile/dark accessibility, and print summary.
- The remaining eight-page browser test passed on targeted rerun (25.9 seconds) after increasing its total budget to 120 seconds. Across the full run and targeted rerun, all 12 tests passed. No detected WCAG A/AA violations or horizontal overflow in the audited layouts.
- Reviewed desktop tools hub and scenario screenshots, mobile guide collection, and desktop article layout. Screenshots are local in `reports/` and excluded from Git.
- After the final mobile text and article rendering adjustments, the three affected browser tests passed again (eight page families, mobile/dark accessibility, screenshots/print).

## Corrections from QA

Card labels used opacity that lowered text contrast. They now use the full muted text color. Calculator assertions now target their own error alert rather than Next.js's separate route announcement. Homepage canonical comparisons normalize equivalent origin URLs through the URL parser.

Lighthouse's first run flagged small homepage text and excessive long-article rendering work. Mobile guide-card descriptions, footer text, and trust labels were enlarged. Below-viewport article sections use `content-visibility:auto`, with normal visible rendering for printing. The local Lighthouse launcher now creates its profile directory before starting Edge.

## Performance

Final mobile Lighthouse run, simulated throttling against the local production server:

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 98 | 100 | 100 | 100 | 2.12 s | 0 | 99 ms |
| Car loan calculator | 91 | 100 | 100 | 100 | 3.10 s | 0 | 194 ms |
| Inspection guide | 90 | 100 | 100 | 100 | 3.01 s | 0 | 232 ms |

Machine load and individual lab runs vary. The earlier baseline measured performance 95/98/80 for these pages; its homepage best-practices score was 96 due to small text. Final results follow the readability and article-rendering corrections. The final calculator and guide LCP remain above 2.5 seconds in this lab run, and the guide TBT has further improvement potential. No claim that every page reaches 95 is made.

Summary: `reports/lighthouse-summary.json`. Individual HTML/JSON reports are generated locally and excluded from Git. INP was not measured; it requires interaction/field data. These are measured lab results, not field Core Web Vitals or proof of production behavior.

## Remaining release verification

Run the same checks against the actual Vercel deployment. Verify representative structured data using external validators, domain/HTTPS/host redirects, actual operator/contact details, and configured privacy integrations. Advertising remains disabled. See `LAUNCH_CHECKLIST.md` for the 90-day plan and external dependencies.
