import {describe,it,expect} from "vitest";
import {maintenanceBudget,distanceCost,gasVsElectric,convertPlanningUnits} from "../lib/calculators/phase-three";
import {evaluate} from "../lib/evaluate";
import {tools} from "../data/tools";
import {markets} from "../lib/markets";
import {additionalToolLinks,additionalGuideTools} from "../data/internal-links";
import {guides} from "../data/guides";
const maintenance={annualDistance:12000,years:5,serviceCost:150,serviceDistance:6000,serviceMonths:6,tireCost:600,tireDistance:40000,annualOther:300,upfront:0};
const recorded={basis:"economic",distance:12000,months:12,fuel:1400,maintenance:900,insurance:1500,fees:200,other:0,startValue:20000,endValue:18000,interest:600,acquisition:0,payments:3600};
const comparison={units:"us",years:5,annualDistance:12000,gasPrice:3.5,gasEconomy:30,electricUse:30,electricPrice:.2,boundary:"wall",efficiency:90,gasPurchase:25000,gasResale:12000,gasFees:1800,gasAnnual:2600,gasInterest:2000,evPurchase:30000,evResale:15000,evFees:2100,evAnnual:2300,evInterest:2500,charger:1000};
describe("maintenance reserves",()=>{
  it("reconciles service, tires and other reserves with the published example",()=>{const r=maintenanceBudget(maintenance);expect(r).toMatchObject({services:2,service:300,tire:180,annual:780,monthly:65,total:3900});});
  it("uses the earlier of time and distance",()=>{expect(maintenanceBudget({...maintenance,annualDistance:3000}).service).toBe(300);expect(maintenanceBudget({...maintenance,annualDistance:30000}).service).toBe(750);});
  it("keeps immediate work separate and counts it once",()=>{const r=maintenanceBudget({...maintenance,upfront:600});expect(r.total).toBe(4500);expect(r.monthly).toBe(65);expect(r.withUpfrontMonthly).toBe(75);});
  it("supports no driving and fractional service reserve rates",()=>{expect(maintenanceBudget({...maintenance,annualDistance:0}).tire).toBe(0);expect(maintenanceBudget({...maintenance,serviceMonths:12,serviceDistance:8000}).services).toBe(1.5);});
  for(const key of ["serviceDistance","serviceMonths","tireDistance","years"] as const)it(`rejects zero ${key}`,()=>expect(()=>maintenanceBudget({...maintenance,[key]:0})).toThrow());
});
describe("recorded cost per distance",()=>{
  it("counts depreciation and interest without principal",()=>{const r=distanceCost(recorded);expect(r).toMatchObject({operating:4000,capital:2000,finance:600,total:6600,perDistance:.55,monthly:550});});
  it("counts full cash payments and ignores hidden economic fields",()=>{const r=distanceCost({...recorded,basis:"cash",startValue:NaN,interest:NaN});expect(r.total).toBe(7600);expect(r.perDistance).toBeCloseTo(.633333333);});
  it("allows value appreciation and negative economic costs",()=>{expect(distanceCost({...recorded,endValue:30000}).total).toBe(-5400);});
  it("adds acquisition cash once",()=>expect(distanceCost({...recorded,basis:"cash",acquisition:5000}).total).toBe(12600));
  it("rejects zero distance, invalid basis, negatives and nonfinite amounts",()=>{for(const i of [{...recorded,distance:0},{...recorded,basis:"bad"},{...recorded,fuel:-1},{...recorded,distance:Infinity}])expect(()=>distanceCost(i)).toThrow();});
});
describe("matched gasoline and battery-electric ownership",()=>{
  it("reconciles independently calculated costs and energy",()=>{const r=gasVsElectric(comparison);expect(r.gasEnergy).toBe(1400);expect(r.evEnergy).toBe(720);expect(r.gasTotal).toBe(36800);expect(r.evTotal).toBe(35700);expect(r.saving).toBe(1100);expect(r.distance).toBe(60000);});
  it("applies charging losses exactly once",()=>{expect(gasVsElectric({...comparison,boundary:"battery",efficiency:80}).evEnergy).toBe(900);expect(gasVsElectric({...comparison,efficiency:NaN}).evEnergy).toBe(720);});
  it("reverses the winner with a lower resale assumption",()=>expect(gasVsElectric({...comparison,evResale:10000}).saving).toBe(-3900));
  it("counts interest and charger once over the ownership period",()=>{const a=gasVsElectric(comparison),b=gasVsElectric({...comparison,charger:0,evInterest:0});expect(a.evTotal-b.evTotal).toBe(3500);});
  it("reproduces a hand-worked metric scenario",()=>{const r=gasVsElectric({...comparison,units:"metric",annualDistance:10000,gasEconomy:6,gasPrice:1.5,electricUse:18,electricPrice:.25});expect(r.gasEnergy).toBe(900);expect(r.evEnergy).toBe(450);});
  it("rejects invalid units, boundaries, efficiency and zero distance",()=>{for(const i of [{...comparison,units:"bad"},{...comparison,boundary:"bad"},{...comparison,boundary:"battery",efficiency:0},{...comparison,annualDistance:0}])expect(()=>gasVsElectric(i)).toThrow();});
});
describe("units, currencies and contextual links",()=>{
  it("preserves gas/EV physical costs across unit conversion and round trips",()=>{
    const raw=Object.fromEntries(Object.entries(comparison).map(([k,v])=>[k,String(v)])),metric=convertPlanningUnits("gasEv",raw,"metric");
    const parsed={...comparison,units:"metric",annualDistance:Number(metric.annualDistance),gasPrice:Number(metric.gasPrice),gasEconomy:Number(metric.gasEconomy),electricUse:Number(metric.electricUse)};
    expect(gasVsElectric(parsed).gasTotal).toBeCloseTo(36800,6);expect(gasVsElectric(parsed).evTotal).toBeCloseTo(35700,6);
    const back=convertPlanningUnits("gasEv",metric,"us");expect(Number(back.gasPrice)).toBeCloseTo(3.5,9);expect(Number(back.gasEconomy)).toBeCloseTo(30,9);
  });
  it("preserves maintenance reserve and scales cost per distance",()=>{
    const raw=Object.fromEntries(Object.entries(maintenance).map(([k,v])=>[k,String(v)]));const m=convertPlanningUnits("maintenance",{...raw,units:"us"},"metric");
    expect(maintenanceBudget({...maintenance,annualDistance:Number(m.annualDistance),serviceDistance:Number(m.serviceDistance),tireDistance:Number(m.tireDistance)}).total).toBeCloseTo(3900,6);
    const d=convertPlanningUnits("mile",{distance:"12000",units:"us"},"metric");expect(distanceCost({...recorded,distance:Number(d.distance)}).perDistance).toBeCloseTo(.55/1.609344,10);
    expect(convertPlanningUnits("mile",{distance:"",units:"us"},"metric").distance).toBe("");
  });
  for(const market of Object.keys(markets))it(`renders all three tools in ${market}`,()=>{for(const id of ["maintenance","mile","gasEv"] as const){const tool=tools.find(t=>t.id===id)!;const values=Object.fromEntries(tool.fields.map(f=>[f.key,f.value]));const r=evaluate(id,{...values,market});expect(r.market).toBe(market);expect(r.value).not.toMatch(/NaN|Infinity/);expect(r.table!.rows.length).toBeGreaterThan(4);}});
  it("resolves each contextual addition to an existing guide and tool without self links",()=>{for(const [slug,links] of Object.entries(additionalToolLinks)){expect(tools.some(t=>t.slug===slug)).toBe(true);expect(links).not.toContain(slug);for(const link of links)expect(tools.some(t=>t.slug===link)).toBe(true);}for(const [slug,links] of Object.entries(additionalGuideTools)){expect(guides.some(g=>g.slug===slug),slug).toBe(true);for(const link of links)expect(tools.some(t=>t.slug===link)).toBe(true);}});
});
