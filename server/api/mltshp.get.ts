import { getToken } from '#auth';
import { JWTWithAccessToken } from '~/types/JWTWithAccessToken';

export default defineEventHandler(async (event) => {
  const { path } = getQuery(event);
  if (!path) throw Error('Missing Path!');
  const token = await getToken({ event });
  if (!token) throw Error(`Missing Token to load path ${path}`);
  const authString = generateMltshpAuthString(
    token as JWTWithAccessToken,
    path as string
  );
  return fetch(`https://mltshp.com${path}`, {
    headers: {
      Authorization: authString,
    },
  }).then((response) => {
    if (!response.ok)
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    return response.json();
  });
});
