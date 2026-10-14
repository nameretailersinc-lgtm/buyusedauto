import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());
const production=process.argv.includes("--production");
const errors=[],notes=[];
let origin;
try{const url=new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://buyusedautomobiles.com");if(url.protocol!=="https:"||url.username||url.password||url.pathname!=="/"||url.search||url.hash)throw new Error();origin=url.origin;}catch{errors.push("NEXT_PUBLIC_SITE_URL must be a valid HTTPS origin without credentials, path, query or fragment.");}
const mode=process.env.SITE_INDEXING;
if(mode&&!['enabled','disabled'].includes(mode))errors.push("SITE_INDEXING must be enabled or disabled.");
if(production){
  if(mode!=="enabled")errors.push("Set SITE_INDEXING=enabled for the reviewed public production build.");
  if(!process.env.NEXT_PUBLIC_OPERATOR_NAME?.trim())errors.push("Set the verified NEXT_PUBLIC_OPERATOR_NAME.");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.NEXT_PUBLIC_CONTACT_EMAIL||""))errors.push("Set a verified monitored NEXT_PUBLIC_CONTACT_EMAIL.");
  if(process.env.VERCEL_ENV&&process.env.VERCEL_ENV!=="production")errors.push("This environment is not a Vercel production build.");
}
if(process.env.NEXT_PUBLIC_GA_ID&&!/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID))errors.push("The configured GA4 measurement ID is invalid.");
if(process.env.NEXT_PUBLIC_ADSENSE_CLIENT&&!/^ca-pub-\d{16}$/.test(process.env.NEXT_PUBLIC_ADSENSE_CLIENT))errors.push("The configured AdSense publisher ID is invalid.");
notes.push("Advertising remains disabled; a publisher ID alone does not activate ads or provide a certified CMP.");
notes.push("This check validates configuration only. Operator details, mailbox operation, policies, DNS/HTTPS, deployment and Google indexing require external verification.");
console.log(JSON.stringify({mode:production?"public production":"preview/build preparation",canonicalOrigin:origin,indexing:process.env.VERCEL_ENV&&process.env.VERCEL_ENV!=="production"?"disabled by Vercel environment":mode||"enabled by default for standalone builds",errors,notes},null,2));
if(errors.length)process.exitCode=1;
