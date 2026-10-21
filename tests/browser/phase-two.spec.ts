import {test,expect} from "@playwright/test";

test("APR separates the contract rate, finance fees and annualization",async({page})=>{
  await page.goto("/car-loan-apr-calculator?principal=12000&rate=0&months=12&upfront=0&financed=120");
  await expect(page.locator(".result-primary strong")).toHaveText("1.841%",{timeout:10000});
  await expect(page.locator(".result-metrics")).toContainText("$1,010.00");
  await expect(page.locator(".result-metrics")).toContainText("1.8566%");
  await page.locator("#apr-financed").fill("0");await expect(page.locator(".result-primary strong")).toHaveText("0%");
  await page.locator("#apr-upfront").fill("12000");await expect(page.locator(".result-error")).toContainText("less than");
});

test("repair quote credits and reserves remain distinct",async({page})=>{
  await page.goto("/car-repair-cost-calculator");await expect(page.locator(".result-primary strong")).toHaveText("$704.00");
  await page.locator("#repair-credit").fill("140");await expect(page.locator(".result-primary strong")).toHaveText("$550.00");
  await expect(page.locator(".result-metrics")).toContainText("$500.00");await expect(page.locator(".result-metrics")).toContainText("$50.00");
  await page.locator("#repair-credit").fill("641");await expect(page.locator(".result-error")).toContainText("cannot exceed");
});

test("registration profiles enforce scope, hidden inputs and review expiry",async({page})=>{
  await page.clock.install({time:new Date("2026-10-21T12:00:00Z")});
  await page.goto("/car-registration-tax-calculator");
  await page.locator("#registration-registration").fill("80");
  await page.locator("#registration-profile").selectOption("gb-first");
  await expect(page.locator(".result-error")).toContainText("GBP");
  await page.locator("#registration-market").selectOption("GB");
  await expect(page.locator("#registration-registration")).toHaveCount(0);
  await expect(page.locator(".result-primary strong")).toHaveText("£55.00");
  await page.reload();await expect(page.locator("#registration-profile")).toHaveValue("gb-first");await expect(page.locator(".result-primary strong")).toHaveText("£55.00");
  const download=page.waitForEvent("download");await page.getByRole("button",{name:"Download CSV",exact:true}).click();
  const stream=await (await download).createReadStream();let csv="";for await(const chunk of stream!)csv+=chunk.toString();
  expect(csv).toContain("GBP; estimated values");expect(csv).toContain("55.00");expect(csv).not.toContain("Verified one-time registration fee");
  await page.locator("#registration-profile").selectOption("gb-exempt");await expect(page.locator(".result-primary strong")).toHaveText("£0.00");
  await page.clock.setSystemTime(new Date("2027-01-20T12:00:00Z"));
  await page.locator("#registration-months").fill("18");await expect(page.locator(".result-error")).toContainText("source review");
  await page.locator("#registration-profile").selectOption("manual");
  await expect(page.locator("#registration-registration")).toHaveValue("80");
  await page.locator("#registration-annualTax").fill("240");await expect(page.locator(".result-primary strong")).toHaveText("£440.00");
});

test("root sitemap advertises every current guide and tool once",async({request})=>{
  const index=await (await request.get("/sitemap.xml")).text();
  const groups=[...index.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
  expect(groups).toEqual(["/sitemaps/core.xml","/sitemaps/tools.xml","/sitemaps/guides.xml","/sitemaps/scenarios.xml","/sitemaps/pk.xml"]);
  const urls:string[]=[];
  for(const path of groups){const response=await request.get(path);expect(response.status()).toBe(200);const xml=await response.text();urls.push(...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]));}
  expect(new Set(urls).size).toBe(urls.length);
  for(const path of ["/car-loan-apr-calculator","/car-repair-cost-calculator","/car-registration-tax-calculator","/guides/car-depreciation-chart","/guides/how-much-car-payment-can-i-afford"]){
    expect(urls).toContain(`https://buyusedautomobiles.com${path}`);
  }
  expect((await request.get("/sitemaps/us.xml")).status()).toBe(200);
});
