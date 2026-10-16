import {cents, loan, valid, type LoanInput} from "./index";

/** Manual KIBOR scenario: benchmark and spread are user inputs, held fixed. */
export function pakistanConventional(input:Omit<LoanInput,"currency"|"rate">&{benchmark:number;spread:number}){
  const rate=valid(input.benchmark,"Entered benchmark",0,100)+valid(input.spread,"Entered spread",0,100);
  return loan({...input,rate,currency:"PKR"});
}
export type IslamicRow={rental:number;purchase:number;other:number};
export type IslamicInput={mode:"ijarah"|"diminishing-musharakah";upfront:number;refund:number;fees:number;finalPurchase:number;rows:IslamicRow[]};
function cash(value:number,label:string){
  valid(value,label);
  if(Math.abs(value*100-Math.round(value*100))>0.000001)throw new Error(`${label} must have at most two decimal places.`);
}
/** Summarize supplied cash flows, never infer rentals from an interest rate.
 * Contract context: Meezan Car Ijarah, UBL Ameen Drive and SBP Islamic FAQs;
 * checked 2026-10-15. Source URLs are published in data/pakistan.ts.
 */
export function islamicQuote(input:IslamicInput){
  if(!["ijarah","diminishing-musharakah"].includes(input.mode))throw new Error("Choose a supported Islamic contract mode.");
  for(const key of ["upfront","refund","fees","finalPurchase"] as const)cash(input[key],key);
  if(input.refund>input.upfront)throw new Error("Deposit returned cannot exceed the upfront amount entered.");
  if(input.mode==="diminishing-musharakah"&&input.refund!==0)throw new Error("Ownership contribution is not a refundable deposit. Enter any separate deposit outside this summary.");
  if(!input.rows.length||input.rows.length>120)throw new Error("Enter a quoted monthly schedule with between 1 and 120 rows.");
  const schedule=input.rows.map((row,index)=>{
    for(const key of ["rental","purchase","other"] as const)cash(row[key],`Month ${index+1} ${key}`);
    if(input.mode==="ijarah"&&row.purchase!==0)throw new Error("For Ijarah, use rental and other charges; enter any end purchase separately.");
    return {month:index+1,...row,payment:cents(row.rental+row.purchase+row.other)};
  });
  const rentals=cents(schedule.reduce((sum,row)=>sum+row.rental,0));
  const purchases=cents(schedule.reduce((sum,row)=>sum+row.purchase,0));
  const charges=cents(schedule.reduce((sum,row)=>sum+row.other,0));
  const gross=cents(input.upfront+input.fees+input.finalPurchase+schedule.reduce((sum,row)=>sum+row.payment,0));
  return {currency:"PKR" as const,schedule,rentals,purchases,charges,gross,net:cents(gross-input.refund),refund:input.refund};
}
/** Numeric schedule only: one month per line, rental,purchase,other. */
export function parseIslamicSchedule(text:string):IslamicRow[]{
  if(text.length>20000)throw new Error("Schedule is too long. Enter numeric amounts only.");
  const lines=text.trim().split(/\r?\n/);
  if(!text.trim()||lines.length>120)throw new Error("Paste between 1 and 120 monthly rows from your quote.");
  return lines.map((line,index)=>{
    const cells=line.split(",").map(cell=>cell.trim());
    if(cells.length!==3||cells.some(cell=>!/^\d+(?:\.\d{1,2})?$/.test(cell)))throw new Error(`Row ${index+1}: enter rental,purchase,other using plain nonnegative amounts, no currency symbols or thousands separators.`);
    const [rental,purchase,other]=cells.map(Number);
    return {rental,purchase,other};
  });
}
