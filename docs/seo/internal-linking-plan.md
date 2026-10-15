# Internal linking plan

Prepared 2026-10-15. Existing baseline has 148 checked internal destinations with no HTTP audit failures. Preserve working navigation and URLs. Anchors should describe the next decision, not repeat exact-match strings mechanically.

| Intent owner | Contextual next step | Why |
| --- | --- | --- |
| `/guides/how-to-compare-used-car-loans` | `/car-loan-calculator#methodology`, `/car-affordability-calculator`, `/car-sales-tax-calculator` | Move from interpreting interest/fees to calculating a written offer and checking affordability. |
| `/car-loan-calculator` | Loan comparison guide, affordability, ownership, official lender/CFPB sources | Clarify assumptions and look beyond the installment. Existing extra-payment UI remains the early-payoff owner. |
| `/total-cost-of-ownership-calculator` | Depreciation, fuel, loan and `/guides/real-cost-of-car-ownership` | Support resale, operating costs and interest assumptions with the same horizon. New/used comparison belongs here. |
| `/guides/how-to-inspect-a-used-car` | `/used-car-inspection-checklist`, history guide, negotiation tool | Record findings, resolve records, then negotiate only after serious risks are resolved. |
| `/guides/how-to-check-a-cars-history` | Inspection guide/checklist and official history/recall sources | A history result is not a mechanical inspection. |
| `/what-is-my-car-worth`, `/trade-in-value-estimator` | Trade-vs-private guide, depreciation methodology, loan equity section | Explain illustrative bands and negative equity without implying live appraisal data. |
| `/guides/international-used-car-buying-checks` | Existing tool with explicit US limitations and relevant official jurisdiction service | Country sections are research resources; do not imply localized tax/finance implementation. |
| Future evidence-backed reliability owner | Inspection/history and ownership tools | Turn sourced comparisons into a verification/budget workflow; no unpublished links. |
| Future complete country bundle | Local calculator ↔ two localized guides ↔ country selector | Link only after all destinations exist; selector allows user choice, never forced redirects. |

Directories `/tools` and `/guides` remain discoverability owners. Keep breadcrumbs, related-tool links and editorial policy/disclaimer links. Navigation-only singleton categories remain excluded from indexing until they have distinct useful collections. Add no links or sitemap entries for reserved CSV targets. Do not point hreflang between unrelated country articles or section fragments. New links must pass local link checking and work without JavaScript. Preserve safe external rel attributes; actual sponsored/affiliate links require disclosure and approved destinations.
