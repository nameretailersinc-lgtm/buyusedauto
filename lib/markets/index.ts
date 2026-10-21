/** Display conventions only. No current rates, taxes, fees or eligibility rules. */
export const markets = {
  US: { name: "United States", currency: "USD", locale: "en-US", distance: "miles", fuel: "US gallons", path:"/tools" },
  PK: { name: "Pakistan", currency: "PKR", locale: "en-PK", distance: "kilometers", fuel: "liters", path:"/pk/car-financing-calculator" },
  IN: { name: "India", currency: "INR", locale: "en-IN", distance: "kilometers", fuel: "liters" },
  GB: { name: "United Kingdom", currency: "GBP", locale: "en-GB", distance: "miles", fuel: "liters" },
  CA: { name: "Canada", currency: "CAD", locale: "en-CA", distance: "kilometers", fuel: "liters" },
  AU: { name: "Australia", currency: "AUD", locale: "en-AU", distance: "kilometers", fuel: "liters" },
  AE: { name: "United Arab Emirates", currency: "AED", locale: "en-AE", distance: "kilometers", fuel: "liters" },
  EU: { name: "Euro area", currency: "EUR", locale: "en-IE", distance: "kilometers", fuel: "liters" },
} as const;
export type Market = keyof typeof markets;
export type Currency = (typeof markets)[Market]["currency"];
export const defaultMarket = markets.US;
export function formatMoney(amount: number, market: Market = "US", digits = 0) {
  const config = markets[market];
  return new Intl.NumberFormat(config.locale, { style: "currency", currency: config.currency, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(amount);
}
