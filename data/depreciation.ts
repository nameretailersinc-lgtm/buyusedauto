/** Illustrative planning curves, NOT measurements of market prices. */
export const depreciationModel = {
  version: "1.0",
  firstYearPercent: 18,
  laterYearPercent: 12,
  expectedAnnualMiles: 12000,
  mileageAdjustmentPerMile: 0.000002,
  maxMileageAdjustment: 0.2,
  conditions: { excellent: 1.05, good: 1, fair: 0.85, poor: 0.65 },
  trims: { base: 1, mid: 1.05, premium: 1.1 },
  tradeMultiplier: 0.85,
  retailMultiplier: 1.15,
  rangePercent: 0.15,
} as const;
