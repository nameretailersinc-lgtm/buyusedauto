import {notFound} from "next/navigation";
import {metadata} from "@/lib/site";
import {categories} from "@/data/tools";
import {navigationOnlyCategories} from "@/lib/routes";
import {GuidesCollection} from "@/components/guides-collection";
export const dynamicParams=false;
export function generateStaticParams(){return categories.map(c=>({category:c.toLowerCase()}));}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=categories.find(c=>c.toLowerCase()===category);const path=`/guides/category/${category}`;return c?metadata(`${c} guides for used-car decisions`,`Explore our ${c.toLowerCase()} guides for used-car decisions. Find practical steps, clear examples, official sources, and related tools to help you plan your next move.`,path,{index:!navigationOnlyCategories.includes(path)}):{};}
export default async function Page({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=categories.find(c=>c.toLowerCase()===category);if(!c)notFound();return <GuidesCollection category={c}/>;}
