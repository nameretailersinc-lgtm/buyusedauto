export function normalizeSiteOrigin(value:string){
  const url=new URL(value);
  if(url.protocol!=="https:"||url.username||url.password||url.search||url.hash||url.pathname!=="/")throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without credentials, a path, query, or fragment.");
  return url.origin;
}
export function indexingEnabled(env:Record<string,string|undefined>){
  if(env.SITE_INDEXING&&!['enabled','disabled'].includes(env.SITE_INDEXING))throw new Error("SITE_INDEXING must be enabled or disabled.");
  return env.SITE_INDEXING!=="disabled"&&(!env.VERCEL_ENV||env.VERCEL_ENV==="production");
}
