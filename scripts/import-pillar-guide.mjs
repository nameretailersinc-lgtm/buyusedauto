// One-time import of the supplied editorial draft into the site's structured content.
import {readFile, writeFile} from 'node:fs/promises';
const input = process.argv[2];
if (!input) throw new Error('Pass the path to the supplied Markdown draft.');
const markdown = await readFile(input, 'utf8');
const replacements = {
  'https://buyusedautomobiles.com/tools/car-affordability': '/car-affordability-calculator',
  'https://buyusedautomobiles.com/tools/car-value-estimate': '/what-is-my-car-worth',
  'https://buyusedautomobiles.com/tools/cost-of-ownership': '/total-cost-of-ownership-calculator',
  'https://buyusedautomobiles.com/tools/car-loan': '/car-loan-calculator',
};
const guideLinks = {
  'Vehicle History Checking Guide': '/guides/how-to-check-a-cars-history',
  'Used Car Inspection Guide': '/guides/how-to-inspect-a-used-car',
  'Used Car Price Negotiation Guide': '/guides/how-to-negotiate-a-used-car-price',
};
let current, parent, paragraph = [];
const sections = [];
const flush = () => {if (paragraph.length && current) current.paragraphs.push(paragraph.join(' ')); paragraph = [];};
const clean = value => value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, title, url) => {
  if (current) {
    current.links ??= [];
    const target = guideLinks[title] ?? replacements[url] ?? (url.startsWith('https://buyusedautomobiles.com/') ? new URL(url).pathname : url);
    if (!current.links.some(link => link.url === target)) current.links.push({title, url: target});
  }
  return title;
}).replace(/\*\*/g, '').replace(/^\*|\*$/g, '').replace(/^\[ \]\s*/, '');
for (const line of markdown.split(/\r?\n/)) {
  if (line.startsWith('## ')) {flush(); parent = current = {heading: line.slice(3), paragraphs: []}; sections.push(current); continue;}
  if (line.startsWith('### ')) {flush(); current = {heading: line.slice(4), paragraphs: []}; (parent.subsections ??= []).push(current); continue;}
  if (!current || line === '---' || line.startsWith('*Editorial note:')) {flush(); continue;}
  if (!line.trim()) {flush(); continue;}
  if (line.startsWith('|')) {
    flush();
    const cells = line.split('|').slice(1, -1).map(cell => clean(cell.trim()));
    if (cells.every(cell => /^:?-+:?$/.test(cell))) continue;
    if (!current.table) current.table = {headers: cells, rows: []}; else current.table.rows.push(cells);
  } else if (/^(- |\d+\. )/.test(line)) {flush(); (current.bullets ??= []).push(clean(line.replace(/^(- |\d+\. )/, '')));}
  else paragraph.push(clean(line));
}
flush();
const guides = [
  ['Used Car Buying Checklist', 'used-car-buying-checklist-first-time-buyers'],
  ['How Many Miles Is Too Many for a Used Car?', 'how-many-miles-is-too-many-for-a-used-car'],
  ['How to Avoid Used Car Scams', 'how-to-avoid-used-car-scams'],
  ['Used Car vs New Car', 'used-car-vs-new-car'],
  ['Used Car Maintenance Costs', 'used-car-maintenance-costs'],
  ['Best Time to Buy a Used Car', 'best-time-to-buy-a-used-car'],
];
sections.splice(1, 0, {heading: 'Which guide should you read next?', paragraphs: ['Use this page to plan the full purchase. Follow the detailed guides below for your budget, mileage, inspection, seller verification, and timing questions.'], links: guides.map(([title, slug]) => ({title, url: `/guides/${slug}`}))});
const guide = {
  slug: 'complete-used-car-buying-guide',
  title: 'Complete Used Car Buying Guide 2026: 12 Essential Steps to Buy a Reliable Car',
  description: 'Plan a used car purchase in 12 steps, from budget and vehicle history to inspection, financing, negotiation, and a verified ownership transfer.',
  category: 'Buying', updated: '2026-10-17', readingMinutes: 12,
  intro: 'To buy a used car safely, set a realistic budget, research suitable models, verify ownership and vehicle history, inspect the car, arrange an independent mechanical inspection, compare prices, and review every document before paying. These checks reduce risk but cannot guarantee future reliability.',
  sections,
  sources: [
    {title: 'FTC: Buying a used car from a dealer', url: 'https://consumer.ftc.gov/articles/buying-used-car-dealer'},
    {title: 'NHTSA: Safety recall lookup', url: 'https://www.nhtsa.gov/recalls'},
    {title: 'DOJ: NMVTIS consumer vehicle history information', url: 'https://vehiclehistory.bja.ojp.gov/nmvtis_consumers'},
  ],
  relatedTools: ['car-affordability-calculator', 'used-car-inspection-checklist', 'car-loan-calculator', 'total-cost-of-ownership-calculator'],
};
await writeFile('data/pillar-guide.ts', `import type {Guide} from './guides';\n\n// Adapted from the supplied pillar draft; examples are hypothetical.\nexport const pillarGuide: Guide = ${JSON.stringify(guide, null, 2)};\n`);
