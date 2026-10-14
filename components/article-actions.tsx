"use client";
import {useState} from "react";
export function ArticleActions(){const [status,setStatus]=useState("");async function share(){try{await navigator.clipboard.writeText(location.origin+location.pathname);setStatus("Guide link copied.");}catch{setStatus("Copy this page’s address to share the guide.");}}return <div className="article-actions no-print"><button onClick={()=>window.print()}>Print guide</button><button onClick={share}>Copy link ↗</button><span role="status">{status}</span></div>;}
