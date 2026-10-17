import Link from "next/link";
import {Icon} from "./icon";
import type {Guide} from "@/data/guides";

const markets = {
  PK: {name:"Pakistan",currency:"PKR",distance:"Kilometres",authority:"Provincial / Islamabad Excise",tool:"/tools/pakistan/car-running-cost-calculator"},
  AE: {name:"United Arab Emirates",currency:"AED",distance:"Kilometres",authority:"Registration emirate",tool:"/tools/uae/car-running-cost-calculator"},
  US: {name:"United States",currency:"USD",distance:"Miles",authority:"State DMV or equivalent",tool:"/car-affordability-calculator"},
  GB: {name:"United Kingdom",currency:"GBP",distance:"Miles",authority:"DVLA / local requirements",tool:"/tools/uk/car-running-cost-calculator"},
  EU: {name:"European Union",currency:"EUR / local currency",distance:"Kilometres",authority:"Country of registration",tool:"/used-car-inspection-checklist"},
};
export function CountryGuideOverview({guide}: {guide:Guide}) {
  if(!guide.region)return null;
  const market=markets[guide.region];
  return <section className="country-overview" aria-label={`${market.name} buying essentials`}>
    <div className="country-overview-title"><span className="tool-icon"><Icon name="shield"/></span><div><span className="eyebrow">Your buying field guide</span><h2>A clearer route to your next car.</h2></div></div>
    <dl className="country-facts"><div><dt>Market</dt><dd>{market.name}</dd></div><div><dt>Budget in</dt><dd>{market.currency}</dd></div><div><dt>Distance</dt><dd>{market.distance}</dd></div><div><dt>Verify with</dt><dd>{market.authority}</dd></div></dl>
    <div className="country-overview-actions"><a href="#official-resources">Official verification resources <span aria-hidden="true">↗</span></a><Link href={market.tool}>{["PK","AE","GB"].includes(guide.region)?"Calculate local running costs":guide.region==="US"?"Plan your budget":"Open the inspection checklist"} <Icon name="arrow"/></Link></div>
  </section>;
}
