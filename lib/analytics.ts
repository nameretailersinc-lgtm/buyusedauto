import type {ToolId} from "../data/tools";
export type UsageEvent={name:"calculator_started"|"calculator_completed";tool:ToolId|"pk-financing";country:"US"|"PK"}|{name:"country_selected";country:"US"|"PK"};
/** Only fixed identifiers: no inputs, result values, query strings or referrers. */
export function trackUsage(event:UsageEvent){
  const ga=process.env.NEXT_PUBLIC_GA_ID;
  if(typeof window==="undefined"||!ga||!/^G-[A-Z0-9]+$/.test(ga))return false;
  try{
    if(localStorage.getItem("bua-privacy-v1")!=="accepted"||navigator.doNotTrack==="1"||(navigator as Navigator&{globalPrivacyControl?:boolean}).globalPrivacyControl)return false;
    if((window as unknown as Record<string,unknown>)[`ga-disable-${ga}`]!==false||typeof window.gtag!=="function")return false;
    if(!["US","PK"].includes(event.country))return false;
    const parameters:Record<string,string>={send_to:ga,country:event.country,page_location:window.location.origin+window.location.pathname,page_referrer:""};
    if(event.name!=="country_selected"){
      if(!["loan","depreciation","value","ownership","affordability","fuel","trade","lease","inspection","negotiation","tax","pk-financing"].includes(event.tool))return false;
      parameters.tool_id=event.tool;
    }
    window.gtag("event",event.name,parameters);
    return true;
  }catch{return false;}
}
