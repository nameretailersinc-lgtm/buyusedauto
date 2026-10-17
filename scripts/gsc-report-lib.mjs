const dimensions={queries:["Top queries","Query"],pages:["Top pages","Page"],countries:["Country"],devices:["Device"]};

// CSV exports can contain quoted commas, escaped quotes, BOMs and multiline queries.
export function parseCsv(source){
  const rows=[];let row=[],field="",quoted=false,closed=false;
  const input=source.replace(/^\uFEFF/,"");
  for(let i=0;i<input.length;i++){
    const char=input[i];
    if(quoted){if(char==='"'){if(input[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=char;continue;}
    if(char==='"'){if(field||closed)throw new Error("Unexpected quote in CSV field");quoted=true;}
    else if(char===","){row.push(field);field="";closed=false;}
    else if(char==="\r"||char==="\n"){if(char==="\r"&&input[i+1]==="\n")i++;row.push(field);if(row.some(value=>value!==""))rows.push(row);row=[];field="";closed=false;}
    else {if(closed)throw new Error("Unexpected text after closing CSV quote");field+=char;}
  }
  if(quoted)throw new Error("Unclosed CSV quote");
  row.push(field);if(row.some(value=>value!==""))rows.push(row);
  return rows;
}

function date(value,name){
  if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value)throw new Error(`${name} must be a real YYYY-MM-DD date`);
  return value;
}
export function validateConfig(config){
  if(!config||typeof config!=="object")throw new Error("A report configuration is required");
  date(config.startDate,"startDate");date(config.endDate,"endDate");date(config.exportedOn,"exportedOn");
  if(config.startDate>config.endDate||config.endDate>config.exportedOn)throw new Error("Dates must satisfy startDate <= endDate <= exportedOn");
  const property=config.property;
  if(typeof property!=="string")throw new Error("property is required");
  if(property.startsWith("sc-domain:")){
    if(!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(property.slice(10)))throw new Error("Invalid domain property");
  }else{
    let url;try{url=new URL(property);}catch{throw new Error("Use a URL-prefix or sc-domain: property");}
    if(!["http:","https:"].includes(url.protocol)||url.username||url.password||url.search||url.hash||url.href!==property)throw new Error("Use a normalized URL-prefix property, including its trailing slash where appropriate");
  }
  if(!["web","image","video","news"].includes(config.searchType))throw new Error("searchType must be web, image, video or news");
  if(!config.filters||typeof config.filters!=="object"||Array.isArray(config.filters))throw new Error("filters must record the applied filters; use {} for none");
  if(!config.tables||typeof config.tables!=="object"||Array.isArray(config.tables)||!Object.keys(config.tables).length)throw new Error("At least one table is required");
  for(const [dimension,file] of Object.entries(config.tables))if(!dimensions[dimension]||typeof file!=="string"||!file.trim())throw new Error(`Unsupported or missing table: ${dimension}`);
  const rules=config.reviewRules;
  if(!rules||!Number.isSafeInteger(rules.minImpressions)||rules.minImpressions<1||!Number.isFinite(rules.maxCtr)||rules.maxCtr<0||rules.maxCtr>1||!Array.isArray(rules.positionRange)||rules.positionRange.length!==2||rules.positionRange.some(n=>!Number.isFinite(n)||n<1)||rules.positionRange[0]>rules.positionRange[1])throw new Error("Provide explicit reviewRules: minImpressions >= 1, maxCtr between 0 and 1, ordered positionRange >= 1");
  return config;
}

function numeric(value,name,integer=false){
  // Accept export grouping separators, but reject shorthand such as 1K or malformed groups.
  if(typeof value!=="string"||!(/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(value.trim()))throw new Error(`Invalid ${name}: expected an unabridged nonnegative number`);
  const number=Number(value.replaceAll(",",""));
  if(!Number.isFinite(number)||(integer&&!Number.isSafeInteger(number)))throw new Error(`Invalid ${name}`);
  return number;
}
function ownsPage(value,property){
  let url;try{url=new URL(value);}catch{return false;}
  if(!["http:","https:"].includes(url.protocol)||url.username||url.password)return false;
  if(property.startsWith("sc-domain:")){const domain=property.slice(10).toLowerCase();return url.hostname===domain||url.hostname.endsWith(`.${domain}`);}
  return url.href.startsWith(property);
}

export function analyzeTable(source,dimension,config){
  if(!dimensions[dimension])throw new Error(`Unsupported dimension: ${dimension}`);
  const csv=parseCsv(source);if(!csv.length)throw new Error(`${dimension}: CSV has no header`);
  const header=csv[0].map(value=>value.trim());
  if(new Set(header).size!==header.length)throw new Error(`${dimension}: duplicate headers`);
  const allowed=new Set([...dimensions[dimension],"Clicks","Impressions","CTR","Position"]);
  if(header.some(value=>!allowed.has(value)))throw new Error(`${dimension}: unsupported columns; use an English single-period dimension export`);
  const keyIndex=header.findIndex(value=>dimensions[dimension].includes(value));
  const indexes=Object.fromEntries(["Clicks","Impressions","Position"].map(name=>[name,header.indexOf(name)]));
  if(keyIndex<0||Object.values(indexes).some(index=>index<0))throw new Error(`${dimension}: expected English ${dimensions[dimension][0]}, Clicks, Impressions and Position columns; comparison exports are unsupported`);
  const seen=new Set();const rows=csv.slice(1).map((cells,index)=>{
    const line=index+2;
    if(cells.length!==header.length)throw new Error(`${dimension} row ${line}: column count differs from header`);
    const key=cells[keyIndex].trim();
    if(!key||seen.has(key))throw new Error(`${dimension} row ${line}: empty or duplicate dimension key; do not combine overlapping exports`);
    seen.add(key);
    if(dimension==="pages"&&!ownsPage(key,config.property))throw new Error(`${dimension} row ${line}: page is outside the configured property`);
    const clicks=numeric(cells[indexes.Clicks],"clicks",true),impressions=numeric(cells[indexes.Impressions],"impressions",true),position=numeric(cells[indexes.Position],"position");
    if((impressions===0&&clicks>0)||(impressions>0&&position<1))throw new Error(`${dimension} row ${line}: inconsistent counts or position`);
    return {key,clicks,impressions,ctr:impressions?clicks/impressions:null,position:impressions?position:null};
  });
  rows.sort((a,b)=>b.impressions-a.impressions||b.clicks-a.clicks||a.key.localeCompare(b.key));
  const clicks=rows.reduce((sum,row)=>sum+row.clicks,0),impressions=rows.reduce((sum,row)=>sum+row.impressions,0);
  if(!Number.isSafeInteger(clicks)||!Number.isSafeInteger(impressions))throw new Error(`${dimension}: totals exceed safe integer precision`);
  const weightedPosition=rows.reduce((sum,row)=>sum+row.position*row.impressions,0);
  if(!Number.isFinite(weightedPosition))throw new Error(`${dimension}: weighted position exceeds numeric precision`);
  const [minPosition,maxPosition]=config.reviewRules.positionRange;
  const enough=row=>row.impressions>=config.reviewRules.minImpressions;
  return {
    rowCount:rows.length,
    exportedRowsOnly:{clicks,impressions,ctr:impressions?clicks/impressions:null,impressionWeightedPosition:impressions?weightedPosition/impressions:null},
    topByImpressions:rows.slice(0,25),
    reviewCandidates:["queries","pages"].includes(dimension)?{
      lowCtr:rows.filter(row=>enough(row)&&row.ctr<=config.reviewRules.maxCtr).slice(0,25),
      withinPositionRange:rows.filter(row=>enough(row)&&row.position>=minPosition&&row.position<=maxPosition).slice(0,25)
    }:null,
    warnings:[...(rows.length===0?["Header-only export: no performance rows were supplied."]:[]),"These totals cover exported rows only; they are not property totals. Do not sum or join independent dimension tables.","Privacy omissions, export truncation and grouping differences can prevent reconciliation with Search Console chart totals."]
  };
}

export function createReport(config,sources){
  validateConfig(config);
  return {
    status:"analyzed-supplied-exports",
    scope:"One Search Console export snapshot; no account access, indexing inspection, forecasts or causal ranking claims.",
    context:{property:config.property,startDate:config.startDate,endDate:config.endDate,exportedOn:config.exportedOn,searchType:config.searchType,filters:config.filters},
    reviewRules:{...config.reviewRules,meaning:"Operator-selected triage rules, not expected CTR benchmarks or predicted gains. Lists can overlap; review each key once."},
    tables:Object.fromEntries(Object.entries(config.tables).map(([dimension,file])=>{
      if(typeof sources[dimension]!=="string")throw new Error(`Missing CSV for ${dimension}`);
      return [dimension,{sourceFile:file,...analyzeTable(sources[dimension],dimension,config)}];
    })),
    nextSteps:["Review intent, result appearance and the actual page before changing a title or content.","Separate dimension exports cannot reveal which query belongs to which page; obtain a page-filtered query export to investigate that relationship.","Use matched periods and identical filters for comparisons; absence from an export is not proof of zero performance."],
    references:["https://developers.google.com/search/blog/2022/10/performance-data-deep-dive","https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data"]
  };
}
