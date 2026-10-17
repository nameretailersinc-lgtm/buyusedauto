// Currency belongs to the published tool, not the visitor's selected display locale.
export function applicationCurrency(path) {
  if (path.startsWith("/pk/")) return "PKR";
  const country = path.match(/^\/tools\/([^/]+)\/car-running-cost-calculator$/)?.[1];
  return ({pakistan:"PKR",uae:"AED",uk:"GBP",germany:"EUR"})[country] ?? "USD";
}

export function hasFreeApplicationOffer(node, path) {
  const price = node.offers?.price;
  return (price === 0 || price === "0") && node.offers.priceCurrency === applicationCurrency(path);
}
