# Measurement plan — 22 October 2026

The supplied impressions are small and volatile. Page and query positions describe different aggregations. Neither top-10 page samples nor one-click outcomes establish sustained rankings or causality. No ranking, traffic or crawl-date guarantee is made.

## Establish comparable windows

Record the property, search type, completed reporting dates, country, device, search appearance and every filter. Confirm the original sample period; it is currently unknown. Confirm Keyword Planner location/network settings before interpreting its volumes geographically. PKR bids and paid competition do not establish organic difficulty or country demand. Do not sum close-variant volumes.

Use the existing `npm run report:gsc` workflow and `inputs/README.md` for consistently filtered exports. Keep account credentials and raw private exports out of Git. Export pages and queries separately. For a URL/query relationship, filter to the exact page and then export its queries; never join independent top-page and top-query lists as if they were paired observations.

## Reviews after the approved production release

The release date is not yet known; no deployment was performed. Count the following windows from the actual release, not this local editing date.

| Window | Review | Decision |
| --- | --- | --- |
| 7 days | Inspect released HTML, selected canonicals, calculator behavior and event consent; review crawl/indexing diagnostics | Correct reproducible regressions. Avoid conclusions from a handful of impressions. |
| 28 days | Compare completed 28-day periods with the same filters; segment each priority URL by query, country and device | Review impressions, clicks, CTR and impression-weighted position alongside sample counts. Check whether snippets match intent before editing titles again. |
| 90 days | Compare matched periods and longer query trends, noting seasonal and site changes | Expand differentiated content only when queries and calculator usage identify a real gap. Retain useful low-volume pages. |

Prioritize Germany running costs, Europe buying and depreciation chart as possible quick wins; confirm that impressions actually come from relevant countries/devices. Then inspect trade-in, UK running costs, inspection/mileage, depreciation, ownership and financing pages. The trade-in comparison shares the existing URL; no new keyword-variant page needs indexing.

For each URL + query + country + device row retain impressions, clicks, CTR (clicks/impressions), average position, date window and filters. Preserve zero-click and low-impression rows but label them inconclusive. Do not average exported position averages without impression weighting; do not compare independent table totals as if export omissions did not exist. Record indexed-page counts and calculator completions separately from rankings.

## Manual Search Console checks

1. URL Inspection: inspect the released homepage, trade-in page, Germany/UK pages, Europe guide and depreciation chart. Compare user-declared and Google-selected canonical, indexing eligibility, last crawl, rendered HTML and linked resources. Use live testing for availability; it does not prove indexing. Request indexing selectively after material fixes, rather than submitting every route repeatedly.
2. Page indexing: review actual reasons and affected samples. For “crawled – currently not indexed,” compare unique purpose, substantive answer, internal discovery and canonical evidence with nearby pages. A local 200 response alone cannot diagnose Google’s decision.
3. Sitemaps: verify the root sitemap index and grouped canonical URLs on production; check read status and excluded redirects/noindex pages. Existing local sitemap checks passed; submission and Google processing are unverified.
4. Core Web Vitals: review mobile and desktop field groups when enough data exists. Targets: LCP ≤2.5 seconds, INP ≤200 ms, CLS ≤0.1. Lighthouse is lab data and TBT is not INP.
5. Manual actions and Security issues: inspect both reports directly. No authenticated access or clean-status assertion is available here.

## Conversion and privacy

Existing events are named `calculator_started` and `calculator_completed`; the new offer comparison reuses them with fixed `tool_id=trade`, `country=US`. Existing calculators retain their event behavior. They require a valid configured GA ID, opt-in and permitted browser privacy signals. Payloads omit entered financial values, results, query strings, referrers and personal identifiers. The new comparison stores inputs only in component memory.

Do not install or enable another tracker. Confirm an actual property and audit its enhanced measurement and retention before activation. Real event delivery is unverified. Existing completion events do not distinguish the offer comparison from the legacy trade model, so report them as combined trade-tool usage, not separate funnels. `scenario_compare` and `guide_to_tool_click` are not currently separate events; use consented aggregate page navigation as a limited proxy, or implement a separately reviewed fixed-identifier extension if the owner needs that attribution.
