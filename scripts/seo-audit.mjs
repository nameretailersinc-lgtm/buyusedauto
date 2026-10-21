import {readSitemapUrls} from "./sitemap-urls.mjs";
import {hasFreeApplicationOffer} from "./application-schema-policy.mjs";
import {paginationRedirectTarget} from "./seo-route-policy.mjs";
import {load} from "cheerio";
import {readFile,mkdir,writeFile} from "node:fs/promises";
import {request as httpRequest} from "node:http";
import {request as httpsRequest} from "node:https";

const base=(process.env.TEST_BASE_URL||"http://127.0.0.1:3417").replace(/\/$/,"");
const output=process.env.SEO_AUDIT_OUTPUT||"reports/seo-after.json";
const expectIndexable=process.env.SEO_EXPECT_INDEXABLE!=="false";
const cleanSchema=process.env.SEO_EXPECT_CLEAN_SCHEMA==="true";
const failures=[],warnings=[],pages=[],statuses=[],sitemaps=[],links=new Map(),images=new Set();
const assert=(ok,message)=>{if(!ok)failures.push(message);};
const normalize=url=>new URL(url).href;
async function get(path){return fetch(new URL(path,base),{redirect:"manual"});}
const root=await get("/sitemap.xml");assert(root.status===200,"Root sitemap must return 200");
const rootXml=load(await root.text(),{xmlMode:true});
const sitemapUrls=await readSitemapUrls(base);
assert(rootXml("sitemapindex").length===1,"Root sitemap must be an index");
assert(new Set(sitemapUrls).size===sitemapUrls.length,"Duplicate root sitemap URLs");
const sitemapPaths=sitemapUrls.map(url=>new URL(url).pathname);
if(!expectIndexable)assert(sitemapUrls.length===0,"Disabled/preview build must not advertise indexable sitemap URLs");
let manifest;
try{manifest=JSON.parse(await readFile(`${process.env.NEXT_BUILD_DIR||".next"}/prerender-manifest.json`,"utf8"));}catch{throw new Error("Build first: route coverage requires the production prerender manifest.");}
const paths=Object.keys(manifest.routes).filter(p=>!/^\/(?:_|robots\.txt|sitemap\.xml|sitemaps\/|ads\.txt)/.test(p));
const robotsResponse=await get("/robots.txt");const robots=await robotsResponse.text();assert(robotsResponse.status===200,"robots.txt must return 200");
const disallows=[...robots.matchAll(/^Disallow:\s*(.+)$/gm)].map(m=>m[1].trim());
for(const [group,path] of [["core","/sitemaps/core.xml"],["tools","/sitemaps/tools.xml"],["guides","/sitemaps/guides.xml"],["scenarios","/sitemaps/scenarios.xml"],["pk","/sitemaps/pk.xml"]]){
  if(expectIndexable)assert(rootXml("sitemap > loc").toArray().some(node=>new URL(rootXml(node).text()).pathname===path),`${path}: sitemap group must be advertised by the main index`);
  const response=await get(path);assert(response.status===200,`${path}: HTTP ${response.status}`);
  const $=load(await response.text(),{xmlMode:true});const urls=$("url > loc").map((_,el)=>$(el).text()).get();
  sitemaps.push({group,path,status:response.status,urls});
}
const grouped=sitemaps.flatMap(s=>s.urls);assert(new Set(grouped).size===grouped.length,"Duplicate grouped sitemap URL");
assert([...new Set(grouped.map(normalize))].sort().join("\n")===[...new Set(sitemapUrls.map(normalize))].sort().join("\n"),"Root and grouped sitemaps must contain the same canonical set");
const titles=new Map(),descriptions=new Map();
for(const path of paths){
  const response=await get(path);
  const redirectTarget=paginationRedirectTarget(path);
  if(redirectTarget){
    const location=response.headers.get("location");
    assert(response.status===308,`${path}: page-one alias must permanently redirect`);
    assert(!!location&&new URL(location,base).pathname===redirectTarget,`${path}: incorrect pagination redirect target`);
    assert(!sitemapPaths.includes(path),`${path}: redirect alias must not appear in a sitemap`);
    const target=await get(redirectTarget);assert(target.status===200,`${path}: redirect destination must return 200`);
    statuses.push({path,status:response.status,location});
    await response.body?.cancel();await target.body?.cancel();
    continue;
  }
  const html=await response.text();const $=load(html);
  const title=$("title").text(),description=$('meta[name="description"]').attr("content")||"";
  const canonicals=$('link[rel="canonical"]').map((_,el)=>$(el).attr("href")).get();
  const canonical=canonicals[0];const metaRobots=$('meta[name="robots"],meta[name="googlebot"]').map((_,el)=>$(el).attr("content")||"").get();
  const headerRobots=response.headers.get("x-robots-tag")||"";
  const noindex=[...metaRobots,headerRobots].some(v=>/(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(v));
  const robotsBlocked=disallows.some(rule=>rule==="/"||path.startsWith(rule.replace(/\*.*$/,"")));
  assert(response.status===200,`${path}: HTTP ${response.status}`);assert(canonicals.length===1,`${path}: expected one canonical`);
  if(canonical){const url=new URL(canonical);assert(url.protocol==="https:",`${path}: canonical must use HTTPS`);assert(!url.search&&!url.hash,`${path}: canonical contains query/hash`);assert(url.pathname===path,`${path}: unexpected canonical path ${url.pathname}`);}
  assert($("h1").length===1,`${path}: expected one H1`);assert(!!title&&!!description,`${path}: missing title/description`);
  if(titles.has(title))warnings.push(`${path}: same title as ${titles.get(title)}`);titles.set(title,path);
  if(descriptions.has(description))warnings.push(`${path}: same description as ${descriptions.get(description)}`);descriptions.set(description,path);
  const included=sitemapPaths.includes(path);
  if(included){assert(!noindex,`${path}: sitemap URL is noindex`);assert(!robotsBlocked,`${path}: sitemap URL blocked by robots.txt`);assert(!!canonical&&sitemapUrls.some(url=>normalize(url)===normalize(canonical)),`${path}: sitemap URL is not canonical`);}
  if(!expectIndexable)assert(noindex,`${path}: preview/disabled page lacks noindex`);
  const schema=[];$('script[type="application/ld+json"]').each((_,el)=>{try{const value=JSON.parse($(el).text());schema.push(...(Array.isArray(value)?value:[value]));}catch{failures.push(`${path}: malformed JSON-LD`);}});
  for(const node of schema){assert(node["@context"]==="https://schema.org",`${path}: JSON-LD context`);assert(!node.aggregateRating&&!node.review&&!node.reviewedBy,`${path}: unexpected review/rating claim`);
    if(node["@type"]==="WebApplication")assert(hasFreeApplicationOffer(node,path),`${path}: free offer/currency`);
    if(cleanSchema)assert(!["FAQPage","HowTo"].includes(node["@type"]),`${path}: obsolete rich-result targeting markup`);
    if(node["@type"]==="CollectionPage"){assert(node.mainEntity?.["@type"]==="ItemList",`${path}: collection must list real items`);for(const item of node.mainEntity?.itemListElement||[])assert($("main a[href]").toArray().some(el=>new URL($(el).attr("href"),base+path).pathname===new URL(item.url).pathname),`${path}: structured collection item is not visibly linked`);}
    if(node["@type"]==="Article")assert(node.headline&&node.image&&node.author?.["@type"]==="Organization"&&node.mainEntityOfPage,`${path}: article identity/image/byline`);
  }
  assert(schema.length>0,`${path}: missing structured data`);
  const paragraphs=$("main article p,main .tool-prose p,main .page-heading p").filter((_,el)=>!$(el).closest(".guide-card,.featured-guide,.article-tool-callout,.article-end").length).map((_,el)=>$(el).text().replace(/\s+/g," ").trim()).get();
  $("main img").each((_,el)=>{const src=$(el).attr("src");if(src){const url=new URL(src,base);if(url.pathname==="/_next/image"){const asset=url.searchParams.get("url");if(asset?.startsWith("/"))images.add(asset);}else if(url.origin===new URL(base).origin)images.add(url.pathname);}assert($(el).attr("alt")!==undefined,`${path}: image missing alt attribute`);});
  $("a[href]").each((_,el)=>{const href=$(el).attr("href");if(!href||/^(mailto:|tel:)/.test(href))return;const url=new URL(href,base+path);if(url.origin===new URL(base).origin||(canonical&&url.origin===new URL(canonical).origin)){const key=url.pathname+url.search+url.hash;if(!links.has(key))links.set(key,new Set());links.get(key).add(path);}});
  pages.push({path,status:response.status,title,description,canonical,metaRobots,headerRobots,noindex,robotsBlocked,inSitemap:included,schemaTypes:schema.map(s=>s["@type"]),mainWordCount:$("main").text().trim().split(/\s+/).length,paragraphs});
  if(path!=="/"){const slash=await get(path+"/");statuses.push({path:path+"/",status:slash.status,location:slash.headers.get("location")});assert([301,308].includes(slash.status),`${path}/: expected permanent redirect`);assert(slash.headers.get("location")===path,`${path}/: redirect must preserve canonical path`);}
}
for(const [href,sources] of links){const url=new URL(href,base);const response=await get(url.pathname+url.search);assert(response.status===200,`${[...sources][0]}: internal destination ${href} returned ${response.status}`);if(url.hash){const $=load(await response.text());assert($("[id]").toArray().some(el=>$(el).attr("id")===decodeURIComponent(url.hash.slice(1))),`${href}: missing fragment`);}}
for(const page of pages){page.inboundPages=[...new Set([...links].filter(([href])=>new URL(href,base).pathname===page.path).flatMap(([,sources])=>[...sources]))].filter(p=>p!==page.path);if(page.path!=="/")assert(page.inboundPages.length>0,`${page.path}: orphan page`);}
for(const path of images){const r=await get(path);assert(r.status===200,`${path}: image HTTP ${r.status}`);}
for(const path of ["/not-a-real-page","/guides/not-a-real-guide","/guides/category/not-a-category","/car-loan-calculator/not-a-scenario","/car-loan-payment/not-a-scenario","/sitemaps/invalid.xml"]){const r=await get(path);statuses.push({path,status:r.status});assert(r.status===404,`${path}: unknown route must be 404`);}
for(const path of ["/favicon.ico","/favicon-48.png","/apple-touch-icon.png","/brand/logo-mark.png","/brand/logo-wordmark.svg","/brand/social-avatar.png","/brand/social-cover-1200x630.webp"]){if(cleanSchema){const r=await get(path);assert(r.status===200,`${path}: brand asset HTTP ${r.status}`);}}
if(cleanSchema){const og=await get("/og?title=Audit");assert(og.status===200&&og.headers.get("content-type")?.includes("image/png"),"OG API must still render PNG");assert(og.headers.get("x-robots-tag")?.includes("noindex"),"OG endpoint should be noindex and crawlable");assert(!disallows.some(p=>"/og".startsWith(p)),"OG endpoint should not be robots-blocked");}
if(expectIndexable&&cleanSchema){const homepage=pages.find(p=>p.path==="/");const canonical=new URL(homepage.canonical);const alternate=canonical.hostname.startsWith("www.")?canonical.hostname.slice(4):`www.${canonical.hostname}`;const target=new URL(base+"/tools?utm_source=audit");const r=await new Promise((resolve,reject)=>{const request=(target.protocol==="https:"?httpsRequest:httpRequest)(target,{headers:{host:alternate}},response=>{response.resume();resolve({status:response.statusCode,location:response.headers.location});});request.setTimeout(10000,()=>request.destroy(new Error("Host redirect check timed out")));request.on("error",reject);request.end();});assert(r.status===308,"Alternate hostname must permanently redirect");assert(r.location===`${canonical.origin}/tools?utm_source=audit`,"Host redirect must preserve path and query");statuses.push({path:"/tools?utm_source=audit",requestHost:alternate,...r});}
for(const page of pages.filter(p=>p.schemaTypes.includes("WebApplication")||p.schemaTypes.includes("WebPage")&&p.path.includes("calculator"))){const r=await get(page.path+"?price=17000&utm_source=audit");const $=load(await r.text());assert($('link[rel="canonical"]').attr("href")===page.canonical,`${page.path}: query canonical changed`);}
const duplicates=[];for(let i=0;i<pages.length;i++)for(let j=i+1;j<pages.length;j++){const a=new Set(pages[i].paragraphs),b=new Set(pages[j].paragraphs);if(a.size>=3&&b.size>=3){const shared=[...a].filter(p=>b.has(p)&&p.length>80);const ratio=shared.length/Math.min(a.size,b.size);if(ratio>.65)duplicates.push({pages:[pages[i].path,pages[j].path],sharedParagraphRatio:ratio,assessment:"Manual review signal, not an automatic thin-content determination"});}}
for(const page of pages)delete page.paragraphs;
const report={scope:"Local production HTML and HTTP audit; not Search Console indexing evidence or external rich-result validation",expectIndexable,pagesChecked:pages.length,sitemapUrlCount:sitemapUrls.length,internalDestinations:links.size,imagesChecked:images.size,failures,warnings,robots,sitemaps,pages,statusChecks:statuses,duplicateParagraphSignals:duplicates};
await mkdir("reports",{recursive:true});await writeFile(output,JSON.stringify(report,null,2));console.log(JSON.stringify({output,pages:pages.length,sitemapUrls:sitemapUrls.length,internalDestinations:links.size,images:images.size,failures,warnings,duplicateParagraphSignals:duplicates},null,2));if(failures.length)process.exitCode=1;
