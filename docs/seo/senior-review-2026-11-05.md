# Senior SEO review, 2026-11-05

Scope: BuyUsedAutomobiles.com, local production build served on port 3517 (not the live domain). Review only; no site files edited. No paid SEO tool was available. Search volumes below come only from the supplied Keyword Planner file (docs/seo/keyword-research-2026-10-21.json; PKR bid currency, volumes are bucketed estimates, not traffic forecasts). I have no KD, DR, SERP or Search Console data, so anything about rankings or competitors is labelled UNVERIFIED.

Not judged (a writer may be mid-edit): data/country-guides.ts, data/country-tools.ts, data/pakistan.ts, data/states.ts. Their rendered pages were sampled only for structure (see the /pk/car-financing-calculator row below). Re-review after that writer finishes.

## 1. Command results (exact)

| Command | Result |
|---|---|
| `npm run build` | Exit 0. All routes prerendered. |
| `TEST_BASE_URL=http://127.0.0.1:3517 npm run check:site` | pages 81, internalLinks 629, failures [], warnings [] |
| `TEST_BASE_URL=http://127.0.0.1:3517 SEO_AUDIT_OUTPUT=reports/seo-review.json npm run audit:seo` | pages 83, sitemapUrls 81, internalDestinations 631, images 19, failures [], warnings [], duplicateParagraphSignals [] |

Server on 3517 was stopped afterwards (only the listener on 3517 was killed). The scripted checks pass, but they do not test any of the problems below, so a green check is not a clean bill of health.

My own sweep of all 81 sitemap URLs (rendered HTML): zero duplicate titles, zero duplicate descriptions, exactly one H1 per page, every JSON-LD block parses, no FAQPage markup anywhere (so no schema/visible-content mismatch there).

## 2. Findings by severity

Counts: Critical 0, High 5, Medium 9, Low 7.

### HIGH

**H1. Public About page contains a placeholder contact email and admits the operator is unconfirmed.**
- URL: /about. Source: data/policies.ts (about content) and the `operator` data in data/operator.ts.
- Evidence: rendered text shows "26 - G Hamriyah Freezone Sharjah, United Arab Emirates, info@nameretailer.com" and "The site's legal operator identity still needs to be confirmed before a public commercial launch."
- Why it matters: for a YMYL-adjacent finance topic, a placeholder email domain and a self-declared unconfirmed operator is the single biggest trust (E-E-A-T) and AdSense-review liability on the site. It also undercuts the Organization entity every page points at.
- Fix: replace with the real operating entity name, a monitored address on buyusedautomobiles.com, and delete the "still needs to be confirmed" sentence. If the operator cannot be named yet, remove the address block and say only "Contact: use the form on /contact". I cannot verify who the real operator is.

**H2. Calculator-named guide cannibalizes its calculator.**
- URL: /guides/how-much-does-it-cost-to-charge-an-electric-car, title "EV Charging Cost Calculator: Home vs Public" (43 chars). Competing page: /ev-charging-cost-calculator ("EV charging cost calculator: what a full charge costs").
- Evidence: two titles lead with the same exact phrase; the guide is not a calculator.
- Fix title: `How Much Does It Cost to Charge an Electric Car? Home vs Public` (63 chars; shorten to `What Does It Cost to Charge an Electric Car? Home vs Public` if you want it under 60). Keep the calculator title as is. Link guide to calculator with anchor "EV charging cost calculator".

**H3. Homepage title steals the money keyword from the calculator page.**
- URL: /. Live title: "Free Car Payment Calculator & Used Car Buying Guides". /car-loan-calculator is titled "Car payment calculator: used car loan with taxes and fees". Keyword Planner row "car payment calculator" is 500,000/mo (bucketed, the largest by far in the file), so this is the term most worth protecting.
- Evidence: two indexable pages with the same head term in the title; the keyword map (docs/seo-keyword-map.md) still says the homepage title is "Free Used Car Calculators & Buying Guides | BuyUsedAutomobiles" and primary keyword "used car research tools".
- Fix title: `Free Used Car Calculators & Buying Guides | BuyUsedAutomobiles` (62 chars incl. brand; drop the brand to get 49 if the template allows). Leave the head term to /car-loan-calculator. Whether this was a deliberate test, I cannot tell.

