export function makeQueryString(queryConfig: Record<string, string>) {
  const urlSearchParams = new URLSearchParams(queryConfig);
  return `?${urlSearchParams.toString()}`;
}

export function getQueryValue(key: string) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(key);
}
