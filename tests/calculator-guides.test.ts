import {describe,it,expect} from "vitest";
import {calculatorGuides} from "../data/calculator-guides";
import {submittedGuides} from "../data/submitted-guides";
import {guides,type GuideSection} from "../data/guides";
import {tools} from "../data/tools";
import {routeGroups} from "../lib/routes";
import {evCharging,refinance} from "../lib/calculators/planning";
import {monthlyPayment} from "../lib/calculators";
const sections=(items:GuideSection[]):GuideSection[]=>items.flatMap(s=>[s,...sections(s.subsections??[])]);
describe("imported calculator guides",()=>{
  it("publishes three distinct intents and retains the existing canonical owners for overlapping drafts",()=>{
    expect(calculatorGuides).toHaveLength(3);
    for(const g of calculatorGuides){expect(guides.filter(item=>item.slug===g.slug)).toHaveLength(1);expect(routeGroups.guides).toContain(`/guides/${g.slug}`);expect(g.updated).toBe("2026-10-22");expect(g.reviewedOn).toBe("2026-10-22");expect(g.sections.find(s=>/frequently asked/i.test(s.heading))?.subsections).toHaveLength(4);}
    for(const slug of ["how-much-does-a-car-depreciate-each-year","how-much-should-you-put-down-on-a-used-car"])expect(guides.some(g=>g.slug===slug)).toBe(false);
    for(const slug of ["how-much-does-a-used-car-depreciate-per-year","how-much-down-payment-for-used-car"])expect(guides.filter(g=>g.slug===slug)).toHaveLength(1);
  });
  it("resolves every imported internal link recursively and removes source-format artifacts",()=>{
    const paths=new Set([...tools.map(t=>`/${t.slug}`),...guides.map(g=>`/guides/${g.slug}`)]);
    for(const g of [...calculatorGuides,...submittedGuides]){
      expect(JSON.stringify(g)).not.toMatch(/\{\{[^}]+\}\}|\*\*|\ufffd|\u00e2\u20ac/);
      for(const s of sections(g.sections))for(const link of s.links??[])if(link.url.startsWith("/"))expect(paths.has(link.url),`${g.slug}: ${link.url}`).toBe(true);
      for(const s of sections(g.sections).filter(s=>s.table))for(const row of s.table!.rows)expect(row).toHaveLength(s.table!.headers.length);
    }
  });
  it("retains the correct partial-charge example and distinguishes billing boundaries",()=>{
    const r=evCharging({battery:60,start:20,target:80,efficiency:90,rate:.18,fee:0,power:7.2,boundary:"grid"});expect(r.battery).toBe(36);expect(r.grid).toBe(40);expect(r.cost).toBeCloseTo(7.2,10);
    const g=calculatorGuides.find(g=>g.slug.startsWith("how-much-does-it"))!;const text=JSON.stringify(g);expect(text).toContain("$7.20");expect(text).toContain("÷ 100");expect(text).toContain("Do not add another loss factor");expect(text).toContain("5.4 cents per mile");expect(30/100*.18).toBeCloseTo(.054,10);
  });
  it("reconciles the corrected refinance payment difference and upfront-fee savings",()=>{
    const r=refinance({balance:18000,oldRate:10,remaining:48,newRate:7,months:48,upfront:500,financed:0,penalty:0});
    const old=18000*(.10/12)/(1-(1+.10/12)**-48),next=18000*(.07/12)/(1-(1+.07/12)**-48);
    expect(old-next).toBeCloseTo(25.4940979015,8);expect(r.monthlySaving).toBeCloseTo(25.5,2);expect(r.savings).toBeCloseTo(723.72,0);
    const g=calculatorGuides.find(g=>g.slug.startsWith("is-refinancing"))!;expect(g.sections.find(s=>s.table)!.table!.rows[2][1]).toBe("$25.49/month");expect(JSON.stringify(g)).toContain("paid upfront");
  });
  it("reconciles the out-the-door example with an explicitly nontaxable dealer fee",()=>{
    const g=calculatorGuides.find(g=>g.slug.startsWith("used-car-sales"))!;expect(18000+18000*.06+300+250).toBe(19630);expect(JSON.stringify(g)).toContain("$19,630");expect(JSON.stringify(g)).toContain("$250 dealer charge is nontaxable");
  });
  it("preserves the added depreciation and down-payment tables at existing URLs",()=>{
    const dep=submittedGuides.find(g=>g.slug.includes("depreciate-per-year"))!;const table=dep.sections.find(s=>s.heading==="A simple car depreciation formula")!.table!;
    for(const [index,year] of [0,1,3,5].entries())expect(table.rows[index][1]).toBe(`$${Math.round(20000*.88**year).toLocaleString("en-US")}`);
    const down=submittedGuides.find(g=>g.slug==="how-much-down-payment-for-used-car")!;const rows=down.sections.find(s=>s.heading==="Worked example: a $20,000 used car")!.table!.rows;
    for(const [index,principal] of [20000,16600,15000].entries())expect(rows[index][2]).toBe(`$${monthlyPayment(principal,9,60).toFixed(2)}`);
    expect(monthlyPayment(16600,9,60)*60-16600).toBeCloseTo(4075.32180545,6);
  });
});
