"use client";
import {trackUsage} from "@/lib/analytics";
export function PartnerLink({url,name}:{url:string;name:string}){
  return <a href={url} rel="sponsored nofollow noopener" target="_blank" onClick={()=>trackUsage({name:"outbound_affiliate_click",country:location.pathname.startsWith("/pk/")?"PK":"US"})}>Visit {name} ↗</a>;
}
