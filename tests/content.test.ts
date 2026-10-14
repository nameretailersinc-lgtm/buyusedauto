import {describe,expect,it} from "vitest";
import {tools} from "../data/tools";
import {toolContent} from "../data/tool-content";
import {guides} from "../data/guides";
import {scenarios,scenarioPath} from "../data/scenarios";
import {states} from "../data/states";
describe("content and routing contracts",()=>{
  it("keeps launch scope focused and route slugs unique",()=>{expect(tools).toHaveLength(11);expect(guides.length).toBeGreaterThanOrEqual(5);expect(guides.length).toBeLessThanOrEqual(8);expect(scenarios.length).toBeLessThanOrEqual(30);const routes=[...tools.map(t=>`/${t.slug}`),...scenarios.map(scenarioPath)];expect(new Set(routes).size).toBe(routes.length);});
  it("every tool has distinct methodology, five FAQs, and resolved related links",()=>{for(const t of tools){const c=toolContent[t.id];expect(c.formula.length).toBeGreaterThan(40);expect(c.faq.length).toBeGreaterThanOrEqual(5);expect(new Set(c.faq.map(f=>f.question)).size).toBe(c.faq.length);for(const slug of c.related)expect(tools.some(t=>t.slug===slug)).toBe(true);expect(c.sources.every(s=>s.url.startsWith("https://"))).toBe(true);}});
  it("guides have substantive content, primary-source references, and working tool slugs",()=>{for(const g of guides){expect(g.sections).toHaveLength(7);expect(JSON.stringify(g.sections).split(/\s+/).length).toBeGreaterThan(900);expect(g.sources.length).toBeGreaterThanOrEqual(3);for(const slug of g.relatedTools)expect(tools.some(t=>t.slug===slug)).toBe(true);}});
  it("state resource directory covers fifty states and DC without rates",()=>{expect(states).toHaveLength(51);expect(new Set(states.map(s=>s[0])).size).toBe(51);for(const s of states){expect(s).toHaveLength(3);expect(s[2]).toMatch(/^https:\/\//);}});
  it("scenario pages include differentiated questions",()=>{const questions=scenarios.flatMap(s=>s.faq.map(f=>f.question));expect(new Set(questions).size).toBe(questions.length);});
});
