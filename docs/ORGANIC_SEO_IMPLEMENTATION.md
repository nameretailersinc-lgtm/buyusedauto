# Organic SEO implementation — October 15, 2026

## Audit and implementation decisions

Inspected the App Router routes, shared UI, tool definitions, calculator library, guide content, policies, metadata, robots, root/grouped sitemaps, redirects, schema, deployment configuration and existing unit/browser/HTTP audit scripts. The application is a statically rendered Next.js site with browser-side calculators. There is no database, vehicle inventory, live valuation feed, authenticated ownership lookup or Search Console reporting client. Existing assets, URLs and tools were retained. The previous October 14 audit remains historical evidence in `SEO_AUDIT.md`; its performance measurements are not new measurements for this change.

The source inventory initially contained 36 HTML routes, 11 tools and six guides. Existing technical controls already cover canonicals, parameter canonicalization, preview noindex, unknown-slug 404s, alternate-host redirects, crawlable content, structured data and navigation-only singleton categories. Those features were retained rather than described as new fixes. The identified content gaps were private-seller questions, explicit engine/mileage guidance, discoverability of PDF printing, honest model-specific depreciation limits, international resources and a complete keyword decision map.

Plan: retain technical safeguards; improve existing intent owners; add one useful international resource with genuine jurisdiction differences; connect it to discovery/navigation and sitemap generation; validate the complete route inventory and existing interactive tools. Avoid duplicate country landing pages, speculative reliability lists and unsupported market prices.

## Actual changes

- Loan and ownership tools: titles/H1s now explicitly identify used-car loan and total ownership cost intent; the inspection description identifies the 25-point PDF/report workflow.
- Inspection guide: explicit private-seller questions, safe engine observations, and updated date. Existing professional-inspection limitations remain.
- History guide: mileage decision guidance without an invented universal cutoff; updated date.
- Inspection tool: visible server-rendered PDF instructions, clearer print action and CSV distinction. Print-only text preserves each selected status on paper/PDF and hides the select controls and action buttons; no second export implementation was added.
- Depreciation tool: server-rendered explanation that model-year price data and forecasts are unavailable.
- New `/guides/international-used-car-buying-checks`: UK, Australia, Pakistan and UAE resource sections with links to the existing US workflow, official references, units, currency limitations, local authority scope and source limitations. Pakistan guidance is explicitly Punjab-specific; UAE guidance is explicitly Dubai-specific. This is a resource guide, not a claim to implement every jurisdiction's legal process.
- Shared footer and guide directory link to the international resource; contextual links connect inspection, history and fuel resources.
- The existing data-driven guide route registry adds the self-canonical international page to both root and grouped sitemaps automatically, subject to existing indexing protection.
- Existing Article schema now emits actual modification dates for the two edited guides. The international guide has Article/BreadcrumbList schema, official citations and an organization byline. No fabricated credentials, ratings, reviews or publication dates.

There are no genuine localized alternative pages, so no hreflang annotations were added. The country sections share one canonical resource URL; fragment navigation does not create separate indexable pages. Country branches can be introduced when sufficiently distinct, maintained content exists. Match reciprocal hreflang only to equivalent localized intent, never unrelated country articles.

## Keyword-to-URL map

All search volumes, difficulty scores, rankings, traffic estimates, geographic demand and achievable ranking opportunities are **unknown**. No keyword platform or Search Console credentials/data were available. Search-result inspection verifies official references, not keyword metrics. Priority is an editorial implementation order, not a prediction of SEO performance. Existing intent owners take priority over new competing articles.

