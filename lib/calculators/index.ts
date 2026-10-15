import { depreciationModel as model } from "../../data/depreciation";
import { markets, type Currency } from "../markets";

export function valid(value: number, label: string, min = 0, max = 100000000) {
  if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min.toLocaleString("en-US")} and ${max.toLocaleString("en-US")}.`);
  return value;
}
function integer(value: number, label: string, min: number, max: number) {
  valid(value, label, min, max);
  if (!Number.isInteger(value)) throw new Error(`${label} must be a whole number.`);
  return value;
}
export const cents = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
export function monthlyPayment(principal: number, annualRate: number, months: number) {
  valid(principal, "Amount financed"); valid(annualRate, "Annual interest rate", 0, 100); integer(months, "Term", 1, 120);
  const r = annualRate / 1200;
  return principal === 0 ? 0 : r === 0 ? principal / months : principal * r / -Math.expm1(-months * Math.log1p(r));
}
export type LoanInput = { price: number; down: number; trade: number; payoff: number; fees: number; rate: number; months: number; extra: number; tax?: number; currency?: Currency };
export type PaymentRow = { month: number; payment: number; principal: number; interest: number; balance: number };
export function loan(input: LoanInput) {
  for (const key of ["price", "down", "trade", "payoff", "fees", "rate", "months", "extra"] as const) valid(input[key], key);
  const tax = valid(input.tax ?? 0, "Financed tax");
  const currency = input.currency ?? "USD";
  if (!Object.values(markets).some(market => market.currency === currency)) throw new Error("Choose a supported currency. Currency does not convert amounts.");
  const net = input.price + input.fees + tax + input.payoff - input.down - input.trade;
  const principal = cents(Math.max(0, net));
  const unappliedCredit = cents(Math.max(0, -net));
  const payment = monthlyPayment(principal, input.rate, input.months);
  const schedule: PaymentRow[] = [];
  let balance = principal;
  for (let month = 1; balance > 0 && month <= input.months; month++) {
    const interest = cents(balance * input.rate / 1200);
    const paid = month === input.months ? cents(balance + interest) : Math.min(cents(payment + input.extra), cents(balance + interest));
    const principalPaid = cents(paid - interest);
    balance = Math.max(0, cents(balance - principalPaid));
    schedule.push({ month, payment: paid, principal: principalPaid, interest, balance });
  }
  const interest = cents(schedule.reduce((sum, row) => sum + row.interest, 0));
  return { principal, payment: cents(payment), interest, total: cents(principal + interest), months: schedule.length, schedule, unappliedCredit, currency };
}
/** Same inputs and rate; compare principal-only extra payments with scheduled repayment. */
export function compareLoanPayoff(input: LoanInput) {
  const baseline = loan({ ...input, extra: 0 });
  const accelerated = loan(input);
  return { baseline, accelerated, interestSaved: cents(baseline.interest - accelerated.interest), monthsSaved: baseline.months - accelerated.months };
}
export function depreciation(price: number, years: number, first: number, annual: number) {
  valid(price, "Starting value"); integer(years, "Years", 0, 40); valid(first, "First-year decline", 0, 100); valid(annual, "Annual decline", 0, 100);
  const values = Array.from({ length: years + 1 }, (_, year) => ({ year, value: cents(year === 0 ? price : price * (1 - first / 100) * Math.pow(1 - annual / 100, year - 1)) }));
  const residual = values[values.length - 1].value;
  return { values, residual, loss: cents(price - residual), percent: price ? (price - residual) / price * 100 : 0 };
}
export function valuation(price: number, age: number, mileage: number, condition: keyof typeof model.conditions, trim: keyof typeof model.trims) {
  valid(price, "Original base MSRP", 1); integer(age, "Vehicle age", 0, 40); valid(mileage, "Odometer", 0, 2000000);
  if (!Object.hasOwn(model.conditions, condition) || !Object.hasOwn(model.trims, trim)) throw new Error("Choose a listed condition and trim.");
  const base = depreciation(price, age, model.firstYearPercent, model.laterYearPercent).residual;
  const difference = mileage - age * model.expectedAnnualMiles;
  const adjustment = Math.max(-model.maxMileageAdjustment, Math.min(model.maxMileageAdjustment, -difference * model.mileageAdjustmentPerMile));
  const privateValue = cents(base * (1 + adjustment) * model.conditions[condition] * model.trims[trim]);
  const range = (value: number) => ({ low: cents(value * (1 - model.rangePercent)), high: cents(value * (1 + model.rangePercent)), midpoint: cents(value) });
  return { privateSale: range(privateValue), trade: range(privateValue * model.tradeMultiplier), retail: range(privateValue * model.retailMultiplier), adjustment };
}
export function fuel(distance: number, efficiency: number, price: number, units: "us" | "metric") {
  valid(distance, "Distance", 0, 1000000); valid(efficiency, "Fuel economy", 0.1, 1000); valid(price, "Fuel price", 0, 1000);
  if (units !== "us" && units !== "metric") throw new Error("Choose US or metric units.");
  const quantity = units === "us" ? distance / efficiency : distance * efficiency / 100;
  return { quantity, cost: cents(quantity * price), perDistance: distance ? quantity * price / distance : 0 };
}
export type TcoInput = { price: number; resale: number; years: number; miles: number; mpg: number; fuelPrice: number; insurance: number; maintenance: number; annualFees: number; purchaseFees: number; down: number; rate: number; months: number };
export function ownership(input: TcoInput) {
  Object.entries(input).forEach(([key, value]) => valid(value, key));
  integer(input.years, "Ownership years", 1, 10);
  const financing = loan({ price: input.price, down: input.down, trade: 0, payoff: 0, fees: 0, rate: input.rate, months: input.months, extra: 0 });
  const interest = cents(financing.schedule.slice(0, input.years * 12).reduce((sum, row) => sum + row.interest, 0));
  const parts = [
    { label: "Depreciation", value: cents(input.price - input.resale) },
    { label: "Fuel", value: cents(fuel(input.miles, input.mpg, input.fuelPrice, "us").cost * input.years) },
    { label: "Insurance", value: cents(input.insurance * input.years) },
    { label: "Maintenance", value: cents(input.maintenance * input.years) },
    { label: "Taxes & fees", value: cents(input.purchaseFees + input.annualFees * input.years) },
    { label: "Loan interest", value: interest },
  ];
  const total = cents(parts.reduce((sum, part) => sum + part.value, 0));
  return { parts, total, monthly: total / (12 * input.years), perMile: input.miles ? total / (input.miles * input.years) : null, remainingBalance: financing.schedule[Math.min(input.years * 12, financing.months) - 1]?.balance ?? 0 };
}
export function affordability(grossMonthly: number, debts: number, down: number, running: number, rate: number) {
  [grossMonthly, debts, down, running, rate].forEach(n => valid(n, "Budget input"));
  const paymentBudget = Math.max(0, Math.min(grossMonthly * 0.1 - running, grossMonthly * 0.36 - debts - running));
  const factor = monthlyPayment(1, rate, 48);
  const financeLimit = paymentBudget / factor;
  const price = Math.max(0, Math.min(down / 0.2, down + financeLimit));
  const principal = Math.max(0, price - down);
  return { price: cents(price), payment: cents(monthlyPayment(principal, rate, 48)), paymentBudget: cents(paymentBudget), principal: cents(principal), transportBudget: cents(grossMonthly * 0.1) };
}
export type LeaseInput = { price: number; down: number; rate: number; loanMonths: number; horizon: number; resale: number; leasePayment: number; leaseDue: number; leaseFees: number; extraMiles: number; mileageFee: number };
export function leaseVsBuy(input: LeaseInput) {
  Object.entries(input).forEach(([key, value]) => valid(value, key));
  integer(input.horizon, "Comparison months", 1, 60);
  const buying = loan({price: input.price, down: input.down, trade: 0, payoff: 0, fees: 0, rate: input.rate, months: input.loanMonths, extra: 0});
  const paidRows = buying.schedule.slice(0, input.horizon);
  const paid = paidRows.reduce((sum, row) => sum + row.payment, 0);
  const balance = paidRows.at(-1)?.balance ?? 0;
  const equity = input.resale - balance;
  const buyCost = cents(Math.min(input.down, input.price) + paid - equity);
  const leaseCost = cents(input.leaseDue + input.leasePayment * input.horizon + input.leaseFees + input.extraMiles * input.mileageFee);
  return { buyCost, leaseCost, equity: cents(equity), balance, difference: cents(leaseCost - buyCost), buyPayment: buying.payment };
}
export function negotiation(market: number, repairs: number, fees: number, discount: number) {
  valid(market, "Comparable value", 1); valid(repairs, "Repairs"); valid(fees, "Fees"); valid(discount, "Opening discount", 0, 30);
  if (repairs > market) throw new Error("Repair deductions exceed comparable value. Reassess the car before making an offer.");
  const ceiling = market - repairs;
  const target = cents(ceiling * (1 - discount / 100));
  return { target, ceiling: cents(ceiling), total: cents(target + fees), savings: cents(market - target) };
}
export function salesTax(price: number, taxableFees: number, allowedCredit: number, rate: number, nonTaxableFees: number) {
  [price, taxableFees, allowedCredit, nonTaxableFees].forEach(n => valid(n, "Tax input")); valid(rate, "Combined tax rate", 0, 25);
  if (allowedCredit > price + taxableFees) throw new Error("Allowed credit exceeds the taxable purchase amount.");
  const taxable = cents(price + taxableFees - allowedCredit);
  const tax = cents(taxable * rate / 100);
  return { taxable, tax, total: cents(price + taxableFees + nonTaxableFees + tax) };
}
export type InspectionState = "unchecked" | "pass" | "concern" | "na";
export function inspectionProgress(states: InspectionState[]) {
  if (states.some(s => !["unchecked", "pass", "concern", "na"].includes(s))) throw new Error("Invalid inspection status.");
  const completed = states.filter(s => s !== "unchecked").length;
  return { completed, concerns: states.filter(s => s === "concern").length, total: states.length, percent: states.length ? Math.round(completed / states.length * 100) : 0 };
}
