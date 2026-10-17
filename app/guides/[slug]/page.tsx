import {notFound} from "next/navigation";
import {guides} from "@/data/guides";
import {guideImages} from "@/data/visuals";
import {metadata,siteUrl,siteName} from "@/lib/site";
import {GuideDetail} from "@/components/guide-detail";
export const dynamicParams=false;
export function generateStaticParams(){return guides.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const g=guides.find(g=>g.slug===slug);if(!g)return{};const result=metadata(g.seoTitle??g.title,g.description,`/guides/${slug}`,{image:`/images/${guideImages[slug]}.webp`,locale:g.language?.replace("-","_")});return {...result,authors:[{name:siteName,url:`${siteUrl}/about`}],openGraph:{...result.openGraph,type:"article",...(g.updated?{modifiedTime:g.updated}:{})}};}
export default async function Guide({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const guide=guides.find(guide=>guide.slug===slug);if(!guide)notFound();const related=guides.filter(item=>item.slug!==slug).sort((a,b)=>Number(b.category===guide.category)-Number(a.category===guide.category)).slice(0,3);return <GuideDetail guide={guide} path={`/guides/${slug}`} related={related}/>;}
