"use client";
import {useRef,useState} from "react";
import {tradeProceeds,parseTradeAmount} from "@/lib/calculators/trade-proceeds";
import {money} from "@/lib/site";
import {trackUsage} from "@/lib/analytics";

const fields=[
  ["offer1","Dealer offer 1"],["offer2","Dealer offer 2 (optional)"],["offer3","Dealer offer 3 (optional)"],
  ["payoff","Dated loan payoff"],["dealerFees","Selling fees for each dealer offer"],
  ["privatePrice","Estimated private-sale price"],["privateFees","Private-sale selling fees"],
] as const;
const empty=()=>Object.fromEntries(fields.map(([key])=>[key,""])) as Record<typeof fields[number][0],string>;
export function TradeOfferComparison(){
  const [values,setValues]=useState(empty);const [result,setResult]=useState<ReturnType<typeof tradeProceeds>|null>(null);const [error,setError]=useState("");const started=useRef(false);
  return <section id="compare-offers" className="prose trade-comparison" aria-labelledby="offer-heading">
    <h2 id="offer-heading">Compare trade-in offers and private-sale net proceeds</h2>
    <p>Enter written offers or hypothetical amounts in USD. This comparison calculates equity and proceeds from your inputs; it does not estimate market value. Selling fees are separate from the loan payoff. No email or vehicle identity is needed.</p>
    <form noValidate onSubmit={event=>{event.preventDefault();try{
      const offers=[values.offer1,...[values.offer2,values.offer3].filter(value=>value.trim())].map(parseTradeAmount);
      setResult(tradeProceeds({offers,payoff:parseTradeAmount(values.payoff),dealerFees:parseTradeAmount(values.dealerFees),privatePrice:parseTradeAmount(values.privatePrice),privateFees:parseTradeAmount(values.privateFees)}));setError("");trackUsage({name:"calculator_completed",tool:"trade",country:"US"});
    }catch(cause){setResult(null);setError(cause instanceof Error?cause.message:"Check your inputs.");}}}>
      <div className="fields-grid">{fields.map(([key,label])=><div className="field" key={key}><label htmlFor={`offer-${key}`}>{label} (USD)</label><input id={`offer-${key}`} type="text" inputMode="decimal" value={values[key]} aria-describedby="offer-help" onChange={event=>{setValues({...values,[key]:event.target.value});setResult(null);setError("");if(!started.current){started.current=true;trackUsage({name:"calculator_started",tool:"trade",country:"US"});}}}/></div>)}</div>
      <p id="offer-help" className="micro">Use up to two decimal places without currency symbols or commas. Enter 0 for no payoff or fees. Only offers 2 and 3 may be blank. The same dealer selling-fee assumption applies to each offer; compare separately if fees differ. Inputs stay in page memory and clear on reload.</p>
      {error&&<p role="alert">{error}</p>}<div className="button-row"><button className="button" type="submit">Compare net proceeds</button><button className="text-button" type="button" onClick={()=>{setValues(empty());setResult(null);setError("");started.current=false;}}>Clear offers</button></div>
    </form>
    <div aria-live="polite" aria-atomic="true">{result&&<><h3>Calculated results from your entered amounts</h3><div className="table-wrap" role="region" aria-label="Offer comparison results" tabIndex={0}><table className="data-table"><caption>USD proceeds before any tax effect or replacement-car transaction</caption><thead><tr>{["Scenario","Entered price","Equity before fees","Entered fees","Net proceeds","Cash shortfall"].map(label=><th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{[...result.dealers.map((row,index)=>({label:`Dealer ${index+1}`,...row})),{label:"Private sale",...result.privateSale}].map(row=><tr key={row.label}><th scope="row">{row.label}</th>{[row.price,row.equity,row.fees,row.net,row.shortfall].map((value,index)=><td key={index}>{money(value,2)}</td>)}</tr>)}</tbody></table></div><p>Private-sale net proceeds minus the highest dealer net proceeds: <strong>{money(result.privateAdvantage,2)}</strong>. A negative difference favors the entered dealer scenario before tax, time and risk. Negative net proceeds mean cash is needed to cover payoff and fees; they are not cash available for a down payment.</p></>}</div>
    <p>Equity = offer − loan payoff. Net proceeds = offer − loan payoff − selling fees. A private sale may take longer and require lender/title coordination. Verify any local trade-in tax treatment separately; it is excluded here. Rolling a shortfall into another loan increases borrowing and can increase interest costs.</p>
  </section>;
}
