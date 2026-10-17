"use client";
import {useState} from "react";
import Link from "next/link";
import {monthlyPayment} from "@/lib/calculators";
import type {Guide} from "@/data/guides";

const configs={PK:{currency:"PKR",locale:"en-PK"},AE:{currency:"AED",locale:"en-AE"},US:{currency:"USD",locale:"en-US"},GB:{currency:"GBP",locale:"en-GB"},EU:{currency:"EUR",locale:"en-IE"}};
export function GuidePaymentCalculator({region}:{region?:Guide["region"]}){
 const config=configs[region??"US"];
 const [values,setValues]=useState({price:"",down:"",months:"60",rate:""});
 const [result,setResult]=useState<number|null>(null);const [error,setError]=useState("");
 return <section className="guide-payment-card" id="guide-payment"><h2>Quick car payment estimate</h2><p>Fixed-rate borrowing in {config.currency}</p><form noValidate onSubmit={event=>{event.preventDefault();try{
  if(Object.values(values).some(value=>!value.trim()))throw Error("Enter each amount; use 0 for no deposit or interest.");
  const price=Number(values.price),down=Number(values.down);
  if(!Number.isFinite(price)||price<=0||price>100000000||!Number.isFinite(down)||down<0||down>price)throw Error("Enter a positive price and a deposit between 0 and the price.");
  setResult(monthlyPayment(price-down,Number(values.rate),Number(values.months)));setError("");
 }catch(error){setResult(null);setError(error instanceof Error?error.message:"Check your inputs.");}}}>
 {([['price',`Car price (${config.currency})`],['down',`Deposit (${config.currency})`],['months','Loan term (months)'],['rate','Annual contract rate (%)']] as const).map(([key,label])=><div className="field" key={key}><label htmlFor={`guide-payment-${key}`}>{label}</label><input id={`guide-payment-${key}`} type="number" min={key==="months"?1:0} max={key==="months"?120:key==="rate"?100:100000000} step={key==="months"?1:"any"} value={values[key]} onChange={event=>{setValues({...values,[key]:event.target.value});setResult(null);setError("");}}/></div>)}
 {error&&<p className="guide-payment-error" role="alert">{error}</p>}<button className="button" type="submit">Calculate payment</button></form>
 <div className="guide-payment-result" aria-live="polite"><span>Estimated monthly payment</span><strong>{result===null?"Enter your numbers":new Intl.NumberFormat(config.locale,{style:"currency",currency:config.currency,maximumFractionDigits:2}).format(result)}{result!==null&&<small> / month</small>}</strong><p>Monthly reducing balance. Excludes fees, insurance and taxes. No current rate is supplied.</p></div>
 {region==="PK"?<p className="guide-payment-note">For Ijarah or Musharakah, use the <Link href="/pk/car-financing-calculator">Pakistan contract calculator</Link>.</p>:<p className="guide-payment-note">This models a standard loan, including any final rounding adjustment. It does not model PCP, balloon payments, flat-rate quotations or changing rates.</p>}
 </section>;
}
