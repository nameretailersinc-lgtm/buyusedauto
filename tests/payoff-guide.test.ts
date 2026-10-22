import {it,expect} from "vitest";
import {payoffGuide} from "../data/payoff-guide";
import {monthlyPayment,loan} from "../lib/calculators";
import {tools} from "../data/tools";
import {guides} from "../data/guides";
import {routeGroups} from "../lib/routes";
it("checks the supplied hypothetical payment table against independent amortization",()=>{
  const table=payoffGuide.sections.find(s=>s.table)!.table!;
  for(const [index,months] of [48,36].entries()){
    const monthlyRate=.09/12;const exact=12000*monthlyRate/(1-(1+monthlyRate)**-months);
    expect(monthlyPayment(12000,9,months)).toBeCloseTo(exact,8);
    expect(table.rows[index][1]).toBe(`$${exact.toFixed(2)}`);
    const r=loan({price:12000,down:0,trade:0,payoff:0,fees:0,rate:9,months,extra:0});
    expect(Math.abs(r.interest-(exact*months-12000))).toBeLessThan(.5);
    expect(table.rows[index][2]).toBe(`$${Math.round(exact*months-12000).toLocaleString("en-US")}`);
  }
});
it("registers one complete guide with resolved calculator links and no draft placeholders",()=>{
  expect(guides.filter(g=>g.slug===payoffGuide.slug)).toHaveLength(1);expect(routeGroups.guides).toContain(`/guides/${payoffGuide.slug}`);
  expect(JSON.stringify(payoffGuide)).not.toMatch(/\{\{|Show less|status.*draft/);
  for(const slug of payoffGuide.relatedTools)expect(tools.some(t=>t.slug===slug)).toBe(true);
  expect(payoffGuide.sections.find(s=>s.heading.includes("example"))!.paragraphs[0]).toContain("Hypothetical");
  expect(payoffGuide.sections.find(s=>s.heading.includes("Frequently"))!.subsections).toHaveLength(4);
});