| # | Candidate | Canonical owner or reserved path | Priority / treatment |
| --- | --- | --- | --- |
| 1 | used car inspection checklist pdf | `/used-car-inspection-checklist` | P1: existing tool; PDF print instructions improved |
| 2 | what to check before buying a used car | `/guides/how-to-inspect-a-used-car` | P1: existing inspection intent |
| 3 | questions to ask when buying a used car from a private seller | `/guides/how-to-inspect-a-used-car` | P1: added seller-question checklist |
| 4 | how to check used car accident history | `/guides/how-to-check-a-cars-history` | P1: existing evidence and limitations |
| 5 | how to check a used car engine before buying | `/guides/how-to-inspect-a-used-car` | P1: expanded engine section |
| 6 | used car inspection report | `/used-car-inspection-checklist` | P1: observation report, not certified inspection |
| 7 | how to negotiate used car price with private seller | `/guides/how-to-negotiate-a-used-car-price` | P1: existing guide; related calculator stays tool intent |
| 8 | used car buying checklist for first time buyers | `/guides/how-to-inspect-a-used-car` | P1: existing workflow and related tools |
| 9 | used car total cost of ownership calculator | `/total-cost-of-ownership-calculator` | P1: existing tool/methodology |
| 10 | used car depreciation calculator by model | `/car-depreciation-calculator` | P2: partial fit only; explicit absence of model feed |
| 11 | used car loan payment calculator with taxes and fees | `/car-loan-calculator` | P1: existing financed-fee inputs and limitations |
| 12 | how much mileage is too much for a used car | `/guides/how-to-check-a-cars-history` | P1: mileage assessment added |
| 13 | used cars under 10000 | Reserved `/guides/used-cars-under-10000` | P3: unpublished; needs dated market/price evidence, no inventory implied |
| 14 | best used cars under 15000 for reliability | Reserved `/guides/reliable-used-cars-under-15000` | P3: unpublished; reliability and local price evidence needed |
| 15 | best used cars for first time drivers under 10000 | Reserved `/guides/first-car-under-10000` | P3: unpublished; price, insurance and safety evidence needed |
| 16 | best used SUVs with low maintenance costs | Reserved `/guides/used-suv-maintenance-costs` | P3: unpublished; comparable model/market cost evidence needed |
| 17 | most reliable used sedans under 10000 | Reserved `/guides/reliable-used-sedans-under-10000` | P3: unpublished; test overlap with candidate 13 before publishing |
| 18 | best used hybrid cars for city driving | Reserved `/guides/used-hybrids-for-city-driving` | P3: unpublished; fuel, battery and model evidence needed |
| 19 | best used cars with good fuel economy | Reserved `/guides/used-car-fuel-economy-comparison` | P3: unpublished; exact powertrain official consumption data needed |
| 20 | best used cars for long distance commuting | Reserved `/guides/used-cars-for-long-distance-commuting` | P3: unpublished; compare operating cost, suitability and inspection evidence |
| 21 | used Toyota Corolla common problems by year | Reserved `/guides/used-toyota-corolla-by-year` | P3: unpublished; model-year/engine/market source matrix needed |




| 22 | used Honda Civic common problems by year | Reserved `/guides/used-honda-civic-by-year` | P3: unpublished; same evidence requirement |
| 23 | Toyota Corolla vs Honda Civic used car comparison | Reserved `/guides/used-corolla-vs-civic` | P3: unpublished; comparable generations/markets needed |
| 24 | used Toyota Camry best years to buy | Reserved `/guides/used-toyota-camry-by-year` | P3: unpublished; no unsupported best-year labels |
| 25 | used Ford Focus automatic transmission problems | Reserved `/guides/used-ford-focus-transmissions` | P3: unpublished; distinguish exact gearbox, market and service actions |

| 26 | used Hyundai Tucson reliability by model year | Reserved `/guides/used-hyundai-tucson-by-year` | P3: unpublished; exact engines/years/markets needed |
| 27 | how to buy a used car in the UK privately | `/guides/international-used-car-buying-checks` (section `#section-2`) | P2: official DVLA/MOT workflow; introductory coverage |
| 28 | how to check used car history in Australia | `/guides/international-used-car-buying-checks` (section `#section-3`) | P2: official PPSR and state-authority guidance |
| 29 | used car transfer process in Pakistan | `/guides/international-used-car-buying-checks` (section `#section-4`) | P2: limited Punjab resource; not a nationwide process |
| 30 | how to check used car ownership in UAE | `/guides/international-used-car-buying-checks` (section `#section-5`) | P2: limited Dubai RTA resource; not nationwide record access |

Reserved paths are planning entries only: no routes, links or sitemap entries are published for them. Broad buying intent belongs to `/guides`; tool intent belongs to `/tools`; brand research is deferred until defensible model-specific content exists. Avoid an empty brand hub.

## Evidence and remaining dependencies

