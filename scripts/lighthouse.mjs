import lighthouse from "lighthouse";
import {launch} from "chrome-launcher";
import {mkdir,writeFile} from "node:fs/promises";
import {existsSync} from "node:fs";
const executable=process.env.CHROME_PATH||["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe","C:/Program Files/Google/Chrome/Application/chrome.exe","C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if(!executable)throw new Error("Set CHROME_PATH to an installed Chromium browser. No Lighthouse results were measured.");
const base=process.env.TEST_BASE_URL||"http://127.0.0.1:3000";await mkdir("reports",{recursive:true});const summaries=[];
for(const [name,path] of [["home","/"],["loan","/car-loan-calculator"],["guide","/guides/how-to-inspect-a-used-car"]]){
  const profile=`${process.cwd()}/.lighthouse-${name}-${Date.now()}`;
  await mkdir(profile,{recursive:true});
  const chrome=await launch({chromePath:executable,chromeFlags:["--headless=new","--disable-gpu","--no-first-run"],userDataDir:profile});
  try{const result=await lighthouse(base+path,{port:chrome.port,output:["html","json"],onlyCategories:["performance","accessibility","best-practices","seo"],formFactor:"mobile",logLevel:"error"});if(!result)throw new Error("No Lighthouse result");await writeFile(`reports/lighthouse-${name}.html`,result.report[0]);await writeFile(`reports/lighthouse-${name}.json`,result.report[1]);const summary={page:path,mode:"mobile simulated throttling; local production server",scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),lcpMs:result.lhr.audits["largest-contentful-paint"].numericValue,cls:result.lhr.audits["cumulative-layout-shift"].numericValue,tbtMs:result.lhr.audits["total-blocking-time"].numericValue,inp:"Not measured; requires field interaction data"};summaries.push(summary);console.log(JSON.stringify(summary));}finally{await chrome.kill();}
}
await writeFile("reports/lighthouse-summary.json",JSON.stringify(summaries,null,2));
