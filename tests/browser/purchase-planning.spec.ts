import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("itemized loan costs survive sharing, export and mobile layouts",async({page})=>{
  await page.goto("/car-loan-calculator?tax=1500&title=100&registration=200&fees=300&trade=6000&payoff=8000");
  const metrics=page.locator(".result-metrics");
  await expect(metrics).toContainText("$24,100");
  await expect(metrics).toContainText("$2,100.00");
  await expect(page.locator("#loan-title")).toHaveValue("100");
  await page.locator("#loan-registration").fill("250");
  await expect(metrics).toContainText("$24,150");
  await page.reload();
  await expect(page.locator("#loan-registration")).toHaveValue("250");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href","https://buyusedautomobiles.com/car-loan-calculator");
  const download=page.waitForEvent("download");
  await page.getByRole("button",{name:"Download CSV",exact:true}).click();
  const stream=await (await download).createReadStream();
  let csv="";for await(const chunk of stream!)csv+=chunk.toString();
  expect(csv).toContain('"Financed registration fee","250 $"');
  expect(csv).toContain('"Amount financed","$24,150"');
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px layout`).toBe(true);
  }
  await page.setViewportSize({width:390,height:844});
  await page.locator('a[href="#taxes-and-trade"]').click();
  await expect(page.locator("#taxes-and-trade h2")).toBeInViewport();
  expect((await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()).violations).toEqual([]);
  await page.emulateMedia({media:"print"});
  expect(await page.locator(".content-layout").evaluate(element=>getComputedStyle(element).contentVisibility)).toBe("visible");
  await expect(page.locator("#taxes-and-trade")).toBeVisible();
  await page.emulateMedia({media:"screen"});
  await page.screenshot({path:"reports/loan-itemized-mobile.png",fullPage:true});
});

test("manual tax fees and state selection remain explicit",async({page})=>{
  await page.goto("/car-sales-tax-calculator?taxableFees=500&credit=5000&fees=50&title=100&registration=200");
  await expect(page.locator(".result-primary strong").first()).toHaveText("$930.00");
  await expect(page.locator(".result-metrics")).toContainText("$21,780.00");
  await page.getByLabel("Registration state or district").selectOption("TX");
  await expect(page.locator("#tax-rate")).toHaveValue("6");
  await expect(page.locator(".tool-prose")).toContainText("Automatic state rates and DMV fees: unavailable.");
  await page.reload();
  await expect(page.getByLabel("Registration state or district")).toHaveValue("TX");
  await expect(page.locator("#tax-title")).toHaveValue("100");
});

test("private-seller guidance and regional metadata are server rendered",async({browser,page:interactivePage})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();
  await page.goto("/guides/how-to-buy-a-used-car-from-a-private-seller");
  await expect(page.locator("h1")).toHaveText("How to buy a used car from a private seller");
  await expect(page.locator(".article-answer")).toContainText("private-party eligibility");
  await expect(page.locator(".editorial-prose")).toContainText("$16,300");
  await expect(page.locator('article a[href="/car-sales-tax-calculator"]').first()).toBeVisible();
  await expect(page.getByText("Can I buy a used car from a private seller with a loan?",{exact:true})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:"reports/private-seller-mobile.png",fullPage:true});
  for(const path of ["/guides/buy-used-car-uk","/tools/uk/car-running-cost-calculator"]){
    await page.goto(path);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content","en_GB");
  }
  await context.close();
  // axe injects executable scripts; run it in a separate JavaScript-enabled page.
  await interactivePage.setViewportSize({width:390,height:844});
  await interactivePage.goto("/guides/how-to-buy-a-used-car-from-a-private-seller");
  expect((await new AxeBuilder({page:interactivePage}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()).violations).toEqual([]);
});
