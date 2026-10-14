# Launch guide research and methodology

Research was performed on October 12, 2026. This records the research session, not a claim of professional review, a past publication date, or a continuing monitoring service. No author qualifications or expert endorsements have been invented.

The six guides in `data/guides.ts` contain original practical workflows and independently constructed worked examples. Agency publications support specific consumer-protection, record-coverage, and terminology statements. Their example prices, market averages, and promotional statistics were not reused. Each guide exposes a `sources` array for public reference links and a `relatedTools` array for internal links.

## Source inventory

| Source | Scope used | Guides |
| --- | --- | --- |
| [FTC: Buying a used car from a dealer](https://consumer.ftc.gov/articles/buying-used-car-dealer) | Buyers Guide, independent inspection, written purchase quotes | Inspection; negotiation |
| [FTC: Flood-damaged car warning signs](https://consumer.ftc.gov/consumer-alerts/2018/10/dont-get-swamped-buying-flood-damaged-car) | Water-related observations that justify professional investigation | Inspection |
| [NHTSA: Tire safety](https://www.nhtsa.gov/tires/safety-and-savings-ride-your-tires) | Importance of tire condition and maintenance | Inspection |
| [NHTSA: Recalls](https://www.nhtsa.gov/recalls) | VIN recall search, exclusions, and limits | Inspection; history |
| [DOJ: NMVTIS for consumers](https://vehiclehistory.bja.ojp.gov/nmvtis_consumers) | Title/brand/odometer and salvage information; state variation | History |
| [NICB: VINCheck](https://www.nicb.org/vincheck) | Participating-insurer record coverage; incomplete history | History |
| [NHTSA: Odometer fraud](https://www.nhtsa.gov/vehicle-safety/odometer-fraud) | Cross-checking mileage and records | History |
| [FTC: Auto buyers study guidance](https://consumer.ftc.gov/consumer-alerts/2020/07/ftc-announces-auto-buyers-study-reports) | Total-price discussion, add-on review, and contract review | Negotiation |
| [CFPB: Comparing auto loan offers](https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/) | Loan comparison beyond monthly payment and ownership budget | Negotiation; ownership; loans |
| [DOE/EPA: Fuel savings calculator](https://www.fueleconomy.gov/feg/savemoney.jsp) | Fuel-budget inputs and comparing energy costs | Ownership |
| [DOE/EPA: Your mileage will vary](https://www.fueleconomy.gov/feg/why_differ.shtml) | EPA comparison estimates versus actual use | Ownership |
| [CFPB: Auto loan key terms](https://www.consumerfinance.gov/consumer-tools/auto-loans/answers/key-terms/) | APR and interest-rate distinction | Loans |
| [CFPB: Truth in Lending disclosures](https://www.consumerfinance.gov/ask-cfpb/what-is-a-truth-in-lending-disclosure-for-an-auto-loan-en-787/) | APR, finance charge, amount financed, payment disclosures | Loans |
| [CFPB: Ways to finance a car](https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-dealer-arranged-and-bank-financing-en-759/) | Direct versus dealer-arranged borrowing | Loans |
| [CFPB: Negative equity findings](https://www.consumerfinance.gov/data-research/research-reports/data-spotlight-negative-equity-findings-from-the-auto-finance-data-pilot/) | Debt carried into replacement financing | Loans; selling |
| [Texas Comptroller: Trade-ins](https://comptroller.texas.gov/taxes/publications/96-254/trade-ins.php) | One explicitly identified state example of qualifying trade treatment | Selling |
| [FTC: Fake-check scams](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-fake-check-scams) | Available funds versus genuine payment; overpayment fraud | Selling |
| [California DMV: Title transfers](https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/) | Explicit state example distinguishing title transfer and seller notice | Selling |

NICB is an insurance-industry nonprofit, not a government agency. It is included as the primary publisher of its own VINCheck coverage and limitations. Its market-coverage statistics are not reproduced.

## Worked-example checks

- Inspection: $15,500 purchase + $650 tires + $450 brakes = $16,600; adding a $1,000 reserve gives $17,600 before other charges. Reserve is identified as cash needed, not a certain expense.
- History: $14,000 purchase + $900 documented service = $14,900, versus a hypothetical $14,600 alternative with that work verified.
- Negotiation: $16,500 reference minus $700 tires minus $300 service = $15,500 condition-adjusted reference. Opening offer is a separately identified hypothetical decision.
- Quote comparison: $15,500 + $450 + $1,150 = $17,100; $15,200 + $850 + $1,150 = $17,200. The text notes actual tax can change when taxable fees differ.
- Ownership: $11,000 depreciation + $7,000 fuel + $7,500 insurance + $5,000 maintenance/repairs + $1,800 taxes/fees + $3,000 assumed interest = $35,300. Over 60 months this is $588.33 per month; over 60,000 miles it is $0.5883 per mile. These are averaged economic costs, not monthly payments.
- Fuel: 12,000 / 30 × $3.50 = $1,400 annually; 12,000 / 25 × $3.50 = $1,680. Price and MPG are hypothetical inputs.
- Loan: $20,000 principal, 8% nominal annual interest, monthly compounding/payment illustration, no fees. The standard amortization formula gives $488.2584468 over 48 months and $350.6648122 over 72. Total interest is $3,436.4054478 and $5,247.8664812 respectively. Interest difference is $1,811.4610334. Rounded payments are displayed only after calculation. Actual daily accrual, fees, and contracts may differ.
- Selling: $10,000 trade + $600 assumed verified tax benefit − $6,000 payoff = $4,600. $11,500 private sale − $250 costs − $6,000 payoff = $5,250. Private advantage is $650; break-even private price is $10,850 under those assumptions.

## Deliberate limitations

- All vehicle, repair, insurance, fuel-price, loan-rate, and sale-value amounts in examples are hypothetical, clearly labeled scenario inputs. They are not current prices or offers.
- Valuation tools are described as scenario models. No guide claims access to live market transactions or a licensed appraisal dataset.
- No universal state tax rate, transfer deadline, cooling-off period, or title rule is asserted. Texas and California are named examples, with instructions to verify the reader's own transaction and state.
- Recall and history searches are described with their coverage limits. No record or checklist is represented as a safety certificate.
- A non-specialist inspection does not include a guaranteed EV battery assessment. Readers are directed to appropriate specialists when needed.
- The loan guide distinguishes APR from contract interest rate and explains why using APR directly in an amortization formula can be approximate when fees exist.
- Economic ownership cost avoids double-counting loan principal and depreciation. Cash-flow budgeting is explained separately.
- No claim is made about Google rankings, structured-data eligibility, AdSense approval, affiliate availability, or future earnings.

## Maintenance triggers

1. Check cited source availability and substantive changes before public release and during scheduled editorial reviews.
2. Revisit state examples whenever the relevant official agency changes its guidance. Do not expand state advice by copying one jurisdiction's rule.
3. Revise a guide when tool behavior, input units, or formulas change so instructions remain accurate.
4. Add publication and revision dates only when those publication or substantive revision events actually occur. Use the site's real editorial identity; do not add a fictional individual reviewer.
5. When real market data becomes available, document the provider, licensing, coverage, freshness, and limitations before changing valuation claims.

## Content validation performed

The TypeScript data was parsed as JavaScript after removing its type declarations to inspect the exported records. All six guide bodies contain seven substantive sections, approximately 1,184–1,209 words including headings, and three or four related tool references. Descriptions are 150–157 characters. Example loan figures were independently recalculated with JavaScript. Application integration, link rendering, route availability, production build, and public structured-data validation remain the owning application's checks.
