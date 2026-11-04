# Content quality checklist

Use before any page is published or republished. Every box must be yes, or the page waits.

## Usefulness
- [ ] The first paragraph answers the reader's main question in 1-3 plain sentences.
- [ ] The page has a specific reason to exist that no other URL on the site covers.
- [ ] It has at least one of: a worked example, a decision table, a short checklist, or the calculator itself.
- [ ] A clear next step (a calculator or guide) is offered without a sales push.

## Accuracy
- [ ] Every number is either user-entered, a labelled illustrative example, or cited to a primary source.
- [ ] Worked examples were recomputed (tests exist for any new formula).
- [ ] No current interest rates, prices, fees or market statistics are invented; examples say "illustrative".
- [ ] Rules are tied to a jurisdiction (US vs Pakistan are never mixed).
- [ ] Sources are real primary pages (CFPB, FTC, NHTSA, DMV/state agencies, SBP and so on) and open.
- [ ] Financially consequential claims are flagged for professional verification if not directly sourced.

## Honesty
- [ ] No invented authors, reviewers, credentials, first-hand experiences, quotes, surveys or case studies.
- [ ] Disclosure stays accurate: drafted with AI assistance, not reviewed by a named human expert, no live market or lender data.
- [ ] "Updated" and "Sources checked" dates are only changed after a real re-check.

## Writing
- [ ] Natural, varied sentences; contractions where they fit; jargon explained once.
- [ ] No filler, no repeated disclaimer paragraphs, no motivational closing.
- [ ] None of: "delve", "unlock", "game-changer", "in today's", "navigate the landscape", "ultimate" (unless earned), "whether you're...", "it's important to note", "in conclusion".
- [ ] Primary term used naturally; no stuffing; headings read like real questions.

## SEO
- [ ] Unique title (about 50-60 characters) with the primary term near the front; unique description (120-158 characters) that matches the page.
- [ ] One H1; logical H2/H3 order; the H1 is the first heading in the document.
- [ ] Canonical is the clean URL; page is in the sitemap and linked from at least two relevant pages.
- [ ] Descriptive, varied internal anchors; calculator <-> guide links both ways.
- [ ] Structured data matches visible content (no fabricated ratings, authors, FAQs).
- [ ] `npm run check:site`, `npm run audit:seo`, `npx tsc --noEmit`, `npm run lint`, `npx vitest run` and the Playwright suite pass.
- [ ] Mobile layout and keyboard/label accessibility checked.
