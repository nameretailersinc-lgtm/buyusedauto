# SEO progress log

## 2026-11-05

### Researched
- Live HTTP checks of robots.txt, sitemap index (5 sitemaps, 81 URLs), redirects, canonicals and key pages.
- 146 keyword candidates (129 US, 17 PK); 31 had their result lists inspected via web search. 24 carry a Keyword Planner bucket from the owner's export. Difficulty is `unavailable` for all rows; no paid SEO tool was connected.
- 22 competitor domains (9 aspirational, 13 realistic), with scraped/mirror domains excluded.

### Confirmed vs assumed
- Confirmed: site is crawlable and indexable; no repo change coincides with the 28 Oct impression drop.
- Not established: the cause of the drop, any penalty or manual action, rankings, indexed counts, field Core Web Vitals.

### Changed
- Titles/descriptions/intros for all 21 calculators and the homepage; body copy, FAQs and scenarios; guides (core, submitted, pillar, calculator, private-seller, payoff, international); country and Pakistan pages; policies; `llms*.txt`.
- Homepage title reverted to the non-competing form; EV guide retitled; planner terms added to registration, fuel and trade-in titles.
- Header menu headings no longer precede the H1.
- robots.txt: explicit crawler allow list; non-standard `Host:` removed.
- Editorial wording corrected (AI-drafted, not reviewed by a named human expert).
- `data/country-tools.ts`: "T?V" corrected to "TÜV".
- `tests/browser/payoff-guide.spec.ts`: updated one assertion to the reworded FAQ.
- Incident: a helper script of mine emptied `data/policies.ts`; it was restored from the committed copy, the wording fix was re-applied, and tests pass.

### Implemented later on 2026-11-05 (plan tasks 3, 4, 5, 9)
- `/car-loan-calculator`: new sections "What's in an out-the-door price?" and "How much does the loan term change the cost?" with a worked $20,000 example (figures recomputed: $21,900 out-the-door, $18,900 financed; 48/60/72 months at an illustrative 7% = $452.58 / $374.24 / $322.23 a month).
- `/trade-in-value-estimator`: new section on rolling negative equity into a new loan, with a recomputed $2,500 example ($356.42 vs $405.92 a month at an illustrative 7%, 60 months).
- `/car-sales-tax-calculator`: new section explaining tax, title and license fees (the planner term "tax title license"), pointing to the registration calculator.
- Repeated template headings replaced: calculator panel is now "<tool> estimate", guide callout "Run the numbers before you decide", workflow block "Where to go next", guides-hub note "How these guides are written" (and its wording no longer says guides are "checked").
- Not changed: `/guides/how-to-compare-used-car-loans` already has a computed 48 vs 72 month example and a negative-equity section, so no duplicate was added.
- Not done (owner input needed): new pages, `/about` operator details, Article dates.

### Tests (working tree)
- `tsc --noEmit`: clean. `vitest run`: 16 files, 250 tests pass.
- `npm run build`: pass. `check:site`: 81 pages, 0 failures, 0 warnings. `audit:seo`: 83 pages, 0 failures, 0 warnings.
- Playwright: 53 of 53 pass after the final edits. Lint, typecheck, build, `check:site` and `audit:seo` also pass after the final edits.

### Keyword opportunities (observations, not ranking metrics)
See `KEYWORD_PAGE_MAP.csv`. Strongest fits for existing pages: extra-payment/payoff, tax-title-license, depreciation by mileage and age, sales tax by state, negative-equity trade-in, 20/4/10 affordability, printable inspection checklist, refinance break-even, Pakistan bank-neutral installment calculator. One new tool is plausible (out-the-door price) pending owner approval and demand check.

### Expected mechanisms (not guaranteed)
Clearer single owner per query; answer-first intros that can be quoted by search and AI answers; titles that carry the searched term; fewer boilerplate and cannibalizing pages; crawler access stated explicitly.

### Next
1. Deploy and request indexing. 2. Fill `SEO_BASELINE.md` from GSC. 3. Add out-the-door, negative-equity and term-comparison sections to existing pages. 4. Re-run lint and the Playwright suite. 5. Owner items in `SEO_IMPLEMENTATION_PLAN.md`.

### Review schedule
Compare against the baseline at +7, +14, +28 and +56 days after deployment. No recurring monitoring is configured; reviews are manual unless the owner asks for a scheduled task.
