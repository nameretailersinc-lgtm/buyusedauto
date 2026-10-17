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
  await page.locator('.guide-takeaways').waitFor();
  for(const [key,value] of Object.entries({price:'25000',down:'5000',months:'60',rate:'6'}))await page.locator(`#guide-payment-${key}`).fill(value);
  await page.getByRole('button',{name:'Calculate payment',exact:true}).click();
  if(!(await page.locator('.guide-payment-result strong').textContent()).includes('386.66'))throw Error('Sidebar payment calculation is incorrect');
  await page.locator('#guide-payment-down').fill('30000');
  if((await page.locator('.guide-payment-result strong').textContent()).includes('386.66'))throw Error('Stale sidebar result remains after editing');
  await page.getByRole('button',{name:'Calculate payment',exact:true}).click();
  await page.locator('.guide-payment-error').waitFor();
  await page.locator('#guide-payment-down').fill('5000');
  await page.getByRole('button',{name:'Calculate payment',exact:true}).click();
  await page.screenshot({path:`reports/guide-usability/${slug}-desktop.png`});
  await page.locator('.reading-nav a').filter({hasText:/checklist/i}).last().click();
  const checklist=page.locator('.guide-interactive-checklist').first();
  await checklist.getByRole('checkbox').first().check();
  if(!await checklist.getByText(/^1 of /).count())throw Error('Checklist progress did not update');
  await checklist.getByRole('button',{name:'Reset checklist'}).click();
  if(await checklist.getByRole('checkbox').first().isChecked())throw Error('Checklist reset failed');
  await page.setViewportSize({width:390,height:844});
  await page.locator('.reading-mobile summary').click();
  await page.locator('.reading-mobile a[href="#section-3"]').click();
  if(await page.locator('.reading-mobile').getAttribute('open')!==null)throw Error('Mobile contents did not close');
  const destination=await page.locator('#section-3').boundingBox();
  if(!destination||destination.y<130||destination.y>220)throw Error(`Section heading obscured or misplaced: ${destination?.y}`);
  if(!await page.locator('#section-3').evaluate(node=>node===document.activeElement))throw Error('Section did not receive keyboard focus');
  await page.waitForFunction(()=>document.querySelector('.reading-mobile a[href="#section-3"]')?.getAttribute('aria-current')==='location');
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Mobile horizontal overflow');
  const faq=page.locator('.guide-faq-item').first();
  await faq.locator('summary').click();
  if(await faq.getAttribute('open')===null)throw Error('FAQ did not expand');
  await page.locator('#section-3').evaluate(node=>node.scrollIntoView());
  await page.screenshot({path:`reports/guide-usability/${slug}-mobile.png`});
 }
 console.log('Guide browser checks passed: shortcuts, checklist progress/reset, mobile navigation, active-section tracking, and overflow.');
}finally{await browser.close();}
