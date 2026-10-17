"use client";
import {useEffect,useRef,useState,type MouseEvent} from "react";

export function GuideReadingNav({headings,mobile=false}:{headings:string[];mobile?:boolean}){
  const [active,setActive]=useState(0);
  const details=useRef<HTMLDetailsElement>(null);
  const activeLink=useRef<HTMLAnchorElement>(null);
  const navigate=(event:MouseEvent<HTMLAnchorElement>,id:string,index?:number)=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(details.current)details.current.open=false;
    if(index!==undefined)setActive(index);
    requestAnimationFrame(()=>{
      const target=document.getElementById(id);
      if(!target)return;
      history.pushState(null,"",`#${id}`);
      const header=document.querySelector('.site-header')?.getBoundingClientRect().height??76;
      const offset=header+(mobile?84:24);
      window.scrollTo({top:Math.max(0,window.scrollY+target.getBoundingClientRect().top-offset),behavior:"instant"});
      target.setAttribute("tabindex","-1");
      target.focus({preventScroll:true});
    });
  };
  useEffect(()=>{
    let frame=0;
    const update=()=>{frame=0;let current=0;for(let index=0;index<headings.length;index++){const section=document.getElementById(`section-${index+1}`);if(section&&section.getBoundingClientRect().top<=160)current=index;}setActive(current);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll);
    return()=>{window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);cancelAnimationFrame(frame);};
  },[headings.length]);
  useEffect(()=>{if(!mobile&&activeLink.current){const link=activeLink.current;const list=link.closest(".reading-nav-list");if(list instanceof HTMLElement)list.scrollTop=Math.max(0,link.offsetTop-list.offsetTop-list.clientHeight/2);}},[active,mobile]);
  const list=<nav aria-label={mobile?"Mobile guide contents":"Guide contents"}><ol className="reading-nav-list">{headings.map((heading,index)=><li key={`${index}-${heading}`}><a ref={active===index?activeLink:undefined} href={`#section-${index+1}`} aria-current={active===index?"location":undefined} onClick={event=>navigate(event,`section-${index+1}`,index)}><span>{String(index+1).padStart(2,"0")}</span>{heading.replace(/^\d+\.\s*/,"")}</a></li>)}</ol><a className="reading-sources" href="#sources" onClick={event=>navigate(event,"sources")}>Sources & further reading <span aria-hidden="true">↗</span></a></nav>;
  if(mobile)return <details ref={details} className="reading-mobile no-print"><summary><span>Jump to a section</span><small>{active+1} / {headings.length}</small></summary>{list}</details>;
  return <div className="reading-nav no-print"><span className="eyebrow">Your reading roadmap</span><h2>In this guide</h2><p className="reading-position">Section {active+1} of {headings.length}</p><div className="reading-progress" aria-hidden="true"><span style={{width:`${(active+1)/headings.length*100}%`}}/></div>{list}<a className="reading-top" href="#guide-top">Back to the top ↑</a></div>;
}
