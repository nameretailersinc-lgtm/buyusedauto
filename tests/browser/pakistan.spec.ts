import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Pakistan modes keep borrowing separate from quoted Islamic cash flows",async({page})=>{
  await page.goto("/pk/car-financing-calculator");
  for(const [key,value] of Object.entries({price:"120000",down:"20000",benchmark:"0",spread:"0",months:"10"}))await page.locator(`#pk-${key}`).fill(value);
  await page.getByRole("button",{name:"Calculate estimate",exact:true}).click();
  await expect(page.locator('section[aria-label="Pakistan financing calculator"]').getByRole("status")).toContainText("10,000.00");
  await page.locator("#pk-mode").selectOption("ijarah");
  await page.locator("#pk-upfront").fill("1000");
  await page.locator("#pk-refund").fill("500");
  await page.locator("#pk-fees").fill("50");
  await page.locator("#pk-schedule").fill("100,0,0\n100,0,0");
  await page.getByRole("button",{name:"Calculate estimate",exact:true}).click();
  await expect(page.locator('section[aria-label="Pakistan financing calculator"]').getByRole("status")).toContainText("1,250.00");
  await expect(page.locator('section[aria-label="Pakistan financing calculator"]').getByRole("status")).toContainText("750.00");
  await page.locator("#pk-mode").selectOption("diminishing-musharakah");
  await expect(page.locator("#pk-upfront")).toHaveValue("");
  await expect(page.locator("#pk-schedule")).toHaveValue("");
  await page.locator("#pk-upfront").fill("1000");
  await page.locator("#pk-schedule").fill("100,200,10");
  await page.getByRole("button",{name:"Calculate estimate",exact:true}).click();
  await expect(page.locator('section[aria-label="Pakistan financing calculator"]').getByRole("status")).toContainText("1,310.00");
  await page.locator("#pk-schedule").fill("name,0,0");
  await page.getByRole("button",{name:"Calculate estimate",exact:true}).click();
  await expect(page.locator('section[aria-label="Pakistan financing calculator"]').getByRole("alert")).toContainText("plain nonnegative amounts");
  await page.setViewportSize({width:360,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const accessibility=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
});
test("Pakistan bundle is crawlable and sitemap index has country segments",async({browser,request})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
  for(const path of ["/pk/car-financing-calculator","/pk/guides/conventional-vs-islamic-car-finance","/pk/guides/used-car-financing-quote-checklist"]){
    await page.goto(path);await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://buyusedautomobiles.com${path}`);
    await expect(page.locator("main")).toContainText("Diminishing Musharakah");
    await expect(page.locator('link[hreflang]')).toHaveCount(0);
  }
  const index=await (await request.get("/sitemap.xml")).text();expect(index).toContain("<sitemapindex");expect(index).toContain("/sitemaps/us.xml");expect(index).toContain("/sitemaps/pk.xml");
  const segment=await (await request.get("/sitemaps/pk.xml")).text();expect((segment.match(/<loc>/g)||[])).toHaveLength(3);
  await context.close();
});
