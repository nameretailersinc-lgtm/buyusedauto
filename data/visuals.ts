import type {ToolId} from "./tools";
export const toolImages:Record<ToolId,string>={loan:"mountain-suv",depreciation:"coastal-sedan",value:"car-keys",ownership:"fuel-stop",affordability:"coastal-sedan",fuel:"fuel-stop",trade:"car-keys",lease:"coastal-sedan",inspection:"inspection-workshop",negotiation:"guide-negotiation",tax:"guide-financing"};
export const guideImages:Record<string,string>={"international-used-car-buying-checks":"guide-inspection","how-to-inspect-a-used-car":"inspection-workshop","how-to-check-a-cars-history":"guide-inspection","how-to-negotiate-a-used-car-price":"guide-negotiation","real-cost-of-car-ownership":"fuel-stop","how-to-compare-used-car-loans":"guide-financing","trade-in-vs-private-sale":"car-keys"};
export const guideImageAlt:Record<string,string>={
  "international-used-car-buying-checks":"Illustration of a magnifying glass held beside a car headlight.",
  "how-to-inspect-a-used-car":"Illustration of a white car with its hood open for a workshop inspection.",
  "how-to-check-a-cars-history":"Illustration of a magnifying glass held beside a car's headlight.",
  "how-to-negotiate-a-used-car-price":"Illustration of a handshake beside a parked car.",
  "real-cost-of-car-ownership":"Illustration of a station wagon refueling at a roadside station.",
  "how-to-compare-used-car-loans":"Illustration of a calculator, paperwork, pen and car key on a desk.",
  "trade-in-vs-private-sale":"Illustration of car keys being handed over beside a parked sedan.",
};
export const categoryCopy={
  Buying:{icon:"check",image:"inspection-workshop",title:"Buy with your eyes open.",description:"Inspect the car, understand its history, and build an offer you can explain."},
  Financing:{icon:"calculator",image:"coastal-sedan",title:"Look beyond the monthly payment.",description:"Understand the loan, check your budget, and compare the full cost of borrowing."},
  Ownership:{icon:"wallet",image:"fuel-stop",title:"Plan for the miles ahead.",description:"Make room for fuel, maintenance, insurance, and the value a car may lose."},
  Selling:{icon:"arrows",image:"car-keys",title:"Know your options before the handover.",description:"Compare a trade-in with a private sale and focus on the proceeds you keep."},
};

export const toolImageAlt:Record<ToolId,string>={loan:"SUV parked beside a mountain road",depreciation:"Sedan parked at a coastal overlook",value:"Car keys being handed over beside a parked sedan",ownership:"Station wagon refueling at a roadside station",affordability:"Sedan parked at a coastal overlook",fuel:"Station wagon refueling at a roadside station",trade:"Car keys being handed over beside a parked sedan",lease:"Sedan parked at a coastal overlook",inspection:"Car with its hood raised for a workshop inspection",negotiation:"Handshake beside a parked car",tax:"Calculator, paperwork, pen and car key on a desk"};
