import {describe,it,expect} from "vitest";
import {payoff,payoffSchedule,refinance,downPayment,evCharging} from "../lib/calculators/planning";
import {evaluate} from "../lib/evaluate";
import {tools} from "../data/tools";
import {markets} from "../lib/markets";
import {measuredFuelEconomy} from "../lib/calculators/fuel-efficiency";

describe("existing-balance payoff",()=>{
  it("handles zero-interest time savings and includes the lump sum in total cash",()=>{
    const r=payoff({balance:12000,rate:0,payment:1000,extra:200,lump:0});
    expect(r.baseline.months).toBe(12);expect(r.accelerated.months).toBe(10);expect(r.interestSaved).toBe(0);
    const lump=payoffSchedule(12000,0,1000,0,2000);
    expect(lump.months).toBe(10);expect(lump.total).toBe(12000);
    expect(lump.schedule.reduce((sum,row)=>sum+row.principal,0)+lump.lump).toBe(12000);
  });
  it("agrees with an independently computed first month and conserves the balance",()=>{
    const r=payoffSchedule(10000,12,1000,100,500);
    expect(r.schedule[0]).toEqual({month:1,payment:1100,principal:1005,interest:95,balance:8495});
    expect(r.schedule.at(-1)?.balance).toBe(0);
    expect(r.schedule.reduce((sum,row)=>sum+row.principal,0)+500).toBeCloseTo(10000,2);
    expect(r.schedule.reduce((sum,row)=>sum+row.payment,0)+500).toBeCloseTo(r.total,2);
  });
  it("caps the last payment and supports immediate full repayment",()=>{
    expect(payoffSchedule(100,0,33.33).schedule.map(row=>row.payment)).toEqual([33.33,33.33,33.33,.01]);
    expect(payoffSchedule(100,10,10,0,100)).toMatchObject({months:0,interest:0,total:100,schedule:[]});
    expect(payoffSchedule(0,8,0)).toMatchObject({months:0,total:0});
  });
  it("rejects an increasing balance, excess lump sum and unreasonable duration",()=>{
    expect(()=>payoffSchedule(10000,12,100)).toThrow(/exceed monthly interest/);
    expect(()=>payoffSchedule(10000,0,1000,0,10001)).toThrow();
    expect(()=>payoffSchedule(10000,0,1)).toThrow(/600 months/);
  });
  it.each([NaN,Infinity,-1])("rejects invalid extra contribution %s",extra=>expect(()=>payoffSchedule(1000,8,100,extra)).toThrow());
});

describe("refinance cost comparisons",()=>{
  const base={balance:12000,oldRate:0,remaining:12,newRate:0,months:12,upfront:0,financed:0,penalty:0};
  it("counts financed and upfront fees once, including interest on financed fees",()=>{
    const r=refinance({...base,financed:120,upfront:60,penalty:20});
    expect(r.proposed.payment).toBe(1010);expect(r.proposedCash).toBe(12200);expect(r.savings).toBe(-200);expect(r.breakEven).toBeNull();
  });
  it("does not mistake slower principal repayment for savings",()=>{
    const r=refinance({...base,months:24,upfront:100});
    expect(r.monthlySaving).toBe(500);expect(r.savings).toBe(-100);expect(r.breakEven).toBeNull();
  });
  it("recovers fees through interest savings with balances accounted for",()=>{
    const r=refinance({...base,oldRate:12,remaining:24,newRate:0,months:24,upfront:100});
    expect(r.savings).toBeGreaterThan(0);expect(r.breakEven).toBe(1);
    const month=r.breakEven!;
    const oldCash=r.current.schedule.slice(0,month).reduce((sum,row)=>sum+row.payment,0);
    const newCash=r.proposed.schedule.slice(0,month).reduce((sum,row)=>sum+row.payment,0)+100;
    expect(oldCash+r.current.schedule[month-1].balance).toBeGreaterThanOrEqual(newCash+r.proposed.schedule[month-1].balance);
  });
  it("rejects fractional terms and negative fees",()=>{
    expect(()=>refinance({...base,remaining:12.5})).toThrow();expect(()=>refinance({...base,financed:-1})).toThrow();
  });
});

