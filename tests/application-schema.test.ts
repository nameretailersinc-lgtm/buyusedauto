import {describe,it,expect} from "vitest";
import {hasFreeApplicationOffer} from "../scripts/application-schema-policy.mjs";

describe("free calculator schema by market",()=>{
  it.each([
    ["/car-loan-calculator","USD"],
    ["/pk/car-financing-calculator","PKR"],
    ["/tools/pakistan/car-running-cost-calculator","PKR"],
    ["/tools/uae/car-running-cost-calculator","AED"],
    ["/tools/uk/car-running-cost-calculator","GBP"],
    ["/tools/germany/car-running-cost-calculator","EUR"],
  ])("accepts numeric or string zero in the correct currency for %s",(path,currency)=>{
    for(const price of [0,"0"])expect(hasFreeApplicationOffer({offers:{price,priceCurrency:currency}},path)).toBe(true);
    expect(hasFreeApplicationOffer({offers:{price:0,priceCurrency:"INVALID"}},path)).toBe(false);
  });
  it("rejects missing, coerced or paid offers",()=>{
    for(const offer of [undefined,{}, {price:null,priceCurrency:"USD"},{price:"",priceCurrency:"USD"},{price:false,priceCurrency:"USD"},{price:1,priceCurrency:"USD"}]){
      expect(hasFreeApplicationOffer({offers:offer},"/car-loan-calculator")).toBe(false);
    }
  });
});
