/**
 * Get MLTSHP Token
 * @see https://mltshp.com/developers
 */
const getMltshpToken = (context: any) =>
  fetch(context.provider.token.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:
      `grant_type=authorization_code` +
      `&client_id=${context.provider.clientId}` +
      `&client_secret=${context.provider.clientSecret}` +
      `&code=${context.params.code}` +
      `&redirect_uri=${context.provider.callbackUrl}`,
  })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch((error) => ({ error }));

export default getMltshpToken;
