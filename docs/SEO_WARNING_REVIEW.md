# Image, link, sharing and header warning review

The supplied third-party report did not identify a URL or individual image elements. Source inspection found explicit alt attributes on all Next.js images. Empty alt on decorative backgrounds is intentional; SVG icons use aria-hidden and do not take an HTML img alt attribute. Missing and empty alt are different findings.

Implemented: descriptive guide-card and featured-guide image alt using the existing editorial scene descriptions; tool cards now use concise title/action links instead of a single anchor containing category, heading, descriptive paragraph and action. Guide action links have descriptive accessible labels. Native share/copy fallback, WhatsApp and LinkedIn actions appear in the footer on all pages. They share the canonical page URL, excluding calculator inputs, and load no external sharing script.

Preserved: full guide titles, repeated navigation to the same destination, decorative empty alt and parameterized calculator links. The parameters carry real input state and canonicalize to base URLs; there is no basis to mark useful internal links nofollow simply because they contain parameters. Share availability is a user feature, not a Google ranking guarantee.

The host Nginx template now specifies server_tokens off. The live server's existing Certbot-managed file requires that directive inside both server blocks; see HOST_NGINX_DEPLOYMENT.md. Repository changes cannot alter host configuration remotely. No server header fix is claimed deployed until checked there.

References: [Google's link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google's image guidance](https://developers.google.com/search/docs/appearance/google-images), [Nginx server_tokens](https://nginx.org/en/docs/http/ngx_http_core_module.html#server_tokens).

Validation: lint and production build passed; 46 calculation/content/configuration tests passed. The final HTTP SEO audit covered all 36 public pages and 33 sitemap URLs with no failures, including missing-alt checks. Three affected browser tests passed (toolkit filtering, calculator state transfer, mobile/dark accessibility). A separate browser smoke check verified query-free WhatsApp links and clipboard sharing fallback. Native operating-system sharing and live Nginx header changes remain device/server checks.
