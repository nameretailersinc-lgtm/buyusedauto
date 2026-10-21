import type {Tool,Field} from "./tools";
import {markets} from "../lib/markets";

const amount=(key:string,label:string,value:number,help?:string):Field=>({key,label,value:String(value),unit:"$",min:0,max:100000000,step:.01,help});
const numeric=(key:string,label:string,value:number,unit:string,max:number,help?:string):Field=>({key,label,value:String(value),unit,min:0,max,step:unit==="months"?1:.01,help});
const market:Field={key:"market",label:"Country / currency",value:"US",help:"Display currency only; enter all amounts in the chosen currency. No conversion or local rates are supplied.",options:Object.entries(markets).map(([value,config])=>({value,label:`${config.name} (${config.currency})`}))};

export const phaseTwoTools:Tool[]=[
  {
    id:"apr",slug:"car-loan-apr-calculator",name:"Car loan APR calculator with finance fees",short:"Loan APR",category:"Financing",icon:"calculator",multiCurrency:true,
    description:"Estimate a car loan APR from its contract rate, term, and finance fees. Compare nominal APR, effective annual rate, monthly payments, and total credit cost.",
    intro:"Estimate the annualized cost of a regular monthly loan after the finance charges you enter. Separate fees paid upfront from fees added to the balance. Use the selected currency consistently. This equal-monthly cash-flow estimate helps compare offers; your lender provides the applicable legal APR disclosure.",
    fields:[market,amount("principal","Loan proceeds before upfront charges",20000,"Exclude financed finance charges entered separately below."),numeric("rate","Annual contract interest rate",7,"%",100,"Use the interest rate charged on principal, not an already fee-inclusive APR."),numeric("months","Loan term",60,"months",120),amount("upfront","Upfront finance charges",300,"Include charges treated as credit costs. Do not include a down payment."),amount("financed","Financed finance charges",200,"These increase the loan balance, not the useful proceeds.")],
  },
  {
    id:"repair",slug:"car-repair-cost-calculator",name:"Car repair cost calculator from your quote",short:"Repair cost",category:"Ownership",icon:"calculator",multiCurrency:true,
    description:"Calculate a car repair budget from quoted parts, labor, diagnostic fees, tax, and confirmed credits. Add a contingency and compare written repair estimates.",
    intro:"Total a written repair quote using your own parts prices, labor hours, hourly rate, fees and tax. Add a separate contingency for budgeting and compare quotes with the same scope. The example amounts are illustrative; this tool does not diagnose a fault or supply vehicle-specific market prices.",
    fields:[market,amount("parts","Quoted parts total",300),numeric("hours","Quoted labor hours",2,"hours",10000,"Use billed hours from the quote, including flat-rate hours when applicable."),{...amount("rate","Quoted labor rate per hour",100),unit:"$/hour"},amount("diagnostic","Separate diagnostic charge",75,"Enter 0 if included or waived. Do not count it twice."),amount("other","Other quoted fees",25),amount("tax","Quoted tax amount",40,"Enter the verified tax amount, not a percentage. Use 0 if already included."),amount("credit","Confirmed warranty or other credit",0,"Only a confirmed reduction, not a potential reimbursement."),numeric("contingency","Additional budget contingency",10,"%",100,"Your chosen cash reserve, not a predicted repair charge.")],
  },
  {
    id:"registration",slug:"car-registration-tax-calculator",name:"Car registration tax and fee calculator",short:"Registration costs",category:"Ownership",icon:"receipt",multiCurrency:true,
    description:"Plan car registration and recurring vehicle-tax costs using verified local fees. Separate one-time charges from annual costs, with a sourced UK DVLA option.",
    intro:"Build a registration budget from one-time charges and recurring annual vehicle tax or registration fees. Enter locally verified amounts in your chosen currency, or select the sourced UK first-registration fee when eligible. This budget is separate from purchase sales tax and does not determine a vehicle-specific tax band.",
    fields:[market,{key:"profile",label:"Registration fee source",value:"manual",options:[{value:"manual",label:"Enter a locally verified fee"},{value:"gb-first",label:"UK DVLA first registration: non-exempt"},{value:"gb-exempt",label:"UK: previously registered / confirmed fee exemption"}],help:"UK options require GBP and confirmed eligibility. They cover only the first-registration fee, not annual vehicle tax."},{...amount("registration","Verified one-time registration fee",0,"For recurring renewals, use annual fees below."),when:{key:"profile",values:["manual"]}},amount("title","One-time title or document charges",0),amount("inspection","One-time inspection charge",0,"Enter recurring inspection costs in annual other fees instead."),amount("other","Other one-time charges",0),amount("annualTax","Verified annual vehicle tax",0,"Full annual amount for your vehicle and payment method; no tax band is inferred."),amount("annualFees","Annual registration and other recurring fees",0,"Exclude tax and charges already entered above."),numeric("months","Budget period",12,"months",120,"Annual amounts are prorated for budgeting, not a legal payment schedule.")],
  },
];
