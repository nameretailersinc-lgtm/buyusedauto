import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("trade offers show fee-adjusted shortfalls, invalidate stale results and work on mobile",async({page})=>{
  await page.setViewportSize({width:360,height:800});
  await page.goto("/trade-in-value-estimator");
  const comparison=page.locator("#compare-offers");
  await comparison.getByRole("button",{name:"Compare net proceeds"}).click();
  await expect(comparison.getByRole("alert")).toContainText("Enter every amount");
  for(const [key,value] of Object.entries({offer1:"10000",offer2:"10500",offer3:"11000",payoff:"12000",dealerFees:"100",privatePrice:"13000",privateFees:"500"}))await page.locator(`#offer-${key}`).fill(value);
  await comparison.getByRole("button",{name:"Compare net proceeds"}).click();
  await expect(comparison.getByRole("row").filter({hasText:"Dealer 1"})).toContainText("-$2,100.00");
  await expect(comparison).toContainText("$1,600.00");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await comparison.getByRole("region",{name:"Offer comparison results"}).focus();
  await expect(comparison.getByRole("region")).toBeFocused();
  expect((await new AxeBuilder({page}).include("#compare-offers").withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()).violations).toEqual([]);
  await page.locator("#offer-payoff").fill("0");
  await expect(comparison.getByRole("table")).toHaveCount(0);
  await comparison.getByRole("button",{name:"Compare net proceeds"}).click();
  await expect(comparison.getByRole("row").filter({hasText:"Dealer 1"})).toContainText("$9,900.00");
  await page.locator("#offer-payoff").fill("-1");
  await comparison.getByRole("button",{name:"Compare net proceeds"}).click();
  await expect(comparison.getByRole("alert")).toBeVisible();
  await comparison.getByRole("button",{name:"Clear offers"}).click();
  await expect(page.locator("#offer-offer1")).toHaveValue("");
});

test("trade disclosures and localized examples render without JavaScript",async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
  await page.goto("/trade-in-value-estimator");
  await expect(page.locator("h1")).toHaveText("Trade-In Value Calculator");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href","https://buyusedautomobiles.com/trade-in-value-estimator");
  await expect(page.locator("#compare-offers")).toContainText("Equity = offer");
  for(const [country,term,total] of [["germany","Kfz-Steuer","5,944"],["uk","imperial mpg","5,033.83"]]){
    await page.goto(`/tools/${country}/car-running-cost-calculator`);
    await expect(page.locator("article")).toContainText(term);
    await expect(page.locator("article")).toContainText(total);
    await expect(page.locator('article a[href="/car-depreciation-calculator"]')).toBeVisible();
  }
  await page.goto("/guides/buy-used-car-europe");
  await expect(page.locator('article a[href*="www.dgt.es"]')).toBeVisible();
  await expect(page.locator('article a[href="/tools/germany/car-running-cost-calculator"]')).toBeVisible();
  await context.close();
});
