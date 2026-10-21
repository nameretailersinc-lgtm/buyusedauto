import {test,expect} from "@playwright/test";

test("maintenance reserves convert physical intervals and keep immediate work separate",async({page})=>{
  await page.goto("/car-maintenance-cost-calculator");await expect(page.locator(".result-primary strong")).toHaveText("$65.00");
  await page.locator("#maintenance-upfront").fill("600");await expect(page.locator(".result-metrics")).toContainText("$4,500.00");await expect(page.locator(".result-metrics")).toContainText("$75.00");
  await page.getByRole("button",{name:"Save for comparison",exact:true}).click();
  await page.locator("#maintenance-units").selectOption("metric");await expect(page.getByRole("heading",{name:"Compare your scenarios"})).toHaveCount(0);
  await expect(page.locator("#maintenance-serviceDistance")).toHaveValue("9656.064");await expect(page.locator(".result-primary strong")).toHaveText("$65.00");
  await page.reload();await expect(page.locator("#maintenance-units")).toHaveValue("metric");await expect(page.locator(".result-primary strong")).toHaveText("$65.00");
  await page.locator("#maintenance-serviceDistance").fill("0");await expect(page.locator(".result-error")).toBeVisible();
});

test("recorded cost changes accounting basis without double counting or stale comparison",async({page})=>{
  await page.goto("/car-cost-per-mile-calculator");await expect(page.locator(".result-primary strong")).toHaveText("$0.550");
  await page.getByRole("button",{name:"Save for comparison",exact:true}).click();
  await page.locator("#mile-basis").selectOption("cash");await expect(page.getByRole("heading",{name:"Compare your scenarios"})).toHaveCount(0);
  await expect(page.locator("#mile-startValue")).toHaveCount(0);await expect(page.locator("#mile-payments")).toBeVisible();await expect(page.locator(".result-primary strong")).toHaveText("$0.633");
  await page.locator("#mile-units").selectOption("metric");await expect(page.locator(".calculator-result")).toContainText("per km");await expect(page.locator(".result-primary strong")).toHaveText("$0.394");
  const download=page.waitForEvent("download");await page.getByRole("button",{name:"Download CSV",exact:true}).click();
  const stream=await(await download).createReadStream();let csv="";for await(const chunk of stream!)csv+=chunk.toString();expect(csv).toContain("km");expect(csv).toContain("Full loan payments");expect(csv).not.toContain("Vehicle value at start");
  await page.locator("#mile-distance").fill("0");await expect(page.locator(".result-error")).toBeVisible();
});

test("gas and EV comparison preserves energy across units and applies losses once",async({page})=>{
  await page.goto("/gas-vs-electric-car-cost-calculator");await expect(page.locator(".result-primary strong")).toHaveText("$1,100.00");await expect(page.locator("#gasEv-efficiency")).toHaveCount(0);
  await page.locator("#gasEv-units").selectOption("metric");await expect(page.locator(".result-primary strong")).toHaveText("$1,100.00");
  await page.locator("#gasEv-boundary").selectOption("battery");await page.locator("#gasEv-efficiency").fill("80");await expect(page.locator(".result-primary strong")).toHaveText("$200.00");
  await page.locator("#gasEv-boundary").selectOption("wall");await expect(page.locator(".result-primary strong")).toHaveText("$1,100.00");
  await page.locator("#gasEv-evResale").fill("10000");await expect(page.locator(".calculator-result")).toContainText("Gas car costs less");await expect(page.locator(".result-primary strong")).toHaveText("$3,900.00");
});

test("guides and existing tools link contextually into Phase 3",async({page,request})=>{
  for(const [source,targets] of [
    ["/guides/used-car-maintenance-costs",["/car-maintenance-cost-calculator","/car-repair-cost-calculator","/car-cost-per-mile-calculator"]],
    ["/guides/real-cost-of-car-ownership",["/car-maintenance-cost-calculator","/car-cost-per-mile-calculator","/gas-vs-electric-car-cost-calculator"]],
    ["/total-cost-of-ownership-calculator",["/car-maintenance-cost-calculator","/car-cost-per-mile-calculator","/gas-vs-electric-car-cost-calculator"]],
    ["/ev-charging-cost-calculator",["/gas-vs-electric-car-cost-calculator"]]
  ] as const){await page.goto(source);for(const target of targets){await expect(page.locator(`main a[href="${target}"]`).first()).toBeVisible();}}
  const xml=await(await request.get("/sitemaps/tools.xml")).text();for(const slug of ["car-maintenance-cost-calculator","car-cost-per-mile-calculator","gas-vs-electric-car-cost-calculator"])expect(xml).toContain(`https://buyusedautomobiles.com/${slug}`);
});