**H4. Staleness contradicts the site's own dating rule.**
- URLs: every guide, e.g. /guides/trade-in-vs-private-sale ("Updated 2026-10-17", "Sources checked 17 October 2026"), /guides/how-to-compare-used-car-loans ("Updated 2026-10-15 ... Sources checked 15 October 2026"), Article JSON-LD `dateModified` the same.
- Evidence: /editorial-policy says dates are added "only when a real editorial event is recorded". The copy was rewritten in November, which is a real event, but dates still read October, and no `datePublished` exists in any Article schema.
- Why it matters: "Sources checked <date>" is a verification claim. If the sources were not re-checked at the rewrite, the date is accurate for the old text only; if they were, the date is stale. Either way it is inconsistent. Freshness signals are also weak without datePublished.
- Fix: update `dateModified` and the visible date only for pages whose sources were actually re-verified; add `datePublished` to Article schema from the real first-publish date.

**H5. "Checked against the linked sources" is ambiguous against the no-human-review rule.**
- URL: /editorial-policy, also public/llms.txt "Production and citation".
- Evidence: "Content in this initial build was prepared with AI assistance and checked against the linked sources." Nowhere says by whom. Readers (and a quality rater) will read "checked" as a human check. The same page correctly says no reviewer endorsement is used, and llms.txt says "does not claim human expert review", which is the honest line.
- Fix text: `Content was drafted with AI assistance. It has not been reviewed by a named human expert. Each guide lists the sources it relies on; confirm figures with those sources.` Apply the same wording in llms.txt, llms-small.txt, llms-full.txt and the guide byline area. If a person genuinely checked the sources, say who did it and when.

### MEDIUM

**M1. Heading hierarchy: menu headings precede the H1 on every page.**
- Evidence (all 81 pages): document order is `h2 "Car loan calculator"`, `h3 "Popular tools"`, then `h1`. Footer also adds H2s ("Plan the purchase", "Own & sell smarter") after content. Source is the header mega-menu / footer components.
- Fix: render menu and footer labels as `<p>`/`<span>` (or `role="heading"` removed), keep a single H1 as the first heading.

**M2. Article schema is thin.**
- URL: all 31 Article pages, e.g. /guides/trade-in-vs-private-sale. Present: headline, dateModified, image, author (Organization, url /about), publisher (Organization, no logo), citation[]. Missing: datePublished, publisher.logo, `@id` links to the sitewide Organization (`#organization` exists on / only), `about`/`mainEntityOfPage` as object.
- Fix: reference `{"@id":"https://buyusedautomobiles.com/#organization"}` for publisher and author, add logo on the Organization (`/brand/logo-mark.png`, already in homepage schema), add datePublished. Do not add Person authors; that would break the honesty rule.

**M3. Organization entity is only declared on the homepage and has no corroboration.**
- Evidence: homepage JSON-LD Organization has name, url, logo only. No `sameAs`, no `contactPoint`, no address, and About shows a placeholder email (H1). For GEO, entity clarity depends on a consistent named entity across About, schema, llms.txt and footer.
- Fix: after H1 is resolved, add `contactPoint` and, if real, `sameAs` profiles. If none exist, do not invent them (UNVERIFIED that any exist).

**M4. Guide intro paragraph duplicates the meta description verbatim.**
- URLs: all five sampled guides. The first `<p>` after the H1 is the exact meta description (e.g. complete guide: "Buy a used car in 12 steps: set a budget, check the VIN and history, ..."), then a Quick answer repeats the idea. Not harmful, but it wastes the highest-weight spot and looks templated.
- Fix: drop the dek or replace it with one human line that is not the meta description. The Quick answer blocks themselves are strong (see Section 3).

**M5. Keyword-planner term broken or missing in titles.**
- /car-registration-tax-calculator title "Car registration tax and fee calculator: yearly costs" breaks "car registration tax calculator" (50,000 bucket). Fix: `Car registration tax calculator: yearly costs and fees`.
- /fuel-cost-calculator title "Gas mileage and fuel cost calculator: trip and yearly" splits "gas mileage calculator" (50,000 bucket). Fix: `Gas mileage calculator: trip and yearly fuel cost`. Note "fuel savings calculator" (5,000) has no page at all.
- "tax title license calculator" (5,000): no title carries it. /car-sales-tax-calculator and /guides/used-car-sales-tax-title-and-fees-explained are the candidates. Fix: guide title `Used Car Sales Tax, Title and License Fees: How to Estimate Them`, or add "tax, title and license" to the calculator description.
- /trade-in-value-estimator title "Trade-In Value Calculator & Equity Estimator | Free Tool" omits "car" from "car trade in value calculator" (5,000, Medium ads competition). Fix: `Car Trade-In Value Calculator: Compare Offers and Equity`. The only odd part is the "| Free Tool" suffix, inconsistent with other titles.
- /what-is-my-car-worth vs keyword map: map still says title "What is my car worth?" and primary "car value estimator"; live is "Car value calculator..." which matches the bucketed 50,000 "car value calculator". The map is stale, not the page.
- Full term-by-term coverage is in Section 4.

