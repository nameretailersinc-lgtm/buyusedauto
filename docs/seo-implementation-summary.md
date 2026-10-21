# Used-car research improvements — 18 October 2026

Implemented on the existing site. No push, merge or deployment was performed.

| Deliverable | Result / evidence |
| --- | --- |
| SEO audit | `docs/seo-audit.md`, baseline/public/final reports under `reports/seo-master-*.json` |
| Keyword-to-page map | `docs/seo-keyword-map.md`: every rendered page, preserved aliases and one unpublished evidence-dependent proposal. Regenerate after production build/audit using `node scripts/seo-keyword-map.mjs`. |
| Technical fixes | Correct regional Open Graph locale, concise search metadata, better pagination descriptions, regional free-offer validation in both auditors, removal of unused imports. Working sitemap index/child routes and robots preserved. |
| Calculator improvements | Itemized financed tax/title/registration, combined-fee backward compatibility, tax/fee and trade-equity metrics, no-loan result wording, early-payoff/amortization navigation. Sales-tax page itemizes manual title/registration and explicitly states unavailable automatic rules. |
| Buying guides | New private-seller transaction guide with loan/lien handling, payment/title checklist and actual source-review date. Existing negotiation guide gains cash comparison and focused FAQs. Inspection/history guide substance and prior review dates preserved. |
| Long-tail implementation | Taxes/fees/trade/negative-equity/extra-payoff remain on the loan route; salary plus insurance/maintenance budget on affordability; private-party loan/payment/documents on one private-seller guide; cash negotiation on the existing negotiation guide. |
| AEO/GEO content | Server-rendered direct answers, worked financing/settlement/budget examples, tables, specific questions, visible sources and clear model limits. No invented ratings, author credentials, market feeds or AI citation guarantees. |
| Internal links | Loan to tax/affordability/ownership/private-seller workflow; tax to loan input guidance; pillar and negotiation to private-seller guide; private-seller to inspection/history/negotiation and relevant tools. |
| Indexing remediation | `docs/seo-indexing-remediation.md`: URL-by-URL local eligibility and GSC verification plan. No invented explanation of Google indexing. |
| Automated QA | `docs/seo-master-qa.md`; fresh command evidence in `reports/master-*.log` and JSON reports. |
| Remaining blockers | GSC exports/URL Inspection, unavailable original Keyword Planner export, actual maintained state rules/fees, lawful model-specific reliability/live-price data, field CWV, operator/mailbox confirmation. None was fabricated. |
| 30/60/90-day roadmap | `docs/seo-roadmap.md` |

The financial model remains fixed monthly interest with cent reconciliation, not a daily-interest lender payoff. Tax/title/registration amounts are user-entered dollars; the loan does not infer jurisdictional tax treatment. Existing combined `fees` URLs retain their total when the new charge fields are omitted. Enter costs once when transferring an estimate between tools.

The only new published route is `/guides/how-to-buy-a-used-car-from-a-private-seller`. Existing tools, scenario URLs, country tools, guide routes, APIs, image assets and design remain available. Reliability-list proposals remain unpublished pending evidence.
