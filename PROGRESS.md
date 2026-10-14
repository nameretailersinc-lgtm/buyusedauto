# Implementation progress

The latest business and quality requirements supersede the larger launch counts in the attached brief.

- [x] Phase 1: Next.js, design system, responsive navigation, metadata utilities.
- [x] Phase 2: Pure calculator functions, validation, edge-case tests (42 calculation/content tests passed).
- [x] Phase 3: Eleven tools, URL sharing, comparisons, charts, print/download.
- [x] Phase 4: Six researched guides, hubs, transparent editorial and policy pages.
- [x] Phase 5: Six distinct loan scenarios, sitemap and structured data; HTTP audit implemented.
- [x] Phase 6: Consent controls, optional analytics, safe disabled advertising and empty partner registry. Advertising activation requires a certified CMP and real account configuration.
- [x] Phase 7: Local build, lint, TypeScript, 42 unit/content tests, 12 browser tests, HTTP audit, measured Lighthouse, and launch documentation. Production verification remains an external launch dependency.

## External launch dependencies

- Verify operator identity and a working contact address before public launch.
- Deploy to the selected VPS at 5.189.158.75, configure DNS/TLS, and verify public HTTP behavior. Vercel remains an alternative documented target.
- Configure Search Console and optional GA4.
- Obtain AdSense approval and configure a Google-certified CMP before activating ads.
- Independent editorial/legal review of original content and policies.

No external deployment or performance result is claimed until verified.

## Reference design expansion

- [x] Redesigned tool hub with category filtering, search, and useful empty state.
- [x] Redesigned guide hub, categories, individual articles, and related reading.
- [x] Applied photographic hero layouts across all tools and loan scenarios.
- [x] Redesigned about, contact, editorial/policy pages, and 404.
- [x] Generated and optimized four additional original images; asset prompts documented.
- [x] Browser checks passed for all eight redesigned page families on mobile, with no detected WCAG A/AA violations or horizontal overflow.
- [x] Final browser rerun after contrast and test assertion corrections: all 12 tests passed across full run and targeted rerun.
- [x] Actual Lighthouse measurements and final QA report: performance 98/91/90 on home/loan/guide; accessibility, best practices and SEO 100 across all three. See `docs/QA.md` for limits and remaining performance improvements.

## GitHub Actions CI/CD

- [x] Added PR/main application checks, browser/SEO HTTP audits and Docker health validation workflow.
- [x] Added opt-in main-only VPS deployment using a tested commit archive, verified SSH host key, serialized releases and attempted image rollback.
- [x] Preserved the server checkout, existing production environment, host Nginx and certificate setup.
- [x] Workflow YAML/gating checks, deployment and inline Bash syntax, lint and 46 automated tests passed locally.
- [ ] Configure GitHub production environment, SSH secrets and VPS_DEPLOY_ENABLED.
- [ ] Verify first hosted CI run, real SSH deployment and rollback on the VPS.

## Docker deployment follow-through

- [x] Reviewed existing committed Dockerfile, Compose, Nginx bootstrap/HTTPS and renewal setup.
- [x] Isolated active Nginx configuration from tracked templates through `NGINX_CONFIG`; documented migration and updates.
- [x] Health endpoint retains its response and explicitly emits noindex.
- [x] Completed the audited before/after URL inventory in `docs/SEO_AUDIT.md`.
- [x] Lint and all 46 current tests passed during this deployment review.
- [x] Production build and HTTP audit passed: 33 sitemap URLs, 135 internal destinations, no failures/warnings.
- [x] Standalone server smoke test passed for health, calculator, guide, favicon, logo, sitemap and OG PNG endpoint. This verifies the local package, not the Linux Docker image.
- [ ] Docker build/Compose/Nginx validation on a machine with Docker installed.
- [ ] Verify actual VPS deployment, certificate issuance/renewal, DNS and production HTTP checks.
- [ ] Pakistan/global catalogue, data ingestion, database and admin expansion from the attached brief. These are not implemented or included in the current deployment.
