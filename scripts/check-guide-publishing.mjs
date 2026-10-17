import {readFile} from 'node:fs/promises';
import {load} from 'cheerio';

// Run after next build: verify the actual HTML and generated route manifest.
const pillar = 'complete-used-car-buying-guide';
const requiredLinks = {
  'used-car-buying-checklist-first-time-buyers': [`/guides/${pillar}`, '/guides/how-to-inspect-a-used-car'],
  'how-many-miles-is-too-many-for-a-used-car': ['/guides/how-to-inspect-a-used-car', '/guides/how-to-check-a-cars-history'],
  'how-to-avoid-used-car-scams': ['/guides/how-to-check-a-cars-history', '/guides/used-car-buying-checklist-first-time-buyers'],
  'used-car-vs-new-car': ['/total-cost-of-ownership-calculator', '/car-affordability-calculator'],
  'used-car-maintenance-costs': ['/guides/real-cost-of-car-ownership', '/guides/how-to-inspect-a-used-car'],
  'best-time-to-buy-a-used-car': ['/guides/how-to-negotiate-a-used-car-price', '/what-is-my-car-worth'],
};
const manifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'));
const sitemap = await readFile('.next/server/app/sitemaps/guides.xml.body', 'utf8');
const canonicals = new Set();
const assert = (condition, message) => {if (!condition) throw new Error(message);};
for (const slug of [pillar, ...Object.keys(requiredLinks)]) {
  const path = `/guides/${slug}`;
  const $ = load(await readFile(`.next/server/app${path}.html`, 'utf8'));
  const canonical = $('link[rel="canonical"]').attr('href');
  assert($('link[rel="canonical"]').length === 1 && canonical, `${path}: missing or duplicate canonical`);
  const url = new URL(canonical);
  assert(url.protocol === 'https:' && url.pathname === path && !url.search && !url.hash, `${path}: incorrect canonical`);
  assert(!canonicals.has(canonical), `${path}: duplicate canonical URL`);
  canonicals.add(canonical);
  assert(sitemap.includes(canonical), `${path}: missing sitemap entry`);
  assert($('h1').length === 1 && $('.article-answer p').text().length > 150, `${path}: missing heading or visible quick answer`);
  assert($('h3').toArray().some(node => $(node).text().endsWith('?')), `${path}: missing question-based subheadings`);
  const schemas = $('script[type="application/ld+json"]').toArray().flatMap(node => JSON.parse($(node).text()));
  const article = schemas.find(schema => schema['@type'] === 'Article');
  const breadcrumbs = schemas.find(schema => schema['@type'] === 'BreadcrumbList');
  assert(article?.url === canonical && article.mainEntityOfPage === canonical, `${path}: Article URLs disagree with canonical`);
  assert(article.headline === $('h1').text(), `${path}: Article headline differs from visible title`);
  assert(article.author?.['@type'] === 'Organization' && article.author.name === 'BuyUsedAutomobiles', `${path}: unexpected author claim`);
  assert($('.author-row').text().includes(article.author.name), `${path}: author missing from visible byline`);
  assert(article.dateModified === $('.author-row time').attr('datetime'), `${path}: visible and structured update dates disagree`);
  assert(breadcrumbs?.itemListElement.at(-1)?.item === canonical, `${path}: breadcrumb does not identify this article`);
  const links = new Set($('article a[href]').toArray().map(node => $(node).attr('href')));
  const expected = slug === pillar ? Object.keys(requiredLinks).map(other => `/guides/${other}`) : [...requiredLinks[slug], `/guides/${pillar}`];
  for (const href of expected) assert(links.has(href), `${path}: missing contextual link ${href}`);
  for (const node of $('a[href]').toArray()) {
    const href = $(node).attr('href');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const target = new URL(href, url.origin);
    assert(manifest.routes[target.pathname], `${path}: internal link has no built route: ${href}`);
  }
}
const collection = load(await readFile('.next/server/app/guides.html', 'utf8'));
assert(collection('.article-answer,.article-section').length === 0, '/guides should list summaries, not full articles');
assert(collection('.featured-guide a').toArray().some(node => collection(node).attr('href') === `/guides/${pillar}`), '/guides: pillar is not featured');
console.log('Verified seven separate articles, unique canonicals, visible quick answers, authorship/dates, Article and BreadcrumbList schemas, sitemap entries, and all internal link targets.');
