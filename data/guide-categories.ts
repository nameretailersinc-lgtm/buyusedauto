import {categories as toolCategories} from "./tools";

export const guideCategories = [...toolCategories, "Mathematics / Calculators"] as const;
export type GuideCategory = typeof guideCategories[number];

export function guideCategorySlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function guideCategoryPath(category: string) {
  return `/guides/category/${guideCategorySlug(category)}`;
}
