import Image from "next/image";
import Link from "next/link";
import {Icon} from "@/components/icon";
export default function NotFound(){return <section className="not-found-scene"><Image src="/images/coastal-sedan.webp" alt="" fill sizes="100vw"/><div className="container"><div className="not-found-card"><span className="eyebrow pill">404 · A small detour</span><h1>Let’s get you back on the road.</h1><p>That page isn’t here. Find a calculator or a practical guide to continue planning your next car.</p><div className="button-row"><Link className="button" href="/tools">Explore the tools <Icon name="arrow"/></Link><Link className="button secondary" href="/guides">Read the guides</Link></div></div></div></section>;}


