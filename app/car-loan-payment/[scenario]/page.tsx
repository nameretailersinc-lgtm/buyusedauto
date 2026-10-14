import {notFound} from "next/navigation";
import {scenarios,scenarioPath} from "@/data/scenarios";
import {metadata} from "@/lib/site";
import ScenarioPage from "@/components/scenario-page";
export const dynamicParams=false;
export function generateStaticParams(){return scenarios.filter(s=>s.kind==="payment").map(s=>({scenario:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{scenario:string}>}){const {scenario}=await params;const s=scenarios.find(s=>s.kind==="payment"&&s.slug===scenario);return s?metadata(s.title,s.description,scenarioPath(s)):{};}
export default async function Page({params}:{params:Promise<{scenario:string}>}){const {scenario}=await params;const s=scenarios.find(s=>s.kind==="payment"&&s.slug===scenario);if(!s)notFound();return <ScenarioPage scenario={s}/>;}
