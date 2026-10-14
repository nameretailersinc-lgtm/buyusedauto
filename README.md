# BuyUsedAutomobiles

A US-focused used-car research product built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4. Eleven browser-based tools, six original guides, and six distinct financing examples. No database, live market feed, advertising account, or affiliate account is assumed.

## Run locally

Use Node.js 20.9+ (Node 22 LTS recommended for a new deployment).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` if configuring the canonical origin or integrations. The included `.npmrc` keeps npm's cache in the writable project directory.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm run build` statically prerenders public HTML. The OG image endpoint renders on demand and caches the response. Fonts are downloaded at build time by `next/font` and served locally. Original generated editorial images are optimized to WebP and delivered through responsive `next/image`; see `docs/IMAGE_ASSETS.md` for provenance and prompts. Icons and diagrams use lightweight SVG/CSS.

## Verification

With the production server running:

```sh
npm run check:site
npm run audit:seo
npm run test:e2e
npm run audit:lighthouse
```

The browser suite defaults to installed Microsoft Edge. Set `PLAYWRIGHT_CHANNEL=chrome` for installed Chrome, or adjust `playwright.config.ts` for a managed Chromium installation. Lighthouse finds installed Edge/Chrome on Windows; otherwise set `CHROME_PATH`. `TEST_BASE_URL` overrides localhost for checks. Reports go in `reports/`; screenshots and large individual Lighthouse reports are ignored by Git. `docs/QA.md` records actual results and verification limits.

The site auditor checks all sitemap pages, internal destinations and fragment IDs, metadata uniqueness, canonical URLs, one H1, JSON-LD syntax and selected structural/visible-content requirements, the OG endpoint, crawl files, 404 behavior, and slash redirects. It is not a substitute for Schema.org Validator or Google's Rich Results Test on the deployed site. Lighthouse lab results are not field Core Web Vitals; INP requires real interaction data.

## Environment

| Variable | Behavior |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute canonical production origin; default `https://buyusedautomobiles.com`. Set before building. |
| `SITE_INDEXING` | `disabled` protects staging; `enabled` enables reviewed production indexing. Vercel preview/development always uses noindex and empty sitemaps. Rebuild after changing it. |
| `NEXT_PUBLIC_OPERATOR_NAME` | Verified legal operator name, currently pending. Required by the explicit public-production check. |
| `NEXT_PUBLIC_OPERATOR_ADDRESS` | Public address; defaults to the owner-supplied Sharjah address. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact inbox; defaults to owner-supplied `info@nameretailer.com`. Verify mailbox operation before launch. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional Google Search Console HTML verification token. |
| `NEXT_PUBLIC_GA_ID` | Optional valid `G-…` measurement ID; script loads after opt-in only. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Optional real `ca-pub-` ID with 16 digits. Generates a seller record in ads.txt. Does **not** activate ads. |

Public environment variables are embedded in the build; redeploy after changes. Never put secrets in `NEXT_PUBLIC_*` variables. No placeholder publisher IDs or partner destinations are supplied.

## Deploy to Vercel

For the current VPS behind existing host Nginx, see `docs/HOST_NGINX_DEPLOYMENT.md`. GitHub Actions CI/CD is available through `.github/workflows/ci-cd.yml`; configure it using `docs/CI_CD.md`. Deployment is disabled until the repository variable and production SSH secrets are configured.

1. Complete the launch blockers in `LAUNCH_CHECKLIST.md`, particularly operator identity, contact, and policy review.
2. Push the repository to your Git provider and import it into the intended Vercel project. Select Next.js and the repository root. Use `npm ci` and `npm run build`.
3. Set the production environment variables. Keep ads and analytics blank until their account and privacy configuration is verified.
   Use `SITE_INDEXING=disabled` for staging and `enabled` for the reviewed production build. Run `npm run deploy:check` for preparation and `npm run deploy:check:production` with the actual production variables. The latter intentionally fails without the verified operator name. `vercel.json` includes the build/install configuration.
4. Use a preview deployment for final acceptance. Verify mobile tools, metadata, OG images, security headers, and no tracking before consent. Check that preview URLs are not indexed and that production canonicals point to the intended domain.
5. Add `buyusedautomobiles.com` in Vercel, apply the DNS records Vercel supplies, and verify HTTPS and the preferred host redirect. Next.js permanently redirects trailing slash variants with 308.
6. Run the HTTP auditor against the deployed origin and submit `/sitemap.xml` in Search Console. Grouped sitemaps are also available under `/sitemaps/`.

No deployment is implied by these instructions. This workspace has no configured Vercel project or deployment credential.

See `docs/SEO_AUDIT.md` for the detailed before/after findings, every audited URL, current measured performance and remaining public-launch requirements. `audit:seo` defaults to the local QA port 3417; set `TEST_BASE_URL` explicitly when using port 3000 or a deployment. The advanced audit reads the matching build manifest and checks intentional noindex pages as well as the sitemap. For protected-preview audits use `SEO_EXPECT_INDEXABLE=false`; for final schema/brand checks use `SEO_EXPECT_CLEAN_SCHEMA=true`.

Brand downloads are in `public/brand/`: editable vector mark/wordmark, transparent PNG wordmark, 1080px avatar and 1200×630 social cover. Favicon ICO/PNG and Apple icon are integrated in metadata. Asset provenance and prompts are documented in `docs/IMAGE_ASSETS.md`.

## Structure and extension

- `lib/calculators/index.ts`: pure math, input boundaries, loan schedule, and inspection progress.
- `lib/evaluate.ts`: presentation adapter from validated input state to results and comparisons.
- `data/tools.ts`: route, inputs, units, defaults, categories, and descriptions.
- `data/tool-content.ts`: methodology, examples, tips, FAQs, sources, and related tools.
- `data/depreciation.ts`: disclosed generic valuation coefficients.
- `data/guides.ts`: six substantial guide records with primary-source references.
- `data/visuals.ts`: shared image assignments and category descriptions for tools and guides.
- `components/tools-explorer.tsx`, `components/guides-collection.tsx`: searchable toolkit and editorial guide collections.
- `app/interior-pages.css`: responsive interior-page layouts matching the homepage and navigation.
- `data/scenarios.ts`: explicitly curated loan examples; unknown combinations return 404.
- `components/calculator.tsx`: interactive form, shareable URL, comparison, CSV, and print.
- `components/result-chart.tsx`: separately loaded lightweight interactive chart.
- `lib/site.ts`, `lib/routes.ts`, `components/seo.tsx`: reusable metadata, route and structured-data helpers.
- `data/partners.ts`: empty approved-partner registry; reusable `PartnerCards` renders only configured HTTPS destinations with disclosures.

To add a tool, implement and test the pure function, add its ID/config and result adapter, and write distinct methodology and relevant links. To add a guide, add a complete source-backed record and links from related tools. To add a scenario, show a materially different decision and unique questions; do not enumerate every possible amount/rate/term combination.

US dollars are the only currency at launch. Fuel and odometer measurement units can change; this does not imply regional tax support. Additional country versions should use separate locale definitions, currency formatting, verified jurisdictional data, region-specific source review, and appropriate `hreflang` only when actual translated/regional pages exist.

Before removing an indexed route, decide whether a relevant permanent redirect exists. If content is intentionally gone with no replacement, add a tested 410 route/hosting rule. No removed URLs are invented at launch.

See `DECISIONS.md`, `PROGRESS.md`, `docs/MONETIZATION.md`, and `LAUNCH_CHECKLIST.md` for constraints and remaining work.
#   b u y u s e d a u t o  
 #   b u y u s e d a u t o  
 
