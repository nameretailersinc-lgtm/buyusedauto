"use client";
import {useState} from "react";
import {measuredFuelEconomy} from "@/lib/calculators/fuel-efficiency";
import {markets,formatMoney,type Market} from "@/lib/markets";

export function FuelEfficiency(){
  const [units,setUnits]=useState<"us"|"metric">("us");
  const [market,setMarket]=useState<Market>("US");
  const [values,setValues]=useState({distance:"300",quantity:"10",annual:"12000",price:"3.5",alternative:"40"});
  let error="",result:null|{mpg:number;kmPerLiter:number;litersPer100Km:number;currentCost:number;alternativeCost:number}=null;
  try{
    if(Object.values(values).some(value=>!value.trim()||!Number.isFinite(Number(value))))throw Error("Complete each field with a finite number.");
    if(Object.values(values).some(value=>Number(value)>100000000))throw Error("Use values no greater than 100,000,000 in this measurement.");
    const r=measuredFuelEconomy(Number(values.distance),Number(values.quantity),units);
    if(Number(values.annual)<0||Number(values.price)<0||Number(values.alternative)<=0)throw Error("Use a nonnegative annual distance and fuel price, and positive comparison economy.");
    result={...r,currentCost:Number(values.annual)/(Number(values.distance)/Number(values.quantity))*Number(values.price),alternativeCost:Number(values.annual)/Number(values.alternative)*Number(values.price)};
  }catch(e){error=e instanceof Error?e.message:"Check your measured inputs.";}
  function changeUnits(next:"us"|"metric"){
    if(next===units)return;
    const distanceRatio=next==="metric"?1.609344:1/1.609344;
    const volumeRatio=next==="metric"?3.785411784:1/3.785411784;
    const rounded=(value:number)=>String(Math.round(value*1000000)/1000000);
    setValues({...values,distance:rounded(Number(values.distance)*distanceRatio),quantity:rounded(Number(values.quantity)*volumeRatio),annual:rounded(Number(values.annual)*distanceRatio),price:rounded(Number(values.price)/volumeRatio),alternative:rounded(Number(values.alternative)*distanceRatio/volumeRatio)});setUnits(next);
  }
  const distance=units==="us"?"miles":"km",volume=units==="us"?"US gallons":"liters",economy=units==="us"?"US mpg":"km/L";
  return <section id="gas-mileage" className="calculator-block comparison" aria-labelledby="gas-mileage-title"><h2 id="gas-mileage-title">Gas mileage and fuel savings calculator</h2><p>Measure economy from distance traveled and fuel used between comparable full-tank readings. Compare annual fuel spending with another vehicle at the same distance and pump price.</p><div className="fields-grid"><div className="field"><label htmlFor="mileage-units">Measurement units</label><select id="mileage-units" value={units} onChange={e=>changeUnits(e.target.value as "us"|"metric")}><option value="us">Miles / US gallons</option><option value="metric">Kilometers / liters</option></select></div><div className="field"><label htmlFor="mileage-currency">Fuel-price currency</label><select id="mileage-currency" value={market} onChange={e=>setMarket(e.target.value as Market)}>{Object.entries(markets).map(([key,value])=><option key={key} value={key}>{value.name} ({value.currency})</option>)}</select></div>{([['distance',`Measured distance (${distance})`],['quantity',`Fuel used (${volume})`],['annual',`Annual distance (${distance})`],['price',`Fuel price (${markets[market].currency} per ${volume})`],['alternative',`Comparison vehicle economy (${economy})`]] as const).map(([key,label])=><div className="field" key={key}><label htmlFor={`mileage-${key}`}>{label}</label><input id={`mileage-${key}`} type="number" min={key==="annual"||key==="price"?0:.000001} step="any" value={values[key]} onChange={e=>setValues({...values,[key]:e.target.value})}/></div>)}</div>{result?<div className="result-metrics" aria-live="polite"><dl><dt>Measured fuel economy</dt><dd>{result.mpg.toFixed(2)} US mpg</dd><dd>{result.kmPerLiter.toFixed(2)} km/L</dd><dd>{result.litersPer100Km.toFixed(2)} L/100 km</dd></dl><dl><dt>Annual fuel cost at measured economy</dt><dd>{formatMoney(result.currentCost,market,2)}</dd><dt>Annual fuel cost for comparison vehicle</dt><dd>{formatMoney(result.alternativeCost,market,2)}</dd><dt>Annual fuel savings with comparison vehicle</dt><dd>{formatMoney(result.currentCost-result.alternativeCost,market,2)}</dd></dl></div>:<p role="alert">{error}</p>}<p className="micro">MPG = miles ÷ US gallons; km/L = kilometers ÷ liters; L/100 km = 100 ÷ km/L. Savings compare fuel only, excluding purchase price, depreciation and repairs. Negative savings mean the comparison vehicle costs more to fuel. Currency selection does not convert prices. This separate measurement stays in this page session and is not included in the main calculator’s share link or CSV.</p></section>;
}
