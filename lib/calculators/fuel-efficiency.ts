import {valid} from "./index";

export function measuredFuelEconomy(distance:number,quantity:number,units:"us"|"metric"){
  valid(distance,"Measured distance",.000001);valid(quantity,"Fuel used",.000001);
  if(!["us","metric"].includes(units))throw Error("Choose US or metric measurement units.");
  const km=distance*(units==="us"?1.609344:1);
  const liters=quantity*(units==="us"?3.785411784:1);
  return {mpg:km/1.609344/(liters/3.785411784),kmPerLiter:km/liters,litersPer100Km:100*liters/km};
}
