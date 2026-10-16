import {PartnerLink} from "./partner-link";
import {partners} from "@/data/partners";
export function PartnerCards(){const configured=partners.filter(p=>/^https:\/\//.test(p.url)&&p.disclosure.trim());if(!configured.length)return null;return <section aria-label="Optional partner services">{configured.map(p=><article className="notice" key={p.url}><strong>{p.name}</strong><p>{p.description}</p><p>{p.disclosure}</p><PartnerLink url={p.url} name={p.name}/></article>)}</section>;}
