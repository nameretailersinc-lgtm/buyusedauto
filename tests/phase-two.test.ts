import {describe,it,expect,vi,afterEach} from "vitest";
import {carLoanApr,repairQuote,registrationBudget,type RegistrationInput} from "../lib/calculators/phase-two";
import {ukFirstRegistration} from "../data/registration-rules";
import {tools} from "../data/tools";
import {markets} from "../lib/markets";
import {evaluate} from "../lib/evaluate";

describe("regular monthly APR estimates",()=>{
  const base={principal:12000,rate:0,months:12,upfront:0,financed:0};
  it("returns exact zero without interest or finance charges",()=>{
    expect(carLoanApr(base)).toMatchObject({gross:12000,net:12000,payment:1000,total:12000,financeCost:0,apr:0,effectiveRate:0});
  });
  it.each([.000001,7,35,100])("recovers a no-fee contract rate of %s",rate=>{
    expect(carLoanApr({...base,rate,months:60}).apr).toBeCloseTo(rate,7);
  });
  it("matches an independent discounted-cash-flow example",()=>{
    const r=carLoanApr({...base,financed:120});
    expect(r.payment).toBe(1010);expect(r.net).toBe(12000);expect(r.financeCost).toBe(120);
    expect(r.apr).toBeCloseTo(1.8409798883,8);expect(r.effectiveRate).toBeCloseTo(1.856593466,8);
    let presentValue=0;for(let month=1;month<=12;month++)presentValue+=1010/Math.pow(1+r.apr/1200,month);
    expect(presentValue).toBeCloseTo(12000,6);
  });
  it("counts upfront and financed fees once with different cash flows",()=>{
    const r=carLoanApr({...base,upfront:100,financed:200});
    expect(r.gross).toBe(12200);expect(r.net).toBe(11900);expect(r.fees).toBe(300);expect(r.financeCost).toBeCloseTo(300,8);
    expect(r.apr).toBeGreaterThan(0);expect(r.effectiveRate).toBeGreaterThan(r.apr);
  });
  it("remains finite at very small net proceeds and high fees",()=>{
    const r=carLoanApr({...base,principal:1000000,upfront:999999.99,financed:100,months:1,rate:100});
    expect(Number.isFinite(r.apr)).toBe(true);expect(Number.isFinite(r.effectiveRate)).toBe(true);
  });
  it.each([{upfront:12000},{upfront:-1},{financed:Infinity},{months:0},{months:2.5},{rate:-1}])("rejects invalid cash flows %o",change=>expect(()=>carLoanApr({...base,...change})).toThrow());
});

describe("itemized repair quotes",()=>{
  const base={parts:300,hours:2,rate:100,diagnostic:75,other:25,tax:40,credit:0,contingency:10};
  it("separates quote, confirmed credit and contingency",()=>{
    expect(repairQuote(base)).toEqual({labor:200,invoice:640,payable:640,reserve:64,budget:704});
    expect(repairQuote({...base,credit:140})).toMatchObject({invoice:640,payable:500,reserve:50,budget:550});
  });
  it("supports a fixed labor total and a fully covered bill",()=>{
    expect(repairQuote({...base,hours:1,rate:200})).toEqual(repairQuote(base));
    expect(repairQuote({...base,credit:640})).toMatchObject({payable:0,reserve:0,budget:0});
  });
  it.each([{credit:641},{hours:-1},{rate:NaN},{contingency:101},{tax:-1}])("rejects unsupported quote inputs %o",change=>expect(()=>repairQuote({...base,...change})).toThrow());
});

describe("registration budget and sourced-fee maintenance",()=>{
  const base:RegistrationInput={market:"US",profile:"manual",registration:80,title:20,inspection:0,other:0,annualTax:240,annualFees:60,months:18};
  it("counts one-time fees once and prorates recurring costs",()=>{
    expect(registrationBudget(base,"2026-10-21")).toMatchObject({registration:80,once:100,recurring:450,total:550});
    expect(registrationBudget(base,"2026-10-21").monthly).toBeCloseTo(550/18,8);
  });
  it("uses only the sourced UK fee, without silently adding vehicle tax",()=>{
    const r=registrationBudget({...base,market:"GB",profile:"gb-first",registration:999,annualTax:0,annualFees:0,title:0},"2026-10-21");
    expect(r.total).toBe(55);expect(r.registration).toBe(ukFirstRegistration.amount);
    expect(registrationBudget({...base,market:"GB",profile:"gb-exempt"},"2026-10-21").registration).toBe(0);
  });
  it("requires GBP and disables a fee profile after its review date",()=>{
    expect(()=>registrationBudget({...base,profile:"gb-first"},"2026-10-21")).toThrow(/GBP/);
    expect(()=>registrationBudget({...base,market:"GB",profile:"gb-first"},"2027-01-20")).toThrow(/source review/);
    expect(()=>registrationBudget({...base,market:"GB",profile:"gb-first"},"2026-11-31")).toThrow(/date/);
    expect(registrationBudget(base,"2030-01-01").total).toBe(550);
  });
  it.each([{months:0},{months:1.5},{annualFees:-1},{profile:"unknown"}])("rejects unusable budget inputs %o",change=>expect(()=>registrationBudget({...base,...change},"2026-10-21")).toThrow());
});

describe("phase two interfaces in all currencies",()=>{
  afterEach(()=>vi.useRealTimers());
  for(const id of ["apr","repair","registration"] as const){
    it(`evaluates ${id}, including valid zero results`,()=>{
      const tool=tools.find(tool=>tool.id===id)!;const defaults=Object.fromEntries(tool.fields.map(field=>[field.key,field.value]));
      for(const market of Object.keys(markets)){
        const result=evaluate(id,{...defaults,market});expect(result.market).toBe(market);expect(result.table?.rows.length).toBeGreaterThan(0);
        expect(JSON.stringify(result)).not.toMatch(/NaN|Infinity/);
      }
      expect(()=>evaluate(id,{...defaults,market:"invalid"})).toThrow(/currency/);
      const first=tool.fields.find(field=>!field.options)!;expect(()=>evaluate(id,{...defaults,[first.key]:""})).toThrow(/Complete/);
    });
  }
  it("ignores a hidden manual amount when using a sourced registration fee",()=>{
    vi.useFakeTimers();vi.setSystemTime(new Date("2026-10-21T12:00:00Z"));
    const tool=tools.find(tool=>tool.id==="registration")!;
    const defaults=Object.fromEntries(tool.fields.map(field=>[field.key,field.value]));
    expect(evaluate("registration",{...defaults,market:"GB",profile:"gb-first",registration:""}).value).toBe("£55.00");
    expect(()=>evaluate("registration",{...defaults,registration:""})).toThrow(/Complete/);
  });
});
