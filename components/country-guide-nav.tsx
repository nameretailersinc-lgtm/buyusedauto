import Link from "next/link";
import {countryGuides} from "@/data/country-guides";

const names: Record<string,string> = {PK:"Pakistan",AE:"UAE",US:"USA",GB:"United Kingdom",EU:"Europe (EU)"};
export function CountryGuideNav({current}: {current?:string}) {
  return <nav className="country-guide-nav" aria-label="Choose a country buying guide"><span>Buying by country</span>{countryGuides.map(guide=><Link key={guide.slug} href={`/guides/${guide.slug}`} aria-current={current===guide.slug?"page":undefined}>{names[guide.region!]}</Link>)}</nav>;
}