Official references checked October 15, 2026: [GOV.UK buying checks](https://www.gov.uk/checks-when-buying-a-used-car), [Australian PPSR](https://www.ppsr.gov.au/searching/do-used-car-or-vehicle-search), [Queensland used vehicle guidance](https://www.qld.gov.au/transport/buying/rules/used), [Punjab published transfer workflow](https://excise.punjab.gov.pk/system/files/TRANSFER%20OF%20OWNERSHIP%20%28TO%29%20THROUGH%20EPAY_0.pdf), [Dubai RTA inquiry](https://rta.ae/wps/portal/rta/ae/driver-and-carowner/vehicle-licensing/vehicle-inquiry?lang=en), and [FTC used-car guidance](https://consumer.ftc.gov/articles/buying-used-car-dealer). Punjab's workflow is an older published document; live service-page retrieval failed, so no current fee, deadline or full nationwide procedure is asserted. Current Punjab biometric guidance and Dubai transfer guidance were also checked; the ePay portal could not be retrieved. Source support is narrower than full legal review.

No deployment, Search Console access, external rich-result validation, field Core Web Vitals measurement or verified ranking improvement is claimed. Existing October 14 Lighthouse values are historical: homepage/tool LCP exceeded the 2.5-second target in those runs. Actual deployed response/asset timings and field INP still require measurement before attributing a bottleneck or declaring CWV success.

After deployment: verify DNS/TLS, HTTP redirects and representative canonicals; run deployed HTTP QA and structured-data validators; verify Search Console ownership and submit `/sitemap.xml`. Export 28-day query/page/country/device performance, compare matched periods and track clicks, impressions, CTR and average position. Review high-impression/low-CTR pages and positions 8–30 using real data. Record indexing exclusions and Google-selected canonicals separately from source-level indexability. Do not infer traffic gains from a passing build.

Validation: production build, ESLint, TypeScript and 47 unit tests passed. The production HTTP audit found 37 HTML routes, 34 canonical sitemap URLs, 148 internal destinations, eight image assets and zero failures/warnings. The sitemap-only checker found 34 pages and 145 destinations, also with zero failures/warnings. Evidence: `reports/seo-organic-2026-10-15.json` and `reports/site-audit.json`. All 16 Playwright browser tests passed in the final isolated run (1.7 minutes), including no-JavaScript content, international source/schema checks, all calculators, validation, URL restoration, comparisons, CSV, fuel units, checklist reset and print statuses, consent, responsive navigation, dark theme and mobile accessibility. `git diff --check` passed. Earlier runs were interrupted by concurrent build/artifact replacement and a strict-locator error in a new test; the locator was scoped to the primary article and the final suite used an isolated artifact directory.

Public homepage, robots and sitemap retrieval through the web tool was unavailable on October 15. This does not establish that the domain is down; live-domain response headers and contents remain unverified. The fresh baseline attempt lacked a prerender manifest, so the historical audit is the only pre-change reference.

## Measurable implementation coverage

| Measure | Historical source inventory | Current local production audit |
| --- | ---: | ---: |
| HTML content routes | 36 | 37 |
| Indexable canonical sitemap URLs | 33 | 34 |
| Tools | 11 | 11 |
| Guides | 6 | 7 |
| Singleton categories excluded from indexing | 3 | 3 |

The final HTTP check validates all 37 content routes, 34 sitemap URLs, 148 internal destinations and eight editorial image assets, with zero failures, warnings or paragraph-duplication signals. These are technical coverage measures, not search-ranking or traffic outcomes. Existing redirect/canonical/robots protections pass; no previously existing technical defect is invented. The transient duplicate registration during implementation was fixed before the final build.

All 11 tools were reviewed for introductions, methodology, worked examples, visible FAQs, source/limitation disclosures and related links. Existing content already met that structure. Changes focus on inspection/PDF behavior, depreciation limits, loan/ownership titles and two buying guides. Existing inspection CSV, URL restoration and calculator formulas are preserved. Printable checklist statuses now use explicit text, with form controls and export actions hidden in print.

## Final automated validation

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: 47 tests passed.
- `npm run build`: passed; all content remains statically generated.
- `npm run audit:seo`: 37 pages, 34 sitemap URLs, 148 internal destinations; zero failures/warnings.
- `npm run check:site`: 34 sitemap pages, 145 internal destinations; zero failures/warnings.
- `npm run test:e2e`: clean sequential run, all 16 tests passed in 1.7 minutes. Covers calculator inputs/results/CSV, fuel conversion, checklist persistence and print status text, no-JavaScript HTML, international sources/schema, navigation, consent, mobile layouts and axe accessibility.
- `git diff --check`: passed.

An initial new test used an ambiguous article selector; it was corrected to select the main editorial article. Overlapping browser runs also collided on trace artifacts. These were test-harness failures; a clean sequential full run passed. No product failures were suppressed or skipped.

## Fresh mobile Lighthouse measurements

`npm run audit:lighthouse` completed against the local production server after the browser suite. The sandbox attempt could not connect to the browser debugging endpoint; the approved retry completed. Historical measurements were preserved in `reports/lighthouse-before-organic.json`; fresh results are in `reports/lighthouse-summary.json`.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 | 100 | 1.95 s | 0 | 70 ms |
| `/car-loan-calculator` | 95 | 100 | 100 | 100 | 2.91 s | 0 | 54 ms |
| `/guides/how-to-inspect-a-used-car` | 97 | 100 | 100 | 100 | 2.68 s | 0 | 65 ms |

Loan and guide lab LCP remain above the 2.5-second target. The loan trace attributes about 1.96 seconds to LCP render delay; the image is already preloaded, so adding another preload is not supported by this evidence. Lighthouse estimates about 140 ms of unused JavaScript opportunity and 163 ms of render-blocking CSS savings; these overlap and must not be summed as a promised gain. Further bundle/style work and deployed profiling remain open. No synthetic TBT value is presented as field INP, and these variable single-run lab results do not prove a causal improvement or passing field Core Web Vitals.
