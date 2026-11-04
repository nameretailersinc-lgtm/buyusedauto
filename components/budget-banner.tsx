import Image from "next/image";
import Link from "next/link";
import {Icon} from "./icon";
export function BudgetBanner(){return <section className="budget-banner"><Image src="/images/mountain-suv.webp" alt="SUV parked beside a mountain road" fill sizes="(max-width: 760px) 100vw, 1200px"/><div><span className="eyebrow">Ready to find your next car?</span><h2>The right car starts with the right budget.</h2><p>Work out what you can comfortably pay each month, then measure every car against it.</p></div><Link className="button" href="/car-affordability-calculator">Find your budget <Icon name="arrow"/></Link></section>;}
