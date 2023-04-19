// eslint-disable-next-line import/extensions
import getMltshpFetchOptions from '~/utils/getMltshpFetchOptions';

/**
 * Get MLTSHP User
 * @see https://mltshp.com/developers
 */
const getMltshpUser = (context: any) => {
  const userInfoUrl = new URL(context.provider.userinfo.url);
  const userInfoPath = userInfoUrl.pathname;
  return fetch(
    context.provider.userinfo.url,
    getMltshpFetchOptions(userInfoPath, context.tokens)
  )
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch((error) => ({ error }));
};

export default getMltshpUser;
