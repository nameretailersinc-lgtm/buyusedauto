# SEO before/after and deployment readiness report

Verified locally on October 14, 2026 against production builds. Canonical production origin: `https://buyusedautomobiles.com`. URL paths below were checked on local production servers; this is not evidence that the domain is deployed, indexed, or selected as canonical by Google.

## Scope and baseline

The repository has 36 public HTML content routes: 11 automotive tools, six guides, six distinct loan scenarios, four category collections, three primary hubs/homepage, and six information pages. Dynamic route families have explicit generated parameters; unknown slugs return 404. The existing application has no image-processing or text-processing tools, database, account API, or live market integration. Its `/og` image endpoint, generated editorial imagery, calculator functions, sharing, comparisons, exports, consent and designs were included and preserved.

Baseline evidence: `reports/seo-before.json`. All 36 sitemap URLs already returned 200, had unique titles/descriptions and self-canonicals, and were not robots-blocked/noindex. There were no confirmed broken internal links, orphan content pages, soft 404s in tested unknown routes, or missing server-rendered content. No such defects were invented to justify changes. Additional source inspection identified deployment risks, obsolete schema targeting, and low-value collection indexing that the earlier audit did not cover.

## Confirmed changes and affected URLs

| Finding before | Affected URLs | After | Verification |
| --- | --- | --- | --- |
| Repository had no preview/staging indexing guard | All 36 HTML routes, `/robots.txt`, `/sitemap.xml`, `/sitemaps/*.xml` | Vercel preview/development always emits noindex; `SITE_INDEXING=disabled` protects standalone staging. HTML has meta noindex and HTTP X-Robots-Tag. Crawling remains allowed so crawlers can read noindex. Preview sitemaps contain zero URLs and robots advertises no production sitemap. | Separate preview build with `SITE_INDEXING=enabled` still yielded 36 noindex pages, zero sitemap URLs, and zero HTTP audit failures. |
| Three collections contained only one guide and repeated its summary | `/guides/category/financing`, `/guides/category/ownership`, `/guides/category/selling` | Navigation pages remain 200, self-canonical and linked, with noindex/follow; removed from both root and grouped sitemaps. The three-guide buying collection remains indexable. | Production audit: 36 accessible pages, exactly 33 indexable sitemap URLs. This is an editorial indexing choice, not a claim of a Google thin-content penalty. |
| Canonical environment accepted invalid origins | Metadata, breadcrumbs, schema, root/grouped sitemaps | HTTPS origin validated and normalized. Paths, credentials, query strings, fragments and invalid indexing modes are rejected instead of leaking into canonicals. | Four new configuration/routing tests; total 46 automated tests pass. |
| No repository-level alternate-host redirect | Canonical host's www/apex alternative, all content paths | Alternate hostname permanently redirects to configured canonical HTTPS origin with path/query preserved. Preview redirects are disabled. | Raw HTTP request with alternate Host returned 308 to `https://buyusedautomobiles.com/tools?utm_source=audit`. Public DNS/TLS/hosting behavior still needs deployment verification. |
| FAQ markup targeted a retired Google feature | All 11 tools and six loan scenarios | Removed 17 FAQPage objects; visible FAQs remain. Removed the checklist's generic HowTo object. | After audit finds no FAQPage/HowTo targeting objects. [Google's documentation update](https://developers.google.com/search/updates#may-2026) records FAQ rich-result retirement beginning May 7, 2026 and documentation removal in June. |
| Collections exposed breadcrumbs but no content inventory schema | `/tools`, `/guides`, all four guide categories | CollectionPage with ItemList describes the actual visibly linked items and counts. | HTTP checker confirms each structured list item links to a visible destination. |
| Guide sharing used generic generated title cards | All six `/guides/{slug}` routes | Open Graph/Twitter use the guide's actual local editorial image. Article identity now has stable URL/@id and original image; cover alt text describes the illustrative scene. | Metadata/asset HTTP checks and browser assertions. No fictional image license, creator, author qualification, reviewer or publication date added. |
| OG endpoint blocked crawling instead of declaring index intent | `/og?title=...`, `/robots.txt` | OG endpoint remains functional PNG, crawlable, with X-Robots-Tag noindex. Removed the obsolete `/search` disallow and unsupported host directive. `/api/` remains disallowed; no current content/assets are blocked. | PNG HTTP response and noindex header checked. Main public images and Next.js assets remain crawlable. |
| Contact unavailable; logo/favicon/social identity needed replacement | `/about`, `/contact`, `/privacy-policy`, `/terms`; shared header/footer; favicon/social URLs | Owner-supplied Sharjah address and `info@nameretailer.com` are displayed with real mailto links. Revised crisp SVG identity, matching PNG/WebP logo, ICO/PNG favicons, Apple icon, social avatar and cover are wired in. Legal operator name remains unfilled. | Server-rendered contact/branding test and asset HTTP checks. Mailbox delivery has not been independently tested. |
| Deployment instructions lacked automatic configuration checks | Project configuration | Added `vercel.json`, validated environment template, preview/build check and strict production configuration check. Direct helper dependencies recorded in lockfile. | Preview preparation check passes; production check correctly stops on missing legal operator name when the supplied email and explicit indexing mode are configured. Install dry-run passed; actual Vercel install is not claimed. |

## Indexing, redirects and status results

- All 33 production sitemap URLs return HTTP 200 directly, match normalized canonical URLs, have no noindex/X-Robots exclusion, and are allowed by robots.txt. There are no query/fragment URLs in sitemaps. Root and all four grouped sitemap sets match exactly without duplicate URLs. No fictitious last-modified dates are generated.
- All 36 HTML routes are covered from the built route manifest, including the three intentionally excluded categories. All have one H1 and one canonical. Calculator input/UTM query variants retain their base-page canonical and continue restoring user inputs after hydration.
- All non-root content trailing-slash variants return permanent 308 redirects. Alternate host redirect preserves the path and query. Public HTTP-to-HTTPS routing must be checked at Vercel/domain level; local HTTPS was not simulated.
- Unknown top-level, guide, category, both scenario families, and sitemap group URLs return true 404. Next.js private error artifacts are excluded from content coverage because they are framework error handlers, not published routes or sitemap candidates.
- The full audit covers 138 internal destinations and their fragment targets; none are broken and no published page is orphaned. The sitemap-only checker covers 135 destinations because it intentionally skips noindex category pages.
- Preview mode has 36 accessible noindex pages, zero root/grouped sitemap URLs, and crawlable robots rules. This guard does not replace access control if a preview contains confidential material.

## Content quality and internal linking review

The six original guides contain seven substantive sections each, practical examples and primary-source references, rather than interchangeable keyword pages. The eleven tools expose actual inputs/results, methodology, limitations, sources and worked examples. Loan scenarios have distinct assumptions, decisions, rate sensitivity and unique questions; only six are published. The identical-technical-formula wording shared across calculators/examples is appropriate methodological repetition, not proof of duplicate-page abuse.

Exact-paragraph comparison after excluding reusable guide-card summaries found no high-overlap primary-content pairs. This heuristic is not a semantic originality score, a Google classification or proof every page meets an unspecified quality threshold. The manually confirmed low-value indexing candidates were the three one-guide collections; those are now navigation-only. The operator/information pages are shorter by purpose and have not been padded with fabricated material.

Main navigation/footer give access to all tools and policies. Guide sidebars link to related tools; tool sidebars link to relevant guides; loan pages link to all curated scenarios; article contents use valid fragment targets. Search/category filters are client-side controls, not additional indexable URL inventories. Preserve this structure instead of adding many near-identical amount/rate or regional pages.

Remaining editorial work: confirm legal operator identity; verify source-sensitive claims before public publication; review deployment-specific policies for a UAE-based operator serving US automotive research; and establish a real correction/review process. No expert certification, vehicle appraisal, live price, lender offer, automatic tax rule, customer review or guaranteed savings has been introduced.

## Structured-data eligibility

BreadcrumbList and Article markup describe visible content. Article bylines use the actual site organization, supported by [Google's Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article); dates and expert reviewers remain omitted because there is no verified editorial publication/review event. CollectionPage/ItemList and AboutPage/ContactPage/WebPage provide semantic organization, not a special rich-result guarantee.

WebApplication remains a truthful description of functioning free calculators/checklists. It intentionally has no fabricated review or rating. Google's [software-app rich-result requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app) require a real review/rating, so these tools should **not** be represented as currently eligible for the software-app rich result. A Rich Results Test may flag that missing eligibility property even though the descriptive schema is valid. Do not fill it with fake testimonials or stars. [General structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require truthful, relevant content and do not promise display.

Local checks validate JSON syntax, identity fields, visible collections, offer descriptions and absence of unsupported rating/review claims. They are not external Schema.org/Rich Results Test results. Run those validators on deployed representative pages before claiming external validation.

## Rendering, imagery and performance

All 36 content pages remain statically server-rendered. A browser with JavaScript disabled sees the calculator's example payment, methodology, guide sections, links and contact details. Interactive state, exports and comparison remain client functionality. No dynamic server rendering, database, heavyweight UI framework or new third-party tracking was added.

Editorial images retain descriptive local filenames, responsive Next.js delivery, above-fold preloading and below-fold lazy loading. Guide-cover alt text is concise and factual; decorative backgrounds/cards retain empty alt with accessible link labels. The generated scenes are illustrative and do not substantiate prices or vehicle condition. This follows the context/alt-text approach in [Google's image guidance](https://developers.google.com/search/docs/appearance/google-images). Rejected logo artwork is not used by the site; final reusable identity is vector-based.

Mobile Lighthouse measured on the audited production build after SEO/branding changes:

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 96 | 100 | 100 | 100 | 2.86 s | 0 | 63 ms |
| `/car-loan-calculator` | 95 | 100 | 100 | 100 | 2.93 s | 0 | 82 ms |
| `/guides/how-to-inspect-a-used-car` | 98 | 100 | 100 | 100 | 2.24 s | 0 | 85 ms |

Previous verified run was performance 98/91/90. Different machine load, caches and individual simulated runs limit direct causal comparisons; do not claim SEO changes alone caused score increases. The final change after this run adds descriptive guide alt text and does not change payloads/layout. No new performance claim is inferred from that text-only change. Homepage/calculator lab LCP still exceeds 2.5 seconds; prioritize deployed CDN/asset response measurements and real-user data next. INP and field Core Web Vitals were not measured.

## Automated evidence and remaining work

- Production and separate protected-preview builds: passed. Production output restored as the normal build.
- ESLint, TypeScript and 46 calculator/content/SEO configuration tests: passed.
- Full browser suite: 13 passed, including keyboard/mobile navbar, all tools, state restoration, fuel conversion, checklist, CSV, comparisons, consent, print, mobile/dark accessibility and no-JavaScript rendering. Affected checks were rerun after final alt-text changes.
- Production SEO audit: 36 pages, 33 sitemap URLs, 138 internal destinations, eight editorial image sources, zero failures/warnings. The audited brand files are separately checked.
- Preview SEO audit: 36 pages, zero sitemap URLs, zero failures/warnings.
- Configuration/install planning: preview preparation passes; npm ci dry-run succeeds. Public production check reports missing verified operator name. Actual clean Linux/Vercel installation/deployment remains unverified.

Evidence files: `reports/seo-before.json`, `reports/seo-after.json`, `reports/seo-preview.json`, `reports/site-audit.json`, `reports/lighthouse-summary.json`. Screenshots and full Lighthouse HTML/JSON reports are generated locally and excluded from Git.

The source/configuration is ready for a Vercel preview. A public commercial launch still needs the legal operator name, monitored inbox verification, policy/editorial approval, Vercel project/domain setup, DNS/TLS checks and deployed HTTP validation. Search Console ownership, indexing reports, Google-selected canonicals and crawl data are unavailable in this workspace. Eligible, crawlable URLs can still remain unindexed because Google makes separate selection/quality/canonical decisions. [Google's canonicalization explanation](https://developers.google.com/search/docs/crawling-indexing/canonicalization) describes those decisions. Indexing, rich results, rankings and revenue are not guaranteed.

## Deployment steps

1. Import the repository into the intended Vercel account using Next.js, `npm ci`, `npm run build`, and the repository root. `vercel.json` supplies these settings; no database or secret integration is required. See [Vercel's Next.js documentation](https://vercel.com/docs/frameworks/full-stack/nextjs).
2. Configure the preview environment with `SITE_INDEXING=disabled`, the real canonical production origin and owner-provided public contact values. Vercel preview/development is noindex regardless of this switch. Do not set `NEXT_BUILD_DIR`; it exists only for the local preview audit.
3. Confirm and set `NEXT_PUBLIC_OPERATOR_NAME`; retain the supplied address/email or explicitly replace them with verified values. Keep analytics/AdSense blank until those integrations are reviewed. Review the policies and test receiving mail manually; this audit sent no messages.
4. In the reviewed production environment set `SITE_INDEXING=enabled`, run `npm run deploy:check:production` and rebuild. Run the check with the same environment values that Vercel will use. The preflight is an explicit command; `npm run build` alone does not certify public-launch readiness.
5. Configure both preferred and alternate domain hosts in Vercel, apply Vercel-provided DNS and verify HTTPS. Recheck host and slash redirects on the actual deployment; the source-level host rule is not evidence of working DNS.
6. Set `TEST_BASE_URL` to the deployed origin and rerun `npm run audit:seo` plus browser checks. Local `audit:seo` also uses the matching built route manifest; retain that artifact or reproduce the exact deployed build. Validate representative structured data externally and inspect contact/favicon/social previews.
7. Verify Search Console ownership, submit `/sitemap.xml`, and inspect a representative tool and guide. Monitor Google-selected canonicals, coverage and field performance; investigate actual reasons rather than repeatedly generating URLs or requesting indexing without evidence.

## Complete URL inventory

The table below compares intended canonical path coverage in the two local builds. All listed content paths returned HTTP 200 before and after. Canonicals remain self-referencing; query input state does not alter them.

<!-- ROUTE_INVENTORY -->
