import {readFile} from 'node:fs/promises';
import {load} from 'cheerio';

// Run after next build: verify the actual HTML and generated route manifest.
const pillar = 'complete-used-car-buying-guide';
const requiredLinks = {
  'how-much-car-payment-can-i-afford': ['/car-affordability-calculator', '/car-loan-calculator', '/total-cost-of-ownership-calculator', '/guides/how-much-down-payment-for-used-car'],
  'car-depreciation-chart': ['/car-depreciation-calculator', '/what-is-my-car-worth', '/trade-in-value-estimator', '/total-cost-of-ownership-calculator', '/guides/how-much-does-a-used-car-depreciate-per-year'],
  'how-much-does-a-used-car-depreciate-per-year': ['/car-depreciation-calculator', '/what-is-my-car-worth', '/total-cost-of-ownership-calculator', '/trade-in-value-estimator', '/car-loan-calculator', '/guides/how-much-down-payment-for-used-car'],
  'how-much-down-payment-for-used-car': ['/car-loan-calculator', '/car-affordability-calculator', '/trade-in-value-estimator', '/total-cost-of-ownership-calculator', '/guides/how-to-calculate-percentage-increase'],
  'how-to-calculate-percentage-increase': [],
  'buy-used-car-pakistan': ['/pk/car-financing-calculator', '/used-car-inspection-checklist'],
  'buy-used-car-uae': ['/used-car-inspection-checklist', '/guides/buy-used-car-pakistan'],
  'buy-used-car-usa': ['/car-loan-calculator', '/guides/buy-used-car-uk'],
  'buy-used-car-uk': ['/used-car-inspection-checklist', '/guides/buy-used-car-europe'],
  'buy-used-car-europe': ['/used-car-inspection-checklist', '/guides/buy-used-car-uk'],
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
  const submitted = ['how-much-down-payment-for-used-car', 'how-to-calculate-percentage-increase'].includes(slug);
  const expected = slug === pillar ? Object.keys(requiredLinks).filter(other=>!other.startsWith('buy-used-car-')&&!['how-to-calculate-percentage-increase'].includes(other)).map(other => `/guides/${other}`) : [...requiredLinks[slug], ...(submitted?[]:[`/guides/${pillar}`])];
  for (const href of expected) assert(links.has(href), `${path}: missing contextual link ${href}`);
  if (slug === 'how-much-car-payment-can-i-afford') {
    assert($('title').text() === 'How Much Car Payment Can I Afford? Budget Guide (2026)', `${path}: incorrect SEO title`);
    assert(article.articleSection === 'Financing' && $('article table').length === 3, `${path}: missing budget and loan tables`);
    assert($('article').text().includes('take-home') && $('article').text().includes('gross income') && $('article').text().includes('cash-flow'), `${path}: missing income or cost-model distinctions`);
    assert($('article table').text().includes('$315.60'), `${path}: missing loan comparison`);
  }
  if (slug === 'car-depreciation-chart') {
    assert($('title').text() === 'Car Depreciation Chart: 1-10 Year Value Examples', `${path}: incorrect SEO title`);
    assert(article.articleSection === 'Ownership' && $('article table').length === 3, `${path}: missing depreciation tables`);
    const plots=$('article .result-chart');
    assert(plots.length === 2 && plots.eq(0).find('button').length === 6 && plots.eq(1).find('button').length === 11, `${path}: incomplete five- or ten-year charts`);
    assert($('article table').last().find('tbody tr').length === 11, `${path}: incomplete ten-year accessible table`);
    assert(!$('article').text().includes('<escape>'), `${path}: leaked paste markup`);
  }
  if (slug === 'how-much-does-a-used-car-depreciate-per-year') {
    assert($('title').text() === 'Used Car Depreciation Per Year: Formula & Examples', `${path}: supplied SEO title changed`);
    assert($('meta[name="description"]').attr('content') === 'How much does a used car depreciate per year? Learn how to calculate annual value loss, compare real examples, and estimate future resale value.', `${path}: supplied description changed`);
    assert(article.articleSection === 'Ownership', `${path}: incorrect category`);
    assert($('article table tbody tr').length === 6, `${path}: missing five-year projection`);
    assert($('article table').text().includes('$12,294') && $('article').text().includes('12.64%'), `${path}: missing worked calculations`);
    assert(!$('a[href="/car-value-estimator"]').length, `${path}: broken draft valuation route`);
  }
  if (submitted) {
    const math = slug === 'how-to-calculate-percentage-increase';
    assert($('title').text() === (math ? 'How to Calculate Percentage Increase (Formula + Examples)' : 'Used Car Down Payment Guide 2026: How Much Do You Need?'), `${path}: supplied SEO title changed`);
    assert($('meta[name="description"]').attr('content') === (math ? 'Learn how to calculate percentage increase using a simple formula. Follow step-by-step examples for prices, salaries, sales, and Excel.' : 'How much down payment do you need for a used car? Compare 10% and 20% down payments, monthly loan costs, trade-ins, and practical financing tips.'), `${path}: supplied description changed`);
    assert($('article table').length >= (math ? 1 : 3), `${path}: missing example tables`);
    assert($('article').text().includes(math ? '=(B2-A2)/A2' : '$364.98'), `${path}: missing worked calculation`);
    if (math) {
      assert($('a[href="/guides/category/mathematics-calculators"]').length > 0, `${path}: missing mathematics category navigation`);
      assert($('.guide-payment-card,.buying-workflow,.article-related-tools').length === 0, `${path}: unrelated car-buying widgets on mathematics article`);
    }
  }
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
const pageRoutes=Object.keys(manifest.routes).filter(path=>/^\/guides(?:\/category\/[^/]+)?\/page\/[2-9]\d*$/.test(path));
for(const path of ['/guides',...pageRoutes]){
  const $=load(await readFile(`.next/server/app${path}.html`,'utf8'));
  assert(new URL($('link[rel="canonical"]').attr('href')).pathname===path,`${path}: incorrect pagination canonical`);
  const schema=$('script[type="application/ld+json"]').toArray().map(node=>JSON.parse($(node).text())).find(item=>item['@type']==='CollectionPage');
  assert(schema.mainEntity.numberOfItems<=6,`${path}: too many paginated items`);
  for(const item of schema.mainEntity.itemListElement)assert($(`a[href="${new URL(item.url).pathname}"]`).length,`${path}: schema item missing from visible listing`);
  assert($('.guide-pagination [aria-current="page"]').length===1,`${path}: missing current-page indicator`);
}
console.log(`Verified ${Object.keys(requiredLinks).length+1} articles and paginated collections: metadata, worked calculations, canonicals, visible answers, authorship/dates, schemas, sitemap entries, and internal links.`);
