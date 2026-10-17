import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
  const page=await browser.newPage();
  const inputs={distance:'12000',efficiency:'12',fuelPrice:'3',insurance:'600',maintenance:'400',fees:'100',other:'100',purchase:'20000',resale:'14000',years:'3',interest:'900'};
  await mkdir('reports/country-tools',{recursive:true});
  for(const country of ['pakistan','uae','uk','germany']){
    const path=`/tools/${country}/car-running-cost-calculator`;
    await page.goto(`http://localhost:3100${path}`);
    await page.getByRole('button',{name:'Calculate my costs'}).click();
    await page.locator('.local-cost-workspace [role=alert]').waitFor();
    for(const [key,value] of Object.entries(inputs))await page.locator(`#running-${key}`).fill(value);
    await page.getByRole('button',{name:'Calculate my costs'}).click();
    await page.getByText('Annual economic cost',{exact:true}).waitFor();
    if(await page.locator('.local-cost-workspace [role=alert]').count())throw Error(`${country}: valid input rejected`);
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    if(new URL(canonical).pathname!==path)throw Error(`${country}: canonical mismatch`);
    const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();
    if(!schemas.some(text=>JSON.parse(text)['@type']==='WebApplication'))throw Error(`${country}: missing app schema`);
    await page.setViewportSize({width:390,height:844});
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error(`${country}: mobile horizontal overflow`);
    await page.screenshot({path:`reports/country-tools/${country}-mobile.png`,fullPage:true});
    await page.getByRole('button',{name:'Clear',exact:true}).click();
    if(await page.locator('#running-distance').inputValue()!=='')throw Error(`${country}: clear failed`);
    await page.setViewportSize({width:1440,height:1000});
  }
  console.log('All four tools passed browser checks: validation, calculation, clear, canonical, schema and mobile overflow.');
}finally{await browser.close();}
