import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
