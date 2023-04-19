/**
 * Get MLTSHP User
 * @see https://mltshp.com/developers
 */
const getMltshpUser = (context: any) => {
  const userInfoUrl = new URL(context.provider.userinfo.url);
  const userInfoPath = userInfoUrl.pathname;
  const authString = generateMltshpAuthString(context.tokens, userInfoPath);
  return fetch(context.provider.userinfo.url, {
    headers: {
      Authorization: authString,
    },
  })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch((error) => ({ error }));
};

export default getMltshpUser;
