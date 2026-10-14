const paths: Record<string,string> = {
  calculator:"M6 3h12v18H6z M9 6h6v3H9z M9 13h.01 M15 13h.01 M9 17h.01 M15 17h.01",
  car:"m3 11 2-6h14l2 6 M3 11h18v7H3z M6 18v2 M18 18v2 M6 14h2 M16 14h2",
  chart:"M4 4v16h17 M7 7l5 5 4-2 5 6 M17 16h4v-4",
  wallet:"M3 6h16v14H3z M3 6l13-3v3 M15 11h6v5h-6z M17 13.5h.01",
  fuel:"M4 21V4h10v17 M4 10h10 M2 21h14 M17 5l3 3v9a2 2 0 0 1-4 0v-4h-2 M18 6v4h2",
  arrows:"M3 7h17l-4-4 M20 7l-4 4 M21 17H4l4-4 M4 17l4 4",
  check:"M8 4H5v17h14V4h-3 M8 3h8v4H8z M8 13l3 3 5-6",
  target:"M21 12a9 9 0 1 1-9-9 M17 12a5 5 0 1 1-5-5 M12 12l9-9 M17 3h4v4",
  receipt:"M5 3l3 2 4-2 4 2 3-2v18l-3-2-4 2-4-2-3 2z M9 9h6 M9 13h6",
  arrow:"M4 12h16 M14 6l6 6-6 6",
  shield:"M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z M8 12l3 3 5-6",
  sun:"M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6 1.4 1.4 M17 17l1.4 1.4 M5.6 18.4 1.4-1.4 M17 7l1.4-1.4 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  book:"M12 6C8 3 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-1-10 2z M12 6v15",
  download:"M12 3v12 M7 10l5 5 5-5 M4 16v5h16v-5",
};
export function Icon({name,className=""}:{name:string;className?:string}) { return <svg aria-hidden="true" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.car}/></svg>; }
