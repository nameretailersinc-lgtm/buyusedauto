import {indexableRouteGroups as routeGroups} from "@/lib/routes";
import {siteUrl,canIndex} from "@/lib/site";
export const dynamic="force-static";
export const dynamicParams=false;
export function generateStaticParams(){return [...Object.keys(routeGroups),"us"].map(group=>({group:`${group}.xml`}));}
export async function GET(_request:Request,{params}:{params:Promise<{group:string}>}){const {group}=await params;const key=group.replace(/\.xml$/,"") as keyof typeof routeGroups;const paths=String(key)==="us"?Object.entries(routeGroups).filter(([name])=>name!=="pk").flatMap(([,paths])=>paths):routeGroups[key];if(!paths)return new Response("Not found",{status:404});const escape=(v:string)=>v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${(canIndex?paths:[]).map(p=>`<url><loc>${escape(siteUrl+p)}</loc></url>`).join("")}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8"}});}
