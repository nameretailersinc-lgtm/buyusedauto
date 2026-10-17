import {notFound,permanentRedirect} from "next/navigation";
import {metadata} from "@/lib/site";
import {guides} from "@/data/guides";
import {guidePageSize,guidePagePath,paginateGuides} from "@/lib/guide-pagination";
import {GuidesCollection} from "@/components/guides-collection";

export const dynamicParams=false;
export function generateStaticParams(){return Array.from({length:Math.ceil(guides.length/guidePageSize)},(_,index)=>({page:String(index+1)}));}
function parsePage(value:string){if(!/^[1-9]\d*$/.test(value)||!paginateGuides(guides,Number(value)))notFound();return Number(value);}
export async function generateMetadata({params}:{params:Promise<{page:string}>}){
  const page=parsePage((await params).page);
  return metadata(`Used car buying guides — Page ${page}`,`Browse page ${page} of our used car guides. Compare vehicle checks, local registration advice, financing, and ownership planning.`,guidePagePath(page));
}
export default async function Page({params}:{params:Promise<{page:string}>}){
  const page=parsePage((await params).page);
  if(page===1)permanentRedirect("/guides");
  return <GuidesCollection page={page}/>;
}
