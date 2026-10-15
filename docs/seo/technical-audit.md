# Technical and content audit

Checked 2026-10-15 against baseline `fa3895c5800f3024d4be415f3f7ba3781d0c54a7`. Application unchanged at this checkpoint. Evidence: `reports/seo-global-baseline.json`, `reports/lighthouse-summary.json`, `docs/seo/qa-results.md`. Severity means P0 blocking a safe existing workflow, P1 next implementation priority, P2 subsequent improvement. No demonstrated P0 defect was found; this is not a claim that the site is ready for advertising or every market.

## Route and content inventory

The HTTP audit enumerated 37 HTML routes from the production prerender manifest: homepage, tools directory, guides directory, six policies, four guide categories, eleven tools, seven guides and six loan scenarios. Three singleton category pages are navigation-only/noindex, leaving 34 canonical sitemap URLs. API, OG image, robots, ads.txt and XML endpoints are infrastructure and excluded from this content count. Detailed URL-by-URL status, metadata, schema types and links are in the JSON report; route ownership is centralized at `lib/routes.ts:5`.

Tool metadata and policies use `app/[slug]/page.tsx:9`; guides use `app/guides/[slug]/page.tsx:16`. Six loan scenarios cover amount/repayment examples; retain their URLs and review intent overlap before expanding them. Do not add spelling-variant routes.

## All eleven original tools

All passed baseline browser rendering/error-state tests. Numerical conclusions below are source review plus existing unit tests, not a lender reconciliation or market-data validation. The shared pure library already exists; extend it rather than duplicate formulas.

| URL / intent | Formula review and source | Gaps / severity |
| --- | --- | --- |
| `/car-loan-calculator` — fixed monthly repayment, trade equity and payoff | `lib/calculators/index.ts:13`: stable annuity formula; zero-rate branch. `:21`: financed principal includes payoff and fees, deducts down/trade; cent-rounded schedule reconciles final balance. `lib/evaluate.ts:7` already compares extra payments to baseline. | P1: excess down/trade rejects instead of zero-finance/cash-remainder handling required by brief; explicit 1/84/96-month, extreme-amount and independent schedule tests missing. Combined taxes/fees only; no separate tax-base credit calculation. APR inclusive of fees cannot simply substitute for contractual nominal rate. |
| `/car-depreciation-calculator` — editable depreciation scenario | `lib/calculators/index.ts:38`: first projection year decline followed by compounded annual decline; zero-year handling. | P1: defaults are assumptions, not empirical depreciation. `data/tools.ts:12`; keep explicit UNVERIFIED model labels. No model-year data feed. |
| `/what-is-my-car-worth` — illustrative value bands | `lib/calculators/index.ts:44`: depreciation, mileage cap, condition/trim factors and channel multipliers. | P1: coefficients in `data/depreciation.ts:2` are unverified modeling choices, not appraisals. `:46` uses `in` for condition/trim membership; inherited keys need defensive validation. No VIN/make/model feed. |
| `/total-cost-of-ownership-calculator` — economic ownership cost | `lib/calculators/index.ts:61`: depreciation + running costs + interest incurred during ownership, avoids counting principal twice. | P2: US units/currency; maintenance and resale are user assumptions, no verified estimates. No side-by-side new/used workflow. |
| `/car-affordability-calculator` — household budget scenario | `lib/calculators/index.ts:77`: 48-month inverse payment plus down-payment and debt constraints. | P1: 20/4/10 and 36% are illustrative planning choices, never approval criteria; centralize/label assumptions (`data/tools.ts:15`). No lender eligibility model. |
| `/fuel-cost-calculator` — trip/annual fuel cost | `lib/calculators/index.ts:54`: miles/mpg or km × L/100 km; tested conversion preserves scenario. | P2: USD formatting remains even with metric units (`lib/site.ts:12`); no market config, imperial gallons or EV model. |
| `/trade-in-value-estimator` — modeled trade equity | Shared valuation above; payoff deducted at presentation (`lib/evaluate.ts:13`). | P1: same unverified valuation factors and inherited-key validation risk; do not present channel bands as statistical confidence. |
| `/lease-vs-buy-calculator` — equal-horizon cash/equity comparison | `lib/calculators/index.ts:87`: buy cash paid less equity; lease cash + payments + fees + excess mileage. | P2: excludes operating-cost differences/time value; not UK PCP or a payment-generating lease engine. Keep consistent tax treatment. |
| `/used-car-inspection-checklist` — observations/report builder | `lib/calculators/index.ts:114`: completion counts and concerns; no safety score. | P2: preserve CSV, URL restoration and print statuses. Not a certified inspection or automated diagnosis. |
| `/used-car-price-negotiation-calculator` — offer planning | `lib/calculators/index.ts:99`: comparable less repairs then user discount, fees added. Rejects repairs above comparable. | P2: no live comparables; taxes do not update with offer price. Existing content explains limits. |
| `/car-sales-tax-calculator` — manual verified-rate tax base | `lib/calculators/index.ts:106`: price + taxable fees − allowed credit, multiplied by user rate; non-taxable fees added. | P2: one-rate model excludes caps/brackets and jurisdiction exceptions. State selector links official resources, intentionally does not populate a rate. |

The tools already have server-rendered introductions, method/formula, examples, visible FAQs and related links (`components/tool-page.tsx:19`, `:23`, `:27`, `:29`, `:32`). Interactive calculators need JavaScript; the explanatory content does not. Five FAQs are supplied per tool in `data/tool-content.ts:7` onward. No duplicate early-payoff calculator is necessary: improve the existing loan tool and its anchor/navigation.

## Findings ranked by implementation priority

