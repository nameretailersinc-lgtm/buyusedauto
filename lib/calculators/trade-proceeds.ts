import {valid,cents} from "./index";

export type TradeProceedsInput={offers:number[];payoff:number;dealerFees:number;privatePrice:number;privateFees:number};
/** User-entered USD scenarios only: no inferred market prices or tax credits. */
export function tradeProceeds(input:TradeProceedsInput){
  if(!Array.isArray(input.offers)||input.offers.length<1||input.offers.length>3)throw Error("Enter one to three dealer offers.");
  for(const value of [...input.offers,input.payoff,input.dealerFees,input.privatePrice,input.privateFees]){
    valid(value,"Amount",0,100000000);
    if(Math.abs(value*100-Math.round(value*100))>0.00001)throw Error("Enter amounts to at most two decimal places.");
  }
  const row=(price:number,fees:number)=>({price,fees,equity:cents(price-input.payoff),net:cents(price-input.payoff-fees),shortfall:cents(Math.max(0,input.payoff+fees-price))});
  const dealers=input.offers.map(offer=>row(offer,input.dealerFees));
  const privateSale=row(input.privatePrice,input.privateFees);
  return {dealers,privateSale,privateAdvantage:cents(privateSale.net-Math.max(...dealers.map(dealer=>dealer.net)))};
}

export function parseTradeAmount(value:string){
  if(!/^\d+(?:\.\d{1,2})?$/.test(value.trim()))throw Error("Enter every amount as a nonnegative number with at most two decimal places; use 0 if none.");
  const amount=Number(value);
  valid(amount,"Amount",0,100000000);
  return amount;
}
