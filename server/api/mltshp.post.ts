import { getToken } from '#auth';
import { JWTWithAccessToken } from '~/types/JWTWithAccessToken';

export default defineEventHandler(async (event) => {
  const { path } = getQuery(event);
  if (!path) throw Error('Missing Path!');
  const token = await getToken({ event });
  if (!token) throw Error(`Missing Token for path ${path}`);
  const body = await readBody(event);
  const encBody = body ? encodeQuery(body) : null;
  const authString = generateMltshpAuthString(
    token as JWTWithAccessToken,
    path as string,
    'POST'
  );
  return fetch(`https://mltshp.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: authString,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encBody,
  }).then(async (response) => {
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    }
    return response.json();
  });
});
