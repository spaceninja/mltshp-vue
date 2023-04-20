import { getToken } from '#auth';
import { JWTWithAccessToken } from '~/types/JWTWithAccessToken';

export default eventHandler(async (event) => {
  const token = await getToken({ event });
  if (!token) throw Error('Missing Token!');
  const authString = generateMltshpAuthString(
    token as JWTWithAccessToken,
    '/api/sharedfile/GA4'
  );
  return fetch('https://mltshp.com/api/sharedfile/GA4', {
    headers: {
      Authorization: authString,
    },
  })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch((error) => ({ error }));
});
