import {monthlyInterestExample,loanTermExample,loanTermDifference} from "./finance-examples";
import {internationalGuide} from "./international-guide";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: {title: string; url: string}[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: 'Buying' | 'Financing' | 'Ownership' | 'Selling';
  intro: string;
  readingMinutes: number;
  updated?: string;
  sections: GuideSection[];
  sources: { title: string; url: string }[];
  relatedTools: string[];
  reviewedOn?: string;
  language?: string;
};

export const guides: Guide[] = [
  {
    slug: 'how-to-inspect-a-used-car',
    updated: '2026-10-16',
    reviewedOn: '2026-10-16',
    title: 'How to inspect a used car before you buy',
    description: 'Inspect a used car with a practical sequence for documents, condition, a test drive, and an independent mechanic. Turn findings into a buying decision.',
    category: 'Buying',
    intro: 'Inspect a used car in three stages: check its identity and records, observe its condition and behavior, then pay an independent mechanic to investigate anything you cannot verify. A checklist organizes evidence; it does not certify safety. Agree on inspection access before paying a deposit or committing to the purchase.',
    readingMinutes: 7,
    sections: [
      {
        heading: '1. Questions to ask a private seller before the appointment',
        links: [{title: 'FTC: arranging an independent inspection', url: 'https://consumer.ftc.gov/articles/buying-used-car-dealer'}],
        bullets: ['How long have you owned the car, and why are you selling?', 'Is the title in your name, and is there outstanding finance?', 'What accident, flood or other damage do you know about?', 'Which repairs and scheduled services have invoices?', 'May my independent mechanic inspect it before I commit?', 'Which faults, warning lights or intermittent symptoms should I investigate?'],
        paragraphs: [
          'Ask for the VIN, current mileage, service records, title status, and permission for an independent inspection before you travel. Confirm which shop will inspect the car, who pays, and how it will get there. Choose a shop familiar with that powertrain. A general inspection may need a separate specialist for a high-voltage battery, modified vehicle, or suspected structural repair.',
          'Schedule daylight and enough time to look without rushing. Ask the seller to leave the engine cold if practical; a pre-warmed engine changes what you can observe at startup. Bring a flashlight, a phone for permitted photos, and your written questions. Avoid inspecting on a roadside or crawling beneath an unsupported vehicle. You do not need to perform repairs to be a careful buyer.',
          'For a dealer purchase, the FTC suggests a mobile mechanic or asking the dealer to take the car to your chosen facility if off-site access is restricted. If independent inspection is refused altogether, consider another dealer. Agree on access before paying for a report or traveling.',
          'Set a simple boundary in advance: an unexplained identity discrepancy, refusal of a reasonable inspection, or unresolved safety concern means you pause. That boundary is easier to maintain before you have spent hours negotiating or become attached to a particular color.'
        ]
      },
      {
        heading: '2. Match the car to the paperwork',
        links: [{title: 'FTC: dealer Buyers Guide and written promises', url: 'https://consumer.ftc.gov/articles/buying-used-car-dealer'}],
        paragraphs: [
          'Read the VIN on the vehicle and compare it with the title, listing, service invoices, and history report. Record the mileage you actually see. A dealer stock number is not a substitute for a VIN. Ask the seller to explain mismatches and verify the explanation through the issuing organization before proceeding.',
          'For a dealer sale, read the Buyers Guide. The FTC explains that this document identifies warranty coverage or an as-is sale and that an independent mechanical inspection remains useful even when the car is described as certified. Get any promised repairs in writing. A sales conversation and a completed repair invoice are different kinds of evidence.',
          'Create a short missing-information list: a second key, a recent maintenance invoice, proof that a lien can be released, or the terms of a service contract. A missing service receipt does not prove neglect, but it leaves uncertainty. Price and plan around what you can verify instead of assuming every undocumented job was done.'
        ]
      },
      {
        heading: '3. Walk around, then inspect the cabin',
        links: [{title: 'FTC: flood-damage clues and mechanic checks', url: 'https://consumer.ftc.gov/consumer-alerts/2018/10/dont-get-swamped-buying-flood-damaged-car'}],
        paragraphs: [
          'View the body from several angles and compare adjacent panels. Note inconsistent paint, uneven gaps, cracked lamps, damaged glass, and visible corrosion. These observations are prompts for the mechanic, not a remote diagnosis of a crash. Open doors, the trunk, and the hood with the seller present. Check that latches and the features you will use operate consistently.',
          'The FTC identifies water staining, silt, unusual odors, and moisture in lights as possible flood clues. Record clusters of clues rather than treating one smell as proof. A heavily cleaned interior cannot establish whether hidden wiring or restraint components were exposed to water. Suspected flood damage warrants a specialist assessment, and walking away is reasonable when the history remains unclear.',
          'Try the seat adjustments, seat belts, windows, locks, lights, heating, air conditioning, and rear visibility. Fit your normal passengers or child seat if possible. An uncomfortable driving position is a purchase problem even when the car is mechanically sound. Photograph findings with permission so you can distinguish this vehicle from the next one you see.'
        ]
      },
      {
        heading: '4. How to check a used car engine before buying',
        links: [{title: 'NHTSA TireWise: tire pressure, tread and aging', url: 'https://www.nhtsa.gov/vehicle-safety/tires'}],
        paragraphs: [
          'With permission, observe a cold start from a safe position and note warning lights, persistent smoke, unusual noises and visible leaks for the mechanic. Keep clear of hot or moving components; never open a hot coolant cap. Ask the shop to assess the engine and cooling system rather than treating a quiet idle as proof of condition.',
          'A visible tire check can reveal cuts, bulges, or uneven wear, but ask the shop to measure tread and assess tire condition and age. Check the vehicle placard for specified sizes and pressure rather than using a tire sidewall maximum as the operating target. NHTSA emphasizes that maintenance and tire condition matter to safety.',
          'Ask the inspector to document brake condition, leaks, suspension wear, corrosion, cooling-system concerns, and signs of previous repair. Request a scan and an explanation of any diagnostic findings. A code identifies a system or condition to investigate; it is not automatically a quote for a particular replacement part. Recent code clearing or incomplete readiness information also needs context.',
          'For a hybrid or EV, ask exactly what battery assessment the inspection includes and what it cannot establish. A dashboard range estimate is not a battery health certificate. Never open high-voltage components yourself. Obtain model-specific professional advice when range, charging behavior, or battery history is central to your decision.'
        ]
      },
      {
        heading: '5. Take a normal, lawful test drive',
        links: [{title: 'NHTSA: VIN recall lookup and coverage limits', url: 'https://www.nhtsa.gov/recalls'}],
        paragraphs: [
          'Agree on a route that includes the kind of driving you do, subject to insurance arrangements and local rules. Start with normal controls: startup behavior, warning lights, steering feel, visibility, and parking. Then observe acceleration, gear changes, braking, vibration, and noises at legal speeds. Keep your attention on driving and have a passenger take notes if needed.',
          'Do not provoke a skid, disable safety equipment, or attempt an emergency maneuver to test the car. Stop if you observe a serious warning, smoke, overheating, or braking problem. Describe symptoms precisely to the mechanic: a vibration at a certain speed is more useful than saying the car feels bad.',
          'Check the VIN through NHTSA recalls and read any manufacturer interim instructions. An open recall needs a repair plan; a zero-result search does not establish overall mechanical safety. Ask the manufacturer about a recall that appears in other records but not in the lookup.'
        ]
      },
      {
        heading: '6. Turn findings into a repair budget',
        paragraphs: [
          'Have the inspector separate immediate safety work, scheduled maintenance, comfort repairs, and items to monitor. Ask for a written report identifying the make, model and VIN, with repair estimates. Clarify labor, parts, uncertainty and anything the inspector could not check. A possible transmission problem with no diagnosis should not be converted into a confident small discount. Decide whether the uncertainty itself exceeds what you can take on.',
          'For an illustrative purchase, assume the vehicle costs $15,500 and the inspection identifies $650 of tires and $450 of brake work. Your initial outlay becomes $16,600 before tax, registration, inspection fees, and other costs. If you also want a $1,000 repair reserve, you need access to $17,600 plus those other charges. These are example amounts, not typical repair prices.',
          'Use the inspection checklist to preserve findings and the negotiation calculator to explore an offer. Do not subtract the same defect twice if your comparison price already reflects that condition. A negotiated discount only helps when you can fund and arrange the actual repair.'
        ]
      },
      {
        heading: '7. Save your used car inspection checklist and evidence',
        paragraphs: [
          'There is no universal mileage cutoff that this checklist can certify. Compare the odometer with service records, the maintenance schedule for the exact engine and transmission, and the inspection findings. Ask which scheduled jobs are due and price those jobs before deciding whether a high-mileage car fits your budget.',
          'Compare the inspected vehicle with your alternatives using total cost, suitability, and unresolved risk. Keep the inspection report, quote, warranty terms, and promised-work agreement together. Before collection, confirm promised work was completed and inspect the car again for changes in condition or mileage.',
          'A checklist with every box marked does not predict the next failure or replace a professional assessment. Its value is that it makes unanswered questions visible. Use the ownership calculator to add insurance, fuel, maintenance, and financing before deciding that the purchase price fits your budget.',
          'For a printable used car inspection checklist, open our checklist tool and choose Print / save PDF. Save a blank copy before the visit or mark your observations and save the resulting report. The PDF contains your recorded notes, not an inspection certificate. Keep the independent mechanic’s report alongside it.',
          'If you decline the car, save the useful lessons and move on. The money spent on an inspection can still have served its purpose by identifying a purchase that does not match your needs.'
        ]
      }
    ],
    sources: [
      { title: 'FTC: Buying a used car from a dealer', url: 'https://consumer.ftc.gov/articles/buying-used-car-dealer' },
      { title: 'FTC: Flood-damaged car warning signs', url: 'https://consumer.ftc.gov/consumer-alerts/2018/10/dont-get-swamped-buying-flood-damaged-car' },
      { title: 'NHTSA: Check for recalls and lookup limitations', url: 'https://www.nhtsa.gov/recalls' },
      { title: 'NHTSA TireWise: pressure, tread, sizing and aging', url: 'https://www.nhtsa.gov/vehicle-safety/tires' }
    ],
    relatedTools: ['used-car-inspection-checklist', 'used-car-price-negotiation-calculator', 'total-cost-of-ownership-calculator']
  },
  {
    slug: 'how-to-check-a-cars-history',
    updated: '2026-10-16',
    reviewedOn: '2026-10-16',
    title: 'How to check a car’s history before buying',
    description: 'Build a useful vehicle history check from VIN matching, title records, recall searches, mileage evidence, and an inspection. Learn what reports cannot prove.',
    category: 'Buying',
    intro: 'Check a car’s history by combining its VIN, title records, reported events, service documents, and present condition. Each source answers a different question. No report proves that a vehicle has never been damaged, and a clean-looking title does not establish that its mechanical condition is good.',
    readingMinutes: 7,
    sections: [
      {
        heading: '1. Start with the identity of the actual vehicle',
        paragraphs: [
          'Get the VIN before arranging a visit. At the vehicle, compare the VIN with the title, registration information offered by the seller, invoices, and the report you obtained. A useful record belongs to that particular car, not simply the same model and year. Ask for clear document images where appropriate while respecting the seller’s personal information.',
          'Confirm that the seller can explain who owns the car and how ownership will transfer. If a lender holds the title or a lien appears, contact the lender through an independently obtained official channel to understand the payoff and release process. Do not accept a verbal promise that paperwork will arrive after you pay as a substitute for a workable transfer arrangement.',
          'Treat an altered identifier, inconsistent document, or seller who cannot establish authority to sell as a reason to stop and verify. Even an excellent mechanical inspection cannot resolve an ownership problem. Your state motor-vehicle agency is the appropriate place to clarify title requirements for your transaction.'
        ]
      },
      {
        heading: '2. Understand what title-history data contains',
        links: [{title: 'DOJ: NMVTIS consumer information and state title records', url: 'https://vehiclehistory.bja.ojp.gov/nmvtis_consumers'}],
        paragraphs: [
          'The Department of Justice describes NMVTIS as a source of title, brand, odometer, and certain salvage or total-loss information. Access consumer reports through an approved provider linked from the official NMVTIS site. A brand is a designation applied to a vehicle’s record; terms and thresholds vary by state.',
          'Read the event dates and reporting sources rather than only a report’s opening summary. Identify where a title was issued, whether a brand appears, and what the latest reported odometer reading represents. An interstate move may be ordinary relocation, so ask for context instead of treating every state change as misconduct.',
          'A report is bounded by the records it receives and their timing. It is not a comprehensive mechanical service log. When information is missing or contradictory, write down the precise question: which agency issued this brand, which document supports its correction, or why does this event predate the seller’s stated ownership? Specific questions are easier to verify than a general reassurance that everything is fine.'
        ]
      },
      {
        heading: '3. Free VIN checks: theft records and open recalls',
        bullets: [
          'NICB VINCheck: a free check of participating insurers, not a full accident history or a law-enforcement search.',
          'NHTSA VIN lookup: open safety recalls for a specific vehicle, not a list of every repair or non-safety service campaign.',
          'NMVTIS consumer reports: title brands and reported odometer, salvage and total-loss information through approved providers; check the provider for its price.'
        ],
        links: [
          {title: 'NICB: run VINCheck and read its limitations', url: 'https://www.nicb.org/vincheck'},
          {title: 'NHTSA: check a VIN for unrepaired safety recalls', url: 'https://www.nhtsa.gov/recalls'}
        ],
        paragraphs: [
          'NICB VINCheck searches participating insurers’ records for certain unrecovered theft and salvage or flood reports. NICB explicitly says it is not a comprehensive history report and does not query law-enforcement records. Use it as an additional signal. An empty result means no matching information was returned from that source, not that every possible record is clean.',
          'Separately, NHTSA’s VIN lookup helps identify unrepaired safety recalls. It excludes completed recall repairs, some newly announced recalls, non-safety service campaigns and international vehicles. Recalls more than 15 years old are generally excluded unless a manufacturer provides additional coverage. Ask a manufacturer dealer about a discrepancy and keep any repair confirmation.',
          'Do these checks using the VIN you verified on the car. A screenshot supplied by a seller can be stale or refer to a different identifier. Save your results with the date you searched so you know when to recheck. For a vehicle you buy, follow manufacturer instructions and keep recall contact details current.'
        ]
      },
      {
        heading: '4. How much mileage is too much for a used car?',
        links: [{title: 'NHTSA: compare odometer, title and maintenance records', url: 'https://www.nhtsa.gov/vehicle-safety/odometer-fraud'}],
        paragraphs: [
          'There is no universal mileage cutoff that establishes whether a used car is a good purchase. Compare documented maintenance, age, driving use, upcoming scheduled work and an independent inspection. A lower odometer reading does not replace that evidence. Use the exact model maintenance schedule and written repair estimates to compare two candidates at the same total budget.',
          'Create a list with date, mileage, source, and notes for each available record. NHTSA recommends comparing the displayed odometer with title and maintenance records and considering whether physical wear fits the mileage. Wear is a clue, not a precise measuring device: a replacement seat or a heavily used city car can complicate the picture.',
          'Suppose a hypothetical car shows 41,200 miles in a service record, 48,900 at inspection, and 47,300 in a later listing. The sequence needs explanation. A typing mistake is possible, but so are more serious problems. Ask the record provider or seller for the underlying document and a documented correction; do not quietly remove the inconvenient entry from your comparison.',
          'Record units as well as numbers. An imported or cross-border vehicle may have kilometer-based records, and a replaced instrument cluster needs documentation. Do not infer fraud solely from an apparent decline before examining units and original records. If the discrepancy remains unresolved, regard the stated mileage and valuation as uncertain.'
        ]
      },
      {
        heading: '5. Read damage and maintenance records as questions',
        paragraphs: [
          'An accident entry rarely tells you everything about repair quality. Ask what was damaged, who repaired it, whether invoices and photographs exist, and whether an independent inspector can assess the work. A cosmetic repair and a structural repair create different questions, but a short database label may not distinguish them reliably.',
          'Missing accident records do not rule out an unreported repair. Likewise, a service history gap does not prove the oil was never changed. Separate positive evidence from absence of evidence. If you need proof that a major scheduled service was completed, an itemized invoice with a matching VIN or other clear vehicle identifier is more useful than a general service-event label.',
          'Use the manufacturer’s maintenance schedule for the exact vehicle to identify upcoming work. Ask a suitable mechanic to evaluate suspected water damage, structural repairs, and restraint-system concerns. A history report helps direct that inspection; it does not perform it. Avoid assigning a universal percentage discount to every accident or title brand.'
        ]
      },
      {
        heading: '6. Build a small evidence file before negotiating',
        paragraphs: [
          'Put the listing, VIN photo, report, recall results, inspection findings, and seller answers in one folder. Label each unresolved point and the action needed to close it. For example: missing maintenance invoice means obtain a receipt or budget the service; ambiguous lien status means confirm release with the lender before payment.',
          'Consider a hypothetical car advertised at $14,000 with a documented $900 service due. If a comparable car at $14,600 has that same service verified, the cheaper listing could cost more immediately: $14,900 versus $14,600 before other charges. This comparison assumes equal condition elsewhere and uses invented scenario amounts, not a valuation of either car.',
          'The negotiation calculator can organize documented adjustments, while the inspection checklist keeps the unresolved questions visible. A model-based value estimate cannot price an unknown structural defect. Until you understand the defect, its uncertainty may matter more than the advertised discount.'
        ]
      },
      {
        heading: '7. Decide which uncertainties you can accept',
        paragraphs: [
          'The right endpoint is not a report with a reassuring color. It is a purchase you understand well enough to make: transferable ownership, a coherent mileage history, manageable condition, and a price reflecting the evidence. Some uncertainty is unavoidable, but it should be explicit in your decision.',
          'Pause when identity, title authority, or a material safety concern cannot be resolved. Ask your insurer and prospective lender about any branded-title restrictions before assuming you can insure or finance a car. Requirements and offers differ, so use written answers for the actual VIN.',
          'Keep records after purchase. They help you follow up on repairs and explain the car’s history when you eventually sell. This guide provides a research workflow, not a title opinion or a guarantee against hidden defects; state agencies and qualified inspectors handle the questions that require their authority or expertise.'
        ]
      }
    ],
    sources: [
      { title: 'U.S. Department of Justice: NMVTIS consumer information', url: 'https://vehiclehistory.bja.ojp.gov/nmvtis_consumers' },
      { title: 'NICB: VINCheck coverage and limitations', url: 'https://www.nicb.org/vincheck' },
      { title: 'NHTSA: Recall lookup coverage', url: 'https://www.nhtsa.gov/recalls' },
      { title: 'NHTSA: Protecting against odometer fraud', url: 'https://www.nhtsa.gov/vehicle-safety/odometer-fraud' }
    ],
    relatedTools: ['used-car-inspection-checklist', 'used-car-price-negotiation-calculator', 'what-is-my-car-worth']
  },
  {
    slug: 'how-to-negotiate-a-used-car-price',
    title: 'How to negotiate a used-car price with evidence',
    description: 'Negotiate a used-car price using comparable listings, inspection findings, an itemized purchase quote, and a firm budget. Work through a realistic example.',
    category: 'Buying',
    intro: 'Negotiate from a written total purchase price, comparable vehicles, and documented condition. Keep the car price, trade-in, and financing figures visible so changes are easy to track. Set your maximum before the conversation, then decide whether the complete deal meets it rather than chasing a particular discount.',
    readingMinutes: 7,
    sections: [
      {
        heading: '1. Set the limit you will actually honor',
        paragraphs: [
          'Begin with how much cash you can commit and what monthly ownership costs your household can support. Include insurance, parking, fuel, maintenance, and a repair reserve. If you will borrow, obtain actual financing terms when available. An illustrative rate in a calculator is not an approval or an offer you can demand from a lender.',
          'Write two limits: a total purchase ceiling and a comfortable ongoing budget. A car can satisfy the first and fail the second. For example, an affordable purchase may have expensive insurance for your household or unusually costly tires. Replace estimates with vehicle-specific quotes before deciding that the numbers fit.',
          'Keep your maximum private if that helps you negotiate, but be honest about factual claims. You do not need to invent another offer or misstate a defect. Your strongest alternative is a real vehicle you could buy, or the ability to wait. If waiting has costs, such as a rental, include them in your own decision.'
        ]
      },
      {
        heading: '2. Compare vehicles that are actually comparable',
        paragraphs: [
          'Collect several recent listings for the same generation, trim, powertrain, approximate mileage, title status, and region. Record the asking price and mandatory charges shown. A low number can be tied to financing, a conditional discount, or a different specification. Confirm availability before treating a listing as a genuine alternative.',
          'Asking prices are evidence of seller expectations, not confirmed transaction prices. A model-based estimator is another reference point, not live market research. Make the uncertainty visible: write a range and explain why one vehicle might sit near either end. A well-documented car and one needing immediate work should not be treated as interchangeable.',
          'Avoid mechanically averaging unrelated listings. If only two close matches exist, say the evidence is limited and widen your search cautiously. Consider travel, independent inspection, shipping, and registration complications when comparing distant vehicles. A lower advertised price across the country may not produce a lower usable purchase cost.'
        ]
      },
      {
        heading: '3. Ask for one itemized purchase quote',
        paragraphs: [
          'Request a written out-the-door quote for the actual VIN before discussing a monthly payment. The FTC recommends written total-price quotes when buying from dealers. Ask for the vehicle price, each dealer charge, taxes, title or registration charges, and every optional product. State which products you do not want so the quote can be revised clearly.',
          'Distinguish government charges from dealer charges, and verify unfamiliar items. Whether a particular fee is regulated or taxable depends on the jurisdiction; a label alone does not settle it. If a fee cannot be changed, you can still decide whether the total deal is competitive. Use a tax estimate as a planning input, then obtain the applicable official calculation.',
          'For a private sale, identify your own transfer, inspection, travel, and financing costs. The seller’s agreed price is not the complete amount required to put the vehicle on the road. Keep these additional costs on your worksheet even when they are paid to somebody other than the seller.'
        ]
      },
      {
        heading: '4. Turn inspection evidence into an offer',
        paragraphs: [
          'Use a written inspection to separate known repair needs from speculation. Get an estimate for necessary work, then compare the vehicle with examples in similar condition. Do not subtract the full cost of a repair from a comparison price that already assumes that repair is needed. Also consider whether you want to manage the work at all.',
          'Imagine close comparisons suggest a $16,500 asking-price reference. This car needs a quoted $700 tire replacement and $300 service that those comparisons do not need. A $15,500 condition-adjusted reference follows from those assumptions. An opening offer of $15,200 leaves a $300 negotiation margin, but neither number guarantees acceptance or proves the car’s market value.',
          'Explain the offer briefly: identify the comparisons, attach the relevant estimate, and specify what is included. Ask for an itemized response. Avoid an arbitrary percentage reduction presented as a universal rule. A fairly priced vehicle may offer little room; a substantially overpriced one may need a larger adjustment than your example suggests.'
        ]
      },
      {
        heading: '5. Evaluate the whole counteroffer',
        paragraphs: [
          'A lower vehicle price can be offset by another charge, a smaller trade-in allowance, or a different finance arrangement. Compare the new worksheet against the previous version line by line. Track the sale of your current vehicle separately so you can see what the dealer is paying for it and how much debt must be settled.',
          'Using hypothetical figures, offer A has a $15,500 vehicle price, $450 in dealer charges, and $1,150 in estimated government charges: $17,100 total. Offer B has a $15,200 vehicle price, $850 in dealer charges, and the same assumed $1,150: $17,200 total. The smaller headline price is $100 more expensive in this example. Actual taxes may change with taxable fees.',
          'If financing is part of the counteroffer, compare the amount financed, APR, term, finance charge, and any conditions. A payment reduction achieved by adding months does not tell you whether the purchase became cheaper. Use the loan calculator to understand the timing and total cost before responding.'
        ]
      },
      {
        heading: '6. Decide how promised repairs will be handled',
        paragraphs: [
          'A seller may offer to repair an item instead of reducing the price. Define the work, who will do it, the completion date, and what documentation you will receive. If the quality of the repair matters to your decision, arrange a suitable follow-up inspection. A vague promise to take care of it leaves room for different expectations.',
          'Consider your practical situation. A price reduction may suit you if you already have a trusted shop and can fund the repair immediately. Completion before delivery may suit you if the car cannot safely be driven as it stands. Do not trade a material safety issue for a discount and then postpone necessary work.',
          'Read any deposit agreement before paying. Confirm the conditions for a refund or cancellation, especially if inspection or financing remains outstanding. Do not assume a deposit is refundable or that a completed purchase includes a general cooling-off period. Verify the contract and applicable state protections for your transaction.'
        ]
      },
      {
        heading: '7. Close only when the final numbers match',
        paragraphs: [
          'Read the final purchase and finance documents at your own pace. Check the VIN, mileage, selling price, taxes, fees, products, trade-in amount, payoff, and cash due. Ask for a corrected document when a figure differs; a verbal explanation does not update a signed agreement.',
          'The FTC advises buyers to review proposed add-ons and their costs. Assess any product against its coverage, exclusions, deductible, cancellation terms, and price. A product you decide to buy belongs in your total budget, including the interest if it is financed. Do not let a small monthly presentation hide its full cost.',
          'If the final deal exceeds your limit or unresolved questions remain, pause. Save the quote so you can compare another car using the same method. Negotiation succeeds when you make a purchase you can explain and afford, including the decision to decline an unsuitable deal.'
        ]
      }
    ],
    sources: [
      { title: 'FTC: Buying a used car from a dealer', url: 'https://consumer.ftc.gov/articles/buying-used-car-dealer' },
      { title: 'FTC: Auto buyer study and shopping guidance', url: 'https://consumer.ftc.gov/consumer-alerts/2020/07/ftc-announces-auto-buyers-study-reports' },
      { title: 'CFPB: Comparing auto loan offers', url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/' }
    ],
    relatedTools: ['used-car-price-negotiation-calculator', 'car-affordability-calculator', 'car-loan-calculator', 'car-sales-tax-calculator']
  },
  {
    slug: 'real-cost-of-car-ownership',
    title: 'How to calculate the real cost of car ownership',
    description: 'Compare used cars with a complete ownership budget for depreciation, fuel, insurance, maintenance, taxes, and interest. Avoid double-counting the loan.',
    category: 'Ownership',
    updated: '2026-10-15',
    reviewedOn: '2026-10-15',
    intro: 'Ownership cost is the value your car loses plus the money spent using, maintaining, insuring, and financing it. Compare cars over the same period and mileage. Keep this economic cost separate from your monthly cash budget so you do not count both loan principal and depreciation as separate costs.',
    readingMinutes: 7,
    sections: [
      {
        heading: '1. Choose the comparison period and driving pattern',
        paragraphs: [
          'Decide how long you expect to keep the vehicle and how far you expect to drive. Use the same assumptions for every candidate. A five-year comparison is useful for planning, but it is not automatically the right ownership period for someone who expects to move or change jobs in two years.',
          'Estimate mileage from your actual routine: commuting days, school trips, errands, weekend travel, and long-distance journeys. Separate occasional travel from a regular weekly pattern so you do not multiply a holiday week by 52. If your employment or location may change, create a second scenario instead of pretending one number is certain.',
          'Write down what the comparison includes. Parking, tolls, inspections, charging equipment, or a residential parking permit may be material to you even if they are absent from a basic calculator. Keep these as an explicit supplementary budget. A precise-looking total is only useful when its boundaries match the decision you are making.'
        ]
      },
      {
        heading: '2. Separate depreciation from loan repayment',
        paragraphs: [
          'Depreciation over your ownership period is purchase price minus the amount you expect to receive when you sell. If a hypothetical car costs $20,000 and you assume it can be sold for $9,000 after five years, depreciation is $11,000. That resale value is an assumption to test, not a guaranteed offer.',
          'Loan principal is the amount borrowed to acquire the asset. Repaying it changes your cash and debt; it does not create another full vehicle cost on top of depreciation. In an economic ownership calculation, add financing interest and applicable financing costs to depreciation. In a cash-flow budget, track down payment, loan payments, operating expenses, and eventual net sale proceeds.',
          'The distinction matters when selling before the loan ends. Sale proceeds may need to pay off the remaining debt, so your cash received can be much lower than the resale price. Compare the projected balance with a range of possible resale values. Neither a depreciation curve nor a loan schedule can guarantee future equity.'
        ]
      },
      {
        heading: '3. Calculate energy use with consistent units',
        paragraphs: [
          'For gasoline, annual cost equals annual miles divided by miles per US gallon, multiplied by dollars per US gallon. At an assumed 12,000 miles, 30 mpg, and $3.50 per gallon, the result is $1,400 a year. These are scenario inputs, not a statement of current pump prices. Over five years with unchanged assumptions, fuel totals $7,000.',
          'FuelEconomy.gov explains that EPA ratings support comparisons but real fuel economy varies with conditions and use. Start with the correct vehicle configuration, then test a less favorable MPG assumption. At 25 mpg using the same mileage and fuel price, annual cost becomes $1,680, a $280 increase. Changing one assumption at a time makes the reason for a difference clear.',
          'For an EV, use energy consumption in kWh per distance and the price you actually pay, accounting for where you charge and charging losses when necessary. A home tariff and a public fast-charging price can produce different budgets. Do not enter MPGe into a gasoline-cost formula as though it were miles per gallon of purchased fuel.'
        ]
      },
      {
        heading: '4. Replace broad guesses with quotes and schedules',
        paragraphs: [
          'Request insurance quotes for the exact vehicle and the coverage you intend to carry. Keep deductibles, limits, drivers, and usage consistent across candidates. A national average cannot tell you the premium for your household, and a low quote based on different coverage is not an equal comparison. Confirm any lender coverage requirements.',
          'Build maintenance from the manufacturer’s schedule, inspection findings, and local shop estimates. Separate predictable work such as a service that comes due during your period from uncertain repairs. Include tires based on their present condition and your expected use. Avoid assuming that a newly purchased used car begins its maintenance life at zero.',
          'For taxes and registration, use your state and local agencies or a written transaction quote. Record one-time acquisition charges separately from recurring fees. If you finance a taxable purchase charge, avoid adding that charge again when reconciling your costs; the financing interest on it is an additional cost, while the charge itself is counted once.'
        ]
      },
      {
        heading: '5. Work through one complete five-year example',
        paragraphs: [
          'Consider a purely illustrative five-year, 60,000-mile ownership plan. Purchase price is $20,000 and assumed resale value is $9,000, making depreciation $11,000. Fuel totals $7,000 using the earlier 30-mpg scenario. Assume insurance totals $7,500, maintenance and repairs $5,000, acquisition and recurring taxes or fees $1,800, and financing interest $3,000.',
          'The estimated economic cost is $35,300: $11,000 + $7,000 + $7,500 + $5,000 + $1,800 + $3,000. Dividing by 60 months gives about $588 per month; dividing by 60,000 miles gives about 59 cents per mile. These are averages over the period, not a payment quote or the cash required in each month.',
          'The example excludes parking, tolls, opportunity cost of cash, and inflation. It also assumes the stated resale proceeds and expenses occur as modeled. Add costs that matter to you and keep their timing visible. A large repair early in ownership can create a cash problem even if the five-year average looks manageable.'
        ]
      },
      {
        heading: '6. Test the assumptions that can change the result',
        paragraphs: [
          'To compare a new car with a used car, enter the used vehicle first and save it for comparison in the ownership calculator. Then choose New car and replace price, resale, insurance, maintenance, fees and financing with quotes or explicit UNVERIFIED assumptions for that vehicle. Keep ownership period and annual distance identical. The label itself changes no costs, and neither vehicle type is assumed to be cheaper.',
          'Create a base case and a less favorable case. In the example, reducing resale value from $9,000 to $7,000 adds $2,000 to ownership cost. Adding $1,500 of repairs adds another $1,500. The combined increase is $3,500, or about $58 a month when averaged over five years. Your actual need for cash will depend on when those events occur.',
          'Compare the margin between vehicles with this uncertainty. If candidate A is only $500 cheaper over five years but has less predictable repairs, the arithmetic alone does not establish a strong winner. Conversely, a recurring $100 monthly cost difference becomes $6,000 over the same period and deserves attention.',
          'Avoid treating all risks as independent. Higher mileage can increase fuel costs, accelerate maintenance, and affect resale at once. A useful second scenario changes those related assumptions together. Keep the original scenario saved so you can see what caused the result to move.'
        ]
      },
      {
        heading: '7. Translate the total into a workable household budget',
        paragraphs: [
          'Use the ownership calculator for the overall comparison, then the loan and fuel calculators for their components. For your monthly cash plan, add the actual loan payment, insurance payment, energy spending, parking, and money set aside for irregular expenses. Treat annual bills as monthly savings requirements even when you pay them once a year.',
          'Before purchasing, confirm you can cover the down payment, transaction charges, immediate inspection findings, and a reserve without relying on the estimated resale value. Resale is future money and is uncertain. A car that has a reasonable lifetime cost can still demand more initial cash than you can comfortably provide.',
          'Review your assumptions after several months of ownership using actual receipts and mileage. That record makes the next purchase comparison more useful. This method supports planning; it does not provide personalized financial advice, predict market values, or substitute for insurance, repair, tax, or lending quotes.'
        ]
      }
    ],
    sources: [
      { title: 'DOE and EPA: Fuel cost and savings calculator', url: 'https://www.fueleconomy.gov/feg/savemoney.jsp' },
      { title: 'DOE and EPA: Why actual fuel economy varies', url: 'https://www.fueleconomy.gov/feg/why_differ.shtml' },
      { title: 'CFPB: Loan comparison and ownership costs', url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/' }
    ],
    relatedTools: ['total-cost-of-ownership-calculator', 'fuel-cost-calculator', 'car-depreciation-calculator', 'car-loan-calculator']
  },
  {
    slug: 'how-to-compare-used-car-loans',
    title: 'How car loan interest is calculated and how to compare offers',
    description: 'Learn how monthly car loan interest is calculated, work through a payment example, and compare rates, APR, terms and total borrowing costs.',
    category: 'Financing',
    updated: '2026-10-15',
    reviewedOn: '2026-10-15',
    intro: 'Compare used-car loans using the same amount financed and term, then examine APR, finance charges, fees, and payment rules. A smaller payment can come from borrowing for longer and cost more overall. Use actual lender disclosures for the decision; a calculator illustrates assumptions and is not a credit offer.',
    readingMinutes: 7,
    sections: [
      {
        heading: '1. Establish how much you need to finance',
        paragraphs: [
          'Start with the agreed vehicle price and itemized taxes, fees, and products you choose. Subtract the cash down payment and any positive trade equity being applied. If you owe more on a trade than it is worth and that shortfall is included in the new loan, the amount borrowed increases. Reconcile every line to the purchase worksheet.',
          'For a hypothetical purchase, a $22,000 out-the-door total minus $4,000 cash down requires $18,000 of financing if there is no trade, fee adjustment, or other financed balance. A comparison using a $16,000 principal would look cheaper but would require another $2,000 of cash. Keep both borrowing and upfront cash visible.',
          'Ask which charges are paid immediately and which are included in the loan. Fees can also affect the disclosed amount financed and APR under lending rules, so do not assume your rough worksheet reproduces every disclosure calculation. If the contract differs from your expectation, have the lender explain the itemization before you sign.'
        ]
      },
      {
        heading: '2. Collect offers on comparable terms',
        paragraphs: [
          'Request offers from lenders you can verify, including a bank or credit union if available to you, and compare dealer-arranged financing on the same basis. The CFPB explains that dealer-arranged and direct financing follow different paths, and shopping can help you assess what is available. An advertised rate may depend on eligibility and the vehicle.',
          'Record the quoted loan amount, APR, contract interest rate, term, required down payment, fees, expiration date, and any conditions. Ask whether approval is final or conditional and whether vehicle age, mileage, title status, or seller type affects eligibility. A prequalification estimate and an approved loan for a particular car are not interchangeable.',
          'Use one worksheet per offer and mark anything missing. If one lender quotes 48 months and another quotes 72, ask for a matched-term quote where practical. You can still compare different terms, but you should recognize that you are comparing both the lender and the repayment schedule at the same time.'
        ]
      },
      {
        heading: '3. How interest is calculated on a car loan',
        paragraphs: [
          'For this fixed-rate monthly model, monthly rate = annual contract rate divided by 1,200; interest for a month = opening balance multiplied by monthly rate. Subtract that interest from the payment to find principal repaid, then use the reduced balance for the next month. The division converts an annual percentage to a monthly decimal rate; it does not mean that APR and the contractual interest rate are interchangeable.',
          monthlyInterestExample,
          'The CFPB explains that APR includes the interest rate and certain borrowing fees, making it a broader comparison measure than the interest rate alone. Compare APR with APR. A payment calculator that treats APR as the periodic interest rate is an approximation when fees make APR differ from the contract rate.',
          'The Truth in Lending disclosures include key figures such as APR, finance charge, amount financed, and total of payments. Review them before signing and ask how any unfamiliar fee is treated. Check the number and timing of payments as well as the payment amount. Use the actual disclosure to compare the lender’s proposed transaction.',
          'For a standard fixed-rate loan without fees, a monthly amortization illustration can closely explain the relationship between principal, rate, and term. Real contracts may accrue interest daily, adjust the last payment, or use other provisions. A difference of a few dollars deserves an explanation rather than an assumption that either the tool or the lender must be wrong.'
        ]
      },
      {
        heading: '4. See what a longer term changes',
        paragraphs: [
          loanTermExample,
          loanTermDifference,
          'A longer term may be the only payment that appears manageable, but that is a reason to reassess the purchase amount and total household budget. It does not establish that the car is affordable. Model a less expensive vehicle or different down payment without exhausting money needed for repairs and other essential expenses.'
        ]
      },
      {
        heading: '5. Check flexibility and conditions',
        paragraphs: [
          'Ask the lender how extra payments are applied and how to direct money toward principal. Verify whether the contract permits prepayment without a penalty and whether an early payoff changes any fees or product refunds. Do not assume that sending a larger payment produces the same result as the extra-payment setting in a calculator.',
          'Confirm the first payment date, autopay conditions, late-payment charges, and the way you can obtain a payoff quote. If a quoted rate includes an autopay discount, understand what happens when eligibility changes. Keep a copy of the agreement and record the servicer’s official contact details.',
          'Look for terms outside a basic fixed-payment model, such as a balloon payment, variable rate, or unusual payment schedule. Ask for an explanation of the maximum future obligation where relevant. A calculator designed for fully amortizing monthly loans should not be used to certify the affordability of a materially different contract.'
        ]
      },
      {
        heading: '6. Keep add-ons and negative equity visible',
        paragraphs: [
          'Separate the borrowing decision from optional products. If you choose a service contract or another product, record its cash price and the extra finance cost when it is borrowed. Read coverage, exclusions, deductibles, cancellation, and refund terms. A product can be costly even when its effect is presented as a small monthly amount.',
          'If the old car’s payoff is $12,000 and its trade allowance is $9,000, the $3,000 difference is negative equity. Financing that shortfall does not make it disappear. In a simplified example where a replacement needs $18,000 after cash down, adding this shortfall creates a $21,000 borrowing requirement before other adjustments.',
          'The CFPB identifies rolling negative equity into a replacement loan as an important borrowing risk. Compare alternatives such as delaying replacement where feasible or paying the shortfall separately. Use actual payoff information from the existing lender rather than assuming the balance shown on a recent statement equals the payoff on the transaction date.'
        ]
      },
      {
        heading: '7. Choose a loan that fits the full ownership plan',
        paragraphs: [
          'Place the preferred payment beside insurance, fuel, parking, maintenance savings, and your other obligations. Check whether the combined amount remains workable in a less favorable month. Rules of thumb can prompt a useful review, but they do not know your household’s priorities, irregular income, or essential expenses.',
          'Use the loan calculator to compare terms and the affordability calculator to test your budget. Then confirm the final documents still match the agreed car price, amount financed, rate, term, and products. A changed purchase price can erase a financing advantage, so compare the complete transaction.',
          'Keep copies of everything you sign and verify the lender or servicer’s payment instructions independently. This guide explains comparison mechanics; it does not predict approval, recommend a specific lender, or promise a rate. Your contract and verified disclosures determine the actual obligation.'
        ]
      }
    ],
    sources: [
      { title: 'CFPB: Amortization and your auto loan', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/' },
      { title: 'CFPB: Simple and precomputed interest', url: 'https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-simple-interest-rate-and-precomputed-interest-on-an-auto-loan-en-841/' },
      { title: 'CFPB: How to compare auto loan offers', url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/' },
      { title: 'CFPB: Auto loan key terms, including APR', url: 'https://www.consumerfinance.gov/consumer-tools/auto-loans/answers/key-terms/' },
      { title: 'CFPB: Truth in Lending disclosures', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-truth-in-lending-disclosure-for-an-auto-loan-en-787/' },
      { title: 'CFPB: Direct and dealer-arranged financing', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-dealer-arranged-and-bank-financing-en-759/' },
      { title: 'CFPB: Negative equity in auto financing', url: 'https://www.consumerfinance.gov/data-research/research-reports/data-spotlight-negative-equity-findings-from-the-auto-finance-data-pilot/' }
    ],
    relatedTools: ['car-loan-calculator', 'car-affordability-calculator', 'total-cost-of-ownership-calculator']
  },
  {
    slug: 'trade-in-vs-private-sale',
    title: 'Trade-in vs. private sale: compare your net proceeds',
    description: 'Compare a trade-in with selling privately after loan payoff, selling costs, possible tax treatment, and your time. Work through a clear break-even example.',
    category: 'Selling',
    intro: 'Compare trade-in and private sale using net proceeds, any verified tax difference, selling expenses, and the time involved. A private asking price is not money you have received, and a trade-in allowance may be tied to the replacement-car deal. Get written offers and compare the complete transactions.',
    readingMinutes: 7,
    sections: [
      {
        heading: '1. Get evidence for both selling routes',
        paragraphs: [
          'Collect more than one written purchase or trade-in offer if practical. Record whether each offer requires a replacement purchase, a physical inspection, or a mileage limit, and when it expires. A standalone dealer purchase can be a useful third option between a trade-in and a private sale.',
          'For the private route, examine listings with similar trim, mileage, condition, history, and location. Asking prices help you position a listing, but they do not establish completed sale prices. Choose a plausible sale range and allow for negotiation. A valuation model can support planning, but it is not a buyer or a live appraisal.',
          'Use the same description of your car everywhere. Disclose known material issues accurately and retain supporting maintenance records. Do not assume a repair always increases the selling price by its cost. Obtain a repair quote and compare the likely net result with an honest as-is sale, subject to your state’s disclosure requirements.'
        ]
      },
      {
        heading: '2. Separate the car’s value from your loan balance',
        paragraphs: [
          'Request a payoff quote from the current lender for the expected transaction date. Ask how long the quote is valid, how payment is accepted, and how the lien and title will be released. Your debt does not determine what a buyer will pay, but it determines how much cash you retain or must contribute.',
          'If a hypothetical offer is $10,000 and payoff is $6,000, the equity available is $4,000 before other costs. If payoff is $12,000, you have a $2,000 shortfall. A dealer saying it will pay off your loan does not tell you who ultimately funds that shortfall; trace it through the replacement purchase and financing documents.',
          'Plan a private transaction involving a lien with the lender and buyer in advance. Decide who pays which amount, how confirmation is obtained, and when ownership documents can be delivered. Do not promise immediate title delivery when the lender’s actual process takes longer. A clear sequence can prevent a legitimate buyer from abandoning an otherwise workable purchase.'
        ]
      },
      {
        heading: '3. Verify whether tax treatment changes the comparison',
        paragraphs: [
          'Trade-in tax treatment depends on the state and transaction. Some transactions receive an allowance that reduces the taxable amount of the replacement purchase; others do not. Enter zero benefit until you have verified the applicable rules. An assumed tax percentage multiplied by the trade value is not a universal entitlement.',
          'Texas provides a specific example: the Comptroller explains that a qualifying vehicle trade in the same transaction can reduce the taxable selling price, while proceeds from a separate private sale or sale to another dealer do not provide that trade-in deduction. That is a Texas rule with conditions, not a rule for all US buyers.',
          'Ask the relevant revenue or motor-vehicle agency about caps, eligibility, timing, and how a particular replacement transaction is treated. Obtain the dealer’s itemized tax calculation. Distinguish the gross trade allowance from equity after loan payoff; tax rules may use one figure while your available cash depends on the other.'
        ]
      },
      {
        heading: '4. Calculate the private-sale break-even price',
        paragraphs: [
          'Use a scenario rather than a promise. Suppose a written trade offer is $10,000, a verified transaction-specific tax benefit would be $600, and payoff is $6,000. The trade route provides $4,600 of combined equity and tax benefit. Suppose a private buyer would pay $11,500 and you expect $250 of selling costs. Private net cash after payoff is $5,250.',
          'The private route is ahead by $650 before valuing your time and other costs. In this scenario, its break-even sale price is $10,850: the $10,000 trade offer plus the $600 tax benefit plus $250 of private selling costs. The identical payoff cancels when comparing the routes, although it still matters for the cash you receive.',
          'These amounts are illustrative and assume the tax benefit applies exactly as stated. If there is no qualifying benefit, the private break-even price falls to $10,250. If your private sale is delayed and incurs another $150 of carrying costs, include it. Use ranges when the selling price or timing remains uncertain.'
        ]
      },
      {
        heading: '5. Put time, logistics, and uncertainty into the decision',
        paragraphs: [
          'Estimate how many appointments, messages, cleaning hours, and administrative tasks a private sale will involve for you. You can assign an optional value to that time without pretending it is a cash invoice. If the expected private advantage is $650 and you estimate ten hours, the implied compensation is $65 per hour before any additional expenses.',
          'Consider the sequence of replacing the car. Selling first may require temporary transportation; buying first may create overlapping insurance, parking, and loan costs. A trade can simplify timing, but its convenience has a price that you can compare. There is no universal answer independent of your schedule and offers.',
          'Stress-test the private sale at a lower price and a longer waiting period. If the expected benefit disappears after one reasonable counteroffer, you may prefer a firm purchase offer. If demand appears strong and you can wait, the extra work may be worthwhile. Keep your decision tied to the evidence you have, not the highest listing you found.'
        ]
      },
      {
        heading: '6. Prepare a safe, documented private sale',
        paragraphs: [
          'Arrange viewings in a suitable public setting and confirm test-drive arrangements with your insurer. Keep control of the vehicle and documents while allowing a legitimate buyer to inspect and verify them. Share the information necessary for the transaction while limiting exposure of unrelated personal records.',
          'Discuss payment with your bank before the handoff and verify payment through channels you obtain independently. The FTC warns that funds appearing in your account do not establish that a deposited check is genuine; fake checks can be discovered later. Reject overpayment-and-refund arrangements. A screenshot, payment email, or claimed urgency is not settlement confirmation.',
          'Check your state’s title, odometer, disclosure, inspection, plate, and seller-notice requirements. California, for example, distinguishes transferring the title from submitting the seller’s Notice of Transfer and Release of Liability. Use your own state’s process and deadlines. Keep copies of the completed agreement, transfer documents, payment record, and handoff details.'
        ]
      },
      {
        heading: '7. Keep the replacement deal and handoff transparent',
        paragraphs: [
          'When trading, compare the replacement vehicle’s price before and after the allowance is introduced. A generous trade figure can be offset elsewhere in the transaction. Verify payoff handling in writing and follow up with the old lender to confirm the loan has been settled. Keep making required payments until the lender confirms what is due.',
          'Before handing over either a traded or privately sold car, remove personal belongings and account access from infotainment, connected-car services, toll devices, and garage-door settings. Follow the manufacturer’s instructions for data removal. Coordinate insurance and registration changes with the relevant providers and state requirements so the timing is correct.',
          'Use the trade-in estimator for scenario planning, the tax calculator for a transparent estimate, and the ownership calculator for the replacement decision. Your final choice should be based on verified offers and net amounts. This comparison does not supply a market appraisal, individualized tax advice, or a guarantee that a private buyer will pay your expected price.'
        ]
      }
    ],
    sources: [
      { title: 'Texas Comptroller: Motor vehicle trade-in tax treatment', url: 'https://comptroller.texas.gov/taxes/publications/96-254/trade-ins.php' },
      { title: 'CFPB: Negative equity in auto financing', url: 'https://www.consumerfinance.gov/data-research/research-reports/data-spotlight-negative-equity-findings-from-the-auto-finance-data-pilot/' },
      { title: 'FTC: Spotting and avoiding fake-check scams', url: 'https://consumer.ftc.gov/articles/how-spot-avoid-and-report-fake-check-scams' },
      { title: 'California DMV: Title transfers and seller notices', url: 'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/' }
    ],
    relatedTools: ['trade-in-value-estimator', 'what-is-my-car-worth', 'car-sales-tax-calculator', 'total-cost-of-ownership-calculator']
  },
  internationalGuide,
];
