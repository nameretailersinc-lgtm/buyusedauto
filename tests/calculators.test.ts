import { describe, expect, it } from "vitest";
import { monthlyPayment, loan, compareLoanPayoff, depreciation, valuation, fuel, ownership, affordability, leaseVsBuy, negotiation, salesTax, inspectionProgress } from "../lib/calculators";
const base = { price: 25000, down: 5000, trade: 0, payoff: 0, fees: 0, rate: 7, months: 60, extra: 0 };
describe("loan math", () => {
  it("matches an independently computed amortization example", () => { expect(monthlyPayment(20000, 7, 60)).toBeCloseTo(396.02397, 4); });
  it("handles 0% APR and final cent reconciliation", () => { const x = loan({...base, price: 15000, down: 5000, months: 36, rate: 0}); expect(x.interest).toBe(0); expect(x.total).toBe(10000); expect(x.schedule.at(-1)?.balance).toBe(0); });
  it("fully cash-funded purchases have no installments", () => { expect(loan({...base, down: 25000}).schedule).toEqual([]); });
  it("accounts for negative trade equity", () => { expect(loan({...base, trade: 5000, payoff: 8000}).principal).toBe(23000); });
  it("extra payments save interest and reduce duration", () => { const regular = loan(base); const extra = loan({...base, extra: 100}); expect(extra.interest).toBeLessThan(regular.interest); expect(extra.months).toBeLessThan(60); expect(extra.schedule.at(-1)?.balance).toBe(0); });
  it("a very large extra payment pays off in one month", () => { const x = loan({...base, extra: 50000}); expect(x.months).toBe(1); expect(x.total).toBe(20116.67); });
  it("schedule conserves principal and interest", () => { const x = loan(base); expect(x.schedule.reduce((s,r)=>s+r.principal,0)).toBeCloseTo(x.principal, 2); expect(x.schedule.reduce((s,r)=>s+r.payment,0)).toBeCloseTo(x.total,2); });
  it.each([NaN, Infinity, -1])("rejects invalid principal %s", p => { expect(()=>monthlyPayment(p,7,60)).toThrow(); });
  it.each([0, 1.5, 121])("rejects invalid term %s", n => {expect(()=>monthlyPayment(20000,7,n)).toThrow();});
  it("separates excess cash/trade credit from financing", ()=>{
    const result=loan({...base, down:30000});
    expect(result).toMatchObject({principal:0,payment:0,interest:0,total:0,unappliedCredit:5000,schedule:[]});
    expect(loan({...base,down:0,trade:30000,payoff:2000}).unappliedCredit).toBe(3000);
  });
  it("keeps tiny positive interest rates stable", ()=>expect(monthlyPayment(12000,0.00000001,12)).toBeCloseTo(1000,4));
});
describe("financial boundary and independent reference checks",()=>{
  // Independent reference: solve the present value of discounted payments by
  // bisection, without the production annuity formula or its log/expm1 identity.
  function referencePayment(principal:number,annualRate:number,months:number){
    let low=0,high=principal*(1+annualRate/1200);
    for(let iteration=0;iteration<160;iteration++){
      const candidate=(low+high)/2;
      let presentValue=0;
      for(let month=1;month<=months;month++)presentValue+=candidate/Math.pow(1+annualRate/1200,month);
      if(presentValue<principal)low=candidate;else high=candidate;
    }
    return (low+high)/2;
  }
  it.each([1,84,96])("matches an independent payment solver for %s months",months=>{
    const result=loan({...base,months});
    expect(monthlyPayment(result.principal,base.rate,months)).toBeCloseTo(referencePayment(result.principal,base.rate,months),7);
    expect(result.schedule).toHaveLength(months);
    expect(result.schedule.at(-1)?.balance).toBe(0);
    expect(result.schedule.reduce((sum,row)=>sum+row.principal,0)).toBeCloseTo(result.principal,2);
  });
  it.each([0,0.01,1,99999999.99])("conserves payments at principal scale %s",price=>{
    const result=loan({...base,price,down:0,rate:0,months:96});
    expect(result.schedule.reduce((sum,row)=>sum+row.payment,0)).toBeCloseTo(price,2);
    expect(result.interest).toBe(0);
    expect(result.schedule.at(-1)?.balance??0).toBe(0);
  });
  it("reconciles a final payment without overpaying principal",()=>{
    const result=loan({...base,price:100,down:0,rate:0,months:3});
    expect(result.schedule.map(row=>row.payment)).toEqual([33.33,33.33,33.34]);
  });
  it.each([0.01,99999999.99])("keeps interest-bearing schedules finite and conserved at %s",price=>{
    const result=loan({...base,price,down:0,months:96});
    expect(monthlyPayment(price,7,96)).toBeCloseTo(referencePayment(price,7,96),6);
    expect(Number.isFinite(result.interest)).toBe(true);
    expect(result.schedule.at(-1)?.balance).toBe(0);
    expect(result.schedule.reduce((sum,row)=>sum+row.principal,0)).toBeCloseTo(price,2);
    expect(result.schedule.reduce((sum,row)=>sum+row.payment,0)).toBeCloseTo(result.total,2);
  });
  it("caps a large extra payment at the amount due",()=>{
    const result=compareLoanPayoff({...base,extra:100000});
    expect(result.accelerated.schedule).toEqual([{month:1,payment:20116.67,interest:116.67,principal:20000,balance:0}]);
    expect(result.monthsSaved).toBe(59);
    expect(result.interestSaved).toBeCloseTo(result.baseline.interest-116.67,2);
  });
  it("includes manually supplied tax once without converting currency",()=>{
    const result=loan({...base,tax:1000,fees:500,currency:"PKR"});
    expect(result.principal).toBe(21500);
    expect(result.currency).toBe("PKR");
  });
  it("rejects missing, nonfinite and invalid financial inputs",()=>{
    expect(()=>loan({...base,price:undefined as unknown as number})).toThrow();
    expect(()=>loan({...base,tax:NaN})).toThrow();
    expect(()=>loan({...base,rate:101})).toThrow();
    expect(()=>loan({...base,extra:-1})).toThrow();
    expect(()=>loan({...base,currency:"INVALID" as "USD"})).toThrow();
    expect(()=>loan({...base,price:100000000,fees:1,down:0})).toThrow();
  });
  it.each(["toString","constructor","__proto__"])("rejects inherited valuation key %s",key=>{
    expect(()=>valuation(30000,5,60000,key as "good","base")).toThrow("listed condition");
    expect(()=>valuation(30000,5,60000,"good",key as "base")).toThrow("listed condition");
  });
  it("does not count excess down payment as money spent in lease comparison",()=>{
    const result=leaseVsBuy({price:20000,down:25000,rate:0,loanMonths:60,horizon:36,resale:12000,leasePayment:250,leaseDue:0,leaseFees:0,extraMiles:0,mileageFee:0});
    expect(result.buyCost).toBe(8000);
    expect(result.balance).toBe(0);
  });
});
describe("depreciation and valuation", () => {
  it("compounds declines rather than subtracting the same dollar loss",()=>{const x=depreciation(30000,3,20,10);expect(x.residual).toBe(19440);expect(x.loss).toBe(10560);});
  it("returns original value at age zero",()=>expect(depreciation(30000,0,18,12).residual).toBe(30000));
  it("handles total and zero depreciation",()=>{expect(depreciation(30000,5,100,12).residual).toBe(0);expect(depreciation(0,5,18,12).percent).toBe(0);});
  it("keeps channels ordered and mileage adjustment bounded",()=>{const x=valuation(30000,5,1000000,"good","base");expect(x.adjustment).toBe(-0.2);expect(x.trade.midpoint).toBeLessThan(x.privateSale.midpoint);expect(x.retail.midpoint).toBeGreaterThan(x.privateSale.midpoint);});
  it("accounts for poor condition",()=>expect(valuation(30000,5,60000,"poor","base").trade.midpoint).toBeLessThan(valuation(30000,5,60000,"good","base").trade.midpoint));
  it("rejects fractional ages",()=>expect(()=>valuation(30000,2.5,30000,"good","base")).toThrow());
});
describe("fuel and cost of ownership",()=>{
  it("calculates US and metric consumption",()=>{expect(fuel(300,30,3.5,"us").cost).toBe(35);expect(fuel(500,8,1.5,"metric").cost).toBe(60);});
  it("handles zero travel and refuses zero efficiency",()=>{expect(fuel(0,30,3.5,"us").perDistance).toBe(0);expect(()=>fuel(100,0,3.5,"us")).toThrow();});
  it("counts depreciation plus interest, never principal twice",()=>{const x=ownership({price:20000,resale:10000,years:5,miles:12000,mpg:30,fuelPrice:3,insurance:1200,maintenance:600,annualFees:100,purchaseFees:1000,down:20000,rate:0,months:60});expect(x.total).toBe(26500);expect(x.monthly).toBeCloseTo(441.6667,3);});
  it("counts only interest incurred during ownership",()=>{const x=ownership({price:20000,resale:18000,years:1,miles:0,mpg:30,fuelPrice:3,insurance:0,maintenance:0,annualFees:0,purchaseFees:0,down:0,rate:7,months:60});const full=loan({...base,price:20000,down:0});expect(x.parts[5].value).toBeLessThan(full.interest);expect(x.remainingBalance).toBeGreaterThan(0);expect(x.perMile).toBeNull();});
});
describe("affordability",()=>{
  it("enforces 20% down and a 48-month loan",()=>{const x=affordability(6000,500,4000,200,7);expect(x.price).toBeLessThanOrEqual(20000);expect(x.payment).toBeLessThanOrEqual(400.01);});
  it("returns zero finance capacity when running costs exceed budget",()=>{const x=affordability(3000,1000,2000,400,7);expect(x.price).toBe(2000);expect(x.payment).toBe(0);});
  it("does not invent an affordable loan without a down payment",()=>expect(affordability(6000,0,0,100,0).price).toBe(0));
});
describe("lease, negotiation, tax, inspection",()=>{
  it("compares the same horizon and subtracts sale equity",()=>{const x=leaseVsBuy({price:20000,down:2000,rate:0,loanMonths:60,horizon:36,resale:12000,leasePayment:250,leaseDue:1000,leaseFees:300,extraMiles:1000,mileageFee:.25});expect(x.balance).toBe(7200);expect(x.buyCost).toBe(8000);expect(x.leaseCost).toBe(10550);});
  it("handles negative equity",()=>{const x=leaseVsBuy({price:20000,down:0,rate:0,loanMonths:60,horizon:12,resale:10000,leasePayment:250,leaseDue:0,leaseFees:0,extraMiles:0,mileageFee:0});expect(x.equity).toBeLessThan(0);expect(x.buyCost).toBeCloseTo(10000,2);});
  it("deducts documented repairs before opening discount",()=>expect(negotiation(20000,1000,500,5)).toEqual({target:18050,ceiling:19000,total:18550,savings:1950}));
  it("refuses impossible repair adjustments",()=>expect(()=>negotiation(1000,2000,0,5)).toThrow());
  it("applies tax only to the specified taxable base",()=>expect(salesTax(20000,500,5000,6,200)).toEqual({taxable:15500,tax:930,total:21630}));
  it("does not deduct trade credit twice from out-the-door price",()=>expect(salesTax(20000,0,5000,0,0).total).toBe(20000));
  it("rejects excess tax credits",()=>expect(()=>salesTax(1000,0,2000,5,0)).toThrow());
  it("records concerns without calling the car safe",()=>expect(inspectionProgress(["pass","concern","na","unchecked"])).toEqual({completed:3,concerns:1,total:4,percent:75}));
  it("handles an empty checklist",()=>expect(inspectionProgress([]).percent).toBe(0));
});
