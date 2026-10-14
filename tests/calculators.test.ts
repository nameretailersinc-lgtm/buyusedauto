import { describe, expect, it } from "vitest";
import { monthlyPayment, loan, depreciation, valuation, fuel, ownership, affordability, leaseVsBuy, negotiation, salesTax, inspectionProgress } from "../lib/calculators";
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
  it("rejects excess down payment", ()=>expect(()=>loan({...base, down: 30000})).toThrow());
  it("keeps tiny positive interest rates stable", ()=>expect(monthlyPayment(12000,0.00000001,12)).toBeCloseTo(1000,4));
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
