import {readSitemapUrls} from "./sitemap-urls.mjs";
import {hasFreeApplicationOffer} from "./application-schema-policy.mjs";
import {load} from "cheerio";
import {mkdir,writeFile} from "node:fs/promises";
const base=process.env.TEST_BASE_URL||"http://127.0.0.1:3000";
const sitemap=await fetch(`${base}/sitemap.xml`);
if(!sitemap.ok)throw new Error(`Sitemap returned ${sitemap.status}`);
await sitemap.text();
const urls=await readSitemapUrls(base);
const paths=urls.map(url=>new URL(url).pathname);
const failures=[];const warnings=[];const pages=[];const titles=new Set();const descriptions=new Set();const links=new Map();
const assert=(test,message)=>{if(!test)failures.push(message);};
function validateSchema(node,path,$){
  assert(node&&typeof node==="object",`${path}: JSON-LD must be an object`);
  assert(node["@context"]==="https://schema.org",`${path}: schema context`);
  assert(typeof node["@type"]==="string",`${path}: schema type`);
  if(node["@type"]==="BreadcrumbList"){assert(Array.isArray(node.itemListElement)&&node.itemListElement.length>0,`${path}: breadcrumbs empty`);node.itemListElement?.forEach((item,i)=>{assert(item.position===i+1&&!!item.name&&/^https?:\/\//.test(item.item),`${path}: breadcrumb item ${i}`);});}
  if(node["@type"]==="WebApplication"){assert(hasFreeApplicationOffer(node,path),`${path}: free offer/currency`);assert(!!node.name&&!!node.applicationCategory&&!!node.operatingSystem,`${path}: application required fields`);}
  if(node["@type"]==="FAQPage"){assert(node.mainEntity?.length>=3,`${path}: FAQ entries`);for(const q of node.mainEntity||[]){assert(q["@type"]==="Question"&&q.acceptedAnswer?.["@type"]==="Answer",`${path}: FAQ types`);assert($("main").text().includes(q.name)&&$("main").text().includes(q.acceptedAnswer.text),`${path}: FAQ not visible in HTML`);}}
  if(node["@type"]==="Article"){assert(!!node.headline&&!!node.mainEntityOfPage&&node.author?.["@type"]==="Organization",`${path}: article fields`);assert(!node.reviewedBy,`${path}: unexpected reviewer`);}
}
for(const [index,path] of paths.entries()){
  const response=await fetch(base+path);assert(response.status===200,`${path}: HTTP ${response.status}`);
  const $=load(await response.text());const title=$("title").text();const description=$('meta[name="description"]').attr("content");const canonical=$('link[rel="canonical"]').attr("href");
  assert($("h1").length===1,`${path}: expected exactly one h1`);assert(!!title&&!titles.has(title),`${path}: missing/duplicate title`);assert(!!description&&!descriptions.has(description),`${path}: missing/duplicate description`);
  titles.add(title);descriptions.add(description);assert(!!canonical&&new URL(canonical).href===new URL(urls[index]).href,`${path}: canonical ${canonical} != ${urls[index]}`);assert(!$('meta[name="robots"]').attr("content")?.includes("noindex"),`${path}: unexpectedly noindex`);
  assert(!!$('meta[property="og:image"]').attr("content"),`${path}: missing OG image`);assert($('meta[name="twitter:card"]').attr("content")==="summary_large_image",`${path}: missing Twitter card`);
  if(title.length>70||title.length<30)warnings.push(`${path}: title length ${title.length}`);
  if((description?.length??0)>170||(description?.length??0)<130)warnings.push(`${path}: description length ${description?.length}`);
  let schemaCount=0;$('script[type="application/ld+json"]').each((_,el)=>{try{const schema=JSON.parse($(el).text());(Array.isArray(schema)?schema:[schema]).forEach(s=>{validateSchema(s,path,$);schemaCount++;});}catch(e){failures.push(`${path}: invalid JSON-LD ${e.message}`);}});assert(schemaCount>0,`${path}: no structured data`);
  $("a[href]").each((_,el)=>{const href=$(el).attr("href");if(!href||href.startsWith("mailto:")||href.startsWith("tel:"))return;const url=new URL(href,base+path);if(url.origin===new URL(base).origin){const key=url.pathname+url.search+url.hash;if(!links.has(key))links.set(key,path);}});
  pages.push({path,title,descriptionLength:description?.length,schemaCount,h1:$("h1").text()});
}
for(const [href,source] of links){const url=new URL(href,base);if(!paths.includes(url.pathname)&&!url.pathname.startsWith("/_next")) {const r=await fetch(url);assert(r.status===200,`${source}: broken internal link ${href} (${r.status})`);}if(url.hash){const r=await fetch(base+url.pathname);const $=load(await r.text());assert($(`[id="${decodeURIComponent(url.hash.slice(1)).replace(/"/g,"\\\"")}"]`).length>0,`${source}: missing anchor ${href}`);}}
for(const path of ["/robots.txt","/ads.txt","/llms.txt","/sitemaps/core.xml","/sitemaps/tools.xml","/sitemaps/guides.xml","/sitemaps/scenarios.xml"]){const r=await fetch(base+path);assert(r.status===200,`${path}: HTTP ${r.status}`);if(path==="/ads.txt")assert(!(await r.text()).includes("pub-000"),"Placeholder publisher ID");}
const og=await fetch(base+"/og?title=Car%20loan%20calculator");assert(og.ok&&og.headers.get("content-type")?.includes("image/png"),"OG image endpoint");
const invalid=await fetch(base+"/not-a-real-page");assert(invalid.status===404,"Unknown page must be 404");
const slash=await fetch(base+"/tools/",{redirect:"manual"});assert([301,308].includes(slash.status),"Trailing-slash URL must permanently redirect");
const query=await fetch(base+"/car-loan-calculator?price=17000");const query$=load(await query.text());assert(query$('link[rel="canonical"]').attr("href")?.endsWith("/car-loan-calculator"),"Query canonical must omit state");
for(const p of paths.filter(p=>p!=="/"))assert([...links.keys()].some(h=>new URL(h,base).pathname===p),`Orphan page: ${p}`);
await mkdir("reports",{recursive:true});await writeFile("reports/site-audit.json",JSON.stringify({scope:"Local HTTP checks; schema shape and visible-content checks, not Google rich-result validation",pages:pages.length,internalLinks:links.size,failures,warnings,details:pages},null,2));
console.log(JSON.stringify({pages:pages.length,internalLinks:links.size,failures,warnings},null,2));if(failures.length)process.exitCode=1;
