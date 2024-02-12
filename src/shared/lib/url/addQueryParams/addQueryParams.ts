export function getQueryParams(params: OptionalRecord<string, string>) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value);
    }
  });
  console.log(searchParams);
  return `?${searchParams.toString()}`;
}

/**
 * Функция добавления параметров строки заппроса в URL
 * @param params
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
  window.history.pushState(null, '', getQueryParams(params));
}
