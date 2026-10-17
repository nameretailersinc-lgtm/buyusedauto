# SEO audit — 18 October 2026

This is the current checkpoint for the owner's master brief. Older reports in `docs/SEO_AUDIT.md` and `docs/seo/` describe earlier snapshots and retain their historical evidence. This implementation preserves existing routes, the sitemap system, financial amortization, regional tools, design and APIs. Nothing was deployed.

## Evidence and scope

- Repository inventory: App Router templates, dynamic/static parameter sets, route registries, all eleven original tools and pure formulas, guide collections, country guides/tools, Pakistan financing, policies, metadata, JSON-LD, responsive styles, images, test suites, build/hosting and CI configuration.
- Fresh baseline: `reports/seo-master-before.json`: 61 rendered HTML pages, 59 canonical sitemap URLs, 433 internal destinations, 19 image assets; no auditor failures, warnings or duplicate-paragraph signals.
- Read-only public HTTP audit: `reports/seo-master-live.json`: 59 sitemap pages, no failures after correcting the audit's regional currency policy; seven metadata-length warnings. Public root/US/PK sitemaps and robots.txt returned 200. The new implementation is local; these observations are not deployment confirmation.
- Final local evidence and commands: `docs/seo-master-qa.md` and `reports/seo-master-after.json`.
- No authenticated Search Console access or exports were supplied. The IDE's `Table.csv` path was checked and the file was absent. Supplied keyword estimates are retained as owner-provided research, not independently verified export metrics.

## Verified findings and implemented changes

| Priority | Evidence | Finding | Resolution |
| --- | --- | --- | --- |
| P1 | `data/tools.ts`, `lib/evaluate.ts` | Loan UI exposed combined taxes/fees only, while the pure function already accepted an optional tax amount. | Add separate financed sales tax, title and registration inputs; preserve the legacy `fees` value as a combined or other-charge input. Add tax/fee and trade-equity metrics, worked example and cross-links. Optional new fields default to zero for old callers. |
| P1 | `scripts/check-site.mjs`; original local run failed four regional free-offer assertions | Checker assumed USD outside `/pk/` and string `"0"` prices; regional tools correctly publish PKR/AED/GBP/EUR and numeric zero. | Share explicit market/currency/free-price policy between both auditors and test valid/invalid offers. This corrects verification; it does not change valid live offers. |
| P1 | `app/guides/[slug]/page.tsx`, country-tool route, `lib/site.ts` | Regional guides and running-cost tools inherited US Open Graph locale. | Pass the page's existing language/locale to metadata. Retain English root HTML and per-page language attributes. No hreflang is invented for non-equivalent content. |
| P2 | Guide inventory at baseline | No dedicated buyer workflow for a private-party purchase with seller lien, buyer financing, payment and transfer. Existing trade/private-sale comparison serves the seller's net-proceeds decision. | Add one substantial private-seller buying guide with direct answer, seven stages, questions, inspection/payment checklist, hypothetical settlement examples, state qualifications, meaningful FAQs and primary references. Link from pillar, loan, negotiation and guide collections. |
| P2 | `components/tool-page.tsx` | Loan payoff section existed but key inputs, amortization and related decision steps could be easier to find. | Add crawlable section links, itemized financing example, related tax/affordability/ownership/private-seller links and a no-JavaScript explanation. No separate payoff or synonym route. |
| P2 | `data/tools.ts`, `lib/evaluate.ts` | Tax model provides state resource selector and manual rate/credit, but title/registration share one non-taxable-fee input. | Itemize manually verified title and registration; retain other/legacy fees. Explicitly state automatic state rates/fees are unavailable. Tax-base credit still does not subtract trade allowance from purchase total. Reject negative individual charges even if their aggregate would be positive. |
| P2 | Public metadata audit | Two search titles were 77 characters; guide pagination descriptions were 121–123 characters. These are presentation heuristics, not demonstrated indexing defects. | Use separate concise SEO titles while retaining full guide H1s; improve pagination descriptions with useful scope. |
| P2 | Negotiation guide | Cash purchase and opening-discount answers could be more direct. | Add specific cash-versus-financing comparison and FAQs; retain evidence-based examples and no universal discount claim. Existing source-review date remains intact; actual content update date advances. |
| P2 | Affordability page | Salary, insurance/repair allowance and out-the-door budget relationships were implicit. | Add explicit $60,000 salary example and links to tax/ownership tools. Existing income/debt constraints and formulas remain unchanged. |
| P3 | `app/tools/page.tsx`, lint baseline | Country links displayed literal question marks; four unused-import warnings. | Replace separators/arrows and remove unused imports. |

## Crawlability, eligibility and duplication

