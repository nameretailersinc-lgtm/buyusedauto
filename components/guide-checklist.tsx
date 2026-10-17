"use client";
import {useState} from "react";

export function GuideChecklist({items}:{items:string[]}){
  const [checked,setChecked]=useState<Set<number>>(()=>new Set());
  return <div className="guide-interactive-checklist"><div className="checklist-toolbar"><span aria-live="polite">{checked.size} of {items.length} marked</span><button type="button" onClick={()=>setChecked(new Set())} disabled={checked.size===0}>Reset checklist</button></div><ul>{items.map((item,index)=><li key={`${index}-${item}`} data-checked={checked.has(index)}><label><input type="checkbox" checked={checked.has(index)} onChange={()=>setChecked(current=>{const next=new Set(current);if(next.has(index))next.delete(index);else next.add(index);return next;})}/><span>{item}</span></label></li>)}</ul><p className="checklist-help">Marks stay on this page and clear on reload. They record your notes; they do not certify the vehicle’s condition.</p></div>;
}
