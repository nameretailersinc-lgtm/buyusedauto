import Link from "next/link";
import {notFound} from "next/navigation";
import {pkGuides,pkSources,pkCalculatorPath} from "@/data/pakistan";
import {metadata as pageMetadata} from "@/lib/site";
import {Breadcrumbs,JsonLd} from "@/components/seo";
export const dynamicParams=false;
export function generateStaticParams(){return pkGuides.map(guide=>({slug:guide.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const guide=pkGuides.find(item=>item.slug===slug);if(!guide)return {};const result=pageMetadata(guide.title,guide.description,`/pk/guides/${slug}`);return {...result,openGraph:{...result.openGraph,locale:"en_PK",type:"article" as const}};}

import {GuideDetail} from "@/components/guide-detail";
import type {Guide} from "@/data/guides";
import {guides} from "@/data/guides";
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const draft=pkGuides.find(item=>item.slug===slug);if(!draft)notFound();const guide:Guide={...draft,category:"Financing",region:"PK",language:"en-PK",intro:draft.description,updated:"2026-10-16",reviewedOn:"2026-10-15",readingMinutes:Math.max(1,Math.ceil(JSON.stringify(draft.sections).split(/\s+/).length/200)),sources:pkSources,relatedTools:["used-car-inspection-checklist"],sections:[...draft.sections,{heading:"Plan with your own quote",paragraphs:["Use the Pakistan financing calculator with the actual contract amounts and review the assumptions before comparing offers."],links:[{title:"Pakistan car financing calculator",url:pkCalculatorPath},...pkGuides.filter(item=>item.slug!==slug).map(item=>({title:item.title,url:`/pk/guides/${item.slug}`}))]}]};return <GuideDetail guide={guide} path={`/pk/guides/${slug}`} related={guides.filter(item=>item.region==="PK"||item.category==="Financing").slice(0,3)}/>;}
