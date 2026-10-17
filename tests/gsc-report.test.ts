import {describe,it,expect} from "vitest";
import {parseCsv,validateConfig,createReport} from "../scripts/gsc-report-lib.mjs";

// Synthetic parser fixtures only; these are not site performance measurements.
const config=()=>({property:"https://example.test/",startDate:"2026-09-01",endDate:"2026-09-28",exportedOn:"2026-10-01",searchType:"web",filters:{country:"USA"},tables:{queries:"Queries.csv"},reviewRules:{minImpressions:100,maxCtr:.02,positionRange:[8,30]}});
const csv="Top queries,Clicks,Impressions,CTR,Position\nquote research,10,1000,1%,12\nbuying tools,60,200,30%,3\nno observations,0,0,0%,0\n";

describe("Search Console CSV reporting",()=>{
  it("reads BOM, CRLF, commas, escaped quotes and quoted newlines",()=>{
    expect(parseCsv('\uFEFFTop queries,Clicks\r\n"a, b ""quote""\nnext",2\r\n')).toEqual([["Top queries","Clicks"],['a, b "quote"\nnext',"2"]]);
  });
  it.each(['a,b\n"unfinished,1','a,b\nq"bad,1','a,b\n"q"oops,1'])("rejects malformed CSV instead of silently moving columns: %s",source=>{expect(()=>parseCsv(source)).toThrow();});
  it("recomputes aggregate CTR from counts and weights position by impressions",()=>{
    const report=createReport(config(),{queries:csv});
    expect(report.tables.queries.exportedRowsOnly).toEqual({clicks:70,impressions:1200,ctr:70/1200,impressionWeightedPosition:10.5});
    expect(report.tables.queries.reviewCandidates?.lowCtr.map(row=>row.key)).toEqual(["quote research"]);
    expect(report.tables.queries.reviewCandidates?.withinPositionRange.map(row=>row.key)).toEqual(["quote research"]);
    expect(report.tables.queries.topByImpressions[2].ctr).toBeNull();
  });
  it("uses counts rather than rounded or absent export CTR cells",()=>{
    const report=createReport(config(),{queries:"Query,Clicks,Impressions,Position\nx,1,3,2"});
    expect(report.tables.queries.topByImpressions[0].ctr).toBe(1/3);
  });
  it("accepts quoted thousands separators and never adds separate dimensions",()=>{
    const cfg={...config(),tables:{queries:"Queries.csv",pages:"Pages.csv"}};
    const report=createReport(cfg,{queries:csv,pages:'Top pages,Clicks,Impressions,Position\nhttps://example.test/tool,20,"2,000",10'});
    expect(report.tables.pages.exportedRowsOnly.impressions).toBe(2000);
    expect(report.tables.queries.exportedRowsOnly.impressions).toBe(1200);
    expect(report).not.toHaveProperty("totalClicks");
    expect(report.nextSteps.join(" ")).toContain("cannot reveal which query belongs to which page");
  });
  it.each(["query,Clicks,Impressions,Position\nx,1,2,3","Top queries,Clicks,Impressions,Position\nx,1K,2,3","Top queries,Clicks,Impressions,Position\nx,1,2,-3","Top queries,Clicks,Impressions,Position\nx,1,0,0","Top queries,Clicks,Impressions,Position\nx,1,2,0","Top queries,Clicks,Impressions,Position\nx,1,2,3\nx,1,2,3","Top queries,Clicks,Impressions,Position\nx,1,2,3,extra","Top queries,Clicks,Clicks,Impressions,Position\nx,1,1,2,3"])("fails closed on ambiguous or invalid exported data",source=>{expect(()=>createReport(config(),{queries:source})).toThrow();});
  it("keeps a header-only export distinct from observed zero performance",()=>{
    const table=createReport(config(),{queries:"Top queries,Clicks,Impressions,Position"}).tables.queries;
    expect(table.rowCount).toBe(0);expect(table.exportedRowsOnly.ctr).toBeNull();expect(table.warnings[0]).toContain("no performance rows");
  });
  it("keeps country/device summaries separate from query/page review candidates",()=>{
    const cfg={...config(),tables:{countries:"Countries.csv",devices:"Devices.csv"}};
    const report=createReport(cfg,{countries:"Country,Clicks,Impressions,Position\nUSA,1,20,10",devices:"Device,Clicks,Impressions,Position\nMOBILE,2,30,12"});
    expect(report.tables.devices.reviewCandidates).toBeNull();expect(report.tables.countries.rowCount).toBe(1);
  });
  it("rejects pages outside a prefix property, but supports domain subdomains",()=>{
    const cfg={...config(),tables:{pages:"Pages.csv"}};
    const source="Top pages,Clicks,Impressions,Position\nhttps://other.test/tool,1,2,3";
    expect(()=>createReport(cfg,{pages:source})).toThrow("outside");
    const domain={...cfg,property:"sc-domain:example.test"};
    expect(createReport(domain,{pages:source.replace("other.test","www.example.test")}).tables.pages.rowCount).toBe(1);
    expect(()=>createReport(domain,{pages:source.replace("other.test","fakeexample.test")})).toThrow("outside");
  });
  it.each([{startDate:"2026-02-30"},{endDate:"2026-08-01"},{exportedOn:"2026-09-01"},{searchType:"discover"},{filters:undefined},{tables:{}},{tables:{date:"Dates.csv"}},{property:"https://example.test"},{reviewRules:{minImpressions:0,maxCtr:2,positionRange:[30,8]}}])("requires real dates, known dimensions and explicit reporting context",change=>{expect(()=>validateConfig({...config(),...change})).toThrow();});
  it("does not manufacture data for missing tables",()=>{expect(()=>createReport(config(),{})).toThrow("Missing CSV");});
  it("rejects combined dimensions instead of treating them as a single-period table",()=>{
    expect(()=>createReport(config(),{queries:"Top queries,Clicks,Impressions,Position,Date\nx,1,2,3,2026-09-01"})).toThrow("unsupported columns");
  });
  it("rejects weighted-position overflow instead of serializing it as missing data",()=>{
    expect(()=>createReport(config(),{queries:`Top queries,Clicks,Impressions,Position\nx,1,100,${"9".repeat(308)}`})).toThrow("numeric precision");
  });
});
