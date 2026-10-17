// Page-one aliases redirect to their collection; they are not indexable pages.
export function paginationRedirectTarget(path) {
  return /^\/guides(?:\/category\/(buying|financing|ownership|selling))?\/page\/1$/.test(path)
    ? path.replace(/\/page\/1$/, '')
    : null;
}
