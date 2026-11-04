# SEO implementation plan

Date: 2026-11-05. Inputs: `SEO_AUDIT.md`, `KEYWORD_RESEARCH.csv` (146 candidates, 31 with an inspected result list), `COMPETITOR_RESEARCH.md`, `KEYWORD_PAGE_MAP.csv`.

## Prioritization method

Score each task 1-5 on six factors and multiply by the weights; a missing metric scores 1 and lowers confidence, it is never guessed.

| Factor | Weight |
|---|---|
| Demand evidence (Keyword Planner bucket, only if exact match) | 2 |
| Ranking feasibility (observed weakness in result lists, not DR/KD) | 2 |
| Business relevance | 2 |
| Existing page fit / unique tool advantage | 2 |
| Technical impact | 1.5 |
| Evidence confidence | 1.5 |
| Implementation cost | -1 (higher cost lowers the score) |

Demand is only counted when the keyword is in the owner's export, whose buckets are PKR bid estimates with no stated geography. Keyword difficulty and domain rating are `unavailable` for every row.

## Done in this pass (in the working tree, not yet deployed)

1. Homepage title reverted to `Free Used Car Calculators & Buying Guides`, so `/car-loan-calculator` owns "car payment calculator".
2. EV guide retitled so it no longer competes with the EV calculator.
3. Titles for registration tax, fuel/gas mileage and trade-in now carry the exact planner terms.
4. Header menu headings converted to non-heading elements, so every page starts with its H1.
5. Editorial wording corrected to "drafted with AI assistance, not reviewed by a named human expert" (policy page and `llms*.txt`).
6. Robots.txt allows search and AI-answer crawlers explicitly; the non-standard `Host:` line was removed.
7. Copy rewritten across tools, guides, country pages, policies and `llms*.txt` (see `SEO_PROGRESS.md`).

## Status
Tasks 3, 4, 5 (wording only) and 9 below are implemented in the working tree; tasks 1, 2, 7, 8 need the owner; 6 and 10 are open (payoff wording already carries "extra payments and early payoff"; keyword map still to be regenerated).

## Next, in order (existing pages first)

| # | Task | Page(s) | Mechanism | Needs |
|---|---|---|---|---|
| 1 | Deploy, then request indexing of `/` and the 21 calculators; resubmit sitemap | site | Faster recrawl of new titles | Owner |
| 2 | Fill `SEO_BASELINE.md` from GSC | site | Makes later comparison possible | Owner |
| 3 | Add an out-the-door price section (price + tax + title/registration + doc fee - down payment - trade-in) with one worked example | `/car-loan-calculator`, `/car-sales-tax-calculator` | Answers an intent seen in results without a new URL | Content QA |
| 4 | Negative-equity section and term-length (48/60/72 month) comparison table | `/trade-in-value-estimator`, `/guides/how-to-compare-used-car-loans` | Matches observed weak result lists | Content QA, tests for any new math |
| 5 | Decide whether "tax title license calculator" belongs to the sales-tax or registration page, then align title and anchors | `/car-sales-tax-calculator` | Stops two pages splitting one term | Owner decision |
| 6 | Make "extra payment" and "payoff date" wording prominent | `/car-loan-payoff-calculator` | Exact-term fit | Content QA |
| 7 | Fix `/about` contact and operator statement | `/about`, `data/operator.ts` | Trust signal | Owner (real details) |
| 8 | Add `datePublished`, publisher logo and `@id` to Article schema once real dates are decided | guides | Clearer freshness and entity signals | Owner (dates) |
| 9 | Replace repeated template headings with page-specific wording | components | Reduces boilerplate | Dev |
| 10 | Regenerate `docs/seo-keyword-map.md` from live titles | docs | Documentation sync | Dev |

## New pages: only if justified

Candidates from `KEYWORD_PAGE_MAP.csv`: an out-the-door price calculator (medium confidence), a title and bill-of-sale checklist, a free-VIN-check guide, a negative-equity explainer. None should be built before:
- the existing-page sections in tasks 3-4 are live and indexed (otherwise a new URL would split the same intent), and
- Search Console shows impressions for the matching queries.

If built, a new calculator needs unit tests for the formula (price + taxable fees + tax + non-taxable fees - credits), a distinct title, internal links from the loan, sales-tax and trade-in pages, and an entry in the sitemap and `llms.txt`. No permutation pages.

## Not planned (and why)

- No deletions: no evidence any page harms the site.
- No more scenario pages: six is enough; more would be near-duplicates.
- No hreflang: no verified translations.
- No FAQPage markup: restricted rich results; the visible FAQ content is still written answer-first.
- No outreach sent; see `COMPETITOR_RESEARCH.md` for opportunity types only.

## Owner approvals required

Deploy to production; real operator identity and contact; what counts as a real re-verification for "Updated" dates; whether to build any new page; any outreach or paid tool.
