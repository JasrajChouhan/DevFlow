import qs from "query-string";

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  // stringify the object
  return qs.stringify({
    pathn: window.location.pathname,
    query: queryString,
  });
};
