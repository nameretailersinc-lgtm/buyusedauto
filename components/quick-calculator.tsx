"use client";
import Link from "next/link";
import {useState} from "react";
import {loan} from "@/lib/calculators";
import {money} from "@/lib/site";
import {Icon} from "./icon";
export default function QuickCalculator(){
  const [price,setPrice]=useState("25000");const [down,setDown]=useState("5000");const [rate,setRate]=useState("7");const [months,setMonths]=useState("60");const [view,setView]=useState<"monthly"|"total">("monthly");
  let result:ReturnType<typeof loan>|null=null;try{if([price,down,rate,months].some(v=>v.trim()===""))throw new Error();result=loan({price:Number(price),down:Number(down),rate:Number(rate),months:Number(months),fees:0,trade:0,payoff:0,extra:0});}catch{}
  const query=new URLSearchParams({price,down,rate,months}).toString();
  return <section className="quick-calculator" aria-label="Quick car payment calculator">
    <div className="quick-top"><span><Icon name="calculator"/>Car payment calculator</span><Link href="/car-affordability-calculator">Affordability ↗</Link></div>
    <div className="quick-tabs" role="group" aria-label="Result display"><button aria-pressed={view==="monthly"} onClick={()=>setView("monthly")}>Monthly payment</button><button aria-pressed={view==="total"} onClick={()=>setView("total")}>Total loan cost</button></div>
    <div className="quick-fields"><div className="field full"><label htmlFor="quick-price">Vehicle price</label><div className="input-wrap"><input className="has-unit" id="quick-price" type="number" min="0" max="1000000" value={price} onChange={e=>setPrice(e.target.value)}/><span className="unit">USD</span></div></div>
      <div className="field"><label htmlFor="quick-down">Down payment</label><div className="input-wrap"><input className="has-unit" id="quick-down" type="number" min="0" value={down} onChange={e=>setDown(e.target.value)}/><span className="unit">$</span></div></div>
      <div className="field"><label htmlFor="quick-term">Loan term</label><select id="quick-term" value={months} onChange={e=>setMonths(e.target.value)}>{[24,36,48,60,72,84].map(n=><option key={n} value={n}>{n} months</option>)}</select></div>
      <div className="field"><label htmlFor="quick-rate">Annual interest rate</label><div className="input-wrap"><input className="has-unit" id="quick-rate" type="number" min="0" max="100" step=".01" value={rate} onChange={e=>setRate(e.target.value)}/><span className="unit">%</span></div></div>
      <Link className="quick-advanced" href={`/car-loan-calculator?${query}`}>More options <span>⌄</span></Link>
    </div>
    <div className="quick-result" aria-live="polite">{result?<><div><small>{view==="monthly"?"Estimated monthly payment":"Total scheduled loan payments"}</small><strong>{money(view==="monthly"?result.payment:result.total,2)}<span>{view==="monthly"?" /mo":""}</span></strong></div><div className="quick-ring" style={{background:`conic-gradient(#075747 0 ${result.total?result.principal/result.total*100:100}%, #a4ed7e 0 100%)`}} aria-hidden="true"/></>:<p role="alert">Enter a valid price, down payment, and rate.</p>}</div>
    <Link className="button" href={`/car-loan-calculator?${query}`}>View full breakdown <Icon name="arrow"/></Link>
    <p className="quick-note">Illustrative rate. Excludes taxes, fees, and trade-in.</p>
  </section>;
}
