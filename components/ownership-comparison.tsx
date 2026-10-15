"use client";
import {compareOwnership} from "@/lib/calculators";
import {type Result} from "@/lib/evaluate";
import {money} from "@/lib/site";
import {type Tool} from "@/data/tools";
import styles from "./ownership-comparison.module.css";

export type SavedScenario = {result:Result; inputs:Record<string,string>; vehicle:"used"|"new"};
export function OwnershipComparison({saved,current,inputs,vehicle,tool,download}:{saved:SavedScenario;current:Result;inputs:Record<string,string>;vehicle:"used"|"new";tool:Tool;download:(rows:string[][])=>void}){
  let comparison:ReturnType<typeof compareOwnership>|undefined;
  let error="";
  try{
    if(saved.result.ownershipInput&&current.ownershipInput)comparison=compareOwnership(saved.result.ownershipInput,current.ownershipInput);
  }catch(reason){error=reason instanceof Error?reason.message:"Check the comparison inputs.";}
  const labels=[`Saved ${saved.vehicle} car`,`Current ${vehicle} car`];
  const assumptions=tool.fields.map(field=>[field.label,`${saved.inputs[field.key]} ${field.unit||""}`.trim(),`${inputs[field.key]} ${field.unit||""}`.trim()]);
  const costs=comparison?[
    ["Total economic cost",money(comparison.saved.total,2),money(comparison.current.total,2)],
    ["Average monthly cost",money(comparison.saved.monthly,2),money(comparison.current.monthly,2)],
    ...comparison.saved.parts.map((part,index)=>[part.label,money(part.value,2),money(comparison!.current.parts[index].value,2)]),
    ["Remaining loan balance at sale",money(comparison.saved.remainingBalance,2),money(comparison.current.remainingBalance,2)],
  ]:[];
  function table(caption:string,rows:string[][]){return <div className={`table-wrap ${styles.tableRegion}`} tabIndex={0} role="region" aria-label={caption}><table className="data-table"><caption className="table-caption">{caption}</caption><thead><tr>{["Measure",...labels].map(label=><th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table></div>;}
  return <div className="ownership-comparison">
    <p>The saved vehicle stays fixed while you edit the current vehicle. Compare the same ownership period and annual distance. No new-car or used-car prices are supplied.</p>
    {error&&<p role="alert">{error}</p>}
    {comparison&&<><p role="status">Current minus saved economic cost: <strong>{money(comparison.difference,2)}</strong> over the ownership period ({money(comparison.monthlyDifference,2)} per month on average). A positive difference means the current scenario costs more; it is not a recommendation.</p>{table("Matched-period ownership costs; inputs are UNVERIFIED scenarios unless you supply verified quotes.",costs)}</>}
    {table("Check every assumption before comparing new and used cars.",assumptions)}
    <p>Resale, insurance and maintenance are your assumptions. Parking, tolls, inflation and opportunity cost are excluded. Loan principal is not added again after depreciation. Your household cash needs can differ from average economic cost.</p>
    <p>The saved comparison lasts only in this tab. A shared result link restores the current inputs, not the saved vehicle.</p>
    {comparison&&<button type="button" onClick={()=>download([["New vs used ownership comparison","USD; estimated values"],["Measure",...labels],...costs,["Current minus saved economic cost",money(comparison.difference,2)],[],["Assumption",...labels],...assumptions,[],["Limits","UNVERIFIED inputs; no live prices. Excludes parking, tolls, inflation and opportunity cost. Same period and distance; economic cost is not monthly cash flow."]])}>Download comparison CSV</button>}
  </div>;
}
