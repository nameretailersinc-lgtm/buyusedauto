import Link from "next/link";
import {guidePagePath} from "@/lib/guide-pagination";

export function GuidePagination({page,totalPages,category}: {page:number;totalPages:number;category?:string}) {
  if (totalPages < 2) return null;
  return <nav className="guide-pagination" aria-label="Guide pages">
    {page > 1 && <Link href={guidePagePath(page-1,category)} rel="prev">Previous</Link>}
    {Array.from({length:totalPages},(_,index)=>index+1).map(number=>number===page?<span key={number} aria-current="page" aria-label={`Page ${number}, current page`}>{number}</span>:<Link key={number} href={guidePagePath(number,category)} aria-label={`Page ${number}`}>{number}</Link>)}
    {page < totalPages && <Link href={guidePagePath(page+1,category)} rel="next">Next</Link>}
  </nav>;
}
