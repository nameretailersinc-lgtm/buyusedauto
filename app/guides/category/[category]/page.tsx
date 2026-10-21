import {notFound} from "next/navigation";
import {metadata} from "@/lib/site";
import {guideCategories as categories,guideCategorySlug} from "@/data/guide-categories";
import {navigationOnlyCategories} from "@/lib/routes";
import {GuidesCollection} from "@/components/guides-collection";
export const dynamicParams=false;
export function generateStaticParams(){return categories.map(c=>({category:guideCategorySlug(c)}));}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=categories.find(c=>guideCategorySlug(c)===category);const path=`/guides/category/${category}`;return c?metadata(c==="Mathematics / Calculators"?`${c} guides`:`${c} guides for used-car decisions`,c==="Mathematics / Calculators"?"Learn percentage calculations with formulas, worked examples, and spreadsheet instructions. Browse our mathematics and calculator guides.":`Explore our ${c.toLowerCase()} guides for used-car decisions. Find practical steps, clear examples, official sources, and related tools to help you plan your next move.`,path,{index:!navigationOnlyCategories.includes(path)}):{};}
export default async function Page({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=categories.find(c=>guideCategorySlug(c)===category);if(!c)notFound();return <GuidesCollection category={c}/>;}
