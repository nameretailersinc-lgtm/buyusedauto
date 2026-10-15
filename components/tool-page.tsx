import Image from "next/image";
import Link from "next/link";
import Calculator from "./calculator";
import Inspection from "./inspection";
import {Breadcrumbs,JsonLd} from "./seo";
import {Icon} from "./icon";
import {BudgetBanner} from "./budget-banner";
import {Tool,tools} from "@/data/tools";
import {toolContent} from "@/data/tool-content";
import {guides} from "@/data/guides";
import {siteUrl} from "@/lib/site";
import {scenarios,scenarioPath} from "@/data/scenarios";
import {toolImages,toolImageAlt} from "@/data/visuals";
export function ToolPage({tool}:{tool:Tool}){
  const content=toolContent[tool.id];const relatedGuides=guides.filter(g=>g.relatedTools.includes(tool.slug)).slice(0,3);const isLoan=tool.id==="loan";
  return <div className={`tool-page has-calculator ${isLoan?"loan-page":""}`}>
    <section className={`tool-hero tool-hero-scenic tool-scene-${tool.id}`}>
      <Image src={`/images/${toolImages[tool.id]}.webp`} alt={toolImageAlt[tool.id]} fill preload sizes="100vw" className="tool-hero-image"/>
      <div className="container"><Breadcrumbs items={[{name:"Tools",href:"/tools"},{name:tool.name,href:`/${tool.slug}`}]}/><div className="page-heading"><span className="eyebrow">{tool.category} tool</span><h1>{tool.name}</h1><p>{tool.intro}</p><div className="tool-badges"><span><Icon name="shield"/>Free to use</span><span><Icon name="check"/>No account needed</span><span><Icon name="calculator"/>Transparent results</span><span><Icon name="book"/>Methodology v1.0</span></div></div></div>
    </section>
    <div className="container tool-workspace">
      {tool.id==="inspection"?<Inspection/>:<Calculator tool={tool}/>}
      <div className="content-layout"><article className="prose tool-prose"><h2 id="methodology">How it works</h2>
        {content.explanation.map(p=><p key={p}>{p}</p>)}
        {isLoan&&<div className="how-steps">{[["Add your details","Enter price, down payment, interest rate, and term."],["We calculate","Standard amortization estimates monthly payments."],["See your results","Check interest, principal, and the full schedule."],["Compare options","Adjust the numbers to explore another scenario."]].map(([title,text],i)=><div key={title}><span>{i+1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>}
        <div className="formula-panel"><div><span className="tool-icon"><Icon name="calculator"/></span><h3>The formula behind the estimate</h3><p>Every result starts with a defined model and visible assumptions.</p></div><pre className="formula">{content.formula}</pre></div>
        {tool.id==="inspection"&&<section><h2>Download a used car inspection checklist PDF</h2><p>Use Print / save PDF above and choose Save as PDF in the browser print dialog. You can save a blank checklist before your viewing or a report with your recorded observations afterwards. Download findings exports CSV for a spreadsheet. Neither report is a professional inspection certificate.</p><p><Link href="/guides/how-to-inspect-a-used-car#section-1">Questions to ask a private seller</Link> help you prepare before viewing. Use our <Link href="/guides/international-used-car-buying-checks">country-specific buying and transfer resources</Link> for local paperwork.</p></section>}{tool.id==="depreciation"&&<section><h2>Can I calculate depreciation by model?</h2><p>This tool uses your purchase value and assumed depreciation inputs; it has no model-year transaction database. Compare local listings and written offers for the exact model, trim, age and mileage, then test several assumptions. The result is a planning scenario rather than a verified forecast for a Toyota, Honda or any other model.</p></section>}<h2>A worked example</h2><p>{content.example}</p>
        {content.sections.map(section=><section key={section.heading} className={section.heading.includes("lender")?"method-note":undefined}><h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}
        <h2>Questions worth asking</h2><div className="faq-group">{content.faq.map(f=><details className="faq" key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div>
        <p className="source-list tool-disclaimer">This is general information, not personalized financial advice. <Link href="/disclaimer">Read the limitations.</Link></p>
      </article><aside className="tool-sidebar">
        <div className="related-sidebar"><h2>Continue your research</h2>{content.related.map(slug=><Link href={`/${slug}`} key={slug}><Icon name="receipt"/><span>{tools.find(t=>t.slug===slug)?.name}</span><span aria-hidden="true">›</span></Link>)}<h2>Read before you decide</h2>{relatedGuides.map(g=><Link href={`/guides/${g.slug}`} key={g.slug}><Icon name="book"/><span>{g.title}</span><span aria-hidden="true">›</span></Link>)}<span className="micro">Understand the assumptions</span><Link href="/editorial-policy">Our editorial policy <span aria-hidden="true">↗</span></Link></div>
        <div className="sidebar-photo"><Image src={`/images/${toolImages[tool.id]}.webp`} alt={toolImageAlt[tool.id]} width={600} height={300} sizes="300px"/></div>
        <section className="sidebar-tips"><h2>Make the estimate more useful</h2><ul>{content.tips.map(t=><li key={t}><Icon name="check"/><span>{t}</span></li>)}</ul></section>
        <section className="sidebar-sources"><Icon name="book"/><h2>Sources and further reading</h2><ul>{content.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a></li>)}</ul><p>Sources support the surrounding guidance. Scenario assumptions are our modeling choices.</p></section>
      </aside></div>
      {isLoan&&<section className="loan-scenarios"><h2>Explore a specific borrowing decision</h2><div className="scenario-tile-grid">{scenarios.map(s=><Link className="scenario-tile" key={s.slug} href={scenarioPath(s)}><div><Image src="/images/mountain-suv.webp" alt="SUV parked beside a mountain road" width={300} height={150} sizes="200px"/></div><h3>{s.title}</h3><p>{s.focus}<span aria-hidden="true">→</span></p></Link>)}</div></section>}
      <BudgetBanner/>
    </div>
    <JsonLd data={{"@context":"https://schema.org","@type":"WebApplication","@id":`${siteUrl}/${tool.slug}#application`,name:tool.name,url:`${siteUrl}/${tool.slug}`,description:tool.description,applicationCategory:tool.id==="inspection"?"UtilitiesApplication":"FinanceApplication",operatingSystem:"Any",browserRequirements:tool.id==="inspection"?"Requires JavaScript to record checklist observations":"Requires JavaScript for interactive calculations",offers:{"@type":"Offer",price:"0",priceCurrency:"USD"},isAccessibleForFree:true}}/>
  </div>;
}
