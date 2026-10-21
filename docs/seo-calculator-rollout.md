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

## Later work held for evidence

APR calculation remains a separate future feature: a cash-flow yield and legal APR disclosure are different concepts and require careful fee/timing rules. Repair estimates require reliable model/year/location cost data. A registration/tax calculator needs maintained jurisdiction-specific rules; the high-volume registration row also shows −90% YoY. Maintenance and cost-per-mile intents already have useful components in the ownership calculator; develop distinct pages only if they add a distinct calculation. A full gas-versus-EV ownership comparison needs matched purchase, running-cost and resale inputs beyond the new session-cost tool.

No Phase 2/3 near-duplicate pages, fabricated repair data, current electricity tariffs, bank rates or automatic registration charges are introduced in this rollout. The fuel measurement enhancement was brought forward because it extends the existing canonical fuel tool without those data dependencies.

## Local verification

- Production build and TypeScript checks passed.
- All 172 unit/content tests passed, including independent arithmetic checks, payoff boundaries, refinance fees, charging metering, fuel conversion and eight-currency integration.
- Seven new browser checks passed for currency restoration, CSV currency labels, clearing mixed-currency comparisons, mobile overflow, calculator accessibility, charging boundaries, fuel measurement and server-rendered content without JavaScript. Five existing navigation/calculator regressions also passed.
- The final 73-page production SEO audit passed with 71 sitemap URLs, no failures, no warnings and no duplicate-paragraph signals. The guide-publishing check still covers all 17 selected articles and paginated collections.
- The keyword map was regenerated from the final local production HTML and the audited canonical set. These checks verify local output; this work does not establish a deployment or Search Console indexing status.
