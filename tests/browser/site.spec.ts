import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {tools} from "../../data/tools";
test("server-rendered content, new branding and contact survive without JavaScript",async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
  await page.goto("/car-loan-calculator");await expect(page.locator(".result-primary strong").first()).toHaveText("$396.02");
  await expect(page.getByRole("heading",{name:"How it works",exact:true})).toBeVisible();
  await expect(page.locator('link[rel="icon"][href="/favicon-48.png"]')).toHaveCount(1);
  await expect(page.locator('.site-header img[src*="logo-mark"]')).toBeVisible();
  await page.goto("/contact");await expect(page.locator('main a[href="mailto:info@nameretailer.com"]').first()).toBeVisible();
  await expect(page.locator("main")).toContainText("26 - G Hamriyah Freezone Sharjah, United Arab Emirates");
  await page.goto("/guides/how-to-inspect-a-used-car");await expect(page.locator(".article-section")).toHaveCount(7);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content",/images\/inspection-workshop\.webp$/);
  await context.close();
});
test("tools can be filtered, searched, and recovered from no results",async({page})=>{
  await page.goto("/tools");
  await expect(page.locator(".tool-explorer .tool-card")).toHaveCount(11);
  await page.getByRole("button",{name:"Financing",exact:true}).click();
  await expect(page.locator(".tool-explorer .tool-card")).toHaveCount(tools.filter(t=>t.category==="Financing").length);
  await page.getByLabel("Find a tool",{exact:true}).fill("unmatched query");
  await expect(page.getByRole("heading",{name:"No matching tool yet."})).toBeVisible();
  await page.getByRole("button",{name:"Show all tools"}).click();
  await page.getByLabel("Find a tool",{exact:true}).fill("fuel");
  await expect(page.locator(".tool-explorer .tool-card").filter({hasText:"Fuel Cost"})).toHaveCount(1);
});
test("redesigned page families load imagery and work on mobile",async({page})=>{
  test.setTimeout(120_000);
  for(const [name,path] of [["tools","/tools"],["guides","/guides"],["guide","/guides/how-to-inspect-a-used-car"],["category","/guides/category/financing"],["about","/about"],["policy","/privacy-policy"],["scenario","/car-loan-calculator/10000-car-loan"],["fuel","/fuel-cost-calculator"]]){
    await page.setViewportSize({width:1440,height:1050});await page.goto(path);await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    await expect.poll(()=>page.locator("main img").evaluateAll(images=>images.filter(img=>img.getAttribute("loading")!=="lazy").every(img=>(img as HTMLImageElement).complete&&(img as HTMLImageElement).naturalWidth>0))).toBe(true);
    await page.screenshot({path:`reports/${name}-desktop.png`,fullPage:true});
    await page.setViewportSize({width:390,height:844});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const audit=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();expect(audit.violations).toEqual([]);
    await page.screenshot({path:`reports/${name}-mobile.png`,fullPage:true});
  }
});
test("reference navbar supports keyboard, dismissal, mobile links, and navigation",async({page})=>{
  await page.goto("/");const trigger=page.getByRole("button",{name:"Tools",exact:true});
  await trigger.focus();await page.keyboard.press("ArrowDown");await expect(trigger).toHaveAttribute("aria-expanded","true");
  await expect(page.locator(".mega-tool-link")).toHaveCount(11);await expect(page.locator(".mega-tool-link").first()).toBeFocused();
  const desktopAudit=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();expect(desktopAudit.violations).toEqual([]);
  await page.screenshot({path:"reports/navbar-desktop.png"});
  await page.keyboard.press("Escape");await expect(trigger).toHaveAttribute("aria-expanded","false");await expect(trigger).toBeFocused();
  await trigger.click();await page.locator("h1").click();await expect(trigger).toHaveAttribute("aria-expanded","false");
  await page.setViewportSize({width:390,height:844});await trigger.click();await expect(page.locator(".mega-feature")).toBeHidden();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:"reports/navbar-mobile.png"});await page.locator(".mega-tool-link").filter({hasText:"Fuel cost"}).click();
  await expect(page).toHaveURL(/fuel-cost-calculator/);await expect(trigger).toHaveAttribute("aria-expanded","false");
});
test("homepage calculator updates and passes values to the full tool",async({page})=>{
  await page.goto("/");await expect(page.locator(".quick-result strong")).toContainText("$396.02");
  await page.locator("#quick-rate").fill("0");await expect(page.locator(".quick-result strong")).toContainText("$333.33");
  await page.getByRole("link",{name:"View full breakdown"}).click();await expect(page.locator("#loan-rate")).toHaveValue("0");
  await expect(page.locator(".result-primary strong").first()).toHaveText("$333.33");
});
test("every calculator renders, validates, and has no runtime errors",async({page})=>{const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));for(const tool of tools){await page.goto(`/${tool.slug}`);await expect(page.locator("h1")).toHaveText(tool.name);if(tool.id!=="inspection"){await expect(page.locator(".result-primary strong").first()).toBeVisible();const first=page.locator('input[type="number"]').first();await first.fill("");await expect(page.locator(".result-error[role=alert]")).toContainText("Complete every numeric field");await page.getByRole("button",{name:"Reset example"}).click();await expect(page.locator(".result-error[role=alert]")).toHaveCount(0);}}expect(errors).toEqual([]);});
test("loan URL restore, comparison, invalid input, and CSV",async({page})=>{await page.goto("/car-loan-calculator?price=15000&down=5000&rate=0&months=36");await expect(page.locator("#loan-price")).toHaveValue("15000");await expect(page.locator(".result-primary strong").first()).toHaveText("$277.78");await page.getByRole("button",{name:"Save for comparison"}).click();await page.locator("#loan-extra").fill("100");await expect(page.getByRole("heading",{name:"Compare your scenarios"})).toBeVisible();await expect(page).toHaveURL(/extra=100/);await page.reload();await expect(page.locator("#loan-extra")).toHaveValue("100");const download=page.waitForEvent("download");await page.getByRole("button",{name:"Download CSV"}).click();expect((await download).suggestedFilename()).toBe("car-loan-calculator.csv");await page.locator("#loan-down").fill("50000");await expect(page.locator(".result-error[role=alert]")).toContainText("exceed");});
test("fuel conversion preserves physical scenario",async({page})=>{await page.goto("/fuel-cost-calculator");await expect(page.locator(".result-primary strong").first()).toHaveText("$35.00");await page.locator("#fuel-units").selectOption("metric");const value=await page.locator(".result-primary strong").first().innerText();expect(Math.abs(Number(value.replace(/[$,]/g,""))-35)).toBeLessThan(.06);await expect(page.locator("#fuel-distance")).toHaveValue("482.8");await page.reload();await expect(page.locator("#fuel-units")).toHaveValue("metric");});
test("checklist restores concerns and resets",async({page})=>{await page.goto("/used-car-inspection-checklist");await page.locator("#check-0").selectOption("concern");await page.locator("#check-1").selectOption("pass");await expect(page.locator(".inspection-summary")).toContainText("1 concerns flagged");await expect(page).toHaveURL(/checks=21/);await page.reload();await expect(page.locator("#check-0")).toHaveValue("concern");await page.getByRole("button",{name:"Reset checklist"}).click();await expect(page.locator("#check-0")).toHaveValue("unchecked");});
test("state resource never silently supplies a tax rate",async({page})=>{await page.goto("/car-sales-tax-calculator");await page.locator("#state").selectOption("TX");await expect(page.locator("#tax-rate")).toHaveValue("6");await expect(page.getByRole("link",{name:/Verify rates and rules with Texas/})).toHaveAttribute("href","https://comptroller.texas.gov/taxes/motor-vehicle/");await page.reload();await expect(page.locator("#state")).toHaveValue("TX");});
test("no ads or analytics requests without consent",async({page})=>{const tracking:string[]=[];page.on("request",r=>{if(/google-analytics|googletagmanager|googlesyndication|doubleclick/.test(r.url()))tracking.push(r.url());});await page.goto("/car-loan-calculator");await page.getByRole("button",{name:"Privacy choices"}).click();await page.getByRole("button",{name:"Reject optional"}).click();await page.reload();expect(tracking).toEqual([]);});
test("mobile layout, dark theme, and accessibility",async({page})=>{await page.setViewportSize({width:390,height:844});for(const path of ["/","/car-loan-calculator","/guides/how-to-inspect-a-used-car"]){await page.goto(path);await page.evaluate(()=>document.fonts.ready);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();expect(result.violations).toEqual([]);}await page.getByRole("button",{name:"Use dark theme"}).click();await expect(page.locator("html")).toHaveAttribute("data-theme","dark");const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();expect(result.violations).toEqual([]);});
test("screenshots and print summary",async({page})=>{await page.setViewportSize({width:1440,height:1050});await page.goto("/");await page.screenshot({path:"reports/home-desktop.png",fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:"reports/home-mobile.png",fullPage:true});await page.goto("/car-loan-calculator");await page.screenshot({path:"reports/loan-mobile.png",fullPage:true});await page.emulateMedia({media:"print"});await expect(page.locator(".print-inputs")).toBeVisible();await expect(page.locator(".site-header")).toBeHidden();});
