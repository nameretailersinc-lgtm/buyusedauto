# Search Console monitoring plan

Goal: explain the drop from 642 impressions (24–27 Oct) to 76 (28–31 Oct) without assuming a cause.

## 1. Export the data

In Performance → Search results, Web, set the date filter to Custom → Compare. Choose 24–27 Oct vs 28–31 Oct (both four days). Export each of these tabs: Queries, Pages, Countries, Devices, Dates. If the UI is slow, use `npm run report:gsc` (`scripts/gsc-report.mjs`) if API credentials exist. Re-pull the data a week later, because recent days can be revised.

## 2. Compare

| Dimension | What to look for | What it indicates |
|-----------|------------------|-------------------|
| Queries | Did a few queries account for most of the 642 and then disappear? List the top 10 by impressions in window 1 and their window-2 value. | Concentrated loss points to ranking volatility on specific terms |
| Queries by position bucket | Split impressions into position 1–10, 11–20, 21–50, 51+. | If the loss is almost entirely 51+, that is lost deep impressions, not a penalty |
| Pages | Are losses sitewide or concentrated on one or two URLs? | Sitewide loss suggests a site-level cause (crawl, quality, indexing); concentrated loss suggests page-level |
| Countries | Did a country with many impressions (for example Pakistan, India, UAE) drop out? Check that the US share is stable. | Regional shifts affect the average position |
| Devices | Mobile vs desktop vs tablet changes. | A mobile-only loss points to mobile rendering or usability |
| Dates | Daily impressions from 20 Oct to now. | A sharp one-day cliff suggests a discrete event; a slide suggests gradual re-ranking |

## 3. Checks to run in Search Console

- Pages report: reasons for the 20 not-indexed URLs. Compare with the previous export, not just the count.
- URL Inspection on `/`, `/car-loan-calculator` and the top 5 pages from window 1: Google-selected canonical, last crawl date, indexed status, rendered HTML.
- Security & Manual Actions: both should be empty.
- Settings → Crawl stats: requests per day and response codes around 26–28 Oct.
- Sitemaps: submitted vs discovered for the 5 child sitemaps (81 URLs).

## 4. Conclusions that cannot be drawn without the exports

- Whether any ranking got worse or whether only low-ranking impressions disappeared.
- Whether the drop is sitewide or limited to a few queries or pages.
- Which countries and devices lost impressions.
- Whether any URL lost its indexed status or Google-selected canonical.
- Whether cannibalization exists between `/guides/complete-used-car-buying-guide` and `/guides/used-car-buying-checklist-first-time-buyers`.
- Whether an algorithm update or quality reassessment is involved.

## 5. Ongoing monitoring (after any change)

- Record each deployment date in `PROGRESS.md` so changes can be matched to traffic.
- Review weekly: impressions, clicks, average position, indexed vs not-indexed pages. Judge in 28-day windows; four-day windows on this volume are noisy.
- Make one kind of change at a time, and wait at least two weeks before judging it.
- Do not request indexing in bulk. Use URL Inspection for individual pages only after approval.
