// eslint-disable-next-line import/extensions
import generateMltshpAuthString from '~/utils/generateMltshpAuthString';

/**
 * Get MLTSHP Fetch Options
 * All MLTSHP API calls share the same fetch options so we're standardizing.
 */
const getMltshpFetchOptions = (path: string, token: any) => {
  const authString = generateMltshpAuthString(token, path);
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authString,
    },
  };
};

export default getMltshpFetchOptions;
