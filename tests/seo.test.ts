import {describe,it,expect} from "vitest";
import {indexingEnabled,normalizeSiteOrigin} from "../lib/seo-config";
import {routeGroups,indexableRouteGroups,navigationOnlyCategories,sitemapSegments} from "../lib/routes";
import {guides} from "../data/guides";
import {guideCategories as categories,guideCategoryPath} from "../data/guide-categories";
import {tools} from "../data/tools";
import {countryTools,countryToolPath} from "../data/country-tools";
import {pkRoutes} from "../data/pakistan";
describe("indexing and canonical configuration",()=>{
  it("protects Vercel previews/development without blocking crawler access",()=>{
    expect(indexingEnabled({VERCEL_ENV:"preview",SITE_INDEXING:"enabled"})).toBe(false);
    expect(indexingEnabled({VERCEL_ENV:"development"})).toBe(false);
    expect(indexingEnabled({VERCEL_ENV:"production",SITE_INDEXING:"enabled"})).toBe(true);
    expect(indexingEnabled({VERCEL_ENV:"production",SITE_INDEXING:"disabled"})).toBe(false);
    expect(indexingEnabled({})).toBe(true);
  });
  it("rejects invalid indexing modes rather than silently indexing",()=>{expect(()=>indexingEnabled({SITE_INDEXING:"disable"})).toThrow();});
  it("advertises every content group and includes all current guides and tools once",()=>{
    expect(sitemapSegments).toEqual(["core","tools","guides","scenarios","pk"]);
    const paths=sitemapSegments.flatMap(segment=>indexableRouteGroups[segment]);
    const expected=[...guides.map(guide=>`/guides/${guide.slug}`),...tools.map(tool=>`/${tool.slug}`),...countryTools.map(tool=>countryToolPath(tool.country)),...pkRoutes];
    for(const path of expected)expect(paths.filter(item=>item===path),path).toHaveLength(1);
    for(const path of ["/car-loan-apr-calculator","/car-repair-cost-calculator","/car-registration-tax-calculator"])expect(paths).toContain(path);
    expect(paths.some(path=>path.includes("?")||/\/page\/1$/.test(path))).toBe(false);
  });
  it("normalizes the HTTPS origin and rejects malformed canonical configuration",()=>{
    expect(normalizeSiteOrigin("https://buyusedautomobiles.com/")).toBe("https://buyusedautomobiles.com");
    for(const value of ["http://example.com","https://example.com/tools","https://example.com/?x=1","https://example.com/#x","https://user:password@example.com","not-a-url"])expect(()=>normalizeSiteOrigin(value)).toThrow();
  });
  it("keeps singleton collections available but out of indexable sitemap sets",()=>{
    expect(navigationOnlyCategories).toEqual(["/guides/category/selling","/guides/category/mathematics-calculators"]);
    for(const category of categories){
      const path=guideCategoryPath(category);
      const count=guides.filter(g=>g.category===category).length;
      expect(routeGroups.core).toContain(path);
      expect(indexableRouteGroups.core.includes(path),`${category}: ${count} guides`).toBe(count>=2);
    }
    for(const path of navigationOnlyCategories){expect(routeGroups.core).toContain(path);expect(indexableRouteGroups.core).not.toContain(path);}
    expect(indexableRouteGroups.core).toContain("/guides/category/buying");
    expect(indexableRouteGroups.core).toContain("/guides/category/ownership");
    expect(indexableRouteGroups.guides).toHaveLength(guides.length);
    const routes=Object.values(indexableRouteGroups).flat();expect(new Set(routes).size).toBe(routes.length);
  });
});
