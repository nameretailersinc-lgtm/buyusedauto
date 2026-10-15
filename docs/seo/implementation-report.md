# Global SEO upgrade implementation report

Date: 2026-10-15. Branch: `seo-global-upgrade`. Baseline source commit: `fa3895c5800f3024d4be415f3f7ba3781d0c54a7`.

## Phase 1: baseline and access checkpoint

Created `docs/seo/` and `docs/seo/inputs/`. Retained all application code, URLs and existing calculators. This phase establishes fresh validation rather than adopting historical audit results. No push, merge or deployment was performed.

Node v20.20.2; npm 10.8.2; Windows PowerShell. Initial `npm ci --cache .npm-cache --prefer-offline --no-audit --no-fund` attempts failed with EPERM/ENOTEMPTY in the interrupted dependency tree, including `node_modules/next/dist`. Moved the incomplete dependency directory to `.npm-cache/interrupted-node_modules-20261015` for recoverability. No Node processes remained when inspected. Repair with `npm install --ignore-scripts --cache .npm-cache --prefer-offline --no-audit --no-fund --package-lock=false` exited successfully, adding 605 packages, with an optional-package cleanup warning. Lifecycle scripts were skipped in this repair; subsequent build/tests must establish whether required native dependencies work. The tracked manifest and lockfile were not changed. A reproducible clean `npm ci` remains unproven in this environment.

## Account and evidence status

| Item | Status | Impact |
| --- | --- | --- |
| Google Search Console | Owner confirms available; no authenticated connector or export supplied | Query/page/country performance and indexing evidence pending |
| Google Analytics | Owner reports Search Console only for now | Property configuration and real event verification blocked |
| Bing Webmaster Tools | Not available for this phase | Ownership and submission verification blocked |
| AdSense | Not available for this phase; publisher ID not supplied | Activation, real ads.txt seller entry and ad/CMP integration blocked |
| Keyword exports | Input directory empty at intake | Volume, KD and CPC remain UNVERIFIED |

The request's USA Semrush heading has no metric rows; Pakistan range claims have no supplied ranges. Do not interpret either as verified numeric evidence. No protected keyword tool was scraped. Credentials must not be added to this repository.

Build, lint, TypeScript, all 47 unit tests and all 16 existing browser tests passed. See `qa-results.md` for actual command summaries and limitations. No application changes were needed to obtain these baseline results.

## Remaining work after checkpoint

Technical and formula audit with file/line evidence; fresh local Lighthouse and HTTP audit; keyword research and intent mapping; country prioritization; implementation of justified calculator/content improvements; remaining requested planning documents; full post-change QA. This phase does not claim completion of these deliverables, country launch approval, current bank-rate verification, field Core Web Vitals, external structured-data validation, or AdSense readiness.

Country routes require approved markets plus a localized calculator and two substantive localized guides. No country routes were created during baseline setup. Ads remain subject to real account details and the existing documented certified-CMP requirement.

## Phase 2: audit and research checkpoint

Completed `technical-audit.md` with route inventory, all eleven formula reviews, file/line findings, current safeguards and fresh Lighthouse observations. Added `global-keyword-research.csv`, `keyword-page-map.csv`, `country-priorities.md`, `content-calendar.md`, `internal-linking-plan.md` and `90-day-growth-roadmap.md`. All requested document names now exist; their existence does not mean implementation is complete.

Research contains 75 seed/variant rows across 16 countries and 36 provisional intent clusters. All volume/KD/CPC values remain UNVERIFIED. Public primary-source discovery and Urdu competitor terminology inform the country research log; no authenticated country database was accessible, no protected tool was scraped and no banking rate was adopted. Opportunity is omitted and remaining priority weights explicitly renormalized; numeric scores are editorial estimates, not measured keyword metrics. New CSV targets are unpublished candidates, not approved routes.

Fresh HTTP audit passed without failures/warnings. Fresh local mobile Lighthouse completed after a sandbox browser connection failure; all three templates score 95/100/100/100, with LCP above the performance target and no measured field INP. Application code/URLs remain unchanged. Next implementation priorities are defensive valuation validation, required financial edge behavior/tests, provenance labels, existing calculator/guide improvements and market configuration. Account, source and country-launch blockers remain as recorded above.

## Phase 3: shared financial engine and existing loan tool

Changed the existing pure-function library rather than creating another calculator. Loan inputs now validate all required numeric fields explicitly, accept an optional manually verified financed tax amount and a supported currency code, and return the currency without converting monetary inputs. The public loan UI retains its combined financed-taxes-and-fees field; the optional separate tax input is a library API capability, not a new automatic state-tax integration. Callers must not include the same tax in both fields.

