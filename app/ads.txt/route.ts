export const dynamic="force-static";
export function GET(){const client=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||"";const publisher=client.replace(/^ca-/,"");const body=/^pub-\d{16}$/.test(publisher)?`google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`:"# No advertising sellers are authorized in this build.\n";return new Response(body,{headers:{"Content-Type":"text/plain; charset=utf-8"}});}
