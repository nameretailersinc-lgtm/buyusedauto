"use client";
import {useEffect,useRef,useState} from "react";
import dynamic from "next/dynamic";
import {type Tool,type Field} from "@/data/tools";
import {states} from "@/data/states";
import {evaluate,type Result} from "@/lib/evaluate";
import {money} from "@/lib/site";
import {Icon} from "./icon";
import {OwnershipComparison,type SavedScenario} from "./ownership-comparison";
import {PaymentBreakdown} from "./payment-breakdown";
const ResultChart=dynamic(()=>import("./result-chart"),{loading:()=> <div style={{height:170}} aria-label="Loading chart"/>});
type Inputs=Record<string,string>;
export function DataTable({table,highlight}:{table:NonNullable<Result["table"]>;highlight?:string}){return <div className="table-wrap"><table className="data-table"><caption className="table-caption">{table.caption}</caption><thead><tr>{table.headers.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{table.rows.map((row,i)=><tr key={i} className={row[0]===highlight?"selected-row":undefined}>{row.map((cell,j)=>j===0?<th key={j} scope="row">{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;}
export function saveCsv(name:string,rows:string[][]){const csv="\uFEFF"+rows.map(row=>row.map(cell=>`"${cell.replace(/"/g,'""')}"`).join(",")).join("\r\n");const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),500);}
export default function Calculator({tool,prefill={}}:{tool:Tool;prefill?:Inputs}){
  const defaults=Object.fromEntries(tool.fields.map(f=>[f.key,prefill[f.key]??f.value]));
  const [inputs,setInputs]=useState<Inputs>(defaults);
  const [status,setStatus]=useState("");
  const [snapshot,setSnapshot]=useState<SavedScenario|null>(null);
  const [state,setState]=useState("");
  const [vehicle,setVehicle]=useState<"used"|"new">("used");
  const resultRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const restore=()=>{const q=new URLSearchParams(location.search);const next={...defaults};for(const f of tool.fields){const raw=q.get(f.key);if(raw!==null&&raw.length<40)next[f.key]=raw;}setInputs(next);setVehicle(q.get("vehicle")==="new"?"new":"used");const region=q.get("state");setState(states.some(s=>s[0]===region)?region!:"");};
    restore();window.addEventListener("popstate",restore);return()=>window.removeEventListener("popstate",restore);
    // Defaults remain fixed per generated page; browser back/forward restores query state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tool.id]);
  function updateUrl(next:Inputs,region=state,currentVehicle=vehicle){const url=new URL(location.href);url.search="";for(const [key,value] of Object.entries(next)){if(value!==defaults[key])url.searchParams.set(key,value);}if(region)url.searchParams.set("state",region);if(tool.id==="ownership"&&currentVehicle==="new")url.searchParams.set("vehicle","new");history.replaceState(null,"",url);}
  function update(key:string,value:string){
    let next={...inputs,[key]:value};
    if(key==="units"&&value!==inputs.units){const metric=value==="metric";const ratio=metric?1.609344:1/1.609344;const efficiency=Number(inputs.efficiency);next={...next,distance:String(Math.round(Number(inputs.distance)*ratio*100)/100),annualDistance:String(Math.round(Number(inputs.annualDistance)*ratio)),efficiency:efficiency>0?String(Math.round(235.214583/efficiency*100)/100):"",price:String(Math.round(Number(inputs.price)*(metric?1/3.785411784:3.785411784)*10000)/10000)};}
    if(key==="distanceUnit"&&value!==inputs.distanceUnit)next.mileage=String(Math.round(Number(inputs.mileage)*(value==="km"?1.609344:1/1.609344)));
    setInputs(next);setStatus("");updateUrl(next);
  }
  let result:Result|null=null;let error="";
  try{for(const field of tool.fields){if(field.options&&!field.options.some(o=>o.value===inputs[field.key]))throw new Error(`Choose a valid ${field.label.toLowerCase()}.`);if(!field.options&&inputs[field.key]!==""&&Number(inputs[field.key])>(field.max??1e8))throw new Error(`${field.label} exceeds the supported maximum of ${(field.max??1e8).toLocaleString("en-US")}.`);}result=evaluate(tool.id,inputs);}catch(e){error=e instanceof Error?e.message:"Check your inputs.";}
  function fieldUnit(field:Field){if(tool.id==="fuel"&&inputs.units==="metric"){if(["distance","annualDistance"].includes(field.key))return"km";if(field.key==="efficiency")return"L/100 km";if(field.key==="price")return"$/liter";}if(field.key==="mileage")return inputs.distanceUnit;return field.unit;}
  async function share(){updateUrl(inputs);try{await navigator.clipboard.writeText(location.href);setStatus("Link copied. Your inputs are included in the URL.");}catch{setStatus("Your inputs are saved in the address bar. Copy that URL to share.");}}
  function download(){if(!result)return;const rows=[[tool.name,"USD; estimated values"],["Input","Value"],...tool.fields.map(f=>[f.label,`${inputs[f.key]} ${fieldUnit(f)||""}`]),[],[result.label,result.value],...result.metrics.map(m=>[m.label,m.value]),["Assumptions",result.note]];if(result.schedule)rows.push([],["Month","Payment","Principal","Interest","Balance"],...result.schedule.map(r=>[String(r.month),String(r.payment),String(r.principal),String(r.interest),String(r.balance)]));else if(result.table)rows.push([],result.table.headers,...result.table.rows);saveCsv(`${tool.slug}.csv`,rows);}
  function reset(){setInputs(defaults);setState("");setSnapshot(null);setVehicle("used");setStatus("");updateUrl(defaults,"","used");}
  const selectedState=states.find(s=>s[0]===state);
  return <>
    <section className={`calculator calculator-${tool.id}`} aria-label={tool.name}>
      <div className="calculator-top"><div><h2>Your numbers, a clearer picture.</h2><p>Adjust the details to explore your estimated result.</p></div><span className="currency-label">Currency <strong>USD ($)</strong></span></div>
      <div className="calculator-layout">
        <form className="calculator-form" noValidate onSubmit={e=>{e.preventDefault();setStatus(result?"Result calculated using the inputs shown.":"");resultRef.current?.focus();resultRef.current?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"nearest"});}}>
          {tool.id==="ownership"&&<div className="field"><label htmlFor="ownership-vehicle">Vehicle being modeled</label><select id="ownership-vehicle" value={vehicle} onChange={e=>{const next=e.target.value as "used"|"new";setVehicle(next);updateUrl(inputs,state,next);}}><option value="used">Used car</option><option value="new">New car</option></select><small>This label does not change any assumptions. Enter quotes for this vehicle, save it for comparison, then model the other vehicle with the same period and annual distance.</small></div>}
          {tool.id==="tax"&&<div className="state-resource field"><label htmlFor="state">Registration state or district</label><select id="state" value={state} onChange={e=>{setState(e.target.value);updateUrl(inputs,e.target.value);}}><option value="">Choose an official resource</option>{states.map(([code,name])=><option key={code} value={code}>{name}</option>)}</select>{selectedState?<a href={selectedState[2]} target="_blank" rel="noopener noreferrer">Verify rates and rules with {selectedState[1]} ↗</a>:<small>State selection does not fill in a tax rate.</small>}</div>}
          <div className="fields-grid">{tool.fields.map(field=><div className="field" key={field.key}>
            <label htmlFor={`${tool.id}-${field.key}`}>{field.label}{fieldUnit(field)&&<span className="sr-only"> ({fieldUnit(field)})</span>}</label>
            <div className="input-wrap">{field.options?<select id={`${tool.id}-${field.key}`} value={inputs[field.key]} onChange={e=>update(field.key,e.target.value)}>{field.options.map(option=><option value={option.value} key={option.value}>{option.label}</option>)}</select>:<>
              <input id={`${tool.id}-${field.key}`} className={fieldUnit(field)?"has-unit":""} type="number" inputMode="decimal" value={inputs[field.key]} min={field.min} max={field.max} step={tool.id==="fuel"?"any":field.step??1} aria-invalid={inputs[field.key]===""||!Number.isFinite(Number(inputs[field.key]))||Number(inputs[field.key])<(field.min??0)||Number(inputs[field.key])>(field.max??1e8)} aria-describedby={field.help?`${tool.id}-${field.key}-help`:undefined} onChange={e=>update(field.key,e.target.value)}/>
              {fieldUnit(field)&&<span className="unit" aria-hidden="true">{fieldUnit(field)}</span>}
            </>}</div>{field.help&&<small id={`${tool.id}-${field.key}-help`}>{field.help}</small>}
          </div>)}</div>
          <div className="form-actions"><button className="button" type="submit">{tool.id==="loan"?"Calculate payment":"Calculate estimate"}<Icon name="arrow"/></button><button type="button" className="text-button" onClick={reset}>↻ Reset example</button></div>
          <p className="form-note">Results update as you type. Defaults are examples. Shared URLs contain your inputs; don’t include private information.</p>
        </form>
        <div className="calculator-result" id="results" tabIndex={-1} ref={resultRef}>
          {result?<>
            <div className="result-feature"><div><div className="result-kicker">{result.label}</div><div className="result-primary" aria-live="polite" aria-atomic="true"><strong>{result.value}</strong>{result.suffix&&<span>{result.suffix}</span>}</div></div><Icon name={tool.icon}/></div>
            <dl className="result-metrics">{result.metrics.map(m=><div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>
            {tool.id==="loan"&&result.schedule?<PaymentBreakdown schedule={result.schedule}/>:result.chart&&<ResultChart data={result.chart} type={result.chartType}/>}
            <p className="result-note">{result.note}</p>
            <div className="print-inputs"><h3>Inputs</h3>{tool.fields.map(f=><span key={f.key}>{f.label}: {inputs[f.key]} {fieldUnit(f)}</span>)}</div>
            <div className="result-actions"><button onClick={share}>Copy result link</button><button onClick={()=>window.print()}>Print summary</button><button onClick={download}>Download CSV</button><button onClick={()=>{setSnapshot({result,inputs:{...inputs},vehicle});setStatus("Scenario A saved. Change an input to compare it with scenario B.");}}>Save for comparison</button></div><p className="share-status" role="status">{status}</p>
          </>:<div className="result-error" role="alert"><h3>Let’s check those numbers.</h3><p>{error}</p></div>}
        </div>
      </div>
    </section>
    {snapshot&&result&&<section className="comparison calculator-block"><h3>Compare your scenarios</h3>{tool.id==="ownership"?<OwnershipComparison saved={snapshot} current={result} inputs={inputs} vehicle={vehicle} tool={tool} download={rows=>saveCsv("ownership-comparison.csv",rows)}/>:<DataTable table={{caption:"A is your saved result. B updates with your current inputs. Both use the assumptions above.",headers:["Result","Scenario A","Scenario B"],rows:[["Primary result",snapshot.result.value,result.value],...result.metrics.map((m,i)=>[m.label,snapshot.result.metrics[i]?.value??"—",m.value])]}}/>}<button className="text-button" onClick={()=>setSnapshot(null)}>Clear comparison</button></section>}
    {result?.table&&<section className="calculator-block term-comparison"><h2><Icon name="shield"/>Compare the numbers</h2><DataTable table={result.table} highlight={tool.id==="loan"?`${inputs.months} months`:undefined}/></section>}
    {result?.schedule&&<details className="disclosure calculator-block"><summary>Full amortization schedule · {result.schedule.length} payments</summary><DataTable table={{caption:"Monthly rounded payments; final payment reconciles the remaining balance.",headers:["Month","Payment","Principal","Interest","Balance"],rows:result.schedule.map(r=>[String(r.month),money(r.payment,2),money(r.principal,2),money(r.interest,2),money(r.balance,2)])}}/></details>}
    {result&&<aside className="mobile-result" aria-label="Quick result"><div><span>{result.label}</span><strong>{result.value}</strong></div><a href="#results">View results ↑</a></aside>}
  </>;
}
