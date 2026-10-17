import {readFile, writeFile} from 'node:fs/promises';

const attachments = process.argv.slice(2);
if (attachments.length !== 4) throw new Error('Pass Pakistan, UAE, USA, and UK/Europe draft paths.');
const drafts = await Promise.all(attachments.map(path => readFile(path, 'utf8')));
const pair = drafts[3];
function plainArticle(title, end) {
  const start = pair.indexOf(title);
  if (start < 0) throw new Error(`Missing article: ${title}`);
  let text = pair.slice(start).split(end)[0];
  text = text.replace('£10,000These', '£10,000\nThese').replace('€15,000These', '€15,000\nThese').replace('APKInspection', 'APK\nInspection');
  let expected = 1;
  const lines = text.split(/\r?\n/).map((line, index) => {
    if (index === 0) return `# ${line}`;
    const numbered = line.match(/^(\d+)\. (.+)/);
    if (numbered && Number(numbered[1]) === expected && expected <= 12) {expected++; return `## ${line}`;}
    if (/^(Quick Answer:|UK Used Car Buying Checklist|Europe Used Car Buying Checklist|Frequently Asked Questions|Conclusion)/.test(line)) return `## ${line}`;
    if (line.endsWith('?') || /^(Example Used Car Budget|Example European Used Car Budget|Category [ABSN]|Germany|France|Spain|Italy|Netherlands|Buying From a Private Seller|Buying From a Dealer|Buying Across EU Borders)$/.test(line)) return `### ${line}`;
    return line;
  });
  const result=[]; let inTable=false;
  for (const line of lines) {
    if (line.includes('\t')) {const cells=line.split('\t'); result.push(`| ${cells.join(' | ')} |`); if (!inTable) result.push(`| ${cells.map(()=>'---').join(' | ')} |`); inTable=true;}
    else {inTable=false;result.push(line);}
  }
  return result.join('\n');
}
const uk = plainArticle('How to Buy a Used Car in the UK in 2026:', 'Updated October 17, 2026.');
const europe = plainArticle('How to Buy a Used Car in Europe in 2026:', 'Updated October 17, 2026.');
const configs = [
  {region:'PK', slug:'buy-used-car-pakistan', name:'Pakistan', seoTitle:'How to Buy a Used Car in Pakistan 2026: Complete Guide', description:'Buying a used car in Pakistan? Learn how to check registration, verify documents, inspect engines, avoid fraud and transfer ownership safely.', text:drafts[0], sources:[
    ['Punjab Excise: official vehicle verification','https://excise.punjab.gov.pk/node/2847'],
    ['Sindh Excise: online vehicle verification','https://www.excise.gos.pk/online-services/vehicle-verification'],
    ['Islamabad Excise: registration and transfer services','https://islamabadexcise.gov.pk/'],
    ['KP Excise: official vehicle services','https://www.kpexcise.gov.pk/new/'],
    ['Punjab Excise: ownership transfer through ePay','https://excise.punjab.gov.pk/system/files/TRANSFER%20OF%20OWNERSHIP%20%28TO%29%20THROUGH%20EPAY_0.pdf'],
  ]},
  {region:'AE', slug:'buy-used-car-uae', name:'UAE', seoTitle:'Buying a Used Car in UAE 2026: Dubai & Abu Dhabi Guide', description:'Learn how to buy a used car in UAE. Check GCC specifications, accident history, inspection, RTA transfer, insurance and financing.', text:drafts[1], sources:[
    ['Dubai RTA: transfer vehicle ownership','https://rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=600'],
    ['UAE Ministry of Interior: vehicle ownership transfer','https://www.moi.gov.ae/DataFolder/Files/User%20Manuals/2021/Portal/English/Ownership%20TransferEN.pdf'],
  ]},
  {region:'US', slug:'buy-used-car-usa', name:'USA', seoTitle:'How to Buy a Used Car in USA 2026: Complete Checklist', description:'Buying a used car in the USA? Learn VIN checks, Carfax alternatives, title verification, dealer fees, financing, inspections and state registration.', text:drafts[2], sources:[
    ['FTC: buying a used car from a dealer','https://consumer.ftc.gov/articles/buying-used-car-dealer'],
    ['DOJ: NMVTIS approved vehicle history providers','https://vehiclehistory.bja.ojp.gov/nmvtis_consumers'],
    ['NHTSA: safety recall lookup','https://www.nhtsa.gov/recalls'],
  ]},
  {region:'GB', slug:'buy-used-car-uk', name:'United Kingdom', seoTitle:'Buying a Used Car in UK 2026: MOT, DVLA & Full Checklist', description:'Learn how to buy a used car in the UK. Check MOT history, DVLA records, V5C logbook, insurance, vehicle tax, finance and common scams.', text:uk, sources:[
    ['GOV.UK: check a used vehicle before buying','https://www.gov.uk/checks-when-buying-a-used-car'],
    ['GOV.UK: check MOT history','https://www.gov.uk/check-mot-history'],
    ['GOV.UK: buy, insure, register and tax a vehicle','https://www.gov.uk/buy-a-vehicle'],
    ['GOV.UK: buying repaired written-off vehicles','https://www.gov.uk/government/publications/buying-repaired-written-off-vehicles-a-consumer-guide/buying-repaired-written-off-vehicles-a-consumer-guide'],
  ]},
  {region:'EU', slug:'buy-used-car-europe', name:'Europe (EU)', seoTitle:'Buying a Used Car in Europe 2026: EU Registration & VAT', description:'Learn how to buy a used car in Europe. Compare Germany, France, Spain and Italy, understand EU VAT, registration, inspections and cross-border purchases.', text:europe, sources:[
    ['Your Europe: vehicle VAT when buying or selling abroad','https://europa.eu/youreurope/citizens/vehicles/cars/vat-buying-selling-cars/'],
    ['Your Europe: car registration documents and formalities','https://europa.eu/youreurope/citizens/vehicles/registration/formalities/index_en.htm'],
    ['Your Europe: consumer guarantees and second-hand goods','https://europa.eu/youreurope/citizens/consumers/shopping/guarantees/index_en.htm'],
  ]},
];

