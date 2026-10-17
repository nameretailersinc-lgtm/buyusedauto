# Owner-supplied SEO inputs

Update 18 October 2026: the new master brief supplies approximate Keyword Planner monthly estimates for US keyword clusters. They are recorded in `docs/seo-keyword-map.md` as owner-provided figures, without an original export date or targeting configuration. The historical paragraph below describes the earlier baseline. No actual GSC export was found during this checkpoint; the IDE-referenced `Table.csv` was absent at its supplied path.

Place GSC query/page/country/device exports and licensed Ahrefs, Semrush or Keyword Planner CSV exports or screenshots here. Include the source, market database, language, export date and reporting period. Do not include credentials or personal account information.

At baseline on 2026-10-15, no exports were supplied. The request refers to verified USA Semrush data but contains no metric rows. Pakistan ranges are described without actual ranges. Neither statement establishes numeric volume, KD or CPC. Treat missing metrics as UNVERIFIED, never zero, and do not scrape verification-protected keyword tools.

## Local Search Console report

In the Search results performance report, select an explicit completed period and search type. Export the query, page, country and device tables with identical filters. Use the English CSV export with one period; comparison exports, localized headings, spreadsheets and daily chart tables are not accepted. Record any country, device, query, page or appearance filters. Avoid an incomplete day when choosing the period. This command does not access your account or submit a sitemap.

Copy `gsc-report.example.json` to `gsc-report.json`, replace the three placeholder dates, match the property exactly, and record all applied filters. A domain property can use `sc-domain:buyusedautomobiles.com`; a URL-prefix property needs its normalized full URL. CSV filenames resolve relative to the configuration file. Remove any tables you did not export instead of inventing empty files. The example review thresholds are editable triage settings, not measured CTR benchmarks.

```powershell
npm run report:gsc -- --help
npm run report:gsc -- --config docs/seo/inputs/gsc-report.json --output reports/gsc-report.json
```

The report includes exported-row summaries, top rows by impressions, and separate query/page review lists for low CTR and the configured position range. CTR is recomputed from clicks/impressions; position is weighted by impressions. Lists can overlap. No output is generated when required context or input files are missing or invalid. Header-only tables are labeled empty, not evidence of zero site performance. A failed rerun leaves any older output untouched; check the command's exit status before using a report.

Independent tables are not joined or added together. Query omissions, grouping and export limits can prevent reconciliation with chart totals. A page-filtered query export is needed to examine a query/page relationship. Position is an average, not a fixed rank. Review intent, snippets and the actual content before acting on candidates; the tool supplies neither traffic forecasts nor causal explanations. See [Google's export/filtering limits](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive) and [Search Console grouping guidance](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data).

Input CSVs, the working configuration and default report files are ignored by Git. No credentials are needed; command logs show table counts rather than queries. Real input data has not been supplied as of 2026-10-17. Synthetic parser fixtures are confined to tests.
