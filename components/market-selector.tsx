"use client";
import {usePathname,useRouter} from "next/navigation";
import {trackUsage} from "@/lib/analytics";
import {markets} from "@/lib/markets";
export function MarketSelector(){
  const path=usePathname();const router=useRouter();
  return <div className="field"><label htmlFor="market-language">Country and language</label><select id="market-language" value={path.startsWith("/pk/")?"PK":"US"} onChange={event=>{const country=event.target.value==="PK"?"PK":"US";trackUsage({name:"country_selected",country});router.push(country==="PK"?markets.PK.path:markets.US.path);}}><option value="US">{markets.US.name} · {markets.US.currency} · English</option><option value="PK">{markets.PK.name} · {markets.PK.currency} · English</option></select><noscript><p><a href={markets.US.path}>United States tools</a> · <a href={markets.PK.path}>Pakistan financing</a></p></noscript></div>;
}
