import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const path="/guides/how-to-pay-off-a-car-loan-early";
test("payoff article preserves metadata, math, FAQs and reciprocal links",async({page,request})=>{
  const response=await page.goto(path);expect(response!.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("How to Pay Off a Car Loan Early and Save on Interest");await expect(page.locator("h1")).toHaveCount(1);
  await expect(page).toHaveTitle("How to Pay Off a Car Loan Early: Costs & Savings");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://buyusedautomobiles.com${path}`);
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content",/noindex/);
  await expect(page.locator("main")).not.toContainText("{{");await expect(page.locator(".article-answer")).toContainText("A practical guide to car loan payoff quotes");
  await expect(page.locator(".article-section table")).toContainText("$298.62");await expect(page.locator(".article-section table")).toContainText("$381.60");
  await expect(page.locator(".guide-faq-item")).toHaveCount(4);await page.locator(".guide-faq-item summary").first().click();await expect(page.locator(".guide-faq-item").first()).toContainText("contract, timing, and payment allocation");
  const article=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s)).find(s=>s["@type"]==="Article");expect(article).toMatchObject({headline:await page.locator("h1").textContent(),dateModified:"2026-10-22",author:{"@type":"Organization",name:"BuyUsedAutomobiles"}});expect(article).not.toHaveProperty("datePublished");
  const cta=page.locator('.article-section a[href="/car-loan-payoff-calculator"]').first();await cta.click();await expect(page).toHaveURL(/\/car-loan-payoff-calculator$/);await expect(page.locator(`main a[href="${path}"]`).first()).toBeVisible();
  const sitemap=await(await request.get("/sitemaps/guides.xml")).text();expect(sitemap).toContain(`https://buyusedautomobiles.com${path}`);
});
test("payoff guide is readable without JavaScript and scrolls its table accessibly on mobile",async({browser,page:accessiblePage})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:800}});const page=await context.newPage();await page.goto(path);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  const table=page.locator('.article-section [role="region"]').first();await expect(table).toHaveAttribute("tabindex","0");await expect(table).toHaveAttribute("aria-label","A car loan payoff example");
  await expect(page.locator('.article-section a[href="/car-loan-payoff-calculator"]').first()).toBeVisible();
  await context.close();
  // axe uses browser scripts/timers; keep the no-JS assertions above independent.
  await accessiblePage.setViewportSize({width:360,height:800});await accessiblePage.goto(path);
  expect((await new AxeBuilder({page:accessiblePage}).include("main").withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()).violations).toEqual([]);
});
