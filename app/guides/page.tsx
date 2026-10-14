import {metadata as meta} from "@/lib/site";
import {GuidesCollection} from "@/components/guides-collection";
export const metadata=meta("Used car buying guides and practical advice","Read practical guides to inspecting a used car, checking its history, comparing loans, negotiating the price, and understanding the full cost of ownership.","/guides");
export default function Guides(){return <GuidesCollection/>;}
