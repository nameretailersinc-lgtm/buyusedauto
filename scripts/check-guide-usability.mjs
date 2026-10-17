import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3101';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage();
 await mkdir('reports/guide-usability',{recursive:true});
 for(const slug of ['buy-used-car-pakistan','used-car-buying-checklist-first-time-buyers']){
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(`${base}/guides/${slug}`);
  await page.locator('.guide-start-links a').first().waitFor();
  await page.screenshot({path:`reports/guide-usability/${slug}-desktop.png`});
  await page.getByRole('link',{name:'Find the checklist'}).click();
  const checklist=page.locator('.guide-interactive-checklist').first();
  await checklist.getByRole('checkbox').first().check();
  if(!await checklist.getByText(/^1 of /).count())throw Error('Checklist progress did not update');
  await checklist.getByRole('button',{name:'Reset checklist'}).click();
  if(await checklist.getByRole('checkbox').first().isChecked())throw Error('Checklist reset failed');
  await page.setViewportSize({width:390,height:844});
  await page.locator('.reading-mobile summary').click();
  await page.locator('.reading-mobile a[href="#section-3"]').click();
  if(await page.locator('.reading-mobile').getAttribute('open')!==null)throw Error('Mobile contents did not close');
  await page.waitForFunction(()=>document.querySelector('.reading-mobile a[href="#section-3"]')?.getAttribute('aria-current')==='location');
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Mobile horizontal overflow');
  await page.screenshot({path:`reports/guide-usability/${slug}-mobile.png`});
 }
 console.log('Guide browser checks passed: shortcuts, checklist progress/reset, mobile navigation, active-section tracking, and overflow.');
}finally{await browser.close();}
