"use client";
import {useEffect,useState} from "react";
import {inspectionGroups} from "@/data/inspection";
import {inspectionProgress,type InspectionState} from "@/lib/calculators";
import {saveCsv} from "./calculator";
const items=inspectionGroups.flatMap(g=>g.items);
const choices:InspectionState[]=["unchecked","pass","concern","na"];
export default function Inspection(){
  const [states,setStates]=useState<InspectionState[]>(items.map(()=>"unchecked"));
  const [status,setStatus]=useState("");
  useEffect(()=>{
    const restore=()=>{const encoded=new URLSearchParams(location.search).get("checks");if(encoded&&new RegExp(`^[0-3]{${items.length}}$`).test(encoded))setStates(encoded.split("").map(n=>choices[Number(n)]));else setStates(items.map(()=>"unchecked"));};
    restore();window.addEventListener("popstate",restore);return()=>window.removeEventListener("popstate",restore);
  },[]);
  const progress=inspectionProgress(states);
  function update(next:InspectionState[]){setStates(next);const url=new URL(location.href);url.search="";if(next.some(s=>s!=="unchecked"))url.searchParams.set("checks",next.map(s=>choices.indexOf(s)).join(""));history.replaceState(null,"",url);setStatus("");}
  async function share(){try{await navigator.clipboard.writeText(location.href);setStatus("Checklist link copied.");}catch{setStatus("Copy the URL from your address bar to share these findings.");}}
  function download(){saveCsv("used-car-inspection.csv",[["Observation","Status"],...items.map((item,i)=>[item,states[i]==="pass"?"Checked":states[i]])]);}
  return <section className="calculator"><div className="calculator-top"><h2>A better inspection starts with better notes.</h2><span>25 checks</span></div><div className="inspection-layout"><div>{inspectionGroups.map((group,groupIndex)=><section className="inspection-group" key={group.title}><h3>{group.title}</h3>{group.items.map((item,i)=>{const index=groupIndex*5+i;return <div className="inspection-item" key={item} data-concern={states[index]==="concern"}><label htmlFor={`check-${index}`}>{item}</label><select id={`check-${index}`} value={states[index]} onChange={e=>update(states.map((s,j)=>j===index?e.target.value as InspectionState:s))}><option value="unchecked">Not checked</option><option value="pass">Checked</option><option value="concern">Concern</option><option value="na">Not applicable</option></select><span className="inspection-print-status">{states[index]==="pass"?"Checked":states[index]==="concern"?"Concern":states[index]==="na"?"Not applicable":"Not checked"}</span></div>;})}</section>)}</div><aside className="inspection-summary"><h3>Your viewing summary</h3><p>To download a PDF report, choose Print / save PDF, then select Save as PDF in your browser. The report includes your current selections. Download findings exports a CSV.</p><div className="result-primary" aria-live="polite"><strong>{progress.completed}/{progress.total}</strong><span>recorded</span></div><div className="bar-track"><div className="bar-fill" style={{width:`${progress.percent}%`}}/></div><p style={{marginTop:20}}><strong>{progress.concerns} concerns flagged</strong><br/>{progress.concerns?"Take these findings to an independent mechanic and resolve them before committing.":"No concerns recorded yet. Unchecked items may still reveal problems."}</p><p>Completing this list does not certify that the vehicle is safe. Keep observations factual and get expert help for mechanical or structural questions.</p><div className="button-row"><button className="button" onClick={()=>window.print()}>Print / save PDF</button><button className="button secondary" onClick={share}>Copy share link</button></div><button className="text-button" onClick={download}>Download findings</button><br/><button className="text-button" onClick={()=>update(items.map(()=>"unchecked"))}>Reset checklist</button><p role="status" className="share-status">{status}</p></aside></div></section>;
}
