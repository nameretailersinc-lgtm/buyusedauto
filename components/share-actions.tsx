"use client";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {siteUrl} from "@/lib/site";
export function ShareActions(){
  const pathname=usePathname();const url=`${siteUrl}${pathname}`;
  const [status,setStatus]=useState("");
  async function share(){
    try{
      if(navigator.share){await navigator.share({title:document.title,url});setStatus("Share menu opened.");}
      else{await navigator.clipboard.writeText(url);setStatus("Page link copied.");}
    }catch(error){if(error instanceof Error&&error.name==="AbortError")return;setStatus("Copy the page address to share it.");}
  }
  return <div className="share-actions no-print" aria-label="Share this page"><button type="button" onClick={share}>Share page</button><a href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">WhatsApp<span className="sr-only"> (opens in a new tab)</span></a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a><span role="status">{status}</span></div>;
}
