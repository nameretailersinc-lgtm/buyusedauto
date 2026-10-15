import {loan} from "../lib/calculators";
import {formatMoney} from "../lib/markets";

// Hypothetical inputs, not observations of vehicle prices or current bank rates.
const input={price:20000,down:0,trade:0,payoff:0,fees:0,rate:8,months:48,extra:0};
export const financeExamples={short:loan(input),long:loan({...input,months:72})};
const money=(value:number)=>formatMoney(value,"US",2);
const first=financeExamples.short.schedule[0];
const second=financeExamples.short.schedule[1];
export const monthlyInterestExample=`UNVERIFIED scenario inputs: $20,000 borrowed at an illustrative 8% annual contract rate for 48 months, with no fees. In this monthly model, first-month interest is $20,000 × (8 ÷ 1,200) = ${money(first.interest)}. Of the ${money(first.payment)} payment, ${money(first.principal)} reduces principal, leaving ${money(first.balance)}. The next month's interest uses that smaller balance and rounds to ${money(second.interest)}. These are calculated examples, not a current rate or lender quote.`;
export const loanTermExample=`Using the same UNVERIFIED $20,000 principal and illustrative 8% rate with no fees, the 48-month schedule has a regular payment of ${money(financeExamples.short.payment)} and total interest of ${money(financeExamples.short.interest)}. At 72 months, the regular payment is ${money(financeExamples.long.payment)} and total interest is ${money(financeExamples.long.interest)}. Both schedules round each month's interest and payment to cents and reconcile the final payment, matching the calculator.`;
export const loanTermDifference=`The longer term reduces the displayed regular payment by ${money(financeExamples.short.payment-financeExamples.long.payment)} but adds ${money(financeExamples.long.interest-financeExamples.short.interest)} of modeled interest. The final installment can differ from the regular payment. This comparison changes only the term; it does not imply that a lender offers the same rate for both terms or that the car remains affordable.`;
