import {countryTools,countryToolPath} from "../data/country-tools";
import {tools} from "../data/tools";
import {guideCategories as categories,guideCategoryPath} from "../data/guide-categories";
import {guides} from "../data/guides";
import {policies} from "../data/policies";
import {scenarios,scenarioPath} from "../data/scenarios";
import {pkRoutes} from "../data/pakistan";
import {guidePaginationPaths} from "./guide-pagination";
export const routeGroups={
  core:["/","/tools","/guides",...Object.keys(policies).map(slug=>`/${slug}`),...categories.map(guideCategoryPath),...guidePaginationPaths],
  tools:[...tools.map(t=>`/${t.slug}`),...countryTools.map(market=>countryToolPath(market.country))],guides:guides.map(g=>`/guides/${g.slug}`),scenarios:scenarios.map(scenarioPath),pk:pkRoutes,
};
// Single-guide collections remain useful navigation pages without competing for indexing.
export const navigationOnlyCategories=categories.filter(c=>guides.filter(g=>g.category===c).length<2).map(guideCategoryPath);
export const indexableRouteGroups={...routeGroups,core:routeGroups.core.filter(path=>!navigationOnlyCategories.includes(path))};
export const sitemapSegments=Object.keys(indexableRouteGroups) as (keyof typeof indexableRouteGroups)[];
