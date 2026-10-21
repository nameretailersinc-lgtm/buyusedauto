/** Contextual additions shared by guide and calculator rendering. */
export const additionalToolLinks:Record<string,string[]>={
  "total-cost-of-ownership-calculator":["car-maintenance-cost-calculator","car-cost-per-mile-calculator","gas-vs-electric-car-cost-calculator"],
  "car-repair-cost-calculator":["car-maintenance-cost-calculator"],
  "car-depreciation-calculator":["car-cost-per-mile-calculator"],
  "fuel-cost-calculator":["gas-vs-electric-car-cost-calculator","car-cost-per-mile-calculator"],
  "ev-charging-cost-calculator":["gas-vs-electric-car-cost-calculator"],
  "car-affordability-calculator":["car-maintenance-cost-calculator"],
};
export const additionalGuideTools:Record<string,string[]>={
  "used-car-maintenance-costs":["car-maintenance-cost-calculator","car-repair-cost-calculator","car-cost-per-mile-calculator"],
  "real-cost-of-car-ownership":["car-cost-per-mile-calculator","car-maintenance-cost-calculator","gas-vs-electric-car-cost-calculator"],
  "used-car-vs-new-car":["gas-vs-electric-car-cost-calculator","car-maintenance-cost-calculator"],
  "how-much-car-payment-can-i-afford":["car-maintenance-cost-calculator","car-down-payment-calculator"],
  "how-much-down-payment-for-used-car":["car-down-payment-calculator","car-loan-apr-calculator"],
  "how-to-compare-used-car-loans":["car-loan-apr-calculator","auto-loan-refinance-calculator","car-loan-payoff-calculator"],
};
export const relatedToolSlugs=(slug:string,existing:string[])=>[...new Set([...existing,...(additionalToolLinks[slug]??[])])];
export const guideToolSlugs=(slug:string,existing:string[])=>[...new Set([...existing,...(additionalGuideTools[slug]??[])])];
