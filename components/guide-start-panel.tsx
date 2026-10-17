import type {GuideSection} from "@/data/guides";

export function GuideStartPanel({sections,readingMinutes}:{sections:GuideSection[];readingMinutes:number}) {
  const checklist=sections.findIndex(section=>/checklist/i.test(section.heading));
  const questions=sections.findIndex(section=>/frequently asked/i.test(section.heading));
  const links=[
    {label:"Read the guide",detail:`${readingMinutes} minutes, at your pace`,href:"#section-1",number:"01"},
    ...(checklist>=0?[{label:"Find the checklist",detail:"Keep the important checks together",href:`#section-${checklist+1}`,number:"02"}]:[]),
    ...(questions>=0?[{label:"Get a quick answer",detail:"Go straight to common questions",href:`#section-${questions+1}`,number:"03"}]:[{label:"Check the sources",detail:"See the original resources",href:"#sources",number:"03"}]),
  ];
  return <nav className="guide-start-panel no-print" aria-label="Choose how to read this guide"><div><span className="eyebrow">Make this guide work for you</span><h2>Where would you like to start?</h2></div><div className="guide-start-links">{links.map(link=><a href={link.href} key={link.href}><span className="start-number">{link.number}</span><span><strong>{link.label}</strong><small>{link.detail}</small></span><span aria-hidden="true">↗</span></a>)}</div></nav>;
}
