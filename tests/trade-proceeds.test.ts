import {describe,it,expect} from "vitest";
import {tradeProceeds,parseTradeAmount} from "../lib/calculators/trade-proceeds";
import {money} from "../lib/site";
const input={offers:[10000,10500,11000],payoff:12000,dealerFees:100,privatePrice:13000,privateFees:500};
describe("entered trade offers and sale proceeds",()=>{
  it("keeps negative equity separate from fees and compares the best dealer",()=>{const r=tradeProceeds(input);expect(r.dealers[0]).toEqual({price:10000,fees:100,equity:-2000,net:-2100,shortfall:2100});expect(r.privateSale.net).toBe(500);expect(r.privateAdvantage).toBe(1600);});
  it("handles no loan, zero values and exact payoff",()=>{expect(tradeProceeds({...input,payoff:0}).dealers[0].net).toBe(9900);expect(tradeProceeds({...input,offers:[12000],dealerFees:0}).dealers[0].shortfall).toBe(0);expect(tradeProceeds({offers:[0],payoff:0,dealerFees:0,privatePrice:0,privateFees:0}).privateAdvantage).toBe(0);});
  it("accepts cents and bounded extreme amounts without dropping shortfalls",()=>{expect(tradeProceeds({...input,offers:[100.01],payoff:100,dealerFees:0}).dealers[0].net).toBe(.01);expect(tradeProceeds({...input,offers:[0],payoff:100000000,dealerFees:100000000}).dealers[0].shortfall).toBe(200000000);});
  it("rejects invalid values and missing offers",()=>{for(const offers of [[],[1,2,3,4],[NaN],[-1],[Infinity],[100000001],[.001]])expect(()=>tradeProceeds({...input,offers})).toThrow();for(const payoff of [NaN,Infinity,-1])expect(()=>tradeProceeds({...input,payoff})).toThrow();});
  it("distinguishes empty, malformed and zero input",()=>{expect(parseTradeAmount("0")).toBe(0);expect(parseTradeAmount(" 12.34 ")).toBe(12.34);for(const value of [""," ","-1","1e6","0x10","1,000","12.345","Infinity"])expect(()=>parseTradeAmount(value)).toThrow();});
  it("formats positive and negative proceeds explicitly in USD",()=>{expect(money(1234.5,2)).toBe("$1,234.50");expect(money(-2000,2)).toBe("-$2,000.00");});
});
