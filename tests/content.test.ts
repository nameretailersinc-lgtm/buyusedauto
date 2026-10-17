import {describe,expect,it} from "vitest";
import {tools} from "../data/tools";
import {toolContent} from "../data/tool-content";
import {guides} from "../data/guides";
import {newGuides} from "../data/new-guides";
import {scenarios,scenarioPath} from "../data/scenarios";
import {states} from "../data/states";
describe("content and routing contracts",()=>{
  it("publishes each guide once with distinct metadata and resolvable image assets",async()=>{const {guideImages,guideImageAlt}=await import("../data/visuals");const {existsSync}=await import("node:fs");expect(new Set(guides.map(g=>g.slug)).size).toBe(guides.length);expect(new Set(guides.map(g=>g.title)).size).toBe(guides.length);expect(new Set(guides.map(g=>g.description)).size).toBe(guides.length);for(const g of guides){expect(existsSync(`public/images/${guideImages[g.slug]}.webp`)).toBe(true);expect(guideImageAlt[g.slug]).toBeTruthy();}});
  it("keeps tool and scenario scope focused and route slugs unique",()=>{expect(tools).toHaveLength(11);expect(guides.length).toBeGreaterThanOrEqual(5);expect(scenarios.length).toBeLessThanOrEqual(30);const routes=[...tools.map(t=>`/${t.slug}`),...guides.map(g=>`/guides/${g.slug}`),...scenarios.map(scenarioPath)];expect(new Set(routes).size).toBe(routes.length);});
  it("every tool has distinct methodology, five FAQs, and resolved related links",()=>{for(const t of tools){const c=toolContent[t.id];expect(c.formula.length).toBeGreaterThan(40);expect(c.faq.length).toBeGreaterThanOrEqual(5);expect(new Set(c.faq.map(f=>f.question)).size).toBe(c.faq.length);for(const slug of c.related)expect(tools.some(t=>t.slug===slug)).toBe(true);expect(c.sources.every(s=>s.url.startsWith("https://"))).toBe(true);}});
  it("guides have substantive content, primary-source references, and working tool slugs",()=>{
    const suppliedSlugs=new Set(newGuides.map(g=>g.slug));
    const primarySourceHosts=new Set(["consumer.ftc.gov","www.nhtsa.gov","www.consumerfinance.gov","vehiclehistory.bja.ojp.gov","www.nicb.org","comptroller.texas.gov","www.dmv.ca.gov"]);
    for(const g of guides){
      if(suppliedSlugs.has(g.slug)){
        expect(g.sections.length,g.slug).toBeGreaterThanOrEqual(5);
        const text=[g.intro,...g.sections.flatMap(s=>[...s.paragraphs,...(s.bullets??[]),...(s.table?.rows.flat()??[]),...(s.subsections??[]).flatMap(sub=>[sub.heading,...sub.paragraphs])])].join(" ");
        expect(text.split(/\s+/).length,g.slug).toBeGreaterThan(300);
        expect(g.sources.length,g.slug).toBeGreaterThanOrEqual(1);
        for(const source of g.sources){const url=new URL(source.url);expect(url.protocol).toBe("https:");expect(primarySourceHosts.has(url.hostname),source.url).toBe(true);}
      }else{
        expect(g.sections).toHaveLength(7);
        expect(JSON.stringify(g.sections).split(/\s+/).length).toBeGreaterThan(900);
        expect(g.sources.length).toBeGreaterThanOrEqual(3);
      }
      for(const slug of g.relatedTools)expect(tools.some(t=>t.slug===slug),`${g.slug}: ${slug}`).toBe(true);
      for(const section of g.sections){
        if(section.table){expect(section.table.headers.length).toBeGreaterThan(1);for(const row of section.table.rows)expect(row).toHaveLength(section.table.headers.length);}
        for(const link of section.links??[]){if(link.url.startsWith("/"))expect(link.url==="/guides"||tools.some(t=>link.url===`/${t.slug}`)||guides.some(other=>link.url===`/guides/${other.slug}`),`${g.slug}: ${link.url}`).toBe(true);}
      }
    }
  });
  it("state resource directory covers fifty states and DC without rates",()=>{expect(states).toHaveLength(51);expect(new Set(states.map(s=>s[0])).size).toBe(51);for(const s of states){expect(s).toHaveLength(3);expect(s[2]).toMatch(/^https:\/\//);}});
  it("scenario pages include differentiated questions",()=>{const questions=scenarios.flatMap(s=>s.faq.map(f=>f.question));expect(new Set(questions).size).toBe(questions.length);});
});
