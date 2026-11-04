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

### Tests (working tree)
- `tsc --noEmit`: clean. `vitest run`: 16 files, 250 tests pass.
- `npm run build`: pass. `check:site`: 81 pages, 0 failures, 0 warnings. `audit:seo`: 83 pages, 0 failures, 0 warnings.
- Playwright: 52 of 53 passed; the 1 failure was the reworded FAQ assertion, since updated. The suite has not been re-run after that edit.
- Lint was last run before the final edits.

### Keyword opportunities (observations, not ranking metrics)
See `KEYWORD_PAGE_MAP.csv`. Strongest fits for existing pages: extra-payment/payoff, tax-title-license, depreciation by mileage and age, sales tax by state, negative-equity trade-in, 20/4/10 affordability, printable inspection checklist, refinance break-even, Pakistan bank-neutral installment calculator. One new tool is plausible (out-the-door price) pending owner approval and demand check.

### Expected mechanisms (not guaranteed)
Clearer single owner per query; answer-first intros that can be quoted by search and AI answers; titles that carry the searched term; fewer boilerplate and cannibalizing pages; crawler access stated explicitly.

### Next
1. Deploy and request indexing. 2. Fill `SEO_BASELINE.md` from GSC. 3. Add out-the-door, negative-equity and term-comparison sections to existing pages. 4. Re-run lint and the Playwright suite. 5. Owner items in `SEO_IMPLEMENTATION_PLAN.md`.

### Review schedule
Compare against the baseline at +7, +14, +28 and +56 days after deployment. No recurring monitoring is configured; reviews are manual unless the owner asks for a scheduled task.
