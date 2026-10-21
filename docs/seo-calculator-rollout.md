# Calculator rollout from the 21 October 2026 exports

The four source exports were read directly from the owner's Downloads folder: `22_26_12`, `22_26_51`, `22_27_04` and `22_28_04`. Together they contain 4,521 rows and 4,488 unique keyword strings for October 2025–September 2026. The [research snapshot](seo/keyword-research-2026-10-21.json) records selected rows, file names, row counts and SHA-256 hashes without copying the full exports into public assets.

Google Ads competition is advertiser competition, not organic ranking difficulty. Search-volume estimates for synonyms are not added together. PKR identifies the bid currency; the exports do not prove a target geography. Monthly history cells are blank, so recent month-by-month demand cannot be reconstructed. Both `car registration tax calculator` and `car affordability calculator` report −90% year-over-year change and need current market-specific validation.

The owner selected multiple countries/currencies. New tools support USD, PKR, INR, GBP, CAD, AUD, AED and EUR. Selecting a currency does not convert values, fetch local offers, or implement local law. Conventional loan models use fixed monthly reducing-balance interest; the separate Pakistan contract tool remains the route for its existing Islamic contract modes. The existing US sales-tax tool remains US-scoped with manually verified rates and fees.

## Phase 1: distinct tools and existing canonical owners

| Keyword/intent | Export estimate | Canonical route | Implementation |
| --- | --- | --- | --- |
| car loan payoff calculator; car loan extra payment calculator | 50,000 Low (8); 5,000 Low (11) | `/car-loan-payoff-calculator` | Existing balance and actual required payment, recurring extra principal, immediate lump sum, scheduled vs accelerated cost, and repayment schedule. The purchase calculator still handles a proposed purchase. |
| auto loan refinance calculator | 50,000 Medium (45) | `/auto-loan-refinance-calculator` | Remaining current cost vs replacement loan, upfront and financed fees, prepayment charge, payment change, full-term savings and financing-cost break-even. |
| car down payment calculator | 5,000 Low (33) | `/car-down-payment-calculator` | Net contribution target, positive/negative trade equity, cash reserve, funding gap and resulting loan. The down-payment guide owns explanatory article intent. |
| ev charging calculator; electric car charging cost calculator | 5,000 Low (5); 5,000 Low (17) | `/ev-charging-cost-calculator` | Usable battery energy, charge range, losses, billing boundary, local unit price, one flat session fee and time at average grid input power. |
| car depreciation calculator | 5,000 Low (16) | `/car-depreciation-calculator` | Existing working calculator retained; no duplicate route. Editable first/later-year assumptions and value-loss curve. |
| car sales tax calculator; tax title license calculator | 5,000 Low (1); 5,000 Low (2) | `/car-sales-tax-calculator` | Existing itemized tax, title and registration inputs retained. Automatic jurisdiction rules are not supplied. |

Each new calculator has its own H1, canonical URL, metadata, working inputs, published formulas, original example, five FAQs, sources, related tools, navigation entry and automatic sitemap coverage. Share links preserve inputs with the selected currency while canonical URLs remain clean. CSV exports identify currency; switching currencies clears a saved comparison so results in different currencies are not compared.

## Existing pages strengthened

- `/car-loan-calculator` continues to own purchase-payment calculation (`car payment calculator`: 500,000). It links contextually to the existing-debt payoff, refinance and down-payment tools. Its existing extra-payment feature is retained for purchase scenarios.
- `/fuel-cost-calculator` also owns gas-mileage calculation (50,000, Low 0) and fuel savings (5,000, Low 1). A measured-efficiency section calculates US mpg, km/L and L/100 km from distance/fuel measurements. A same-distance, same-price comparison shows annual fuel-only savings. This additional section supports local currency and explicitly distinguishes its temporary inputs from the main calculator's share/export controls.
- `/car-affordability-calculator` retains guideline-based budgeting. Exact export: 50,000, Low (17), −90% YoY. Do not treat loan approval as household affordability.
- `/what-is-my-car-worth` remains an assumption-based value model. Exact `car value calculator` row: 50,000, **High (68)**. No live appraisal claim is introduced.
- `/trade-in-value-estimator` remains the equity/value tool. Exact `car trade in value calculator` row: 5,000, **Medium (56)**, rather than the Low competition stated in the pasted summary.

## Search-result spot check

