// Original hypothetical examples, not observed market prices or statutory fees.
export const runningCostContent={
  germany:{
    heading:"Budget for Kfz-Steuer, insurance and HU/TÜV",
    paragraphs:[
      "Enter the annual Kfz-Steuer from your vehicle's assessment or an official calculation. This tool does not derive tax from engine size, CO₂, fuel type or first-registration date. Do not reuse another car's tax figure.",
      "Enter your own Kfz-Haftpflicht insurance quote and any chosen Teilkasko or Vollkasko cover. The HU (Hauptuntersuchung), often called TÜV, is a separate inspection cost. For ordinary passenger cars, the first HU is generally after 36 months and subsequent inspections after 24 months; vehicle use and exceptions matter. Check your actual due date and inspection quote. Spread a two-year bill over two years for this annual budget, while keeping cash for the payment date.",
      "A repair reserve is a budgeting assumption, not a prediction. Keep winter tyres, servicing and parking in the appropriate annual fields. Add one-off registration costs to purchase cost once."
    ],
    example:"Hypothetical EUR scenario: 12,000 km/year at 6.5 l/100km and €1.80/litre uses 780 litres and €1,404 fuel per year. Assume €900 insurance, €800 maintenance, €300 combined Kfz-Steuer/HU annual reserve, and €240 parking. Operating costs total €3,644/year. A €20,000 purchase, €14,000 resale after three years and €900 total financing interest add €2,300/year. Economic cost is €5,944/year, or €495.33/month. Every amount here is illustrative, not a current German price, tax or insurance quote.",
    sources:[{title:"German road traffic regulations: HU intervals (Anlage VIII StVZO)",url:"https://www.gesetze-im-internet.de/stvzo_2012/anlage_viii.html"}],
  },
  uk:{
    heading:"Budget for VED, MOT and UK driving costs",
    paragraphs:[
      "Use pounds sterling, annual miles and imperial mpg. Fuel is priced per litre; US mpg is a different unit. Enter your own insurance quote, servicing and repair reserve, and vehicle excise duty (VED, commonly called vehicle tax). Use the charge for the exact vehicle rather than a generic tax preset.",
      "The MOT is a separate roadworthiness test. GOV.UK generally requires it by the third registration anniversary and annually afterwards, with exceptions and different processes in Northern Ireland. Check the vehicle's actual due date, test quote and repair needs; a passed MOT is not a guarantee of future condition.",
      "Include parking, tolls and any applicable clean-air-zone charges for your own routes. Keep one-off purchase costs out of recurring VED/MOT reserves. The monthly result averages economic cost; it does not schedule annual bills or loan repayments."
    ],
    example:"Hypothetical GBP scenario: 10,000 miles/year at 50 imperial mpg uses 909.218 litres. At £1.50/litre, unrounded fuel cost is £1,363.827. With £700 insurance, £600 maintenance, a £250 VED/MOT annual reserve and £120 other costs, operating cost rounds to £3,033.83. A £15,000 purchase and £9,000 resale after three years, with no financing interest, yield £5,033.83/year or £419.49/month. These amounts are examples, not current UK charges or quotes.",
    sources:[{title:"GOV.UK: tax your vehicle",url:"https://www.gov.uk/vehicle-tax"},{title:"GOV.UK: when to get an MOT (including Northern Ireland differences)",url:"https://www.gov.uk/getting-an-mot"}],
  },
} as const;
