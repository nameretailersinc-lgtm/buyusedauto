import {describe,it,expect} from "vitest";
import {loan} from "../lib/calculators";
import {evaluate} from "../lib/evaluate";
import {tools} from "../data/tools";

const base={price:25000,down:5000,trade:6000,payoff:8000,fees:300,rate:7,months:60,extra:0};
const defaults=(id:string)=>Object.fromEntries(tools.find(tool=>tool.id===id)!.fields.map(field=>[field.key,field.value]));

describe("itemized financed purchase charges",()=>{
  it("adds taxes, title, registration and negative equity once",()=>{
    const result=loan({...base,tax:1500,title:100,registration:200});
    expect(result.principal).toBe(24100);
    expect(result).toEqual(loan({...base,fees:2100}));
    expect(result.schedule.reduce((total,row)=>total+row.principal,0)).toBeCloseTo(24100,2);
  });
  it("preserves all-in fee inputs from existing shared scenarios",()=>{
    expect(loan({...base,fees:1800})).toEqual(loan({...base,fees:1800,tax:0,title:0,registration:0}));
    const values=defaults("loan");
    delete values.tax;delete values.title;delete values.registration;
    expect(evaluate("loan",values)).toEqual(evaluate("loan",defaults("loan")));
  });
  it.each(["tax","title","registration"])("rejects invalid %s instead of cancelling another charge",key=>{
    for(const value of [-1,NaN,Infinity])expect(()=>loan({...base,[key]:value})).toThrow();
    expect(()=>evaluate("loan",{...defaults("loan"),[key]:""})).toThrow("Complete every numeric field");
  });
  it("does not describe a voluntary payment when no loan is needed",()=>{
    const result=evaluate("loan",{...defaults("loan"),down:"25000",extra:"100"});
    expect(result.value).toBe("$0.00");
    expect(result.note).toContain("No loan is needed");
    expect(result.note).not.toContain("planned payment");
  });
});

describe("tax and registration presentation",()=>{
  it("separates tax-base credit from the full purchase cost",()=>{
    const result=evaluate("tax",{...defaults("tax"),price:"20000",taxableFees:"500",credit:"5000",rate:"6",title:"100",registration:"200",fees:"50"});
    expect(result.value).toBe("$930.00");
    expect(result.metrics).toContainEqual({label:"Purchase total before trade payment",value:"$21,780.00"});
    expect(result.metrics).toContainEqual({label:"Nontaxable fees",value:"$350.00"});
    expect(result.table?.rows).toContainEqual(["Title fee (nontaxable)","$100.00"]);
  });
  it("preserves the combined fee total from older links",()=>{
    const values=defaults("tax");delete values.title;delete values.registration;
    expect(evaluate("tax",values)).toEqual(evaluate("tax",defaults("tax")));
  });
  it.each(["fees","title","registration"])("rejects negative %s even when the aggregate would be positive",key=>{
    expect(()=>evaluate("tax",{...defaults("tax"),fees:"500",title:"100",registration:"200",[key]:"-1"})).toThrow("negative");
  });
});