const aliases = {
  '/tools/car-loan':'/car-loan-calculator', '/tools/car-affordability':'/car-affordability-calculator',
  '/tools/cost-of-ownership':'/total-cost-of-ownership-calculator',
};
function parse(text, region) {
  let parent,current; const sections=[];
  function clean(value) {return value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_,title,url)=>{
    let target=url;
    if(url.startsWith('https://buyusedautomobiles.com/')) {const path=new URL(url).pathname;target=aliases[path]??path;}
    if(region==='PK' && target==='/car-loan-calculator') target='/pk/car-financing-calculator';
    if(current){current.links??=[];if(!current.links.some(link=>link.url===target))current.links.push({title:region==='PK'&&target.startsWith('/pk/')?'Pakistan car financing calculator':title,url:target});}
    return title;
  }).replace(/\*\*/g,'').replace(/^\[ \]\s*/,'');}
  for(const line of text.split(/\r?\n/)) {
    if(line.startsWith('## ')){parent=current={heading:line.slice(3),paragraphs:[]};sections.push(current);continue;}
    if(line.startsWith('### ')){current={heading:line.slice(4),paragraphs:[]};(parent.subsections??=[]).push(current);continue;}
    if(!current || !line.trim() || /^\*?Updated/.test(line))continue;
    if(line.startsWith('|')){const cells=line.split('|').slice(1,-1).map(cell=>clean(cell.trim()));if(cells.every(cell=>/^:?-+:?$/.test(cell)))continue;if(!current.table)current.table={headers:cells,rows:[]};else current.table.rows.push(cells);}
    else if(/^(- |\d+\. )/.test(line))(current.bullets??=[]).push(clean(line.replace(/^(- |\d+\. )/,'')));
    else current.paragraphs.push(clean(line));
  }
  return sections;
}
const articles=configs.map(config=>{
  const sections=parse(config.text,config.region);
  const intro=sections[0].paragraphs.join(' ');
  sections.splice(1,0,{heading:`Which official resources should ${config.name} buyers use?`,paragraphs:[config.region==='PK'?'Choose the authority for the vehicle’s registration jurisdiction. Punjab procedures do not automatically apply in Sindh, Islamabad, or KP; confirm current requirements directly before paying.':config.region==='AE'?'Use the authority for the registration emirate. Dubai RTA procedures are specific to Dubai; check the responsible local or federal channel for Abu Dhabi, Sharjah, and inter-emirate transactions.':config.region==='GB'?'Start with the official used-vehicle checklist and MOT history. Check Northern Ireland requirements separately where applicable.':config.region==='EU'?'Start with EU guidance, then confirm the exact requirements in the country of registration. This guide focuses on EU transactions; the UK, Norway, and Switzerland have different customs and registration arrangements.':'Use federal resources for recalls and reported title history, then confirm transfer, tax, and registration requirements with your state agency.'],links:config.sources.map(([title,url])=>({title,url}))});
  sections.push({heading:'Continue your buying research',paragraphs:[config.region==='PK'?'Use the Pakistan financing calculator for PKR scenarios and read its assumptions. Other calculators model specific assumptions and may use US currency or rules.':config.region==='US'?'Use the inspection checklist, compare financing, and calculate the full ownership budget before committing.':'Use the inspection checklist to record condition. The linked finance and ownership tools provide illustrative calculations with their displayed currency and assumptions; they do not calculate local taxes, PCP or HP agreements, or jurisdiction-specific fees.'],links:[{title:'Complete used car buying guide',url:'/guides/complete-used-car-buying-guide'},{title:'Independent inspection guide',url:'/guides/how-to-inspect-a-used-car'},{title:'Used car inspection checklist',url:'/used-car-inspection-checklist'},...(config.region==='PK'?[{title:'Pakistan car financing calculator',url:'/pk/car-financing-calculator'}]:[{title:'Car loan calculator: illustrative fixed-rate payments',url:'/car-loan-calculator'},{title:'Total cost of ownership calculator',url:'/total-cost-of-ownership-calculator'}]),...configs.filter(other=>other.slug!==config.slug).map(other=>({title:`Buying in ${other.name}`,url:`/guides/${other.slug}`}))]});
  return {slug:config.slug,title:config.text.split(/\r?\n/)[0].replace(/^# /,''),seoTitle:config.seoTitle,description:config.description,category:'Buying',region:config.region,language:config.region==='EU'?'en':`en-${config.region}`,updated:'2026-10-17',readingMinutes:Math.ceil(config.text.split(/\s+/).length/200),intro,sections,sources:config.sources.map(([title,url])=>({title,url})),relatedTools:config.region==='US'?['used-car-inspection-checklist','car-loan-calculator','car-affordability-calculator','total-cost-of-ownership-calculator']:['used-car-inspection-checklist']};
});
await writeFile('data/country-guides.ts',`import type {Guide} from './guides';\n\n// Supplied country drafts, localized links, and official reference resources.\nexport const countryGuides: Guide[] = ${JSON.stringify(articles,null,2)};\n`);
