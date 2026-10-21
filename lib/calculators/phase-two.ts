import {valid,cents,monthlyPayment} from "./index";
import {ukFirstRegistration} from "../../data/registration-rules";

/** Regular monthly cash-flow estimate, not a jurisdiction-specific disclosure engine. */
export function carLoanApr(input:{principal:number;rate:number;months:number;upfront:number;financed:number}){
  valid(input.principal,"Loan proceeds before upfront charges",.01);
  valid(input.upfront,"Upfront finance charges",0,input.principal);
  valid(input.financed,"Financed finance charges");
  const gross=input.principal+input.financed;
  valid(gross,"Gross loan balance",.01);
  const net=input.principal-input.upfront;
  if(net<=0)throw Error("Upfront finance charges must be less than the loan proceeds.");
  const payment=monthlyPayment(gross,input.rate,input.months);
  const total=payment*input.months;
  const presentValue=(monthlyRate:number)=>monthlyRate===0?total:payment*-Math.expm1(-input.months*Math.log1p(monthlyRate))/monthlyRate;
  let lower=0,upper=1;
  while(presentValue(upper)>net)upper*=2;
  for(let step=0;step<120;step++){
    const mid=(lower+upper)/2;
    if(presentValue(mid)>net)lower=mid;else upper=mid;
  }
  const monthlyRate=input.rate===0&&input.upfront===0&&input.financed===0?0:(lower+upper)/2;
  return {gross,net,payment,total,interest:total-gross,fees:input.upfront+input.financed,financeCost:total-net,monthlyRate,apr:monthlyRate*1200,effectiveRate:Math.expm1(12*Math.log1p(monthlyRate))*100};
}

export function repairQuote(input:{parts:number;hours:number;rate:number;diagnostic:number;other:number;tax:number;credit:number;contingency:number}){
  for(const key of ["parts","hours","rate","diagnostic","other","tax","credit"] as const)valid(input[key],key);
  valid(input.hours,"Labor hours",0,10000);valid(input.contingency,"Contingency",0,100);
  const labor=cents(input.hours*input.rate);
  const invoice=cents(input.parts+labor+input.diagnostic+input.other+input.tax);
  if(input.credit>invoice)throw Error("Confirmed credit cannot exceed the quoted invoice total.");
  const payable=cents(invoice-input.credit);
  const reserve=cents(payable*input.contingency/100);
  return {labor,invoice,payable,reserve,budget:cents(payable+reserve)};
}

export type RegistrationInput={market:string;profile:string;registration:number;title:number;inspection:number;other:number;annualTax:number;annualFees:number;months:number};
export function registrationBudget(input:RegistrationInput,today=new Date().toISOString().slice(0,10)){
  for(const key of ["registration","title","inspection","other","annualTax","annualFees"] as const)valid(input[key],key);
  valid(input.months,"Budget period",1,120);
  if(!Number.isInteger(input.months))throw Error("Budget period must be a whole number of months.");
  if(!["manual","gb-first","gb-exempt"].includes(input.profile))throw Error("Choose a supported registration fee source.");
  let registration=input.registration;
  if(input.profile!=="manual"){
    if(input.market!=="GB")throw Error("Choose United Kingdom (GBP) for a DVLA fee, or use a manually verified fee.");
    if(!/^\d{4}-\d{2}-\d{2}$/.test(today)||!Number.isFinite(Date.parse(today))||new Date(today).toISOString().slice(0,10)!==today)throw Error("Cannot verify the date for this fee profile. Use a manually verified fee.");
    if(today<ukFirstRegistration.checkedOn||today>ukFirstRegistration.reviewBy)throw Error("The DVLA fee profile needs a source review. Use a manually verified fee until it is refreshed.");
    registration=input.profile==="gb-first"?ukFirstRegistration.amount:0;
  }
  const once=cents(registration+input.title+input.inspection+input.other);
  const recurring=cents((input.annualTax+input.annualFees)*input.months/12);
  const total=cents(once+recurring);
  return {registration,once,recurring,total,monthly:total/input.months};
}
