import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("new versus used comparison retains assumptions and requires matched usage",async({page})=>{
  await page.goto("/total-cost-of-ownership-calculator");
  await page.getByRole("button",{name:"Save for comparison",exact:true}).click();
  await page.getByLabel("Vehicle being modeled").selectOption("new");
  await page.locator("#ownership-price").fill("30000");
  await page.locator("#ownership-resale").fill("15000");
  const comparison=page.locator(".ownership-comparison");
  await expect(comparison).toContainText("Current minus saved economic cost");
  const assumptions=comparison.getByRole("table",{name:"Check every assumption before comparing new and used cars."});
  await expect(assumptions.getByRole("row").filter({hasText:"Purchase price"})).toContainText("25000");
  await expect(assumptions.getByRole("row").filter({hasText:"Purchase price"})).toContainText("30000");
  await expect(comparison.getByRole("columnheader",{name:"Saved used car"}).first()).toBeVisible();
  await expect(comparison.getByRole("columnheader",{name:"Current new car"}).first()).toBeVisible();
  await page.locator("#ownership-years").fill("4");
  await expect(comparison.getByRole("alert")).toContainText("same ownership period and annual distance");
  await expect(comparison.getByRole("button",{name:"Download comparison CSV"})).toHaveCount(0);
  await page.locator("#ownership-years").fill("5");
  await page.locator("#ownership-miles").fill("15000");
  await expect(comparison.getByRole("alert")).toBeVisible();
  await page.locator("#ownership-miles").fill("12000");
  const download=page.waitForEvent("download");
  await comparison.getByRole("button",{name:"Download comparison CSV"}).click();
  expect((await download).suggestedFilename()).toBe("ownership-comparison.csv");
  await page.setViewportSize({width:360,height:900});
  await comparison.getByRole("region").first().focus();
  await expect(comparison.getByRole("region").first()).toBeFocused();
  expect(await comparison.getByRole("region").first().evaluate(element=>element.scrollWidth<=element.clientWidth+1)).toBe(true);
  const accessibility=await new AxeBuilder({page}).include(".ownership-comparison").withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
  await expect(page).toHaveURL(/vehicle=new/);
  await page.reload();
  await expect(page.getByLabel("Vehicle being modeled")).toHaveValue("new");
  await expect(page.locator("#ownership-price")).toHaveValue("30000");
  await expect(page.locator(".ownership-comparison")).toHaveCount(0);
});

test("interest walkthrough and ownership method are readable without JavaScript",async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();
  await page.goto("/guides/how-to-compare-used-car-loans");
  await expect(page.locator("h1")).toContainText("How car loan interest is calculated");
  await expect(page.locator(".editorial-prose")).toContainText("first-month interest");
  await expect(page.locator(".editorial-prose")).toContainText("$133.33");
  await expect(page.locator(".editorial-prose")).toContainText("UNVERIFIED scenario inputs");
  const schema=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(value=>JSON.parse(value));
  expect(schema.find(item=>item["@type"]==="Article")).toMatchObject({inLanguage:"en-US",dateModified:"2026-10-15"});
  await page.goto("/total-cost-of-ownership-calculator");
  await expect(page.locator("#new-vs-used")).toContainText("same");
  await expect(page.getByRole("heading",{name:"Compare a new car with a used car",exact:true})).toBeVisible();
  await context.close();
});

test("international research is crawlable without JavaScript",async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();
  await page.goto("/guides/international-used-car-buying-checks");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href","https://buyusedautomobiles.com/guides/international-used-car-buying-checks");
  for(const name of ["United Kingdom","Australia","Pakistan","UAE"]){
    await expect(page.locator("article h2").filter({hasText:name})).toHaveCount(1);
  }
  await expect(page.locator(".editorial-prose")).toContainText("PPSR does not provide an ownership history");
  await expect(page.locator('time[datetime="2026-10-15"]')).toBeVisible();
  await expect(page.locator('article a[href*="ppsr.gov.au"]').first()).toBeVisible();
  await expect(page.locator('article a[href="/used-car-inspection-checklist"]').first()).toHaveCount(1);
  const schema=await page.locator('script[type="application/ld+json"]').allTextContents();
  const article=schema.map(s=>JSON.parse(s)).find(s=>s["@type"]==="Article");
  expect(article.inLanguage).toBe("en");
  expect(article.citation).toContain("https://www.ppsr.gov.au/searching/do-used-car-or-vehicle-search");
  await context.close();
});

test("inspection report preserves observations in print and on mobile",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/used-car-inspection-checklist");
  await page.locator("#check-0").selectOption("concern");
  await page.locator("#check-1").selectOption("pass");
  await expect(page.getByRole("button",{name:"Print / save PDF"})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  const results=await new AxeBuilder({page}).analyze();
  expect(results.violations).toEqual([]);
  await page.emulateMedia({media:"print"});
  await expect(page.locator(".inspection-print-status").first()).toHaveText("Concern");
  await expect(page.locator(".inspection-print-status").nth(1)).toHaveText("Checked");
  await expect(page.locator(".inspection-print-status").first()).toBeVisible();
  await expect(page.locator("#check-0")).toBeHidden();
  await expect(page.locator(".inspection-summary")).toContainText("1 concerns flagged");
});
