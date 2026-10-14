import type { NextConfig } from "next";
import {indexingEnabled,normalizeSiteOrigin} from "./lib/seo-config";
const canIndex=indexingEnabled(process.env);
const origin=normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL||"https://buyusedautomobiles.com");
const host=new URL(origin).hostname;
const nextConfig: NextConfig = {
  output: "standalone",
  distDir:process.env.NEXT_BUILD_DIR===".next-preview"?".next-preview":".next",
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,
  async redirects(){return canIndex?[{source:"/:path*",has:[{type:"host",value:host.startsWith("www.")?host.slice(4):`www.${host}`}],destination:`${origin}/:path*`,permanent:true}]:[];},
  async headers() {
    return [{ source: "/:path*", headers: [
      ...(!canIndex?[{key:"X-Robots-Tag",value:"noindex, follow"}]:[]),
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }
    ] },{source:"/og",headers:[{key:"X-Robots-Tag",value:"noindex"}]}];
  }
};
export default nextConfig;
