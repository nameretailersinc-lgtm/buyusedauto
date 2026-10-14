# Monetization and privacy activation

## Current behavior

- No ad requests, publisher placeholders, empty ad boxes, or affiliate destinations render.
- `/ads.txt` serves an explanatory comment unless a real publisher ID is configured. With a valid ID it emits the standard Google seller line. This alone does not load ads.
- The partner registry is empty. Its component requires an HTTPS destination and nonempty disclosure, and adds `sponsored nofollow noopener` to partner links. Integrate configured cards only after verifying an actual approved relationship and destination.
- Optional GA4 loads only after explicit consent. Reject and manage controls are available from the footer. Stored preferences can be withdrawn. Default advertising consent signals remain denied.
- Global Privacy Control and Do Not Track prevent automatic analytics activation. Shared query strings are omitted from the explicitly emitted page-view location and referrer.

## Required before advertising

Google requires a certified CMP integrated with the IAB TCF for relevant EEA, UK, and Swiss ad traffic. The custom analytics preferences panel is **not** a certified CMP or a blanket GDPR/CCPA compliance solution. See [Google's consent requirements](https://support.google.com/adsense/answer/13554020?hl=en) and [AdSense program policies](https://support.google.com/adsense/answer/48182?hl=en).

1. Obtain a real approved publisher account and use real inventory/slot IDs. Verify ownership and ads.txt in that account.
2. Select and configure a Google-certified CMP for the actual audience. Configure applicable US-state privacy messages, opt-out handling, and vendor disclosures with deployment-specific review.
3. Integrate the provider's documented consent API. Ad storage, user-data, and personalization decisions must follow the actual consent signals; do not infer consent from a generic button or an environment flag.
4. Implement the reusable ad unit only when real slots and the consent integration are available. Reserve responsive space, label it Advertisement, and place it below complete results or between substantial article sections. Avoid controls, navigation, and accidental-click placements.
5. Test initial denial, rejection, granular choices, expiry, withdrawal, region-specific messages, ad blockers, and CMP failure. Confirm no ad request before applicable consent and no personalized ad request after opt-out.
6. Rerun mobile Lighthouse and observe real layout stability with filled and unfilled inventory.

No arbitrary page count guarantees approval. Do not apply merely because a count was reached. Original value, real functionality, accurate disclosures, policy compliance, and account eligibility matter.

## Required before analytics

Use a real GA4 property, document its retention and access, and disable enhanced measurement features that could collect query strings, form interactions, or unintended data. The current implementation records one sanitized page view when its script initializes; client-side route view tracking is intentionally not automated. Add explicit sanitized navigation tracking only after testing it. Verify actual requests in browser developer tools on accept and withdrawal. Complete the operator-specific privacy notice.

## Legitimate affiliate use

Use partners that help with a user-selected next step and maintain a short disclosure before the link. Do not imply an approved partnership before acceptance, insert fake comparison results, fabricate offers, rank paid partners as independent recommendations, or alter the calculator's output. Test every destination and review partner terms before activation.
