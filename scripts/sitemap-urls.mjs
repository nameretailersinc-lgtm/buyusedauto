import {load} from "cheerio";
/** Follow the local site's sitemap index while preserving canonical URL values. */
export async function readSitemapUrls(base,path="/sitemap.xml",seen=new Set()){
  if(seen.has(path)||seen.size>=20)throw new Error("Sitemap cycle or excessive segment count");
  seen.add(path);
  const response=await fetch(new URL(path,base),{redirect:"manual"});
  if(response.status!==200)throw new Error(`Sitemap ${path} returned ${response.status}`);
  const $=load(await response.text(),{xmlMode:true});
  if($("sitemapindex").length){
    const children=$("sitemap > loc").map((_,element)=>$(element).text()).get();
    const urls=[];
    for(const child of children){const url=new URL(child);if(!/^\/sitemaps\/[a-z]+\.xml$/.test(url.pathname)||url.search||url.hash)throw new Error("Unexpected sitemap segment URL");urls.push(...await readSitemapUrls(base,url.pathname,seen));}
    return urls;
  }
  if(!$("urlset").length)throw new Error(`Invalid sitemap root at ${path}`);
  return $("url > loc").map((_,element)=>$(element).text()).get();
}
