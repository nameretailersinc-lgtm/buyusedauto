import {metadata as meta} from "@/lib/site";
import {GuidesCollection} from "@/components/guides-collection";
export const metadata=meta("Used car buying guides and practical advice","Plain-English used car guides on inspections, history checks, loans, haggling, scams and running costs, plus country guides for the US, UK, UAE and Pakistan.","/guides");
export default function Guides(){return <GuidesCollection/>;}
