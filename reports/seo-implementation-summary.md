# SEO implementation summary

Date: 2026-11-02. Base commit `0ef490c`.

## Update: keyword edits applied (2026-11-02, later)

Applied at the owner's request, without Search Console query data. Edited `data/tools.ts`, `data/phase-three-tools.ts`, `data/new-guides.ts` (names and descriptions only; slugs unchanged):

| URL | New title/H1 source |
|-----|---------------------|
| /car-loan-calculator | Car loan calculator: used car payment with taxes and fees (description adds "car payment calculator") |
| /what-is-my-car-worth | How much is my car worth? Used car value calculator |
| /car-depreciation-calculator | Car depreciation calculator: estimate value by year |
| /fuel-cost-calculator | Fuel cost calculator: trip, annual and gas mileage costs |
| /car-cost-per-mile-calculator | Cost per mile calculator for your car (miles or kilometers) |
| /guides/how-many-miles-is-too-many-for-a-used-car | description now leads with "What mileage is good for a used car?" |

Typecheck, lint, 250 tests, build and `seo-audit.mjs` (0 failures/warnings) pass. Record the deploy date and compare Search Console in 28-day windows; these edits are a variable in any later comparison. The text below describing "no application changes" applies to the first pass only.

## What changed in the application (first pass)

Nothing. No confirmed technical defect was found (`reports/seo-technical-audit.md`). The rest of this report explains why that is the correct state, and what is proposed.

Reasons for not editing titles, H1s or content now:
- The calculators, schema, internal links and metadata were reworked on 21–22 Oct (see `git log`), a few days before the drop. Further edits now would make the 24–27 vs 28–31 Oct comparison harder to interpret.
- Every mapped keyword already has one principal page (`reports/seo-keyword-map.csv`).
- No query-level data exists to show that any title is wrong.

## Files added

- `reports/seo-technical-audit.md`
- `reports/seo-keyword-map.csv`
- `reports/seo-implementation-summary.md`
- `reports/seo-validation-results.md`
- `reports/search-console-monitoring-plan.md`
- `reports/seo-validation-run.json` (raw output of `scripts/seo-audit.mjs`)

Existing uncommitted edits in `docs/` and `reports/site-audit.json` predate this work and were not touched.

## Pages optimized

None in this pass. 27 of the 29 research keywords map to existing URLs; see the CSV.

## Pages proposed but not created

- "Best used cars under $10k / $15k / $20k" and "reliable used cars": not created. Needs verifiable, sourced vehicle data. Per-price pages would be doorway pages.
- No pages for synonym keywords (for example "car payment calculator"). They are served by `/car-loan-calculator`.

## Proposed changes, pending Search Console evidence

1. `/car-loan-calculator` title: consider the broader "Car loan calculator" phrase if queries show demand beyond "used".
2. `/guides/complete-used-car-buying-guide` vs `/guides/used-car-buying-checklist-first-time-buyers`: check which URL Google ranks for "used car buying checklist" and "how to buy a used car". Consolidate only if they compete.
3. `/` and `/tools` share about 75% of paragraphs: differentiate the `/tools` intro.
4. `what-is-my-car-worth` targets a 50,000-volume phrase whose intent is a vehicle-specific appraisal. The tool gives a modeled range, so keep the disclaimers visible.

## Open questions

1. RESOLVED: `docs/seo-indexing-remediation.md` (18 Oct) says `/guides/category/financing` is noindex. `lib/routes.ts:14` noindexes only categories with fewer than 2 guides; financing now has more, so indexable and in the sitemap is the intended behavior. The doc is stale, not the site.
2. RESOLVED in code: Next.js was pinned at 16.4.0, which `npm audit` reports as critical (image-optimization RCE, Server Actions DoS, `use cache` RCE). `package.json` now pins 16.4.3. Verify the build and deploy it (see `reports/seo-validation-results.md`).
3. The live deploy date of the last release is unknown. Check the deploy log for 26–28 Oct.

## Not covered in this pass

Phases 4–9 (on-page rewrite, calculator audit, schema, content audit, performance, internal linking) were not re-done. Existing documents `docs/seo/technical-audit.md` and `docs/seo/qa-results.md` already cover them and the 250 existing tests exercise the calculators. A fresh formula and schema review would need a separate pass. Say if you want it.
