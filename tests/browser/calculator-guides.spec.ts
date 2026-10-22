import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {calculatorGuides} from "../../data/calculator-guides";
const refreshed=["how-much-does-a-used-car-depreciate-per-year","how-much-down-payment-for-used-car"];
for(const guide of calculatorGuides)test(`${guide.slug}: metadata, accessible article and reciprocal calculator links`,async({page,request})=>{
  const path=`/guides/${guide.slug}`;expect((await page.goto(path))!.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText(guide.title);await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content",guide.description);
  await expect(page).toHaveTitle(guide.seoTitle!.length<43?`${guide.seoTitle} | BuyUsedAutomobiles`:guide.seoTitle!);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://buyusedautomobiles.com${path}`);
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content",/noindex/);
  expect(await page.locator("main").textContent()).not.toMatch(/\{\{|\ufffd|\u00e2\u20ac/);
  await expect(page.locator(".guide-faq-item")).toHaveCount(4);await page.locator(".guide-faq-item summary").first().click();await expect(page.locator(".guide-faq-item").first()).toHaveAttribute("open","");
  const article=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s)).find(s=>s["@type"]==="Article");expect(article).toMatchObject({headline:guide.title,dateModified:"2026-10-22",author:{"@type":"Organization",name:"BuyUsedAutomobiles"},citation:guide.sources.map(s=>s.url)});expect(article).not.toHaveProperty("datePublished");
  await page.setViewportSize({width:360,height:800});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  for(const table of await page.locator('.article-section [role="region"]').all())await expect(table).toHaveAttribute("tabindex","0");
  expect((await new AxeBuilder({page}).include("main").withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()).violations).toEqual([]);
  const primary=`/${guide.relatedTools[0]}`;await page.locator(`.article-section a[href="${primary}"]`).first().click();await expect(page).toHaveURL(new RegExp(`${primary}$`));await expect(page.locator(`main a[href="${path}"]`).first()).toBeVisible();
  const xml=await(await request.get("/sitemaps/guides.xml")).text();expect(xml).toContain(`https://buyusedautomobiles.com${path}`);
});
test("imported and refreshed articles render without JavaScript and duplicate draft routes stay unpublished",async({browser,request})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:800}});const page=await context.newPage();
  for(const slug of [...calculatorGuides.map(g=>g.slug),...refreshed]){
    expect((await page.goto(`/guides/${slug}`))!.status()).toBe(200);await expect(page.locator(".article-section").first()).toBeVisible();expect(await page.locator("main").textContent()).not.toContain("{{");
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await expect(page.locator(".article-section table").first()).toBeVisible();
  }
  await context.close();for(const slug of ["how-much-does-a-car-depreciate-each-year","how-much-should-you-put-down-on-a-used-car"])expect((await request.get(`/guides/${slug}`)).status()).toBe(404);
});
