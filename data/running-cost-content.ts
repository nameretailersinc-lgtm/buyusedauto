// Original hypothetical examples, not observed market prices or statutory fees.
export const runningCostContent={
  germany:{
    heading:"Budget for Kfz-Steuer, insurance and HU/TÜV",
    paragraphs:[
      "Enter the annual Kfz-Steuer from your own vehicle's assessment or an official calculation. This tool doesn't work it out from engine size, CO₂, fuel type or first-registration date, so don't borrow another car's figure.",
      "Add your own Kfz-Haftpflicht quote and any Teilkasko or Vollkasko cover you choose. The HU (Hauptuntersuchung), often called TÜV, is an inspection with its own cost. For ordinary passenger cars the first HU is generally due after 36 months and later ones every 24 months, though use and exceptions matter. Check your real due date and get an inspection quote. For this annual budget, spread a two-year bill over two years, but keep the cash ready for the day it's due.",
      "A repair reserve is a planning assumption, not a prediction. Put winter tyres, servicing and parking in their own annual fields, and add one-off registration costs to the purchase cost just once."
    ],
    example:"Hypothetical EUR scenario: 12,000 km/year at 6.5 l/100km and €1.80/litre uses 780 litres and €1,404 fuel per year. Assume €900 insurance, €800 maintenance, €300 combined Kfz-Steuer/HU annual reserve, and €240 parking. Operating costs total €3,644/year. A €20,000 purchase, €14,000 resale after three years and €900 total financing interest add €2,300/year. Economic cost is €5,944/year, or €495.33/month. Every amount here is illustrative, not a current German price, tax or insurance quote.",
    sources:[{title:"German road traffic regulations: HU intervals (Anlage VIII StVZO)",url:"https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html"}],
  },
  uk:{
    heading:"Budget for VED, MOT and UK driving costs",
    paragraphs:[
      "Work in pounds sterling, annual miles and imperial mpg. Fuel is priced per litre, and US mpg is a different unit, so don't mix them. Enter your own insurance quote, servicing and repair reserve, and vehicle excise duty (VED, commonly called vehicle tax). Use the charge for your exact vehicle rather than a generic preset.",
      "The MOT is a separate roadworthiness test. GOV.UK generally requires one by the third registration anniversary and every year after that, with exceptions, and Northern Ireland works differently. Check your vehicle's real due date, get a test quote and allow for repairs. Passing an MOT doesn't guarantee how the car will hold up later.",
      "Add parking, tolls and any clean-air-zone charges for the routes you actually drive. Keep one-off purchase costs out of the recurring VED and MOT reserves. The monthly result is an average of economic cost, not a schedule of annual bills or loan repayments."
    ],
    example:"Hypothetical GBP scenario: 10,000 miles/year at 50 imperial mpg uses 909.218 litres. At £1.50/litre, unrounded fuel cost is £1,363.827. With £700 insurance, £600 maintenance, a £250 VED/MOT annual reserve and £120 other costs, operating cost rounds to £3,033.83. A £15,000 purchase and £9,000 resale after three years, with no financing interest, yield £5,033.83/year or £419.49/month. These amounts are examples, not current UK charges or quotes.",
    sources:[{title:"GOV.UK: tax your vehicle",url:"https://www.gov.uk/vehicle-tax"},{title:"GOV.UK: when to get an MOT (including Northern Ireland differences)",url:"https://www.gov.uk/getting-an-mot"}],
  },
} as const;
