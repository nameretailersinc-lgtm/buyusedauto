import {describe,it,expect} from "vitest";
import {paginationRedirectTarget} from "../scripts/seo-route-policy.mjs";
describe("SEO audit pagination aliases",()=>{
  it("recognizes only page-one collection aliases",()=>{
    expect(paginationRedirectTarget("/guides/page/1")).toBe("/guides");
    for(const category of ["buying","financing","ownership","selling"])expect(paginationRedirectTarget(`/guides/category/${category}/page/1`)).toBe(`/guides/category/${category}`);
  });
  it("keeps normal pages and invalid routes in the ordinary audit",()=>{
    for(const path of ["/guides","/guides/page/2","/guides/page/01","/guides/category/buying/page/3","/guides/category/invalid/page/1","/other/page/1"])expect(paginationRedirectTarget(path)).toBeNull();
  });
});
