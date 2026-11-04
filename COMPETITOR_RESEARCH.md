# Competitor research, 2026-11-05

Method and limits. Everything here comes from WebSearch result lists (titles, URLs and snippets) for about 31 queries, run 2026-11-05. WebSearch results are not Google's live ranking positions. I did not open competitor pages, so "useful feature" entries are what result snippets showed and are marked as snippet-level. No Ahrefs, SEMrush or DataForSEO data was available, so authority, traffic, backlink and keyword-count figures are `unavailable` for every domain below. Competitor wording is not reproduced.

Excluded as scraped, mirror or spam: the many pages with scrambled or repeated titles on unrelated hosts (for example subdomains on aegro.com.br, zeiss.es, appbase.io, pantherdb.org, puri.sm, inhilkab.go.id-style hosts, matthewmarks.com, mohawkgroup, test-ipv6.com, fontan24.ru, and "web log free" pages). Also excluded: autoscore.pro (six near-duplicate posts in one list) and anonymous free-host calculators on `.pages.dev` hosts as named competitors (mentioned only as a SERP-weakness pattern). Their appearance in lists is an observation about result quality, not a claim about their rank.

## 1. Aspirational leaders (hard to outrank on authority; useful as benchmarks and citation targets)

| # | Domain / URL seen | Queries seen for | Page type | Useful tool or feature (snippet-level) | Content gap vs this site | Link-worthy asset |
|---|---|---|---|---|---|---|
| 1 | chase.com (/personal/auto/education/...) | 20/4/10 rule; APR vs interest rate; down payment; best time to buy; how much to spend | Bank education article | Plain-language rule explainers | This site offers interactive calculators for the same rules; Chase pages seen were articles | None to copy; cite as a rule-of-thumb reference |
| 2 | capitalone.com (/cars/learn/...) | 20/4/10; private-seller questions; APR vs rate; mileage; down payment | Lender education article | Question lists and rule explainers | Same: this site can pair explanation with a working tool | n/a |
| 3 | sofi.com | refinance calculator; down payment | Lender calculator and article | Lender-branded auto refinance calculator | This site's refinance tool is lender-neutral and models fees and break-even | n/a |
| 4 | edmunds.com | down payment; negotiation | Editorial | Pricing data and negotiation guidance (snippet-level) | Cannot match their market data; compete on transparency of assumptions | n/a |
| 5 | cars.com | trade-in vs private sale; mileage | Editorial | Articles with market tie-ins | No interactive net-proceeds comparison seen in the result | n/a |
| 6 | jdpower.com | mileage | Editorial | Mileage ceiling guidance | Low win odds on head term; support only | n/a |
| 7 | consumerfinance.gov | APR vs interest rate | US regulator Q&A | Authoritative definition | Use as a cited source for APR page | Citation target |
| 8 | bls.gov | depreciation by year; maintenance by age | Government data chart/paper | Annual depreciation rates by age chart; older ownership-cost research | Data is public: cite it on the depreciation page and build an explainer chart | Source to cite; not a link prospect |
| 9 | pakwheels.com (/car-loan-calculator/<bank>, /car-finance/) | PK installment, bank, Ijarah queries | Marketplace plus per-bank calculator pages | One calculator URL per bank (about 10 banks seen) | This site's PK page is bank-neutral; PakWheels owns bank-name queries | Their per-bank URL pattern is the thing to avoid replicating thinly |

## 2. Realistic ranking competitors (small independent or vendor tool sites actually seen)

| # | Domain / URL seen | Queries seen for | Page type | Useful tool or feature (snippet-level) | Content gap vs this site | Link-worthy asset (what this site could build) |
|---|---|---|---|---|---|---|
| 10 | caredge.com (/out-the-door-price, /guides/..., /compare/depreciation/...) | out-the-door price; private-seller questions; depreciation | Vendor tool plus guide library | OTD calculator from selling price; interactive depreciation comparisons by model/class | This site has no dedicated OTD tool; CarEdge's depreciation is model-specific, which this site cannot match without data | A transparent OTD estimator with visible assumptions |
| 11 | carregistrationfee.com (/tools/...) | negative equity; used car sales tax | Small tool site | Negative-equity tool that models state trade-in tax credit; used car sales tax by state | Overlaps this site's trade-in and tax tools; compare their handling of state credits | State tax-rule notes with citations to each state revenue agency |
| 12 | privateauto.com (/used-car-sales-tax-calculator, /sales-taxes, /bill-of-sale, blog) | sales tax; bill of sale; private-seller questions; scams | Vendor hub: tools, templates, blog | Sales tax calculator, bill of sale template | Strong private-sale cluster; this site's private-seller guide lacks a title/bill-of-sale checklist | Neutral buyer-side title and paperwork checklist |
| 13 | carwhere.com (/tools/out-the-door-price-calculator, /guides/car-negotiation, /vin-check) | OTD; negotiation; VIN check | Vendor tools and guides | OTD calculator; negotiation guide | Similar scope to this site's planned tool set | n/a |
| 14 | carconciergepro.com | OTD; payment calculator | Concierge-service site with tool | OTD breakdown by state in a single tool | Service-driven; limited depth on explanation | n/a |
| 15 | miniwebtool.com | OTD; 20/4/10; affordability | Generic calculator site | Fields for tax, trade, rebate, fees, financing | Generic UI; no used-car context | n/a |
| 16 | mystrodriver.com (/tools/cost-per-mile-calculator) | cost per mile | Small tool | Depreciation estimated from year, model and odometer | This site's cost-per-mile tool: check whether depreciation input exists | Cost-per-mile benchmark methodology note |
| 17 | hakaru.io (/tools/ev-vs-gas-calculator, /guides/...) | EV vs gas; affordability | Tool plus guide | Break-even year in EV vs gas comparison | Comparable; this site can differentiate with a used-EV angle | n/a |
| 18 | recharged.com | EV vs gas; down payment (used EV) | Used-EV vendor blog | Spreadsheet-style guidance | Used-EV focus is overlap with this site's EV tools | n/a |
| 19 | rategenius.com, sccu.com | term comparison | Lender/credit union article with comparison table | Fixed-amount 48/60/72-month comparison table | This site could present a user-editable table | Term-length comparison table |
| 20 | keysavvy.com | trade-in vs private sale | Vendor study/blog | Data-backed trade vs private comparison (vendor-sourced) | No interactive net-proceeds comparison seen | Methodology-transparent trade vs private net-proceeds view |
| 21 | toolsfluent.com | PK calculators, KIBOR, car loan Pakistan guide | Small tool and blog site | Multiple PK bank calculator pages; dated rate notes | Main independent PK competitor seen; this site has two PK guides plus one calculator | Dated, sourced PK rate table with caveats |
| 22 | clark.com | refinance calculator; free VIN report | Consumer-advice publisher | Refinance calculator page; VIN-check explainer | Moderate size; authority `unavailable` | n/a |

