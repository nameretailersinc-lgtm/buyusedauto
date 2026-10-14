import Image from "next/image";
import Link from "next/link";
import {Icon} from "./icon";
export function BudgetBanner(){return <section className="budget-banner"><Image src="/images/mountain-suv.webp" alt="" fill sizes="(max-width: 760px) 100vw, 1200px"/><div><span className="eyebrow">Ready to find your next car?</span><h2>The right car starts with the right budget.</h2><p>Use free tools and practical guides to make a more informed decision.</p></div><Link className="button" href="/car-affordability-calculator">Find your budget <Icon name="arrow"/></Link></section>;}