The production manifest and HTTP audit establish rendered responses and sitemap eligibility, not Google indexing. Root `/sitemap.xml` already emits an index with `/sitemaps/us.xml` and `/sitemaps/pk.xml`. Existing `/sitemaps/core.xml`, `/sitemaps/tools.xml`, `/sitemaps/guides.xml`, `/sitemaps/scenarios.xml` and `/sitemaps/pk.xml` remain working. The historically named US aggregate includes some other English regional content; its filename does not control geotargeting. No conflicting sitemap system is introduced.

Known intentional exclusions are singleton financing and selling guide categories. They remain crawlable navigation pages with noindex. Guide page-one aliases already use permanent 308 redirects to collection roots. Trailing slash and alternate-host redirects retain their existing behavior. Interactive query strings have clean route canonicals. Unknown tools, guides, scenarios and sitemap groups return real 404 responses.

The baseline auditor found unique titles/descriptions, self-canonicals, no blocked or noindex sitemap pages, no orphan pages and no broken internal destinations/fragments in its enumerated set. Its paragraph comparison found no high-overlap signals; that is not proof of editorial uniqueness or lack of thin content. No unsupported technical-indexing defect was invented to justify changing working crawl files.

Intent overlap needs editorial ownership: the pillar is a journey hub; the USA country guide covers local buying requirements; the first-time checklist organizes preparation; the new private-seller guide owns private-party transaction execution. Inspection advice and interactive observation recording remain separate. Existing six loan scenarios remain differentiated examples; do not expand them into parameter permutations. `docs/seo-keyword-map.md` records canonical owners and every rendered page.

## Content, financial accuracy and structured data

Preserved: stable annuity formula, zero-rate branch, cent reconciliation, negative equity, unapplied cash credit, extra-payment comparison, amortization/CSV/print, matched ownership comparisons, editable insurance/maintenance/fuel/resale assumptions and depreciation replacing principal in economic cost. New charge behavior is tested independently against equivalent all-in financing and expected purchase totals.

Contract interest rate and APR stay distinct. The [CFPB explanation](https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/) was checked during this work. There is no invented bad-credit rate table, approval model or live offer. A bad-credit query leads to estimating an entered quote, not a credit assessment.

Value/trade/depreciation tools remain educational models without make/model/VIN transaction feeds. No reliability ranking, current asking price, owner review or market valuation was invented. Proposed reliability content is held for evidence.

JSON-LD remains WebSite/Organization, visible BreadcrumbList, Article, CollectionPage and applicable free WebApplication. A free software price describes access to the tool, not an automotive financing offer. Dates/bylines do not imply credentialed review. FAQ answers are visible; no special AI-search or rich-result promise is added. Local parsing and semantic assertions are not a substitute for hosted Schema.org/Google validation.

## Tax and source review

No automatic state rates or DMV charges are maintained, so no invented last-verified tax-table date appears. User-entered estimates are explicit. The [Texas trade-in guide](https://comptroller.texas.gov/taxes/publications/96-254/trade-ins.php) was checked on 18 October 2026 for the same-transaction/direct-to-seller condition, not used as a nationwide rule. California resources provide an official path for transaction-specific fees. One-rate arithmetic still excludes tax caps, brackets, special taxable-value rules and other listed exceptions.

Private-seller sources checked for this guide: [California DMV transfer requirements](https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/), [DOJ NMVTIS information](https://vehiclehistory.bja.ojp.gov/nmvtis_consumers), [NHTSA recalls](https://www.nhtsa.gov/recalls), [CFPB auto loans](https://www.consumerfinance.gov/consumer-tools/auto-loans/), [FTC fake checks](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-fake-check-scams), and [FTC dealer guidance](https://consumer.ftc.gov/articles/buying-used-car-dealer). Source checks support the specified distinctions, not a professional review of every state or contract. Existing guides' historical review dates were not globally refreshed.

## Performance and accessibility

The app already prerenders explanatory HTML and uses responsive `next/image`, local font delivery after build, lightweight SVG and deferred result charts. The calculator remains interactive JavaScript; its method/examples/sources remain readable without JavaScript, now with an explicit notice. This change adds no dependency, tracker, advertisement, external data request or generated image.

Fresh browser and mobile lab results belong in `docs/seo-master-qa.md`; historical Lighthouse scores are not reused as current results. Browser/axe tests cover representative templates and calculator interactions, not every assistive-technology combination. CrUX/GSC field LCP, INP and CLS remain unavailable. No measured traffic or performance gain is claimed.

## Remaining work that needs external evidence

Search Console page/query/country/device exports and URL Inspection are needed to determine actual indexing, Google-selected canonicals, exclusion reasons, search intent and priority by impressions. Operator identity/mailbox confirmation remain owner tasks already recorded in launch documents. Actual state datasets require maintained rule coverage, effective dates and review capacity before automatic calculations. Reliability/live value comparisons need lawful, dated model-specific data. See `docs/seo-indexing-remediation.md` and `docs/seo-roadmap.md`.