## 3. Tool and feature gaps this site could fill with original utility

Checked against the repo first: `data/tools.ts`, `data/tool-content.ts` and `components/inspection.tsx` show that a print / save PDF button already exists on the inspection checklist, negative-equity handling exists inside the trade-in estimator and a trade-offer comparison component, and "out-the-door" and "term comparison" appear in tool copy. Depth of those features was not tested here.

1. Used-car out-the-door price estimator (new URL candidate). Inputs: price, state or combined tax rate, trade-in, doc/title/registration fees entered by the user, optional financed add-ons, loan terms. Output: cash due and amount financed. Competitor tools exist (CarEdge, CarWhere, CarConciergePro), but results mix mirror pages and one vendor noted a tax mismatch against a dealer quote, so visible assumptions are the differentiator. Needs confirmation of what `/car-sales-tax-calculator` already covers before building.
2. Term-length comparison table on the existing loan calculator: 36/48/60/72/84 months side by side for the user's own price, APR and down payment, showing payment, total interest and months underwater. Only fixed-amount static tables were seen in results.
3. Negative-equity rollover cost view (strengthen the existing trade-in page): how much the rolled balance adds to payment and total interest, versus paying it down first. Check what the current trade-offer comparison already shows.
4. Trade vs private-sale net proceeds with state tax credit toggle, extending the existing trade-in tool.
5. Printable inspection PDF: already exists. Action is wording and discoverability (title/H1 wording around "printable" and "PDF") rather than a build.
6. Buyer-side title and bill-of-sale paperwork checklist (guide plus printable), linked from the private-seller guide.
7. Depreciation-by-age chart sourced to public BLS data, on the existing depreciation page.
8. PK: dated, sourced bank comparison table with an explicit "indicative only" note and a "last checked" field per row.

## 4. SERP weaknesses observed (observations only)

- For "negative equity", "tax title license", "extra payment calculator" and "depreciation calculator by mileage" the lists were mostly scrambled auto-generated pages on unrelated hosts with few recognisable tools.
- For "out the door price calculator", "cost per mile" and "EV vs gas", lists were mixed with small vendor tools and anonymous free-host calculators whose sample numbers disagreed.
- "How much car can I afford" results disagreed widely on the answer (roughly 12k to 40k for a 60k salary) and were mostly affiliate or free-host pages.
- Head informational terms (APR vs interest rate, 20/4/10, mileage, down payment, private-seller questions) were dominated by banks, regulators and large publishers: low win odds by content alone.
- Pakistan queries: PakWheels holds bank-name pages; independent blogspot and small tool sites also appeared; KIBOR figures differed by date across sources.
- Some SERPs contained overseas results (AU, IE, ZA, CA, UK) for US-intent queries.

## 5. Internal-linking patterns observed

Limited to what URLs and titles revealed, since pages were not opened. PakWheels uses one calculator URL per bank under a shared path. CarEdge uses a calculator page, a guide library and many model-comparison URLs. PrivateAuto groups a tool, a state tax hub and a bill-of-sale template with blog posts. Lesson for this site: keep one canonical owner per intent (as docs/seo-keyword-map.md already does) and avoid per-bank or per-state thin pages.

## 6. Outreach opportunity types (not drafted, no contacts collected)

- Credit unions and community banks that publish car-buying education: offer a lender-neutral calculator or checklist as a resource citation.
- Personal-finance and budgeting bloggers who cover car affordability: a transparent assumptions page and 20/4/10 mode.
- Pakistani personal-finance and auto blogs: a dated, sourced PK financing comparison.
- Universities, libraries and consumer-education pages that list free calculators: resource-page inclusion.
- Used-EV and EV-owner communities: the EV charging and EV vs gas tools.
- Journalists writing about auto-loan terms and negative equity: a data-backed explainer, only if built on cited public data.
- Broken or outdated resource-list pages for inspection checklists: suggest the printable checklist.

Each type needs prospect lists built with a proper backlink tool; none were verified here.
