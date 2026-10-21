import {cents,loan,valid,type PaymentRow} from "./index";

/** Fixed payment on an existing balance; no assumed final balloon or payoff quote. */
export function payoffSchedule(balance:number,rate:number,payment:number,extra=0,lump=0){
  valid(balance,"Current balance");valid(rate,"Annual contract rate",0,100);
  valid(payment,"Required payment");valid(extra,"Extra payment");valid(lump,"Lump sum",0,balance);
  balance=cents(balance);lump=cents(lump);payment=cents(payment);extra=cents(extra);
  const principal=balance;balance=cents(balance-lump);
  const schedule:PaymentRow[]=[];
  for(let month=1;balance>0&&month<=600;month++){
    const interest=cents(balance*rate/1200);
    const paid=cents(Math.min(payment+extra,balance+interest));
    if(paid<=interest)throw Error("The payment must exceed monthly interest to reduce the balance.");
    const principalPaid=cents(paid-interest);balance=cents(balance-principalPaid);
    schedule.push({month,payment:paid,principal:principalPaid,interest,balance});
  }
  if(balance>0)throw Error("This payment would take more than 600 months. Check the required payment.");
  const interest=cents(schedule.reduce((sum,row)=>sum+row.interest,0));
  return {principal,payment,interest,total:cents(principal+interest),months:schedule.length,schedule,lump};
}
export function payoff(input:{balance:number;rate:number;payment:number;extra:number;lump:number}){
  const baseline=payoffSchedule(input.balance,input.rate,input.payment);
  const accelerated=payoffSchedule(input.balance,input.rate,input.payment,input.extra,input.lump);
  return {baseline,accelerated,interestSaved:cents(baseline.interest-accelerated.interest),monthsSaved:baseline.months-accelerated.months};
}

const borrowing=(principal:number,rate:number,months:number)=>loan({price:principal,down:0,trade:0,payoff:0,fees:0,rate,months,extra:0});
export function refinance(input:{balance:number;oldRate:number;remaining:number;newRate:number;months:number;upfront:number;financed:number;penalty:number}){
  valid(input.balance,"Current balance",.01);valid(input.upfront,"Upfront fees");valid(input.financed,"Financed fees");valid(input.penalty,"Prepayment charge");
  const current=borrowing(input.balance,input.oldRate,input.remaining);
  const proposed=borrowing(input.balance+input.financed,input.newRate,input.months);
  const fees=cents(input.upfront+input.financed+input.penalty);
  const proposedCash=cents(proposed.total+input.upfront+input.penalty);
  let oldInterest=0,newInterest=0,breakEven:number|null=fees===0?0:null;
  for(let month=1;month<=Math.max(current.months,proposed.months);month++){
    oldInterest=cents(oldInterest+(current.schedule[month-1]?.interest??0));
    newInterest=cents(newInterest+(proposed.schedule[month-1]?.interest??0));
    if(breakEven===null&&oldInterest>=cents(newInterest+fees))breakEven=month;
  }
  return {current,proposed,fees,proposedCash,savings:cents(current.total-proposedCash),monthlySaving:cents(current.payment-proposed.payment),breakEven};
}

export function downPayment(input:{price:number;percent:number;fees:number;trade:number;payoff:number;savings:number;reserve:number;rate:number;months:number}){
  valid(input.price,"Vehicle price",.01);valid(input.percent,"Target down payment",0,100);
  for(const key of ["fees","trade","payoff","savings","reserve"] as const)valid(input[key],key);
  const equity=cents(input.trade-input.payoff);
  const target=cents(input.price*input.percent/100);
  const cash=cents(Math.max(0,target-equity));
  const spendable=cents(Math.max(0,input.savings-input.reserve));
  const financing=loan({price:input.price,down:cash,trade:input.trade,payoff:input.payoff,fees:input.fees,rate:input.rate,months:input.months,extra:0});
  return {equity,target,cash,spendable,gap:cents(Math.max(0,cash-spendable)),remainingSavings:cents(input.savings-cash),financing};
}

export function evCharging(input:{battery:number;start:number;target:number;efficiency:number;rate:number;fee:number;power:number;boundary:string}){
  valid(input.battery,"Usable battery capacity",.01,1000);
  valid(input.start,"Starting charge",0,100);valid(input.target,"Target charge",input.start,100);
  valid(input.efficiency,"Charging efficiency",.01,100);valid(input.rate,"Energy price",0,10000);
  valid(input.fee,"Session fee");valid(input.power,"Average input power",.01,1000);
  if(!["grid","battery"].includes(input.boundary))throw Error("Choose the energy billing boundary.");
  const battery=input.battery*(input.target-input.start)/100;
  const grid=battery/(input.efficiency/100);
  const billed=input.boundary==="grid"?grid:battery;
  return {battery,grid,billed,loss:grid-battery,energyCost:billed*input.rate,cost:billed*input.rate+input.fee,hours:grid/input.power};
}
