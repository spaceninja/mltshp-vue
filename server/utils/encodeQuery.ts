/**
 * Encode Query
 * Copied from Nuxt Auth:
 * @see https://github.com/nuxt-community/auth-module/blob/dev/src/utils/index.ts
 */
const encodeQuery = (queryObject: {
  [key: string]: string | number | boolean;
}): string =>
  Object.entries(queryObject)
    .filter(([_key, value]) => typeof value !== 'undefined')
    .map(
      ([key, value]) =>
        encodeURIComponent(key) +
        (value != null ? `=${encodeURIComponent(value)}` : '')
    )
    .join('&');

export default encodeQuery;