**M6. Keyword map and brand-suffix are out of sync with live.**
- docs/seo-keyword-map.md vs live: 27 of 81 sampled page titles differ from the map (e.g. /car-loan-calculator, /ev-charging-cost-calculator, all five country guides, the homepage). Brand suffix " | BuyUsedAutomobiles" is present on about half the titles (tools collection, policy pages, lease-vs-buy, scenario pages) and absent on the rest, 15 titles exceed 60 characters with the suffix.
- Fix: regenerate the map from live, pick one rule (suffix everywhere under 60 chars, or nowhere except home/about).

**M7. Internal link anchors are inconsistent with the renamed titles.**
- Evidence on /guides/complete-used-car-buying-guide: the same target gets different anchors: "Car Loan Calculator" (target title is "Car payment calculator"), "Car value estimate" and "Car Value Estimate", "Cost of Ownership Calculator" and "Cost of ownership", "Used Car Price Negotiation Guide". Several image/card links have empty anchor text.
- Fix: use the primary keyword as anchor for in-body links ("car payment calculator", "car value calculator", "trade-in value calculator"), keep short labels only in nav chips. Add `aria-label` to empty-text links.

**M8. Two URL patterns serve the same loan-scenario intent.**
- /car-loan-calculator/10000|25000|40000-car-loan and /car-loan-payment/15000-at-0-for-36-months, /20000-at-8-for-48-months, /25000-at-12-for-72-months. Plus /car-loan-calculator is the parent. Titles are distinct, so no duplicate-title issue, but UNVERIFIED whether Google will treat six near-identical calculators as thin. Scenario pages carry only `WebApplication` (no `@id`, `isAccessibleForFree`, `inLanguage`) while the main calculators carry them.
- Fix: add the three missing properties, keep all six only if each has unique worked content (the 25,000 page does: it states $396.02 payment, $3,761.48 interest). Watch Search Console for "Crawled - not indexed" before creating more.

**M9. Some Quick answers are honest but give searchers no number.**
- /guides/used-car-maintenance-costs ("vary widely ... a single annual figure can mislead"), /guides/how-many-miles-is-too-many-for-a-used-car ("No mileage figure is automatically too high"). For AEO the answer box is often won by a concrete range. The site cannot cite a figure without a source, so the fix is to add a sourced range or a clearly labelled hypothetical worked example in the first sentence, for example "As a budgeting example, set aside $X per month, then replace it with quotes". I did not verify any external figures.

### LOW

- **L1. Unsupported soft claim.** /guides/complete-used-car-buying-guide (data/pillar-guide.ts line 12): "these 12 steps catch most of the problems that cost buyers real money." No source. Fix: `these 12 steps target the common problems that cost buyers money, but they cannot catch every one.`
- **L2. Off-topic guide dilutes topical focus.** /guides/how-to-calculate-percentage-increase (category "Mathematics / Calculators", title "How to Calculate Percentage Increase (Formula + Examples)"). Not about cars. It also appears in llms.txt. Consider noindex, merging into the depreciation guide, or deleting. Impact on sitewide topical authority is UNVERIFIED.
- **L3. Repeated boilerplate headings.** "Your numbers, a clearer picture." (H2 on all 32 calculator and scenario pages), "Put the guidance into practice." (H3 on every guide), "Choose the right buying workflow" (H2 on every financing/selling guide), "Know how the guidance is made." and "The right car starts with the right budget." (collection pages and banner), plus an identical "Free to use / No account needed / UNVERIFIED scenario assumptions..." block on every calculator. The audit's duplicate-paragraph check does not flag these because they are headings and short. They read as templated. Replace the H2/H3 with page-specific wording, e.g. on /trade-in-value-estimator "Enter your offers and payoff".
- **L4. Visible UI strings leak into extracted text.** "Jump to a section 1 / 7" appears inside the guide body after every Quick answer; "UNVERIFIED" in capitals appears as user-facing copy. Cosmetic, but an answer engine may quote them. Mark navigational UI `aria-hidden` / data-nosnippet where appropriate.
- **L5. Homepage canonical and breadcrumb differ in trailing slash.** Canonical `https://buyusedautomobiles.com`; guide breadcrumbs use `https://buyusedautomobiles.com/`. Harmless; make consistent.
- **L6. Breadcrumb/H1 visual quirk.** Homepage H1 is `Free Used Car Calculators<br/><em>& Buying Guides</em>` so text extractors may read "Calculators& Buying". Add a space before `<br/>`. Same pattern on /tools and /guides H1s.
- **L7. llms.txt inconsistencies.** Tools have descriptions, guides and the two Pakistan guides do not. Guide link titles are the old long titles, not the current meta titles, "Trade-In Value Calculator" is title-cased unlike its siblings. llms.txt is optional and ignored by Google Search; low priority. The statement of limits and the "does not claim human expert review" line are good and should stay.

