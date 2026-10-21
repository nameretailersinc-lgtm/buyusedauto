import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for(const [slug,id] of [["car-loan-payoff-calculator","payoff"],["auto-loan-refinance-calculator","refinance"],["car-down-payment-calculator","down"],["ev-charging-cost-calculator","ev"],["car-loan-apr-calculator","apr"],["car-repair-cost-calculator","repair"],["car-registration-tax-calculator","registration"],["car-maintenance-cost-calculator","maintenance"],["car-cost-per-mile-calculator","mile"],["gas-vs-electric-car-cost-calculator","gasEv"]]){
  test(`${slug} preserves currency, clears mixed-currency comparisons, and works on mobile`,async({page})=>{
    await page.goto(`/${slug}`);
    await expect(page.locator(".result-error")).toHaveCount(0);
    await page.getByRole("button",{name:"Save for comparison",exact:true}).click();
    await expect(page.getByRole("heading",{name:"Compare your scenarios"})).toBeVisible();
    await page.locator(`#${id}-market`).selectOption("PK");
    await expect(page.getByRole("heading",{name:"Compare your scenarios"})).toHaveCount(0);
    await expect(page.locator(".currency-label")).toContainText("PKR");
    await expect(page).toHaveURL(/market=PK/);
    const numeric=page.locator(".calculator-form input[type=number]").first();
    const original=await numeric.inputValue();
    await page.reload();await expect(page.locator(`#${id}-market`)).toHaveValue("PK");await expect(numeric).toHaveValue(original);
    const download=page.waitForEvent("download");await page.getByRole("button",{name:"Download CSV",exact:true}).click();
    const file=await download;expect(file.suggestedFilename()).toBe(`${slug}.csv`);
    const stream=await file.createReadStream();let csv="";for await(const chunk of stream!)csv+=chunk.toString();expect(csv).toContain("PKR; estimated values");
    await page.locator(`#${id}-market`).selectOption("EU");
    await expect(page.locator(".currency-label")).toContainText("EUR");await expect(numeric).toHaveValue(original);
    await page.setViewportSize({width:360,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    const a11y=await new AxeBuilder({page}).include(".calculator").withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();expect(a11y.violations).toEqual([]);
    await numeric.fill("");await expect(page.locator(".result-error")).toBeVisible();
    await page.getByRole("button",{name:"Reset example"}).click();
    await expect(page.locator(".result-error")).toHaveCount(0);await expect(page.locator(`#${id}-market`)).toHaveValue("US");
  });
}

test("EV billing boundaries and impossible charge levels are visible",async({page})=>{
  await page.goto("/ev-charging-cost-calculator");await expect(page.locator(".result-primary strong")).toHaveText("$8.00");
  await page.locator("#ev-boundary").selectOption("battery");await expect(page.locator(".result-primary strong")).toHaveText("$7.20");
  await page.locator("#ev-target").fill("10");await expect(page.locator(".result-error")).toBeVisible();
});

test("fuel measurements convert units and compare local-currency annual spending",async({page})=>{
  await page.goto("/fuel-cost-calculator");const measurement=page.locator("#gas-mileage");
  await expect(measurement).toContainText("30.00 US mpg");await expect(measurement).toContainText("$350.00");
  await page.locator("#mileage-units").selectOption("metric");await expect(measurement).toContainText("30.00 US mpg");await expect(measurement).toContainText("12.75 km/L");
  await page.locator("#mileage-currency").selectOption("EU");await expect(measurement).toContainText("€350.00");
  await page.setViewportSize({width:360,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  expect((await new AxeBuilder({page}).include("#gas-mileage").withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()).violations).toEqual([]);
  await page.locator("#mileage-quantity").fill("0");await expect(measurement.getByRole("alert")).toBeVisible();
});

test("new calculators expose crawlable metadata, method and free application schema without JavaScript",async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
  for(const slug of ["car-loan-payoff-calculator","auto-loan-refinance-calculator","car-down-payment-calculator","ev-charging-cost-calculator","car-loan-apr-calculator","car-repair-cost-calculator","car-registration-tax-calculator","car-maintenance-cost-calculator","car-cost-per-mile-calculator","gas-vs-electric-car-cost-calculator"]){
    await page.goto(`/${slug}`);await expect(page.locator("h1")).toHaveCount(1);await expect(page.locator(".formula")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://buyusedautomobiles.com/${slug}`);
    await expect(page.locator(".result-error")).toHaveCount(0);
    const schemas=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(text=>JSON.parse(text));
    expect(schemas.find(schema=>schema["@type"]==="WebApplication")).toMatchObject({offers:{price:"0",priceCurrency:"USD"},isAccessibleForFree:true});
  }
  await context.close();
});
