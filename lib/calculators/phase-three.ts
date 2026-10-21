import {valid} from "./index";

export type MaintenanceInput={annualDistance:number;years:number;serviceCost:number;serviceDistance:number;serviceMonths:number;tireCost:number;tireDistance:number;annualOther:number;upfront:number};
export function maintenanceBudget(i:MaintenanceInput){
  for(const key of Object.keys(i) as (keyof MaintenanceInput)[])valid(i[key],key);
  valid(i.years,"Planning period",1,20);valid(i.serviceDistance,"Service distance interval",.01);valid(i.serviceMonths,"Service time interval",.01,120);valid(i.tireDistance,"Tire distance interval",.01);
  const services=Math.max(i.annualDistance/i.serviceDistance,12/i.serviceMonths);
  const service=services*i.serviceCost,tire=i.annualDistance/i.tireDistance*i.tireCost;
  const annual=service+tire+i.annualOther,total=annual*i.years+i.upfront;
  return {services,service,tire,annual,total,monthly:annual/12,withUpfrontMonthly:total/(12*i.years)};
}

export type DistanceCostInput={basis:string;distance:number;months:number;fuel:number;maintenance:number;insurance:number;fees:number;other:number;startValue:number;endValue:number;interest:number;acquisition:number;payments:number};
export function distanceCost(i:DistanceCostInput){
  if(!["economic","cash"].includes(i.basis))throw Error("Choose economic cost or cash spending.");
  for(const key of ["distance","months","fuel","maintenance","insurance","fees","other"] as const)valid(i[key],key);
  valid(i.distance,"Distance traveled",.01);valid(i.months,"Recorded period",1,240);
  const operating=i.fuel+i.maintenance+i.insurance+i.fees+i.other;
  let capital:number,finance:number;
  if(i.basis==="economic"){
    for(const key of ["startValue","endValue","interest"] as const)valid(i[key],key);
    capital=i.startValue-i.endValue;finance=i.interest;
  }else{
    valid(i.acquisition,"Acquisition cash paid");valid(i.payments,"Loan payments paid");capital=i.acquisition;finance=i.payments;
  }
  const total=operating+capital+finance;
  return {operating,capital,finance,total,perDistance:total/i.distance,monthly:total/i.months};
}

export type VehicleComparisonInput={units:string;years:number;annualDistance:number;gasPrice:number;gasEconomy:number;electricUse:number;electricPrice:number;boundary:string;efficiency:number;gasPurchase:number;gasResale:number;gasFees:number;gasAnnual:number;gasInterest:number;evPurchase:number;evResale:number;evFees:number;evAnnual:number;evInterest:number;charger:number};
export function gasVsElectric(i:VehicleComparisonInput){
  if(!["us","metric"].includes(i.units))throw Error("Choose miles or kilometers.");
  if(!["wall","battery"].includes(i.boundary))throw Error("Choose wall or battery energy consumption.");
  for(const key of ["years","annualDistance","gasPrice","gasEconomy","electricUse","electricPrice","gasPurchase","gasResale","gasFees","gasAnnual","gasInterest","evPurchase","evResale","evFees","evAnnual","evInterest","charger"] as const)valid(i[key],key);
  valid(i.years,"Ownership period",1,20);valid(i.annualDistance,"Annual distance",.01);valid(i.gasEconomy,"Gasoline fuel economy",.01);
  if(i.boundary==="battery")valid(i.efficiency,"Charging efficiency",.01,100);
  const gasEnergy=(i.units==="us"?i.annualDistance/i.gasEconomy:i.annualDistance*i.gasEconomy/100)*i.gasPrice;
  const electricKwh=i.annualDistance*i.electricUse/100/(i.boundary==="battery"?i.efficiency/100:1);
  const evEnergy=electricKwh*i.electricPrice;
  const gas={depreciation:i.gasPurchase-i.gasResale,fees:i.gasFees,interest:i.gasInterest,energy:gasEnergy*i.years,other:i.gasAnnual*i.years};
  const ev={depreciation:i.evPurchase-i.evResale,fees:i.evFees+i.charger,interest:i.evInterest,energy:evEnergy*i.years,other:i.evAnnual*i.years};
  const sum=(v:typeof gas)=>Object.values(v).reduce((a,b)=>a+b,0);
  const gasTotal=sum(gas),evTotal=sum(ev),distance=i.annualDistance*i.years;
  return {gas,ev,gasTotal,evTotal,saving:gasTotal-evTotal,gasEnergy,evEnergy,electricKwh,distance,gasPerDistance:gasTotal/distance,evPerDistance:evTotal/distance};
}

/** Convert the physical scenario together, leaving money totals unchanged. */
export function convertPlanningUnits(id:string,values:Record<string,string>,units:string){
  const next={...values,units};
  if(units===values.units)return next;
  const metric=units==="metric",ratio=metric?1.609344:1/1.609344;
  const convert=(key:string,multiplier:number)=>{if(values[key]?.trim()!==""&&values[key]!==undefined&&Number.isFinite(Number(values[key])))next[key]=String(Number((Number(values[key])*multiplier).toPrecision(12)));};
  for(const key of id==="maintenance"?["annualDistance","serviceDistance","tireDistance"]:id==="mile"?["distance"]:["annualDistance"])convert(key,ratio);
  if(id==="gasEv"){
    const economy=Number(values.gasEconomy);
    if(values.gasEconomy?.trim()&&Number.isFinite(economy)&&economy>0)next.gasEconomy=String(Number((235.2145833333333/economy).toPrecision(12)));
    convert("gasPrice",metric?1/3.785411784:3.785411784);convert("electricUse",1/ratio);
  }
  return next;
}
