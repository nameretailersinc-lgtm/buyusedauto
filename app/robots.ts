import type {MetadataRoute} from "next";
import {siteUrl,canIndex} from "@/lib/site";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:"/",disallow:["/api/"]},...(canIndex?{sitemap:`${siteUrl}/sitemap.xml`}:{})};}

