"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {tools} from "@/data/tools";
import {Icon} from "./icon";
const subtitles:Record<string,string>={apr:"Compare interest and finance fees",repair:"Total an itemized repair quote",registration:"Budget registration and vehicle tax",payoff:"Compare extra principal payments",refinance:"Compare a replacement loan and fees",down:"Plan cash and trade-in contributions",ev:"Estimate session energy and cost",loan:"Calculate monthly payments",depreciation:"See how value could change",value:"Explore a modeled value range",ownership:"See the total cost over time",affordability:"Check your planning budget",fuel:"Calculate fuel expenses",trade:"Estimate trade-in equity",lease:"Compare costs over the same term",inspection:"Know what to look for",negotiation:"Build an evidence-based offer",tax:"Use your verified tax rate"};
export function ToolsMenu(){
  const [open,setOpen]=useState(false);const wrapper=useRef<HTMLDivElement>(null);const trigger=useRef<HTMLButtonElement>(null);const pathname=usePathname();
  useEffect(()=>{if(!open)return;function outside(event:PointerEvent){if(!wrapper.current?.contains(event.target as Node))setOpen(false);}function escape(event:KeyboardEvent){if(event.key==="Escape"){setOpen(false);trigger.current?.focus();}}document.addEventListener("pointerdown",outside);document.addEventListener("keydown",escape);return()=>{document.removeEventListener("pointerdown",outside);document.removeEventListener("keydown",escape);};},[open]);
  return <div className="mega-tools" ref={wrapper} onBlur={e=>{if(e.relatedTarget&&!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
    <button ref={trigger} className="tools-trigger" aria-expanded={open} aria-controls="tools-navigation" onClick={()=>setOpen(!open)} onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();setOpen(true);requestAnimationFrame(()=>wrapper.current?.querySelector<HTMLAnchorElement>(".mega-tool-link")?.focus());}}}>Tools <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m4 6 4 4 4-4"/></svg></button>
    <div className="mega-panel" id="tools-navigation" hidden={!open}>
      <div className="mega-tool-list" aria-label="All planning tools">{tools.map(tool=><Link className={`mega-tool-link ${pathname===`/${tool.slug}`?"current-tool":""}`} key={tool.id} href={`/${tool.slug}`} onClick={()=>setOpen(false)} aria-current={pathname===`/${tool.slug}`?"page":undefined}><span className="mega-icon"><Icon name={tool.icon}/></span><span><strong>{tool.short}</strong><small>{subtitles[tool.id]}</small></span><span className="mega-chevron" aria-hidden="true">›</span></Link>)}</div>
      <div className="mega-feature">
        <Link className="mega-image" href="/car-loan-calculator" tabIndex={-1} aria-hidden="true" onClick={()=>setOpen(false)}><Image src="/images/mountain-suv.webp" alt="SUV parked beside a mountain road" fill sizes="320px"/><span className="glass-icon"><Icon name="calculator"/></span><span className="glass-dollar" aria-hidden="true">$</span></Link>
        <span className="eyebrow">Featured tool</span><h2>Car loan calculator</h2><p>See what a car loan costs each month and over its full term. Get clear numbers and plan with confidence.</p><Link className="button" href="/car-loan-calculator" onClick={()=>setOpen(false)}>Open car loan calculator <Icon name="arrow"/></Link>
        <h3>Popular tools</h3>{["value","ownership","trade"].map(id=>{const t=tools.find(t=>t.id===id)!;return <Link className="mega-popular" key={id} href={`/${t.slug}`} onClick={()=>setOpen(false)}><span className="tool-icon"><Icon name={t.icon}/></span><span><strong>{t.short}</strong><small>{subtitles[t.id]}</small></span><span aria-hidden="true">›</span></Link>;})}
      </div>
      <Link className="mega-all" href="/tools" onClick={()=>setOpen(false)}>Explore all {tools.length} tools <Icon name="arrow"/></Link>
    </div>
    <noscript><Link href="/tools">Browse all tools</Link></noscript>
  </div>;
}
