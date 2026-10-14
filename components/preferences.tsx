"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Icon } from "./icon";
declare global {interface Window {dataLayer: unknown[]; gtag?: (...args: unknown[])=>void;}}
const key="bua-privacy-v1";
const ga=process.env.NEXT_PUBLIC_GA_ID;
const validGa=!!ga && /^G-[A-Z0-9]+$/.test(ga);
function privacySignal(){return navigator.doNotTrack==="1"||(navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl===true;}
function disableAnalytics(disabled:boolean){if(ga)(window as unknown as Record<string,unknown>)[`ga-disable-${ga}`]=disabled;}
export function ThemeToggle() {
  const [dark,setDark]=useState(false);
  useEffect(()=>{
    let chosen="";try{chosen=localStorage.getItem("bua-theme")||"";}catch{}
    const enabled=chosen==="dark"||(!chosen&&matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme=enabled?"dark":"light";
    // Browser preference is unavailable during static rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(enabled);
  },[]);
  return <button className="icon-button" aria-label={dark?"Use light theme":"Use dark theme"} onClick={()=>{document.documentElement.dataset.theme=dark?"light":"dark";try{localStorage.setItem("bua-theme",dark?"light":"dark");}catch{}setDark(!dark);}}><Icon name="sun"/></button>;
}
export function Preferences() {
  const [open,setOpen]=useState(false);
  const [allowed,setAllowed]=useState(false);
  const [draft,setDraft]=useState(false);
  const [manage,setManage]=useState(false);
  const [signal,setSignal]=useState(false);
  useEffect(()=>{
    let choice:string|null=null;try{choice=localStorage.getItem(key);}catch{}
    const blocked=privacySignal();const consent=choice==="accepted"&&!blocked;
    window.dataLayer=window.dataLayer||[];
    window.gtag=(...args:unknown[])=>{window.dataLayer.push(args);};
    window.gtag("consent","default",{ad_storage:"denied",analytics_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    disableAnalytics(!consent);
    // Restore explicit browser choices after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllowed(consent);setDraft(consent);setSignal(blocked);setOpen(validGa&&choice===null&&!blocked);
  },[]);
  function choose(enabled:boolean){
    const consent=enabled&&validGa&&!privacySignal();
    try{localStorage.setItem(key,consent?"accepted":"rejected");}catch{}
    disableAnalytics(!consent);
    window.gtag?.("consent","update",{analytics_storage:consent?"granted":"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    setAllowed(consent);setDraft(consent);setOpen(false);
    if(!consent){document.cookie.split(";").forEach(c=>{
      const name=c.trim().split("=")[0];if(!name.startsWith("_ga"))return;
      document.cookie=`${name}=; Max-Age=0; path=/`;
      const parts=location.hostname.split(".");
      for(let i=0;i<parts.length-1;i++)document.cookie=`${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join(".")}`;
    });}
  }
  return <>
    <button className="text-button" onClick={()=>{setDraft(allowed);setOpen(true);setManage(true);}}>Privacy choices</button>
    {open&&<div className="consent-panel" role="dialog" aria-labelledby="privacy-title">
      <h2 id="privacy-title">Your privacy, your choice.</h2>
      <p>The calculators work without optional cookies. {validGa?"With your permission, Google Analytics helps us understand how the tools are used.":"Analytics and advertising are currently disabled."} We never send calculator inputs to analytics.</p>
      {signal&&<p>Your browser’s privacy signal keeps optional analytics off.</p>}
      {manage&&<label className="consent-check"><input type="checkbox" checked={draft} disabled={!validGa||signal} onChange={e=>setDraft(e.target.checked)}/>Allow optional analytics</label>}
      <div className="button-row">
        <button className="button secondary" onClick={()=>choose(false)}>Reject optional</button>
        {validGa&&!signal&&<button className="button" onClick={()=>choose(manage?draft:true)}>{manage?"Save choices":"Accept analytics"}</button>}
        <button className="text-button" onClick={()=>manage?setOpen(false):setManage(true)}>{manage?"Close":"Manage"}</button>
      </div>
      <Link href="/privacy-policy">Read our privacy policy</Link>
    </div>}
    {validGa&&allowed&&<>
      <Script id="analytics-consent" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};window['ga-disable-${ga}']=false;gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${ga}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});var ref='';try{var refUrl=new URL(document.referrer);ref=refUrl.origin+refUrl.pathname}catch(e){}gtag('event','page_view',{page_location:location.origin+location.pathname,page_referrer:ref,page_title:document.title});`}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive"/>
    </>}
  </>;
}
