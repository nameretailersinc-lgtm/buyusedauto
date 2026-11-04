import type {Guide} from "./guides";

export const internationalGuide: Guide = {
  slug: "international-used-car-buying-checks",
  title: "Used car buying checks by country: official resources",
  description: "Official used-car checks for the UK, Australia, Punjab (Pakistan) and Dubai, plus how to separate history, seller authority and transfer steps.",
  category: "Buying",
  readingMinutes: 7,
  reviewedOn: "2026-10-15",
  language: "en",
  intro: "A history search, a registration record and an ownership transfer each answer a different question, so start with the authority that covers your vehicle and transaction. This guide links to official resources for the UK, Australia, Punjab in Pakistan and Dubai in the UAE, and lists the gaps to close before you pay. The Pakistan guidance covers Punjab only and the UAE guidance covers Dubai only, so don't apply either nationwide.",
  sections: [
    {
      heading: "1. Build a country-specific evidence file",
      paragraphs: [
        "Write down the vehicle identification number, the registration jurisdiction, the seller's details, the advertised distance and its unit, and the asking price and currency. Match the identifiers on the physical car to the documents and search results. Then keep a separate list of open questions about ownership, finance, condition and registration. A result that answers one of them doesn't answer the other three.",
        "Ask the responsible authority which service applies if you're buying privately, moving a car between states or emirates, importing it, or buying one with outstanding finance. Each can need different evidence. Open the official links below yourself instead of relying on a seller's screenshot, and note the date of each search next to its result.",
        "Settle inspection access before you agree on anything else: who books the appointment, and what happens to the deal if problems turn up. This is a research workflow. It doesn't establish legal title, certify roadworthiness or replace advice if a transaction is disputed."
      ]
    },
    {
      heading: "2. United Kingdom: checks before buying privately",
      paragraphs: [
        "GOV.UK recommends getting the registration number, make, model and MOT test number before you view the car. Compare those details with DVLA information, review the MOT status and history, and check for safety recalls. At the viewing, examine the V5C log book and match its identifiers to the car. The official checklist linked below covers the current document checks.",
        "The separate DVLA sold-or-bought service explains how the keeper change is reported. An MOT record isn't a mechanical inspection, and a registration lookup won't answer every question about finance or the seller's authority. Confirm insurance, tax and handover arrangements before you drive away."
      ],
      links: [
        {title: "GOV.UK: checks when buying a used vehicle", url: "https://www.gov.uk/checks-when-buying-a-used-car"},
        {title: "GOV.UK: tell DVLA about a vehicle sale or purchase", url: "https://www.gov.uk/sold-bought-vehicle"}
      ]
    },
    {
      heading: "3. Australia: a PPSR search and its limits",
      paragraphs: [
        "The Australian Personal Property Securities Register (PPSR) recommends searching on the day you buy or the day before. Search by VIN or the applicable chassis identifier, not the number plate. A search can show registered security interests and usually includes any available stolen or written-off information. Save the certificate and check that you searched the identifier on the car you actually inspected.",
        "PPSR doesn't give you an ownership history, an odometer reading, outstanding fines or the amount of finance owing, and its supplementary vehicle data can be incomplete or delayed. A clear result is one piece of your evidence file. Check registration separately with the relevant state or territory authority, book a mechanical inspection, and ask that authority how the transfer works for your transaction."
      ],
      links: [{title: "Australian PPSR: used car searches and limitations", url: "https://www.ppsr.gov.au/searching/do-used-car-or-vehicle-search"}]
    },
    {
      heading: "4. Pakistan: identify the province, then check Punjab services",
      paragraphs: [
        "For a Punjab-registered vehicle, start with Punjab Excise's current services and biometric guidance. Its published ePay transfer workflow covers the transfer application, calculated dues and identity verification, and the ePay portal lists vehicle transfer fee payments. Before you pay or travel, confirm the current application channel, documents and biometric arrangements directly with Excise.",
        "These Punjab resources don't set out one process for Sindh, Islamabad or any other registration authority. A fee receipt alone doesn't complete a transfer either, so ask how to confirm the outcome of your application and get the updated official record. Keep the seller involved until every step is done, and ask the authority for guidance if the seller is unavailable, the car is inherited or the record is disputed."
      ],
      links: [
        {title: "Punjab Excise: official services", url: "https://excise.punjab.gov.pk/services"},
        {title: "Punjab Excise: biometric verification guidance", url: "https://excise.punjab.gov.pk/index.php/node/2873"},
        {title: "ePay Punjab: government payment services", url: "https://epay.punjab.gov.pk/"}
      ]
    },
    {
      heading: "5. UAE: check Dubai ownership through RTA",
      paragraphs: [
        "For a Dubai transaction, use RTA's Change Vehicle Ownership service. Its published workflow separates seller identity verification, the buyer and seller agreement, fees and completion of registration. Follow the instructions for the channel you use, and have each party use their own official account. A screenshot of the seller's registration doesn't replace the authority's process.",
        "Ask RTA how to verify the vehicle record and the seller's authority for your transaction, including any finance or transfer restriction. Ownership checks are separate from accident-history research and an independent inspection, and this Dubai service isn't a UAE-wide ownership-history database. If the car or the buyer is registered in another emirate, confirm that authority's requirements before you agree on payment and collection."
      ],
      links: [{title: "Dubai RTA: change vehicle ownership", url: "https://rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=600"}]
    },
    {
      heading: "6. Keep currency and distance consistent",
      paragraphs: [
        "Keep your budget in the currency of the transaction: GBP, AUD, PKR or AED. Note whether each distance is in miles or kilometres, and whether fuel figures use litres per 100 km, US gallons or imperial gallons. Our fuel calculator accepts kilometres with litres, or miles with US gallons, so convert UK imperial mpg before you enter it as US mpg.",
        "The finance, ownership and valuation tools currently show USD and don't pull in local exchange rates, taxes, lending terms or vehicle prices, so don't treat their output as a local quote. Use written local amounts in your own worksheet and verify each charge with the authority or provider. Converting the currency wouldn't make a generic depreciation assumption specific to your model."
      ]
    },
    {
      heading: "7. Use a handover decision checklist",
      paragraphs: [
        "Before you commit, look at what's still unanswered rather than counting completed searches. Can the seller show authority to sell? Do the car and documents agree? Do you understand how any finance will be released? Has an independent inspector explained the serious concerns? Do you know what confirms the registration is complete, and when you can legally use the car? If any answer is missing, pause.",
        "Keep inspection notes, search certificates, the written agreement and authority confirmations in one place, and mark which findings are verified and which are just the seller's word. Hold on to the records after handover for follow-up and resale. The inspection checklist can organize your notes. Our history guide covers US resources, which shouldn't stand in for the country-specific checks above."
      ]
    }
  ],
  sources: [
    {title: "GOV.UK: used vehicle checks", url: "https://www.gov.uk/checks-when-buying-a-used-car"},
    {title: "Australian PPSR: used car searches", url: "https://www.ppsr.gov.au/searching/do-used-car-or-vehicle-search"},
    {title: "Punjab Excise: official services", url: "https://excise.punjab.gov.pk/services"},
    {title: "Dubai RTA: change vehicle ownership", url: "https://rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=600"}
  ],
  relatedTools: ["used-car-inspection-checklist", "fuel-cost-calculator"]
};
