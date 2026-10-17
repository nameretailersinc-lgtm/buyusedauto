import {valid,cents} from "./index";
export type RunningCostInput={distance:number;efficiency:number;fuelPrice:number;insurance:number;maintenance:number;fees:number;other:number;purchase:number;resale:number;years:number;interest:number};
export function countryRunningCost(input:RunningCostInput,economy:"km/l"|"l/100km"|"imperial mpg"){
  for(const [key,value] of Object.entries(input))valid(value,key,0,100000000);
  valid(input.efficiency,"Fuel economy",0.1,1000);valid(input.years,"Ownership years",1,30);
  if(!Number.isInteger(input.years))throw Error("Ownership years must be a whole number.");
  if(input.resale>input.purchase)throw Error("Expected resale must not exceed purchase price in this depreciation model.");
  if(!["km/l","l/100km","imperial mpg"].includes(economy))throw Error("Choose a supported economy unit.");
  const litres=economy==="km/l"?input.distance/input.efficiency:economy==="imperial mpg"?input.distance/input.efficiency*4.54609:input.distance*input.efficiency/100;
  const fuel=litres*input.fuelPrice;
  const operating=fuel+input.insurance+input.maintenance+input.fees+input.other;
  const depreciation=(input.purchase-input.resale)/input.years;
  const annual=operating+depreciation+input.interest/input.years;
  return {litres:cents(litres),fuel:cents(fuel),operating:cents(operating),depreciation:cents(depreciation),annual:cents(annual),monthly:cents(annual/12),period:cents(annual*input.years),perDistance:input.distance?annual/input.distance:null};
}