Down payment/trade credit at or above the full cost now produces zero financing instead of rejecting excess credit. The return value separates unallocated credit, and the existing UI explains that it is not a promised seller refund. Negative equity still increases financing. The lease comparison counts only down payment actually applied up to purchase price, so newly accepted excess down payment is not counted as expenditure. Valuation condition/trim validation now rejects inherited object keys rather than allowing nonfinite estimates.

Added a pure `compareLoanPayoff` helper reused by the current loan UI. The results explain both estimated interest savings and months saved. Term comparison now includes 84 and 96 months; existing 36/48/60/72 comparisons remain. Added server-rendered early-payoff explanations and a contextual link to the existing loan comparison guide; no new early-payoff route or calculator. The loan formula explicitly floors financed principal at zero.

`lib/markets/index.ts` centralizes display conventions and currency formatting for the planned markets, and the existing USD money formatter delegates to it. This is configuration groundwork only: no local bank rules, exchange conversion, country routes, localized calculators/guides, language selector or hreflang are claimed. Existing field unit labels still need integration when actual localized UI is implemented.

Monetary tool pages now visibly label default prices/rates/taxes/fees/costs/valuation adjustments as UNVERIFIED scenario assumptions. Valuation text uses the same explicit label for unsupported coefficients. Citation data supports per-source checked dates. Two accessible CFPB references were reviewed on 2026-10-15 and display that actual date. The FTC page timed out; it was not marked reviewed. Sources without a recorded check date ask readers to verify current guidance. This is not completion of the wider guide/source-provenance review.

Expanded financial tests cover required loan terms, cash-funded/overfunded purchases, negative equity, extreme extra payments, final-cent reconciliation, very small/large amounts, invalid inputs, inherited valuation keys and a separate discounted-cash-flow bisection reference (independent of the production annuity formula). Updated the browser contract for the intentional excess-down-payment behavior; invalid-term rejection remains checked. Default result examples and existing export/restoration workflows are retained.

Remaining work: complete user-facing country/localization modules and approved bundles; improve existing ownership/new-vs-used comparison workflow and finance guide; provenance review beyond the two checked sources; privacy-respecting analytics events when appropriate; final responsive/performance QA. No reliability rankings, current bank rates or country tax rules were invented. Account/operator/source blockers continue; no push, merge or deployment performed.

## Phase 4: new-versus-used comparison and finance explanations

Improved the existing `/total-cost-of-ownership-calculator`; no additional calculator or route. Users label the current vehicle as new or used, save its result and all assumptions, then enter the other vehicle. Labels do not fill or alter prices, resale, insurance, maintenance or rates. The new pure `compareOwnership` helper requires equal ownership periods and annual distance before showing cost differences, and compares depreciation, running costs and interest without adding purchase principal again. Mismatched usage shows an actionable error and suppresses comparison totals/export until corrected. The saved input table remains visible for review.

Added a comparison CSV containing both scenarios, component costs, signed difference, inputs and limitations. The existing single-scenario CSV/URL restore/print behavior remains. Shared links include the current new/used label and inputs; saved comparisons remain tab-local and this limitation is visible. Added server-rendered method text and relevant ownership-guide links. Updated the existing ownership tool title/description to express new-versus-used intent while preserving its URL.

Expanded `/guides/how-to-compare-used-car-loans` with an original month-by-month interest walkthrough and generated term-comparison examples. `data/finance-examples.ts` uses the tested shared loan library for cent-rounded schedules, preventing disagreement between article and calculator totals. Inputs are explicitly UNVERIFIED hypothetical scenarios, not current offers. Kept the existing guide URL and seven-section structure, with updated metadata and real source-review/modification dates. The ownership guide now explains the actual saved-comparison workflow and has a checked date after source review. No unsupported average-payment or reliability statistics were introduced.

Reviewed the finance guide's CFPB sources and the ownership guide's DOE/EPA and CFPB sources on 2026-10-15. Added current source-check date to the shared DOE/EPA tool citation. Article language is now an explicit optional field, defaulting to en-US; the international resource specifies en. A review date no longer accidentally changes a US article's language. This does not create translations or hreflang equivalents.

New tests cover matched economic-cost comparisons, signed cost changes, unchanged saved inputs, unequal usage rejection and zero-distance scenarios. Browser tests exercise new/used labels, saved assumptions, mismatches, CSV, current-link restoration, keyboard focus and mobile axe on the comparison, plus no-JavaScript interest/method text and Article metadata. An initial mobile audit found a scrollable comparison region without keyboard focus; its table wrappers now provide labeled focusable regions, and the regression test checks them. An initial new content test had an ambiguous article locator; it was scoped to the primary article. Final results are recorded in `qa-results.md`.

Remaining priorities are genuine localized calculator/guide bundles with verified contract scope, completion of source provenance for other guides, analytics events and final performance work. Market routes, native-language review, bank presets, reliability datasets, GSC exports and advertising/account/operator dependencies remain pending. No push, merge or deployment performed.
