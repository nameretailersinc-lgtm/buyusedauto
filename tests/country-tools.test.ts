import {describe,it,expect} from "vitest";
import {countryRunningCost,type RunningCostInput} from "../lib/calculators/country-running-cost";
import {countryTools,countryToolPath} from "../data/country-tools";
import {routeGroups} from "../lib/routes";
const input:RunningCostInput={distance:12000,efficiency:12,fuelPrice:3,insurance:600,maintenance:400,fees:100,other:100,purchase:20000,resale:14000,years:3,interest:900};
describe("localized running cost tools",()=>{
  it("separates economic cost from operating cash and principal repayments",()=>{const result=countryRunningCost(input,"km/l");expect(result.litres).toBe(1000);expect(result.fuel).toBe(3000);expect(result.operating).toBe(4200);expect(result.depreciation).toBe(2000);expect(result.annual).toBe(6500);expect(result.period).toBe(19500);expect(result.monthly).toBe(541.67);});
  it("converts imperial gallons rather than US gallons",()=>{expect(countryRunningCost({...input,distance:100,efficiency:50},"imperial mpg").litres).toBe(9.09);});
  it("calculates litres per 100 kilometres",()=>{expect(countryRunningCost({...input,efficiency:8},"l/100km").litres).toBe(960);});
  it("handles zero driving and zero costs without NaN",()=>{const result=countryRunningCost({...input,distance:0,purchase:0,resale:0,interest:0,fuelPrice:0,insurance:0,maintenance:0,fees:0,other:0},"km/l");expect(result.annual).toBe(0);expect(result.perDistance).toBeNull();});
  it("rejects invalid and unsupported assumptions",()=>{for(const patch of [{efficiency:0},{years:0},{years:1.5},{distance:-1},{fuelPrice:NaN},{insurance:Infinity},{resale:20001}])expect(()=>countryRunningCost({...input,...patch},"km/l")).toThrow();});
  it("lists every dedicated tool in the sitemap route group",()=>{expect(new Set(countryTools.map(market=>countryToolPath(market.country))).size).toBe(countryTools.length);for(const market of countryTools)expect(routeGroups.tools).toContain(countryToolPath(market.country));});
});