On 21 October 2026, search-tool queries and opened provider pages showed distinct early-payoff and refinance experiences, rather than just purchase-payment inputs:

- [Bankrate early payoff calculator](https://www.bankrate.com/loans/auto-loans/early-payment-payoff-calculator/) presents additional-payment savings.
- [Bankrate auto refinance calculator](https://www.bankrate.com/loans/auto-loans/refinance-calculator/) compares replacement-loan terms.
- [DOE charging-at-home guidance](https://afdc.energy.gov/fuels/electricity-charging-home) supports electricity-price and charging-context explanations.
- [CFPB prepayment guidance](https://www.consumerfinance.gov/ask-cfpb/can-i-prepay-my-loan-at-any-time-without-penalty-en-843/) supports checking the actual contract for prepayment charges.

This is a qualitative search-result and product review. It is not a country-specific Google ranking export or an organic-difficulty measurement. Search position, traffic and rankings are not inferred. Multi-currency functionality does not establish which country's search volume the exports describe.

## Phase 2 implementation

Added /car-loan-apr-calculator, /car-repair-cost-calculator and /car-registration-tax-calculator. The regular-monthly APR model solves the cash-flow yield with user-classified finance charges and distinguishes nominal APR from effective annual rate. It does not replace a jurisdiction's required disclosure. Repair budgeting uses written quote amounts rather than invented vehicle-specific prices. Registration budgeting accepts verified local amounts in eight currencies, with one sourced GBP DVLA first-registration profile, eligibility limits, a checked date and a review cutoff that disables stale automatic fees.

Phase 2 validation passed 205 unit/content tests, a production build, 14 browser checks and a 76-page SEO audit with 74 sitemap URLs and no failures or warnings.

## Phase 3 implementation

- /car-maintenance-cost-calculator: recurring service reserve using the earlier time/distance interval, tire sinking fund, other annual work and known immediate repairs. It estimates savings, not a service appointment calendar or a vehicle-specific price.
- /car-cost-per-mile-calculator: recorded-period expenses divided by recorded miles/km. Economic cost uses value change and interest; gross cash spending uses acquisition cash and full payments. Exclusive inputs prevent counting principal twice. This is not a tax mileage rate.
- /gas-vs-electric-car-cost-calculator: matched ownership years and distance with purchase/resale, upfront fees, charger installation, interest within the period, annual energy and other running costs. Wall consumption already includes charging losses; battery consumption applies efficiency once. No tariffs, incentives, vehicle rankings or resale forecasts are inferred.

All three tools support eight display currencies and convert physical distance/fuel inputs together when switching miles and kilometers. No FX conversion occurs. Sources checked on 21 October 2026 include FTC maintenance guidance, the DOE Vehicle Cost Calculator and DOE/EPA electric-vehicle energy guidance. Sources support the concepts; example prices and service intervals remain editable assumptions.

The four original Keyword Planner exports confirm car maintenance cost calculator at 500 / Low (4), car cost per mile calculator at 500 / Low (3), gas vs electric car cost calculator at 500 / Low (17), and electric vs gas car cost calculator at 50 / Low (6). The latter two are overlapping wording variants, not additive audiences. Market geography remains unspecified. Exact rows and source hashes are retained in docs/seo/keyword-research-2026-10-21.json.

## Sitemap and internal links

The root /sitemap.xml now advertises core.xml, tools.xml, guides.xml, scenarios.xml and pk.xml directly. All published guide and tool routes derive from their content registries, including each Phase 3 tool. The legacy /sitemaps/us.xml aggregate remains available for compatibility. Query variations, page-one aliases and intentionally noindex singleton categories remain outside indexable sitemap sets.

Contextual links connect the maintenance guide, ownership guide, loan-comparison guide, new-vs-used guide and relevant financing articles to the new calculators. Existing ownership, fuel, depreciation, repair, affordability and charging tools link to relevant Phase 3 tools. Calculator pages link back to guides and related tools. Shared navigation, collections and policy cross-links cover the remaining page types.

The production SEO audit checks every rendered page for outgoing links within main content and incoming links from other pages' main content, independently of global header/footer links. It also follows internal destinations and fragments, checks sitemap coverage and rejects orphans. This establishes local crawlability rather than deployment or Search Console indexing.

## Final local verification

Final Phase 3 build, browser and rendered-link audit results are recorded after validation in reports/seo-phase-three.json. The keyword map is regenerated from the same production HTML. No deployment is performed by this work.
