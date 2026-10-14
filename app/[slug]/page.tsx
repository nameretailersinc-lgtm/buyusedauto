import {notFound} from "next/navigation";
import {tools,toolBySlug} from "@/data/tools";
import {policies} from "@/data/policies";
import {ToolPage} from "@/components/tool-page";
import {InfoPage} from "@/components/info-page";
import {metadata} from "@/lib/site";
export const dynamicParams=false;
export function generateStaticParams(){return [...tools.map(t=>({slug:t.slug})),...Object.keys(policies).map(slug=>({slug}))];}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const page=toolBySlug(slug);const policy=policies[slug];if(!page&&!policy)return{};return metadata(page?.name??policy.title,page?.description??policy.description,`/${slug}`);}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const tool=toolBySlug(slug);if(tool)return <ToolPage tool={tool}/>;if(!policies[slug])notFound();return <InfoPage slug={slug}/>;}
