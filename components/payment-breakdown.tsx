"use client";
import {useState} from "react";
import type {PaymentRow} from "@/lib/calculators";
import {money} from "@/lib/site";
export function PaymentBreakdown({schedule}:{schedule:PaymentRow[]}){
  const [chosen,setChosen]=useState(0);const index=Math.min(chosen,Math.max(0,schedule.length-1));const row=schedule[index];
  if(!row)return <p className="result-note">No loan payments are needed for these inputs.</p>;
  const principalPercent=row.payment?row.principal/row.payment*100:100;
  return <div className="payment-breakdown"><div className="breakdown-heading"><h3>Payment breakdown</h3><label>Payment <select aria-label="Payment to inspect" value={index} onChange={e=>setChosen(Number(e.target.value))}>{schedule.map((r,i)=><option key={r.month} value={i}>{r.month}</option>)}</select></label></div><div className="payment-visual"><div className="payment-donut" style={{background:`conic-gradient(var(--green) 0 ${principalPercent}%, #73d9ab ${principalPercent}% 100%)`}} role="img" aria-label={`Payment ${row.month}: ${money(row.principal,2)} principal and ${money(row.interest,2)} interest.`}><div><strong>{money(row.payment,2)}</strong><span>payment {row.month}</span></div></div><dl className="payment-legend"><div><dt><i/>Principal</dt><dd>{money(row.principal,2)}<span>{principalPercent.toFixed(0)}%</span></dd></div><div><dt><i/>Interest</dt><dd>{money(row.interest,2)}<span>{(100-principalPercent).toFixed(0)}%</span></dd></div><div><dt>Balance after</dt><dd>{money(row.balance,2)}</dd></div></dl></div><p className="breakdown-footnote">Financed taxes and fees are part of principal. They are not added again to each payment.</p></div>;
}
