import Link from "next/link";
import type {GuideSection} from "@/data/guides";

export function GuideSectionDetails({section}: {section: GuideSection}) {
  return <>
    {section.table && <div className="table-wrap" role="region" aria-label={section.heading} tabIndex={0}><table className="data-table"><caption className="sr-only">{section.heading}</caption><thead><tr>{section.table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0 ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody></table></div>}
    {section.subsections?.map(subsection => <div key={subsection.heading}><h3>{subsection.heading}</h3>{subsection.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{subsection.bullets&&<ul>{subsection.bullets.map(bullet=><li key={bullet}>{bullet}</li>)}</ul>}<GuideSectionDetails section={subsection}/>{subsection.links&&<GuideSectionLinks links={subsection.links}/>}</div>)}
  </>;
}

export function GuideSectionLinks({links}: {links: NonNullable<GuideSection["links"]>}) {
  return <ul>{links.map(link => <li key={link.url}>{link.url.startsWith("/") ? <Link href={link.url}>{link.title}</Link> : <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>}</li>)}</ul>;
}
