import type {MetadataRoute} from "next";
import {siteUrl,canIndex} from "@/lib/site";
// Search and AI-answer crawlers are allowed explicitly so the policy is visible and auditable.
// Training-only crawlers are left to the default rule; change here if the owner wants a different stance.
const answerEngineBots=["Googlebot","Bingbot","OAI-SearchBot","ChatGPT-User","GPTBot","PerplexityBot","Perplexity-User","ClaudeBot","Claude-SearchBot","Claude-User","Google-Extended","Applebot","Applebot-Extended","DuckDuckBot"];
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:"*",allow:"/",disallow:["/api/"]},...(canIndex?[{userAgent:answerEngineBots,allow:"/",disallow:["/api/"]}]:[])],...(canIndex?{sitemap:`${siteUrl}/sitemap.xml`}:{})};}
