# SEO audit: buyusedautomobiles.com

Date: 2026-11-05. Scope: repository (Next.js 16.4 App Router, static prerender, nginx in front) plus live HTTP tests. Evidence labels: **CONFIRMED** (tested), **HYPOTHESIS** (plausible, not tested), **UNAVAILABLE** (needs access I do not have).

## 1. Impression decline (24-30 Oct 2026)

Owner-reported daily impressions: 187, 167, 174, 114, 26, 17, 18.

| Question | Finding | Status |
|---|---|---|
| Was there a code change near 27-28 Oct? | Git history has commits on 22 Oct and 2 Nov, none from 23 Oct to 1 Nov. The drop does not line up with a repo change. | CONFIRMED (git log) |
| Is the site blocking crawlers or indexing now? | No. robots.txt allows all, no noindex on sampled pages, canonicals correct, sitemaps return 200. | CONFIRMED (live curl, 5 Nov) |
| Was it a penalty, manual action or update? | Cannot be determined without Search Console. Nothing here supports calling it a penalty. | UNAVAILABLE |
| Most likely explanations | (a) The early-window impressions were a new-site "honeymoon" or a burst of long-tail testing that then settled; (b) one or two queries/pages stopped ranking; (c) a deploy or hosting interruption not visible in git; (d) reporting/filter changes in GSC. None is established. | HYPOTHESIS |
| Scale | 187 impressions a day is very small, so single queries moving in or out can explain a large percentage change. | CONFIRMED (arithmetic) |

Evidence needed from the owner: GSC Performance (Web, daily, 28 days, by page and query, plus country and device), Pages (indexing) report with the "Why pages aren't indexed" table and dates, URL Inspection of `/` and `/car-loan-calculator`, Manual actions, Security issues, server/CDN logs for 23-30 Oct (5xx, timeouts, blocked Googlebot), and the deployment log.

## 2. Technical status

| Check | Result | Status |
|---|---|---|
| http to https; www to apex | 301 / 308 to `https://buyusedautomobiles.com` | CONFIRMED |
| robots.txt | 200, `Allow: /`, `Disallow: /api/`, explicit allow for search and AI-answer crawlers, sitemap declared | CONFIRMED |
| Sitemap index | 200; core 18, tools 25, guides 29, scenarios 6, pk 3 URLs | CONFIRMED |
| Local `check:site` | 81 pages, 629 internal links, 0 failures, 0 warnings | CONFIRMED |
| Local `audit:seo` | 83 pages, 81 sitemap URLs, 631 internal destinations, 0 failures, 0 warnings, no duplicate-paragraph signals | CONFIRMED |
| Canonicals, meta robots | Self-canonical, `index, follow` on sampled live pages; no query strings | CONFIRMED |
| Response time (live, sampled) | 0.76-1.07 s total for HTML | CONFIRMED (single request each) |
| Structured data | Organization, WebSite, BreadcrumbList, Article, WebApplication, CollectionPage; no FAQPage | CONFIRMED |
| Core Web Vitals (field) | Not measured here | UNAVAILABLE |
| Lighthouse (lab) | Older reports in `reports/`; not re-run this session | UNAVAILABLE |
| Playwright e2e | Not re-run after the content rewrite | NOT RUN |

## 3. Issues, severity-ranked

No critical technical blockers were found.

**High**
1. Live homepage title is `Free Car Payment Calculator & Used Car Buying Guides`, which competes with `/car-loan-calculator` for the highest-volume bucket term. Fixed in the working tree (reverted to `Free Used Car Calculators & Buying Guides`); needs deploy. CONFIRMED.
2. `/about` shows a placeholder-looking contact email and says the legal operator is unconfirmed. Trust problem; only the owner can fix it. CONFIRMED (see `docs/seo/senior-review-2026-11-05.md`).
3. Guide "Updated" dates and `dateModified` are October while text was rewritten in November; no `datePublished`. The owner must decide what counts as a real re-verification. CONFIRMED.
4. EV guide `/guides/how-much-does-it-cost-to-charge-an-electric-car` had the SEO title `EV Charging Cost Calculator: Home vs Public`, cannibalizing `/ev-charging-cost-calculator`. Fixed in the working tree. CONFIRMED.

**Medium**
5. Header menu renders an H2 and H3 before the H1 on every page. Not yet fixed (needs CSS-safe change). CONFIRMED.
6. Titles missing the exact planner term: registration (`car registration tax calculator`), fuel (`gas mileage calculator`), trade-in (`car trade in value calculator`). Fixed in the working tree.
7. Editorial wording said content was "checked against the linked sources" without saying by whom. Reworded to "drafted with AI assistance and has not been reviewed by a named human expert" in `data/policies.ts` and the `llms*.txt` files.
8. Article schema lacks `datePublished`, publisher logo and `@id`. Not yet changed (dates need an owner decision).
9. Keyword map (`docs/seo-keyword-map.md`) is out of sync with live titles.

**Low**
10. One unsupported soft claim in the pillar guide ("catch most of the problems") reworded. One "whether you're" opener removed.
11. Repeated template headings on all calculator and guide pages ("Your numbers, a clearer picture.", "Put the guidance into practice.").
12. `/guides/how-to-calculate-percentage-increase` is off-topic for the car audience; kept, not deleted (no evidence it harms anything).
13. Two URL patterns (`/car-loan-calculator/*`, `/car-loan-payment/*`) for six scenario pages. Each has distinct written content; kept, no more to be added.

## 4. Cannibalization map (judged from titles; ranking impact UNVERIFIED)

- `/` vs `/car-loan-calculator`: resolved by the homepage title revert.
- `/guides/how-much-does-it-cost-to-charge-an-electric-car` vs `/ev-charging-cost-calculator`: retitled; the guide should link to the calculator.
- `/car-loan-calculator` vs `/car-loan-payment/*` and `/car-loan-calculator/*` scenarios: different named scenarios; watch GSC for query overlap.
- `/guides/how-much-down-payment-for-used-car` vs `/car-down-payment-calculator`: guide answers "how much", calculator computes; keep, cross-link.
- `/car-affordability-calculator` vs `/guides/how-much-car-payment-can-i-afford`: same pattern.

## 5. What I could not verify

Search Console data, rankings, indexed-page counts, field Core Web Vitals, backlinks, Domain Rating, keyword difficulty, who the real operator is, and whether the live domain equals this working tree (the live homepage title and robots.txt do match recent working-tree changes, so deployment appears to follow commits).
