# SEO technical audit and root-cause report

Audited 2026-11-02 against production (https://buyusedautomobiles.com) and the local repo at commit `0ef490c` (last commit 2026-10-22). No Search Console access was available.

## Symptom

Search Console: 24–27 Oct = 642 impressions, 1 click, impression-weighted position about 66.1. 28–31 Oct = 76 impressions, 0 clicks, position about 27.4. Impressions fell about 88%. The indexing report shows 77 indexed and 20 not indexed, with no change around 28 Oct.

## Confirmed findings (evidence gathered this session)

| # | Finding | Evidence |
|---|---------|----------|
| C1 | Production serves every sitemap URL with HTTP 200. | Live crawl of all 81 URLs from the 5 child sitemaps: 0 non-200, 0 duplicates. |
| C2 | No noindex on production. | No `X-Robots-Tag` header; `meta robots` is `index, follow` on all 81 URLs. `/robots.txt` allows `/` and lists only `/api/` as disallowed. |
| C3 | Canonicals are self-referencing on all 81 URLs. | Live crawl, trailing-slash-insensitive comparison. |
| C4 | Every page has exactly one H1 and server-rendered HTML (no page under 15 KB). | Live crawl. |
| C5 | Hosting is Docker plus nginx (`deploy/`), not Vercel. The `VERCEL_ENV` branch in `lib/seo-config.ts` is therefore not what controls production indexing; `SITE_INDEXING` is. The live headers show it is `enabled`. | `deploy/`, `compose*.yaml`, live response headers. |
| C6 | Local gates pass. | `npm run typecheck`, `npm run lint`, `npm test` (16 files, 250 tests), `npm run build`, `scripts/seo-audit.mjs` (0 failures, 0 warnings), `scripts/check-site.mjs` (81 pages, 629 links, 0 failures). |
| C7 | The last code commit predates the drop by 6 days. No deploy log was available to confirm what was deployed on 26–28 Oct. | `git log`. |

A correction to my earlier message: I raised the possibility that an environment flag had noindexed production. The live checks above rule that out.

## Plausible hypotheses (not confirmable from the repo)

1. **Loss of low-ranking impressions, not a ranking improvement.** An average position near 66 means most impressions came from results on page 6 or 7. Google often shows a new site's URLs at deep positions for a while and then stops. Impressions then collapse, and the average position of what remains looks "better". This matches the data, and it needs no penalty.
2. **Query-mix change.** A few queries with a very large number of impressions during 24–27 Oct could account for most of the 642. With 76 impressions in the second window, one or two query changes dominate.
3. **Rapid on-page changes during 21–22 Oct** (many titles, H1s and new calculators in about 24 hours) may have caused re-evaluation and reshuffling of rankings. This is a hypothesis only. Do not revert without evidence.
4. **Reporting artifact.** The most recent days in Search Console can be incomplete and later revised. Re-pull the data.
5. **Indexing state of the 20 not-indexed URLs is unknown.** Some are intentional (aliases, noindex categories). Others may be "Discovered/Crawled – currently not indexed".

## Requires Search Console access

- Query- and page-level exports for both windows (see `reports/search-console-monitoring-plan.md`).
- URL Inspection for the home page, `/car-loan-calculator` and the top pages in the first window.
- The reason per not-indexed URL (Pages report).
- Manual actions and Security issues pages.
- Crawl stats (hosts, response codes, crawl volume around 26–28 Oct).

## Not concluded

- No penalty or algorithm-update claim is supported or ruled out.
- Unchanged indexed-page counts do not prove there was no ranking event.

## Observations that are not defects

- `/` and `/tools` share about 75% of their paragraph content (audit signal, manual review). They are different pages with different intents; consider trimming the overlap later.
- The audit's H1 strings such as "calculatorsand" come from `<br/>` in the markup; the visible heading is fine.
- Two singleton guide categories are intentionally noindex (`financing`/`selling` per `docs/seo-indexing-remediation.md`); the live sitemap includes `/guides/category/financing`, so confirm this is current (see `reports/seo-implementation-summary.md`, open question 1).

## Code changes

None. No confirmed technical defect was found, and changing established titles or URLs now would confound the Search Console comparison.
