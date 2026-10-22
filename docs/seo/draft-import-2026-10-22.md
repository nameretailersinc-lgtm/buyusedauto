# Six-draft import — 22 October 2026

The existing publishing layer is the typed `Guide` registry in `data/guides.ts`, rendered by the App Router at `/guides/[slug]`. There is no external CMS or Markdown runtime. `GuideDetail` supplies the current design, accessible native tables, visible organizational attribution and source links. Static generation, category pagination, collections and sitemap groups derive from that registry. Existing CI builds and deploys the standalone application through the repository's VPS workflow. No deployment, push or infrastructure change is part of this import.

The first complete payoff draft arrived separately. The second attachment contains five delimited Markdown drafts, not one article. They were recovered into separate files under [drafts-2026-10-22](drafts-2026-10-22) for traceability. The source metadata, destination decisions, placeholder mappings and original attachment SHA-256 are in [the import record](draft-import-2026-10-22.json). Encoding artifacts in the transfer were normalized before conversion. The archived source files retain draft frontmatter and placeholders; they are documentation and are never rendered as public content.

## Canonical destinations

| Draft | Action | Canonical path |
| --- | --- | --- |
| 01 Early payoff | Already imported; preserve the completed article and its current edits | `/guides/how-to-pay-off-a-car-loan-early` |
| 02 Annual depreciation | Refresh the existing guide; retain its title, metadata, prior examples and links | `/guides/how-much-does-a-used-car-depreciate-per-year` |
| 03 Tax, title and fees | Add a complete guide to reading an itemized purchase quote | `/guides/used-car-sales-tax-title-and-fees-explained` |
| 04 EV charging | Add a complete home/public charging explanation | `/guides/how-much-does-it-cost-to-charge-an-electric-car` |
| 05 Refinancing | Add a decision guide; existing loan-comparison guide retains its broader offer-comparison intent | `/guides/is-refinancing-your-car-loan-worth-it` |
| 06 Down payment | Refresh the existing guide; retain its title, metadata, prior examples and links | `/guides/how-much-down-payment-for-used-car` |

The proposed depreciation and down-payment slugs are not published and receive no sitemap entries. Existing annual depreciation and chart guides already own annual-value-loss and visualization intents. Creating further pages for those keyword variations would repeat coverage. Other existing buying, negotiation and ownership guides supply context, while the new tax, charging and refinance articles answer distinct questions. Calculator-query keywords stay assigned to the actual calculators; article profiles use informational intents without borrowing or adding their search-volume estimates.

## Field and category mapping

`title` maps to `Guide.title` (the single H1); `meta_title` to `seoTitle`; `meta_description` to `description`; the supplied excerpt begins `intro`, followed by a short practical answer. H2/H3 sections, paragraphs, lists, tables and FAQs use the existing section model. The source list maps to `sources`, and resolved CTAs appear in section links and `relatedTools`. No new CMS model or dependencies were introduced.

The existing taxonomy maps Used-Car Buying to Buying, Car Financing to Financing, and valuation/charging to Ownership. This avoids creating thin category collections. Primary/secondary keywords and original source fields are retained in the import record and the keyword map rather than inserted repeatedly into article copy.

For new and refreshed content, the visible modification/source-check date is 22 October 2026. It is the actual import and verification date, not an invented historical publication date. The existing `Article` JSON-LD uses only visible title, description, organization, modification date and sources. No reviewer, rating, publication timestamp or partnership is invented. Draft-only instructions are adapted to reader guidance; factual limitations and hypothetical labels remain.

## Calculator and guide links

All six calculator destinations exist: `/car-loan-payoff-calculator`, `/car-depreciation-calculator`, `/car-sales-tax-calculator`, `/ev-charging-cost-calculator`, `/auto-loan-refinance-calculator` and `/car-down-payment-calculator`. Links use these real paths. Each new guide links directly to its calculator and the calculator links back within page content. Related links connect registration budgeting, ownership costs, APR, payoff alternatives, maintenance reserves and affordability where relevant. No placeholder enters the public registry.

## Corrections and source verification

- Refinance: the exact 48-month payments on $18,000 at 10% and 7% are approximately $456.5265 and $431.0324. Their difference rounds to **$25.49**, correcting the supplied $25.50. Rounded total-interest savings are $1,224. The roughly $724 net benefit assumes all $500 refinance charges are paid upfront; financed fees incur additional interest. The tool rounds each schedule payment and can differ by cents from the article's unrounded formula; neither is a lender payoff quote.
- Charging: percentage-point inputs require dividing the charge-level difference by 100. Charging efficiency is also divided by 100 when entered as a percentage. Battery energy, wall energy and billed energy are distinguished; losses are applied once. The 30 kWh/100-mile example explicitly uses wall consumption, so 5.4 cents per mile at $0.18/kWh already includes losses. Its $7.20 partial-charge example is hypothetical.
- Tax: the $19,630 total explicitly assumes that the $250 dealer charge is nontaxable for that arithmetic scenario. Taxable dealer charges require a different base. The example does not authorize extra mandatory charges on an advertised price; applicable disclosure rules still govern. No state or country rate is supplied.
- Refreshes: the $20,000 constant-12% depreciation table and the $20,000 purchase / $1,600 financed fees / 9% / 60-month down-payment comparison were checked mathematically. The existing canonical guides retain their earlier useful examples and add the new material without duplicating a URL.

Checked the draft's FTC, CFPB and DOE links and added DOE/EPA energy guidance on 22 October. These sources support surrounding concepts, not the illustrative rates or resale values: [FTC buying guidance](https://consumer.ftc.gov/articles/buying-used-car-dealer), [FTC pricing FAQs](https://www.ftc.gov/business-guidance/resources/automobile-industry-pricing-transparency-faqs), [CFPB negotiable loan features](https://www.consumerfinance.gov/ask-cfpb/what-things-can-i-negotiate-when-shopping-for-a-car-or-auto-loan-en-2132/), [CFPB loan terminology](https://www.consumerfinance.gov/consumer-tools/auto-loans/answers/key-terms/), [CFPB prepayment](https://www.consumerfinance.gov/ask-cfpb/can-i-prepay-my-loan-at-any-time-without-penalty-en-843/), [CFPB down payments](https://www.consumerfinance.gov/ask-cfpb/how-does-a-down-payment-affect-my-auto-loan-en-773/), [CFPB affordability](https://www.consumerfinance.gov/ask-cfpb/how-much-can-i-afford-to-borrow-for-a-car-or-auto-loan-en-751/), [CFPB unpaid trades](https://www.consumerfinance.gov/ask-cfpb/should-i-trade-in-my-car-if-its-not-paid-off-en-2045/), [DOE home charging](https://afdc.energy.gov/fuels/electricity-charging-home), [DOE consumer EV guidance](https://afdc.energy.gov/vehicles/electric-consumers), and [DOE/EPA EV energy guidance](https://www.fueleconomy.gov/feg/evtech.shtml).

## Verification

Final local build, lint, TypeScript, unit/content, browser and rendered-site audit outcomes are recorded below after completion. The audit uses a separate report, preserving the earlier SEO checkpoint reports. This verifies local output and does not establish public deployment, indexing or rankings.
