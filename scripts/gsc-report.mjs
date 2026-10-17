import {readFile,mkdir,writeFile} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import {createReport,validateConfig} from "./gsc-report-lib.mjs";

const args=process.argv.slice(2);
if(args.length===1&&args[0]==="--help"){
  console.log("Usage: npm run report:gsc -- --config docs/seo/inputs/gsc-report.json --output reports/gsc-report.json\nEnglish single-period CSVs only. See docs/seo/inputs/README.md. Missing inputs fail; no sample traffic is generated.");
}else{
  try{
    const options={};
    for(let i=0;i<args.length;i+=2){if(!["--config","--output"].includes(args[i])||!args[i+1]||args[i+1].startsWith("--")||options[args[i]])throw new Error("Expected --config <file> --output <file>; use --help");options[args[i]]=args[i+1];}
    if(!options["--config"]||!options["--output"])throw new Error("Both --config and --output are required; use --help");
    const configPath=resolve(options["--config"]),output=resolve(options["--output"]);
    const config=JSON.parse(await readFile(configPath,"utf8"));
    // Validate the manifest before opening its referenced CSVs.
    validateConfig(config);
    const sourcePaths=Object.fromEntries(Object.entries(config.tables).map(([dimension,file])=>[dimension,resolve(dirname(configPath),file)]));
    const pathKey=path=>process.platform==="win32"?path.toLowerCase():path;
    if([configPath,...Object.values(sourcePaths)].some(path=>pathKey(path)===pathKey(output)))throw new Error("Output must not overwrite the config or input CSVs");
    const sources=Object.fromEntries(await Promise.all(Object.entries(sourcePaths).map(async([dimension,file])=>[dimension,await readFile(file,"utf8")])));
    const report=createReport(config,sources);
    await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+"\n");
    // Query text and URLs stay in the local artifact, not in the command log.
    console.log(JSON.stringify({status:report.status,output:options["--output"],tables:Object.fromEntries(Object.entries(report.tables).map(([key,table])=>[key,{rows:table.rowCount}]))},null,2));
  }catch(error){console.error(`GSC report not generated: ${error.message}`);process.exitCode=1;}
}
