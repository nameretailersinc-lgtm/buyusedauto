# Global SEO upgrade implementation report

Date: 2026-10-15. Branch: `seo-global-upgrade`. Baseline source commit: `fa3895c5800f3024d4be415f3f7ba3781d0c54a7`.

## Phase 1: baseline and access checkpoint

Created `docs/seo/` and `docs/seo/inputs/`. Retained all application code, URLs and existing calculators. This phase establishes fresh validation rather than adopting historical audit results. No push, merge or deployment was performed.

Node v20.20.2; npm 10.8.2; Windows PowerShell. Initial `npm ci --cache .npm-cache --prefer-offline --no-audit --no-fund` attempts failed with EPERM/ENOTEMPTY in the interrupted dependency tree, including `node_modules/next/dist`. Moved the incomplete dependency directory to `.npm-cache/interrupted-node_modules-20261015` for recoverability. No Node processes remained when inspected. Repair with `npm install --ignore-scripts --cache .npm-cache --prefer-offline --no-audit --no-fund --package-lock=false` exited successfully, adding 605 packages, with an optional-package cleanup warning. Lifecycle scripts were skipped in this repair; subsequent build/tests must establish whether required native dependencies work. The tracked manifest and lockfile were not changed. A reproducible clean `npm ci` remains unproven in this environment.

## Account and evidence status

| Item | Status | Impact |
| --- | --- | --- |
| Google Search Console | Owner confirms available; no authenticated connector or export supplied | Query/page/country performance and indexing evidence pending |
| Google Analytics | Owner reports Search Console only for now | Property configuration and real event verification blocked |
| Bing Webmaster Tools | Not available for this phase | Ownership and submission verification blocked |
| AdSense | Not available for this phase; publisher ID not supplied | Activation, real ads.txt seller entry and ad/CMP integration blocked |
| Keyword exports | Input directory empty at intake | Volume, KD and CPC remain UNVERIFIED |

The request's USA Semrush heading has no metric rows; Pakistan range claims have no supplied ranges. Do not interpret either as verified numeric evidence. No protected keyword tool was scraped. Credentials must not be added to this repository.

Build, lint, TypeScript, all 47 unit tests and all 16 existing browser tests passed. See `qa-results.md` for actual command summaries and limitations. No application changes were needed to obtain these baseline results.

## Remaining work after checkpoint

Technical and formula audit with file/line evidence; fresh local Lighthouse and HTTP audit; keyword research and intent mapping; country prioritization; implementation of justified calculator/content improvements; remaining requested planning documents; full post-change QA. This phase does not claim completion of these deliverables, country launch approval, current bank-rate verification, field Core Web Vitals, external structured-data validation, or AdSense readiness.

Country routes require approved markets plus a localized calculator and two substantive localized guides. No country routes were created during baseline setup. Ads remain subject to real account details and the existing documented certified-CMP requirement.
