import type {ToolId} from "./tools";
const newGuideVisuals = {
  "how-much-car-payment-can-i-afford": ["guide-financing", "Illustration of a calculator, paperwork, pen and car key on a desk."],
  "car-depreciation-chart": ["coastal-sedan", "Illustration of a sedan parked at a coastal overlook."],
  "how-much-does-a-used-car-depreciate-per-year": ["coastal-sedan", "Illustration of a sedan parked at a coastal overlook."],
  "how-to-calculate-percentage-increase": ["guide-financing", "Illustration of a calculator, paperwork, pen and car key on a desk."],
  "how-much-down-payment-for-used-car": ["guide-financing", "Illustration of a calculator, paperwork, pen and car key on a desk."],
  "how-to-buy-a-used-car-from-a-private-seller": ["car-keys", "Illustration of car keys being handed over beside a parked sedan."],
  "conventional-vs-islamic-car-finance": ["guide-financing", "Calculator and vehicle finance paperwork on a desk."],
  "used-car-financing-quote-checklist": ["guide-country-pakistan", "Buyer and mechanic inspecting a used car in Pakistan."],
  "buy-used-car-pakistan": ["guide-country-pakistan", "Buyer and mechanic inspecting a compact sedan on a Lahore forecourt."],
  "buy-used-car-uae": ["guide-country-uae", "Buyer inspecting a used SUV on a Dubai forecourt."],
  "buy-used-car-usa": ["guide-country-usa", "Buyer examining a used sedan at an American dealership."],
  "buy-used-car-uk": ["guide-country-uk", "Buyer and mechanic inspecting a hatchback outside a British garage."],
  "buy-used-car-europe": ["guide-country-europe", "Buyer inspecting a compact hatchback at a European garage."],
  "complete-used-car-buying-guide": ["guide-first-time-checklist", "Buyer using a clipboard to inspect the exterior of a parked used car."],
  "best-time-to-buy-a-used-car": ["guide-best-time", "Buyer comparing used cars on a dealership forecourt in autumn."],
  "how-many-miles-is-too-many-for-a-used-car": ["guide-mileage", "Odometer and dashboard inside a well-maintained used car."],
  "used-car-buying-checklist-first-time-buyers": ["guide-first-time-checklist", "First-time buyer inspecting a parked sedan with a clipboard."],
  "used-car-vs-new-car": ["guide-used-vs-new", "An older sedan and a modern sedan parked side by side."],
  "how-to-avoid-used-car-scams": ["guide-scams", "Buyer checking vehicle identification against paperwork."],
  "used-car-maintenance-costs": ["guide-maintenance-costs", "Mechanic inspecting a used car in a workshop with service tools nearby."],
};
export const toolImages:Record<ToolId,string>={maintenance:"inspection-workshop",mile:"fuel-stop",gasEv:"coastal-sedan",apr:"guide-financing",repair:"inspection-workshop",registration:"car-keys",payoff:"guide-financing",refinance:"guide-financing",down:"coastal-sedan",ev:"fuel-stop",loan:"mountain-suv",depreciation:"coastal-sedan",value:"car-keys",ownership:"fuel-stop",affordability:"coastal-sedan",fuel:"fuel-stop",trade:"car-keys",lease:"coastal-sedan",inspection:"inspection-workshop",negotiation:"guide-negotiation",tax:"guide-financing"};
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
for (const [slug, [image, alt]] of Object.entries(newGuideVisuals)) {
  guideImages[slug] = image;
  guideImageAlt[slug] = alt;
}
export const categoryCopy={
  "Mathematics / Calculators":{icon:"calculator",image:"guide-financing",title:"Understand the numbers.",description:"Learn calculation methods with clear formulas, worked examples, and spreadsheet instructions."},
  Buying:{icon:"check",image:"inspection-workshop",title:"Buy with your eyes open.",description:"Inspect the car, understand its history, and build an offer you can explain."},
  Financing:{icon:"calculator",image:"coastal-sedan",title:"Look beyond the monthly payment.",description:"Understand the loan, check your budget, and compare the full cost of borrowing."},
  Ownership:{icon:"wallet",image:"fuel-stop",title:"Plan for the miles ahead.",description:"Make room for fuel, maintenance, insurance, and the value a car may lose."},
  Selling:{icon:"arrows",image:"car-keys",title:"Know your options before the handover.",description:"Compare a trade-in with a private sale and focus on the proceeds you keep."},
};

export const toolImageAlt:Record<ToolId,string>={maintenance:"Car in a workshop for maintenance",mile:"Car at a roadside fuel station",gasEv:"Sedan parked at a coastal overlook",apr:"Calculator and car finance paperwork on a desk",repair:"Car with its hood raised in a workshop",registration:"Car keys and documents at a vehicle handover",payoff:"Calculator and car finance paperwork on a desk",refinance:"Calculator and car finance paperwork on a desk",down:"Sedan parked at a coastal overlook",ev:"Station wagon beside a roadside service station",loan:"SUV parked beside a mountain road",depreciation:"Sedan parked at a coastal overlook",value:"Car keys being handed over beside a parked sedan",ownership:"Station wagon refueling at a roadside station",affordability:"Sedan parked at a coastal overlook",fuel:"Station wagon refueling at a roadside station",trade:"Car keys being handed over beside a parked sedan",lease:"Sedan parked at a coastal overlook",inspection:"Car with its hood raised for a workshop inspection",negotiation:"Handshake beside a parked car",tax:"Calculator, paperwork, pen and car key on a desk"};
