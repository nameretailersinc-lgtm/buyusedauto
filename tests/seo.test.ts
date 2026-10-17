import {describe,it,expect} from "vitest";
import {indexingEnabled,normalizeSiteOrigin} from "../lib/seo-config";
import {routeGroups,indexableRouteGroups,navigationOnlyCategories} from "../lib/routes";
import {guides} from "../data/guides";
import {categories} from "../data/tools";
describe("indexing and canonical configuration",()=>{
  it("protects Vercel previews/development without blocking crawler access",()=>{
    expect(indexingEnabled({VERCEL_ENV:"preview",SITE_INDEXING:"enabled"})).toBe(false);
    expect(indexingEnabled({VERCEL_ENV:"development"})).toBe(false);
    expect(indexingEnabled({VERCEL_ENV:"production",SITE_INDEXING:"enabled"})).toBe(true);
    expect(indexingEnabled({VERCEL_ENV:"production",SITE_INDEXING:"disabled"})).toBe(false);
    expect(indexingEnabled({})).toBe(true);
  });
  it("rejects invalid indexing modes rather than silently indexing",()=>{expect(()=>indexingEnabled({SITE_INDEXING:"disable"})).toThrow();});
  it("normalizes the HTTPS origin and rejects malformed canonical configuration",()=>{
    expect(normalizeSiteOrigin("https://buyusedautomobiles.com/")).toBe("https://buyusedautomobiles.com");
    for(const value of ["http://example.com","https://example.com/tools","https://example.com/?x=1","https://example.com/#x","https://user:password@example.com","not-a-url"])expect(()=>normalizeSiteOrigin(value)).toThrow();
  });
  it("keeps singleton collections available but out of indexable sitemap sets",()=>{
    expect(navigationOnlyCategories).toEqual(["/guides/category/financing","/guides/category/selling"]);
    for(const category of categories){
      const path=`/guides/category/${category.toLowerCase()}`;
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
