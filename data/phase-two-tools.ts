import type {Tool,Field} from "./tools";
import {markets} from "../lib/markets";

const amount=(key:string,label:string,value:number,help?:string):Field=>({key,label,value:String(value),unit:"$",min:0,max:100000000,step:.01,help});
const numeric=(key:string,label:string,value:number,unit:string,max:number,help?:string):Field=>({key,label,value:String(value),unit,min:0,max,step:unit==="months"?1:.01,help});
const market:Field={key:"market",label:"Country / currency",value:"US",help:"Display currency only; enter all amounts in the chosen currency. No conversion or local rates are supplied.",options:Object.entries(markets).map(([value,config])=>({value,label:`${config.name} (${config.currency})`}))};

export const phaseTwoTools:Tool[]=[
  {
    id:"apr",slug:"car-loan-apr-calculator",name:"Car loan APR calculator: see the true cost with fees",short:"Loan APR",category:"Financing",icon:"calculator",multiCurrency:true,
    description:"Find a car loan’s real APR once fees are counted. Compare the nominal rate, effective annual rate, monthly payment and total credit cost.",
    intro:"See what a loan costs per year once fees are included. Keep fees you pay upfront separate from fees added to the balance, and stick to one currency. This is a handy way to compare offers side by side, but your lender’s own APR disclosure is the one that counts.",
    fields:[market,amount("principal","Loan proceeds before upfront charges",20000,"Exclude financed finance charges entered separately below."),numeric("rate","Annual contract interest rate",7,"%",100,"Use the interest rate charged on principal, not an already fee-inclusive APR."),numeric("months","Loan term",60,"months",120),amount("upfront","Upfront finance charges",300,"Include charges treated as credit costs. Do not include a down payment."),amount("financed","Financed finance charges",200,"These increase the loan balance, not the useful proceeds.")],
  },
  {
    id:"repair",slug:"car-repair-cost-calculator",name:"Car repair cost calculator: budget from your quote",short:"Repair cost",category:"Ownership",icon:"calculator",multiCurrency:true,
    description:"Add up a repair quote with parts, labor, diagnostic fees and tax, then add a cushion for surprises. Compare written estimates side by side before you say yes.",
    intro:"Got a repair quote? Enter the parts, labor hours, hourly rate, fees and tax to see the full total. Add a separate buffer for budgeting, and make sure the quotes you compare cover the same work. The example amounts are only illustrations. This tool can’t diagnose a problem or look up prices for your car.",
    fields:[market,amount("parts","Quoted parts total",300),numeric("hours","Quoted labor hours",2,"hours",10000,"Use billed hours from the quote, including flat-rate hours when applicable."),{...amount("rate","Quoted labor rate per hour",100),unit:"$/hour"},amount("diagnostic","Separate diagnostic charge",75,"Enter 0 if included or waived. Do not count it twice."),amount("other","Other quoted fees",25),amount("tax","Quoted tax amount",40,"Enter the verified tax amount, not a percentage. Use 0 if already included."),amount("credit","Confirmed warranty or other credit",0,"Only a confirmed reduction, not a potential reimbursement."),numeric("contingency","Additional budget contingency",10,"%",100,"Your chosen cash reserve, not a predicted repair charge.")],
  },
  {
    id:"registration",slug:"car-registration-tax-calculator",name:"Car registration tax and fee calculator: yearly costs",short:"Registration costs",category:"Ownership",icon:"receipt",multiCurrency:true,
    description:"Plan what registering a car will cost, using fees you’ve verified locally. One-time charges and yearly costs are kept apart, and there’s a sourced UK DVLA option.",
    intro:"Build a registration budget from one-time charges and yearly vehicle tax or registration fees. Enter amounts you’ve checked locally in your own currency, or pick the sourced UK first-registration fee if it applies. Purchase sales tax is separate, and this can’t work out the tax band for a specific vehicle.",
    fields:[market,{key:"profile",label:"Registration fee source",value:"manual",options:[{value:"manual",label:"Enter a locally verified fee"},{value:"gb-first",label:"UK DVLA first registration: non-exempt"},{value:"gb-exempt",label:"UK: previously registered / confirmed fee exemption"}],help:"UK options require GBP and confirmed eligibility. They cover only the first-registration fee, not annual vehicle tax."},{...amount("registration","Verified one-time registration fee",0,"For recurring renewals, use annual fees below."),when:{key:"profile",values:["manual"]}},amount("title","One-time title or document charges",0),amount("inspection","One-time inspection charge",0,"Enter recurring inspection costs in annual other fees instead."),amount("other","Other one-time charges",0),amount("annualTax","Verified annual vehicle tax",0,"Full annual amount for your vehicle and payment method; no tax band is inferred."),amount("annualFees","Annual registration and other recurring fees",0,"Exclude tax and charges already entered above."),numeric("months","Budget period",12,"months",120,"Annual amounts are prorated for budgeting, not a legal payment schedule.")],
  },
];
