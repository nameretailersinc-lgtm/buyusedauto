import {guides, type Guide} from "../data/guides";
import {categories} from "../data/tools";

export const guidePageSize = 6;
export function guidePagePath(page: number, category?: string) {
  const base = category ? `/guides/category/${category.toLowerCase()}` : "/guides";
  return page === 1 ? base : `${base}/page/${page}`;
}
export function paginateGuides(items: Guide[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / guidePageSize));
  if (!Number.isSafeInteger(page) || page < 1 || page > totalPages) return null;
  return {items: items.slice((page - 1) * guidePageSize, page * guidePageSize), totalPages, start: (page - 1) * guidePageSize};
}
export const guidePaginationPaths = [undefined, ...categories].flatMap(category => {
  const count = category ? guides.filter(guide => guide.category === category).length : guides.length;
  return Array.from({length: Math.max(0, Math.ceil(count / guidePageSize) - 1)}, (_, index) => guidePagePath(index + 2, category));
});
