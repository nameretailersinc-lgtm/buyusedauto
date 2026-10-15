import type {Guide} from "./guides";

export const internationalGuide: Guide = {
  slug: "international-used-car-buying-checks",
  title: "Used car buying checks by country: official resources",
  description: "Find official used-car checks for the UK, Australia, Pakistan and UAE. Separate vehicle history, seller authority and transfer requirements before paying.",
  category: "Buying",
  readingMinutes: 7,
  reviewedOn: "2026-10-15",
  language: "en",
  intro: "A vehicle history search, a registration record and an ownership transfer answer different questions. Start with the authority responsible for the actual vehicle and transaction. This guide points to official resources for four markets and explains the gaps to resolve before paying. Pakistan guidance below is scoped to Punjab, and UAE guidance to Dubai; do not apply those procedures nationwide.",
  sections: [
    {
      heading: "1. Build a country-specific evidence file",
      paragraphs: [
        "Record the vehicle identification number, registration jurisdiction, seller details, advertised distance and unit, asking price and currency. Match the identifiers on the physical car with the documents and search results. Keep a separate list of questions about ownership, finance, condition and registration. A result that answers one of those questions should not be treated as answering all four.",
        "Ask the responsible authority which service applies to a private purchase, an interstate or inter-emirate move, an imported car or a vehicle with outstanding finance. Those situations can need different evidence. Open the official resource links below yourself rather than relying only on a seller screenshot. Save the date of each search alongside its result.",
        "Make inspection access part of the purchase discussion. Decide who will arrange the appointment and how unresolved findings will affect the agreement. This is a practical research workflow; it does not establish legal title, certify roadworthiness or replace advice about a disputed transaction."
      ]
    },
    {
      heading: "2. United Kingdom: checks before buying privately",
      paragraphs: [
        "GOV.UK recommends obtaining the registration number, make, model and MOT test number before viewing. Compare the supplied details with DVLA information, review MOT status and history, and check safety recalls. At the viewing, examine the V5C log book and match vehicle identifiers. Use the official used-vehicle checklist linked below to follow the current document checks.",
        "Use the separate DVLA sold-or-bought service to understand the keeper notification step. Do not treat an MOT record as a substitute for a mechanical inspection or assume that a registration lookup resolves every question about finance or the seller's authority. Confirm insurance, tax and the handover arrangements applicable to your purchase before driving away."
      ],
      links: [
        {title: "GOV.UK: checks when buying a used vehicle", url: "https://www.gov.uk/checks-when-buying-a-used-car"},
        {title: "GOV.UK: tell DVLA about a vehicle sale or purchase", url: "https://www.gov.uk/sold-bought-vehicle"}
      ]
    },
    {
      heading: "3. Australia: a PPSR search and its limits",
      paragraphs: [
        "The Australian Personal Property Securities Register recommends searching on the purchase day or the day before. Search using the VIN or applicable chassis identifier, not the number plate. A search can identify registered security interests and usually includes available stolen or written-off information. Save the certificate and check that you searched the identifier on the car you inspected.",
        "PPSR does not provide an ownership history, odometer reading, outstanding fines or the amount of finance owing. Its supplementary vehicle data can be incomplete or delayed. A clear result is therefore one part of your evidence file. Separately check registration with the relevant state or territory authority and arrange a mechanical inspection. Ask that authority about the transfer process for your transaction."
      ],
      links: [{title: "Australian PPSR: used car searches and limitations", url: "https://www.ppsr.gov.au/searching/do-used-car-or-vehicle-search"}]
    },
    {
      heading: "4. Pakistan: identify the province, then check Punjab services",
      paragraphs: [
        "For a Punjab-registered vehicle, start with Punjab Excise's current services and biometric guidance. Its published ePay transfer workflow covers a transfer application, calculated dues and identity verification. The ePay portal lists vehicle transfer fee payments. Confirm the current application channel, documents and biometric arrangements directly with Excise before arranging payment or travel.",
        "These Punjab resources do not establish a single process for Sindh, Islamabad or another registration authority. Do not assume a fee-payment receipt alone completes a transfer. Ask how to confirm the application outcome and obtain the updated official record. Keep the seller involved until the required steps are resolved; seek authority guidance for an unavailable seller, inherited vehicle or disputed record."
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
        "For a Dubai transaction, use RTA's Change Vehicle Ownership service. The published workflow distinguishes seller identity verification, the buyer and seller agreement, fees and completion of registration. Follow the channel-specific instructions and have each party use their own official account. A seller's registration screenshot is not a substitute for completing the authority's process.",
        "Ask RTA how to verify the vehicle record and seller authority for the actual transaction, including any finance or transfer restriction. Ownership checks are separate from accident-history research and an independent inspection. This Dubai resource is not a UAE-wide ownership-history database. If the car or buyer is registered elsewhere, confirm the receiving authority's requirements before agreeing on payment and collection."
      ],
      links: [{title: "Dubai RTA: change vehicle ownership", url: "https://rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=600"}]
    },
    {
      heading: "6. Keep currency and distance consistent",
      paragraphs: [
        "Keep your budget in the transaction currency: GBP, AUD, PKR or AED as appropriate. Record whether each distance is in miles or kilometres and whether fuel figures use litres per 100 km, US gallons or imperial gallons. Our fuel calculator supports kilometres and litres or miles and US gallons; UK imperial mpg must be converted before entering it as US mpg.",
        "The finance, ownership and valuation tools currently display USD and do not retrieve local exchange rates, taxes, lending terms or vehicle prices. Do not present those outputs as localized quotes. Use local written amounts for your purchase worksheet and verify each charge with the authority or provider. A currency conversion would not make a generic depreciation assumption model-specific."
      ]
    },
    {
      heading: "7. Use a handover decision checklist",
      paragraphs: [
        "Before committing, review the unresolved questions rather than simply counting completed searches. Can the seller establish authority to sell? Are the car and documents consistent? Is any finance release understood? Has an independent inspector explained material concerns? Do you know what confirms registration completion and when you can lawfully use the car? Pause when a material answer is missing.",
        "Keep inspection notes, search certificates, the written agreement and authority confirmations together. Record which findings are verified and which remain seller statements. After handover, retain the records for follow-up and future resale. The inspection checklist can organize observations, while our history guide explains the US resources that should not be substituted for the country-specific checks above."
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
