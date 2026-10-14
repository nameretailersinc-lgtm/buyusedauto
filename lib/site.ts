import type { Metadata } from "next";
import {normalizeSiteOrigin,indexingEnabled} from "./seo-config";
export const siteName = "BuyUsedAutomobiles";
export const siteUrl = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL || "https://buyusedautomobiles.com");
export const canIndex = indexingEnabled(process.env);
export function metadata(title: string, description: string, path = "/",options:{index?:boolean;image?:string}={}): Metadata {
  const fullTitle = title.length < 43 ? `${title} | BuyUsedAutomobiles` : title;
  const image = options.image?`${siteUrl}${options.image}`:`${siteUrl}/og?title=${encodeURIComponent(title)}`;
  const index=canIndex&&options.index!==false;
  return { title: {absolute:fullTitle}, description, robots:{index,follow:true,googleBot:{index,follow:true,"max-image-preview":"large"}},alternates: {canonical:`${siteUrl}${path}`}, openGraph: { title:fullTitle,description,url:`${siteUrl}${path}`,siteName,type:"website",locale:"en_US",images:[{url:image,...(!options.image?{width:1200,height:630}:{}),alt:title}]}, twitter:{card:"summary_large_image",title:fullTitle,description,images:[image]} };
}
export const money = (n: number, digits = 0) => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:digits,maximumFractionDigits:digits}).format(n);
export const decimal = (n: number, digits = 1) => new Intl.NumberFormat("en-US", {maximumFractionDigits:digits}).format(n);
