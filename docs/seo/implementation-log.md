# Implementation log — 22 October 2026

## Scope and preserved work

The fresh baseline passed existing HTTP/SEO checks. No canonical route, redirect, sitemap policy, calculation feed or country language mapping needed replacement. No new indexable URL was created. Existing loan taxes/fees, depreciation charts, ownership scenario comparison, inspection/mileage guidance, schema and guide navigation were retained. The working tree's payoff-guide changes predate this work and remain intact; no mixed commit, push or deployment was made.

## Changed routes and files

| Route | Files | Result |
| --- | --- | --- |
| `/trade-in-value-estimator` | `data/tools.ts`, `app/[slug]/page.tsx`, `components/tool-page.tsx`, new `components/trade-offer-comparison.tsx`, new `lib/calculators/trade-proceeds.ts` | Descriptive title/H1/description; entered dealer offers and private price, dated payoff and selling fees; equity, net proceeds, shortfall and private-minus-best-dealer comparison; visible formulas and worked negative-equity example. Retains generic value model under a separate heading and explains lack of live quotes/appraisal. |
| `/tools/germany/car-running-cost-calculator`, `/tools/uk/car-running-cost-calculator` | `data/country-tools.ts`, new `data/running-cost-content.ts`, `app/tools/[country]/car-running-cost-calculator/page.tsx` | Kfz-Steuer/HU and VED/MOT terminology, distinct local units and examples, insurance/inspection budgeting, no automatic rates, official sources and cross-links. GBP/EUR formatting already existed. No running-cost formula changed. |
| `/guides/buy-used-car-europe` | `data/country-guides.ts` | Filled empty Spanish requirements section; corrected misleading registration heading on emissions/EV content; scoped DGT reference and link to Germany EUR tool. Preserved section count/order and existing useful material. Actual edit date updated without claiming every historical source was re-reviewed. |
| `/`, `/tools`, `/guides` and guide collection templates | `app/page.tsx`, `app/layout.tsx`, `app/tools/page.tsx`, `components/guides-collection.tsx` | Descriptive H1s and homepage title; existing categories, journey links and pagination retained. |

QA additions: `tests/trade-proceeds.test.ts`, `tests/browser/trade-offers.spec.ts`, and worked-example assertions in `tests/country-tools.test.ts`. Extended the existing internal-link assertion in `tests/content.test.ts` to recognize registered country tool routes and DGT as an official source, preserving its pre-existing payoff additions. The first post-change unit run exposed that the old assertion rejected valid country-tool links; it was corrected rather than removing the link.

Documentation: `current-state.md` (all 80 rendered baseline routes), `keyword-map.csv` (19 intent mappings), `input-provenance.md`, this log, `gsc-measurement-plan.md`, `30-60-90-day-plan.md`. Historical `docs/seo-keyword-map.md` and earlier audit records remain intact; this new map records the current evidence and supersedes historical targeting assumptions for this program.

## Arithmetic and UX

All new inputs explicitly use USD, require nonnegative amounts to two decimal places, reject empty required fields and accept zero. Offers 2/3 are optional. Dealer selling fees share one disclosed assumption; compare separately for different fees. Equity = price − payoff; net = equity − selling fees; shortfall = max(0, −net). Private advantage compares against the highest dealer net. No tax credits, replacement-car prices or financing charges are silently assumed. Negative proceeds remain negative. Bounds are 100 million per input. New inputs clear on reload and are not put in the URL.

New comparison uses labels, error alerts, a live result region, and a keyboard-focusable horizontally scrollable table. The existing model and share links still work independently. Existing consent-gated trade-tool events are reused with no financial values. No tracking tool was installed or activated.

## Sources actually checked

- [GOV.UK: tax your vehicle](https://www.gov.uk/vehicle-tax): vehicle-tax lookup/action context; no fixed rate reproduced.
- [GOV.UK: getting an MOT](https://www.gov.uk/getting-an-mot): ordinary timing, exceptions and Northern Ireland differences.
- [German StVZO Anlage VIII](https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html): ordinary passenger-car HU intervals, with exceptions retained.
- [DGT: registering a vehicle from another EU country](https://www.dgt.es/nuestros-servicios/tu-vehiculo/quieres-traer-o-llevarte-un-vehiculo-del-extranjero/matricular-un-vehiculo-proveniente-de-la-ue/): Spanish transaction-specific documentation, technical and tax evidence; no fixed tax/fee quoted.
- [Your Europe: registration formalities](https://europa.eu/youreurope/citizens/vehicles/registration/formalities/index_en.htm): country-specific registration context.
- [CFPB: trading a car with an unpaid loan](https://www.consumerfinance.gov/ask-cfpb/should-i-trade-in-my-car-if-its-not-paid-off-en-2045/): payoff/equity context and borrowing implications.

Checked 22 October 2026. German Zoll tax HTML/PDF access returned errors/403. No current Kfz-Steuer rate, exemption or tax formula is published as verified; the page explicitly reports this limitation. Other historical citations retain their previous scope and review dates.

## Owner inputs and verification limits

`data/operator.ts` and README identify `info@nameretailer.com` and the Sharjah address as previously owner-supplied; these have not been silently replaced. Owner must verify those details and supply the actual legal operator name, monitored support/privacy inbox and finalized deployment-specific policies. About/terms still honestly disclose missing identity/draft status. Publishing invented legal information would not resolve this.

GSC account state, Google-selected canonicals, actual indexed pages, field CWV/INP, external Rich Results/Schema.org validation and real analytics delivery remain unverified. Local checks are not production release approval. See `qa-2026-10-22.md` for final executed commands/results and failures encountered.
