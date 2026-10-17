import {notFound,permanentRedirect} from "next/navigation";
import {metadata} from "@/lib/site";
import {categories} from "@/data/tools";
import {guides} from "@/data/guides";
import {guidePageSize,guidePagePath,paginateGuides} from "@/lib/guide-pagination";
import {GuidesCollection} from "@/components/guides-collection";

export const dynamicParams=false;
export function generateStaticParams(){return categories.flatMap(category=>Array.from({length:Math.max(1,Math.ceil(guides.filter(guide=>guide.category===category).length/guidePageSize))},(_,index)=>({category:category.toLowerCase(),page:String(index+1)})));}
async function resolve(params:Promise<{category:string;page:string}>){
  const values=await params;const category=categories.find(category=>category.toLowerCase()===values.category);
  if(!category||!/^[1-9]\d*$/.test(values.page)||!paginateGuides(guides.filter(guide=>guide.category===category),Number(values.page)))notFound();
  return {category,page:Number(values.page)};
}
export async function generateMetadata({params}:{params:Promise<{category:string;page:string}>}){
  const {category,page}=await resolve(params);
  return metadata(`${category} used car guides — Page ${page}`,`Browse page ${page} of our ${category.toLowerCase()} guides for used car decisions, with practical checks, clear examples, and official resources.`,guidePagePath(page,category));
}
export default async function Page({params}:{params:Promise<{category:string;page:string}>}){
  const {category,page}=await resolve(params);
  if(page===1)permanentRedirect(guidePagePath(1,category));
  return <GuidesCollection category={category} page={page}/>;
}
