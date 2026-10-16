import {describe,it,expect} from "vitest";
import {pakistanConventional,islamicQuote,parseIslamicSchedule} from "../lib/calculators/pakistan";
describe("Pakistan manual financing",()=>{
  it("uses a fixed entered benchmark plus spread without currency conversion",()=>{
    const result=pakistanConventional({price:120000,down:20000,fees:0,trade:0,payoff:0,extra:0,benchmark:0,spread:0,months:10});
    expect(result).toMatchObject({principal:100000,payment:10000,total:100000,currency:"PKR"});
  });
  it("does not accept a combined rate beyond the shared engine limit",()=>expect(()=>pakistanConventional({price:100,down:0,fees:0,trade:0,payoff:0,extra:0,benchmark:99,spread:2,months:12})).toThrow());
  const quote={mode:"ijarah" as const,upfront:1000,refund:500,fees:50,finalPurchase:0,rows:[{rental:100,purchase:0,other:0},{rental:100,purchase:0,other:0}]};
  it("reconciles Ijarah gross cash and a separately entered return",()=>expect(islamicQuote(quote)).toMatchObject({gross:1250,net:750,rentals:200,purchases:0}));
  it("keeps ownership purchases separate from rentals",()=>expect(islamicQuote({...quote,mode:"diminishing-musharakah",refund:0,rows:[{rental:100,purchase:200,other:10}]})).toMatchObject({gross:1360,net:1360,rentals:100,purchases:200,charges:10}));
  it("rejects incompatible deposit and ownership assumptions",()=>{
    expect(()=>islamicQuote({...quote,refund:1001})).toThrow();
    expect(()=>islamicQuote({...quote,mode:"diminishing-musharakah"})).toThrow();
    expect(()=>islamicQuote({...quote,rows:[{rental:1,purchase:1,other:0}]})).toThrow();
    expect(()=>islamicQuote({...quote,rows:[]})).toThrow();
    expect(()=>islamicQuote({...quote,upfront:1.001})).toThrow("two decimal places");
    expect(()=>islamicQuote({...quote,rows:[{rental:NaN,purchase:0,other:0}]})).toThrow();
  });
  it("parses numeric quote rows without personal data or ambiguous formatting",()=>{
    expect(parseIslamicSchedule("100.50,0,2\n200,0,0")).toHaveLength(2);
    for(const text of ["","name,0,0","1,000,0,0","-1,0,0","NaN,0,0","1.001,0,0"])expect(()=>parseIslamicSchedule(text)).toThrow();
  });
});