| Priority | Evidence (file:line) | Finding and action |
| --- | --- | --- |
| P1 | `lib/calculators/index.ts:23`, `tests/calculators.test.ts:16` | Excess down payment is intentionally rejected by current behavior/test, conflicting with new requirements. Define cash remainder and preserve nonnegative financed balance; update expectation with meaningful edge tests. |
| P1 | `lib/calculators/index.ts:46` | `in` permits inherited property names for condition/trim. Require own-key membership and prove finite results/rejection. |
| P1 | `tests/calculators.test.ts:3` | Baseline covers known payment example, negative equity, zero interest and final balance, but not all required terms/extreme scales/independent full schedules. Extend shared-library tests. |
| P1 | `data/depreciation.ts:2`, `data/tools.ts:15` | Generic model factors and budget constraints need explicit UNVERIFIED provenance labels under the brief; no external source establishes them as market estimates. Distinguish arithmetic examples from observed data. |
| P1 | `data/guides.ts:18`, `:22`, `:178`, `components/tool-page.tsx:35` | Source dates are optional/absent on most original guides and tool citations. Add actual checked dates only after review; do not backfill a fabricated review date. International resource already has a source-check date. |
| P1 | `data/policies.ts:2`, `:3`, `components/info-page.tsx:1` | About explicitly says legal operator identity needs confirmation; contact says receiving mailbox verification is needed. Owner must confirm identity/mail handling before commercial launch. Existing policy routes do exist. |
| P1 | `components/preferences.tsx:69`, `docs/MONETIZATION.md:15` | Current custom analytics consent is not a certified advertising CMP. No AdSense account/ID, slots or CMP configured. Keep ads disabled; certified provider/account setup blocks ad activation. |
| P1 | `lib/site.ts:12`, `data/tools.ts:4`, `app/layout.tsx:13` | USD/en-US/units in shared rendering, no `lib/markets/*`; no localized calculators, selector or localized guide sets. Build central config before eligible country launch. No forced redirects found. |
| P2 | `app/sitemap.ts:4`, `app/sitemaps/[group]/route.ts:6`, `app/robots.ts:3` | Root is a valid URL-set, not a sitemap index. Grouped segments match it. Add an index/per-country segmentation when real localized routes exist; adapt audit expectations at the same time. Current sitemap is not broken. |
| P2 | `lib/site.ts:9`, `app/layout.tsx:13` | Self canonicals work; no hreflang, correctly absent without equivalent translations. Add reciprocal self/x-default only when equivalents ship; international country sections are not equivalents. |
| P2 | `components/preferences.tsx:69`, `components/calculator.tsx:45` | Sanitized consent-gated page view exists; started/completed/country/affiliate events absent. Add deduplicated events without inputs, subject to consent and real GA property. Country/affiliate events require actual UI/destinations. |
| P2 | `components/tool-page.tsx:18`, `app/guides/[slug]/page.tsx:19`, `app/layout.tsx:9` | Optimized images and next/font already used. Fresh local mobile LCP remains above target despite good scores; inspect LCP dependency/timing before changing assets. No CLS observed in the tested unmonetized templates. |

## Technical safeguards verified

HTTP checks: unique titles/descriptions, exactly one H1 and canonical per content route, HTTPS self-canonicals, matching root/grouped sitemap membership, robots access, 404 handling, links, editorial images and parsed structured data all passed. No duplicate paragraph signals. `next.config.ts:13` preserves alternate-host redirect (Next permanent redirects use 308); no existing URL was changed by this phase. New URL replacement would require the brief's explicit 301 handling.

`components/seo.tsx:4` emits visible breadcrumb navigation with BreadcrumbList; `components/tool-page.tsx:40` emits free WebApplication with no fabricated ratings; guides emit Article with organization byline (`app/guides/[slug]/page.tsx:26`). FAQ text is visible but no FAQPage markup is emitted. That absence is not invalid schema. Local checks validate parsing and selected semantics, not Google's hosted Rich Results Test or a guarantee of eligibility. Six amount/payment scenarios merit editorial overlap review, not automatic deletion.

Trust routes: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`, `/editorial-policy`. No active affiliates; About describes commercial limits. Add a dedicated affiliate disclosure only with actual relationships, or explicit inactive status if needed. `/ads.txt` emits no seller line without a valid configured ID (`app/ads.txt/route.ts:2`); do not invent one. No ad slots currently render, so no ad-induced CLS is measured. Thin-content risk is greatest in future empty country hubs or unsupported reliability lists; neither should be published.

Navigation has a skip link (`app/layout.tsx:13`); existing browser tests cover keyboard/mobile navigation, inputs/error alerts, dark theme and axe on representative templates. All 16 tests passed at baseline; this is not an exhaustive manual accessibility audit. Required exact-width captures remain pending. No analytics/account reporting is inferred from code presence.

## Fresh local mobile Lighthouse

One successful run per template, simulated mobile throttling, local production server; checked 2026-10-15. Initial sandbox attempt failed with Chromium debugging ECONNRESET; retry outside sandbox completed. Raw summary retained in `reports/lighthouse-summary.json`.

| Template | Performance / accessibility / best practices / SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- |
| `/` | 95 / 100 / 100 / 100 | 2877 ms | 0 | 73.5 ms |
| `/car-loan-calculator` | 95 / 100 / 100 / 100 | 2910 ms | 0 | 61 ms |
| `/guides/how-to-inspect-a-used-car` | 95 / 100 / 100 / 100 | 2810 ms | 0 | 66.8 ms |

These lab observations do not establish passing field Core Web Vitals. INP was not measured. GSC/CrUX field evidence and deployed timing remain unavailable. Do not reuse previous report values as this phase's results.