describe("cash down-payment goals",()=>{
  const base={price:20000,percent:20,fees:1500,trade:8000,payoff:5000,savings:6000,reserve:2000,rate:7,months:60};
  it("uses net equity and preserves a reserve",()=>{
    const r=downPayment(base);expect(r).toMatchObject({target:4000,equity:3000,cash:1000,spendable:4000,gap:0,remainingSavings:5000});expect(r.financing.principal).toBe(17500);
  });
  it("includes negative equity in cash needed for the net contribution target",()=>{
    const r=downPayment({...base,trade:5000,payoff:8000});
    expect(r.cash).toBe(7000);expect(r.gap).toBe(3000);expect(r.financing.principal).toBe(17500);
  });
  it("never requests negative cash and separates excess credit",()=>{
    expect(downPayment({...base,trade:15000,payoff:0}).cash).toBe(0);
    expect(downPayment({...base,trade:30000,payoff:0}).financing.unappliedCredit).toBe(8500);
  });
  it("handles a reserve greater than savings without inventing available cash",()=>{
    expect(downPayment({...base,reserve:8000})).toMatchObject({spendable:0,gap:1000});
    expect(()=>downPayment({...base,percent:101})).toThrow();
  });
});

describe("charging tariff boundaries",()=>{
  const base={battery:60,start:20,target:80,efficiency:90,rate:.2,fee:0,power:7.2,boundary:"grid"};
  it("computes battery energy, grid losses, price and time independently",()=>{
    const r=evCharging(base);expect(r.battery).toBe(36);expect(r.grid).toBe(40);expect(r.cost).toBe(8);expect(r.loss).toBe(4);expect(r.hours).toBeCloseTo(40/7.2,8);
  });
  it("charges the flat fee once at the selected boundary",()=>{
    const r=evCharging({...base,boundary:"battery",fee:2});expect(r.billed).toBe(36);expect(r.cost).toBe(9.2);expect(r.grid).toBe(40);
  });
  it("supports zero added charge and free electricity without dividing by zero",()=>{
    expect(evCharging({...base,start:80})).toMatchObject({battery:0,grid:0,cost:0,hours:0});
    expect(evCharging({...base,rate:0,fee:2}).cost).toBe(2);
  });
  it.each([{efficiency:0},{efficiency:101},{target:10},{power:0},{rate:-1},{boundary:"invalid"}])("rejects invalid charging inputs %o",change=>expect(()=>evCharging({...base,...change})).toThrow());
});

describe("currency and integration contracts",()=>{
  for(const id of ["payoff","refinance","down","ev"] as const){
    it(`evaluates ${id} in every supported currency`,()=>{
      const tool=tools.find(tool=>tool.id===id)!;
      const defaults=Object.fromEntries(tool.fields.map(field=>[field.key,field.value]));
      for(const [market,config] of Object.entries(markets)){
        const result=evaluate(id,{...defaults,market});expect(result.market).toBe(market);expect(result.table?.rows.length).toBeGreaterThan(0);
        expect(JSON.stringify(result)).not.toContain("NaN");expect(JSON.stringify(result)).not.toContain("Infinity");
        const symbol=new Intl.NumberFormat(config.locale,{style:"currency",currency:config.currency}).formatToParts(0).find(part=>part.type==="currency")!.value;
        expect([result.value,...result.metrics.map(metric=>metric.value)].some(value=>value.includes(symbol)),config.currency).toBe(true);
      }
      expect(()=>evaluate(id,{...defaults,market:"INVALID"})).toThrow(/currency/);
      const numeric=tool.fields.find(field=>!field.options)!;expect(()=>evaluate(id,{...defaults,[numeric.key]:""})).toThrow(/Complete/);
    });
  }
});

describe("measured fuel economy",()=>{
  it("converts a measured US example to equivalent metric results",()=>{
    const us=measuredFuelEconomy(300,10,"us");
    expect(us.mpg).toBeCloseTo(30,8);expect(us.kmPerLiter).toBeCloseTo(12.754311,5);expect(us.litersPer100Km).toBeCloseTo(7.840486,5);
    const metric=measuredFuelEconomy(482.8032,37.85411784,"metric");
    expect(metric.mpg).toBeCloseTo(us.mpg,8);expect(metric.kmPerLiter).toBeCloseTo(us.kmPerLiter,8);expect(metric.litersPer100Km).toBeCloseTo(us.litersPer100Km,8);
  });
  it.each([[0,10],[100,0],[-1,10],[100,NaN],[Infinity,10]])("rejects unusable measurements %s / %s",(distance,quantity)=>expect(()=>measuredFuelEconomy(distance,quantity,"us")).toThrow());
});
