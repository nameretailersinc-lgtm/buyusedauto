import {siteUrl,canIndex} from "@/lib/site";
import {sitemapSegments} from "@/lib/routes";
export const dynamic="force-static";
export function GET(){
  const segments=canIndex?sitemapSegments:[];
  const body=`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${segments.map(group=>`<sitemap><loc>${siteUrl}/sitemaps/${group}.xml</loc></sitemap>`).join("")}</sitemapindex>`;
  return new Response(body,{headers:{"Content-Type":"application/xml; charset=utf-8"}});
}
