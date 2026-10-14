import type {MetadataRoute} from "next";
import {siteUrl,canIndex} from "@/lib/site";
import {indexableRouteGroups} from "@/lib/routes";
export default function sitemap():MetadataRoute.Sitemap{return canIndex?Object.values(indexableRouteGroups).flat().map(path=>({url:`${siteUrl}${path}`})):[];}
