import type {Guide} from "@/data/guides";
import {Icon} from "./icon";

export function GuideKeyTakeaways({guide}:{guide:Guide}){
  const selected=guide.sections.filter(section=>/^\d+\.|^Step \d+/.test(section.heading)).slice(0,5);
  const items=selected.length?selected.map(section=>section.heading.replace(/^(?:Step )?\d+[.:]?\s*/,"")):guide.sections.filter(section=>!/^Frequently|^Conclusion|^Final/.test(section.heading)).slice(0,4).map(section=>section.heading);
  return <section className="guide-takeaways" aria-labelledby="takeaways-title"><Icon name="check"/><div><h2 id="takeaways-title">Key takeaways</h2><ul>{items.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></div></section>;
}
