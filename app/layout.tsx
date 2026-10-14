import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Header, Footer } from "@/components/shell";
import { siteUrl, metadata as pageMetadata } from "@/lib/site";
import "./globals.css";
import "./reference-design.css";
import "./navigation.css";
import "./interior-pages.css";
const sans=DM_Sans({subsets:["latin"],display:"swap",variable:"--font-body"});
const display=Manrope({subsets:["latin"],display:"swap",variable:"--font-display"});
export const metadata:Metadata={...metadataBase(),metadataBase:new URL(siteUrl),verification:{google:process.env.NEXT_PUBLIC_GSC_VERIFICATION||undefined},icons:{icon:[{url:"/favicon.ico",sizes:"16x16 32x32 48x48"},{url:"/favicon-48.png",type:"image/png",sizes:"48x48"}],apple:[{url:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]}};
function metadataBase(){return pageMetadata("Free used car tools for better buying decisions","Make a more informed used-car decision with free calculators, practical buying guides, and transparent estimates. Plan your budget and total ownership cost.","/",{image:"/brand/social-cover-1200x630.webp"});}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={`${sans.variable} ${display.variable}`}><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>;}