## 3. What is working (so nobody "fixes" it)

- Answer-first openings: all 27 guide pages have a Quick answer that states the answer in the first sentence and carries the caveat (spot-checked all). Calculators open with a one-paragraph plain statement ("Find out what a car will really cost you...", "Start with the 20/4/10 rule...") and a worked example. This is good AEO structure.
- Honesty rules are consistent: no live rates, quotes or valuations; "hypothetical", "illustrative", "UNVERIFIED scenario assumptions" are applied. No human-review, expert, or author-credential claims found in data/*.ts, components/ or app/ (grep for "human review", "reviewed by", "fact-check", "certified", "our team", "we tested"). No fabricated reviews or ratings.
- Citations: Article schema carries `citation[]` with FTC, CFPB, Texas Comptroller and state DMV links; guides show a "Sources and further reading" section.
- Robots: AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, etc.) are explicitly allowed; /api/ disallowed; sitemap declared.
- Titles: 81/81 unique, descriptions 81/81 unique; only six descriptions fall outside 120-160 chars: /car-loan-calculator (170), /car-loan-calculator/25000-car-loan (165), /car-loan-payment/15000-at-0-for-36-months (165), /gas-vs-electric-car-cost-calculator (165), /car-cost-per-mile-calculator (163), /car-registration-tax-calculator (162). Google rewrites descriptions freely, so low priority; trim them anyway.

## 4. Title vs Keyword Planner shortlist

Volumes are the file's bucketed monthly estimates (PKR bid currency, search market not established); I do not know the target market's real demand. "Position" = where the term begins in the live title.

| Keyword (bucket) | Page | Live title | Verdict |
|---|---|---|---|
| car payment calculator (500,000) | /car-loan-calculator | Car payment calculator: used car loan with taxes and fees | Good, position 1. Homepage also targets it (H3). |
| car loan payoff calculator (50,000) | /car-loan-payoff-calculator | Car loan payoff calculator: extra payments and early payoff | Good. Also covers "car loan extra payment calculator" (5,000). |
| auto loan refinance calculator (50,000) | /auto-loan-refinance-calculator | Auto loan refinance calculator: will refinancing save money? | Good. |
| car affordability calculator (50,000) | /car-affordability-calculator | Car affordability calculator: how much car can I afford? | Good. |
| car value calculator (50,000, High competition) | /what-is-my-car-worth | Car value calculator: how much is my car worth? | Good; slug is brand-new-owner phrasing, leave it. |
| car registration tax calculator (50,000) | /car-registration-tax-calculator | Car registration tax and fee calculator: yearly costs | Phrase broken ("tax and fee"). Fix in M5. |
| gas mileage calculator (50,000) | /fuel-cost-calculator | Gas mileage and fuel cost calculator: trip and yearly | Phrase split, "calculator" late. Fix in M5. |
| car down payment calculator (5,000) | /car-down-payment-calculator | Car down payment calculator: how much to put down | Good. |
| car loan apr calculator / auto loan apr calculator (5,000 each) | /car-loan-apr-calculator | Car loan APR calculator: see the true cost with fees | Good for "car"; "auto loan APR" variant only in body. Low. |
| car depreciation calculator (5,000) | /car-depreciation-calculator | Car depreciation calculator: what a car loses each year | Good. |
| car trade in value calculator (5,000) | /trade-in-value-estimator | Trade-In Value Calculator & Equity Estimator \| Free Tool | "car" missing; "Estimator" in the slug and "Free Tool" suffix add noise. |
| car sales tax calculator (5,000) | /car-sales-tax-calculator | Car sales tax calculator: estimate tax on a purchase | Good. |
| car repair cost calculator (5,000) | /car-repair-cost-calculator | Car repair cost calculator: budget from your quote | Good. |
| tax title license calculator (5,000) | none | none | Gap. See M5. |
| electric car charging cost calculator / ev charging calculator (5,000) | /ev-charging-cost-calculator | EV charging cost calculator: what a full charge costs | Good ("EV charging cost calculator" covers both); guide competes (H2). |
| fuel savings calculator (5,000) | none | none | Gap; no page targets it. |
| car maintenance cost calculator (500) | /car-maintenance-cost-calculator | Car maintenance cost calculator: monthly savings plan | Good. |
| car cost per mile calculator (500) | /car-cost-per-mile-calculator | Car cost per mile calculator: miles or kilometers | Good. |
| gas vs electric car cost calculator (500) / electric vs gas car cost calculator (50) | /gas-vs-electric-car-cost-calculator | Gas vs electric car cost calculator: which is cheaper? | Good. |

Beyond the shortlist: /lease-vs-buy-calculator is 63 characters with the suffix (drop the suffix), and the homepage title does not contain the keyword-map's stated primary "used car research tools" (that phrase is low value; the map should change, not the page).

## 5. Banned and robotic phrase scan (data/*.ts, plus app/ and components/)

| Phrase | Count | Locations |
|---|---|---|
| delve | 0 | |
| unlock | 0 | |
| game-changer | 0 | |
| in today's | 0 | |
| ultimate (word) | 0 real; 1 false positive "ultimately" | data/guides.ts:481 |
| whether you're | 1 | data/submitted-guides.ts:1662 ("...helps whether you're buying new, comparing used cars, or planning to sell the one you...") |
| it's important to note | 0 | |
| In conclusion | 0 | |
| navigate the landscape / landscape | 0 | |
| "whether you ..." (other forms, mostly legitimate "whether you can/need") | 13 | calculator-guides.ts:493, guides.ts, phase-two-content.ts, private-seller-guide.ts (2), submitted-guides.ts:425, tool-content.ts (3), tools.ts |
| comprehensive | 5 | country-guides.ts (2, not judged, may be mid-edit), guides.ts:155,170 (as a limitation: "not a comprehensive ..." which is fine), pillar-guide.ts:28 "Take a comprehensive test drive." |
| journey | 1 | data/guides.ts:318 ("long-distance journeys", legitimate) |

Fix the single "whether you're" at data/submitted-guides.ts:1662 (suggested: "That helps if you're buying new, comparing used cars, or planning to sell the one you own."). The data layer is clean. The templated headings in L3 are the real robotic residue; they live in components/, not data/.

## 6. Cannibalization map (judged from titles/H1s; ranking impact UNVERIFIED)

| Pair | Risk | Action |
|---|---|---|
| / vs /car-loan-calculator | High (H3) | Re-title homepage. |
| /guides/how-much-does-it-cost-to-charge-an-electric-car vs /ev-charging-cost-calculator | High (H2) | Re-title guide. |
| /guides/how-to-pay-off-a-car-loan-early vs /car-loan-payoff-calculator | Medium | Guide title "How to Pay Off a Car Loan Early: Costs & Savings" is informational and fine; make sure it does not use "calculator" and links the tool with "car loan payoff calculator" anchor. |
| /guides/is-refinancing-your-car-loan-worth-it vs /auto-loan-refinance-calculator | Low | Distinct intent (question vs tool). |
| /guides/how-much-down-payment-for-used-car vs /car-down-payment-calculator | Low | Distinct intent. |
| /guides/how-much-car-payment-can-i-afford vs /car-affordability-calculator | Medium | Both answer "how much can I afford"; keep guide on payment size, tool on whole-purchase budget, cross-link with that distinction in the anchors. |
| /guides/car-depreciation-chart and /guides/how-much-does-a-used-car-depreciate-per-year vs /car-depreciation-calculator | Medium | Three pages on one topic; the chart and per-year guides both carry the same 18%/12% worked example. Keep, but differentiate intros. |
| /what-is-my-car-worth vs /trade-in-value-estimator | Low-Medium | Trade-in page cross-links to depreciation scenario; wording is clear that it does not estimate market value. |
| /car-loan-calculator/* vs /car-loan-payment/* | Medium (M8) | Two URL patterns, same intent family. |

## 7. Pages sampled and what I saw

| URL | Title (chars) | Description | Notes |
|---|---|---|---|
| / | 52 | 153 | Organization + WebSite + Breadcrumb schema; menu H2/H3 before H1 (M1); H1 `<br/>` spacing (L6). |
| /tools | 60 (with suffix) | 149 | CollectionPage + ItemList(21) schema matches visible count of 21. |
| /guides | 43 | 157 | "All guides 29" visible; sitemap has 27 guide articles plus 3 country-hub pieces; verify the count text. UNVERIFIED which is intended. |
| /car-loan-calculator | 57 | 170 (trim) | WebApplication schema; intro is answer-first. |
| /car-affordability-calculator | 56 | 139 | Good worked example; H2s phrased as questions. |
| /what-is-my-car-worth | 47 | 144 | Good scope statement (no VIN, no live data). |
| /trade-in-value-estimator | 56 | 137 | Two H2s above the tool before "Your numbers..." is slightly muddled; "Free Tool" suffix. |
| /guides/complete-used-car-buying-guide | 52 | 156 | H1 (79 chars) differs from title, fine; "catch most" claim (L1). |
| /guides/how-to-compare-used-car-loans | 61 | 149 | Strong Quick answer; slug says compare-loans, title leads with "How car loan interest is calculated"; primary keyword mapped is unverified. |
| /guides/trade-in-vs-private-sale | 52 | 147 | Good; break-even section is useful. |
| /guides/how-much-down-payment-for-used-car | 55 | 147 | Good; "10% to 20%" presented as a range to compare, not a rule. H1 and title differ slightly in year wording. |
| /car-loan-calculator/25000-car-loan | 60 | 165 | Numbers check: $20,000 at 7%/60 months = $396.02, interest $3,761.48 (consistent). |
| /pk/car-financing-calculator | 48 | 156 | Structure only (file owned by another writer). Schema valid, `inLanguage en-PK`. H1 ends with a period, unlike every other page. |
| public/llms.txt | n/a | n/a | Honest limits section; see L7. |

## 8. Things I could not verify

- Whether the live domain matches this local build (deployment status unknown).
- Rankings, impressions, click-through, indexation of scenario pages, backlinks, domain rating, keyword difficulty, SERP competitors: no Search Console, no paid tool.
- Real search demand for the US: the Planner file's currency is PKR and its scope note says the market is not established.
- The four country files listed above, and whether the "29 guides" figure on /guides is intended.
- Whether sources cited in guides still say what the guides say (I checked that links exist in schema, not the target pages).
- Who the real operator is (H1).

## 9. Top 10 quick wins

1. Fix /about: real operator and monitored email, remove "still needs to be confirmed" (H1).
2. Re-title /guides/how-much-does-it-cost-to-charge-an-electric-car away from "Calculator" (H2).
3. Re-title the homepage to `Free Used Car Calculators & Buying Guides | BuyUsedAutomobiles` (H3).
4. Rewrite the AI/"checked" sentence on /editorial-policy and in llms*.txt as "drafted with AI assistance, not reviewed by a named human expert" (H5).
5. Align visible "Updated" dates and `dateModified` with real re-verification, add `datePublished` (H4, M2).
6. Convert header/footer menu headings to non-heading elements so the H1 comes first on all 81 pages (M1).
7. Re-title /car-registration-tax-calculator (`Car registration tax calculator: yearly costs and fees`) and /fuel-cost-calculator (`Gas mileage calculator: trip and yearly fuel cost`) (M5).
8. Retitle /trade-in-value-estimator as `Car Trade-In Value Calculator: Compare Offers and Equity` and drop "| Free Tool" (M5).
9. Replace the repeated "Your numbers, a clearer picture." and "Put the guidance into practice." headings with page-specific wording (L3), and fix the one "whether you're" in data/submitted-guides.ts:1662.
10. Normalize internal anchor text to the target's primary keyword and regenerate docs/seo-keyword-map.md from live (M6, M7).
