import hmacSHA1 from 'crypto-js/hmac-sha1';
import base64 from 'crypto-js/enc-base64';
const crypto = require('crypto');
const url = require('url');

/**
 * Get API Endpoint and Path
 * Given an API URL, returns the path portion of the URL, and if being run
 * client-side, replaces the API URL with the proxy URL + path.
 *
 * @param {string} endpoint - API endpoint URL
 * @returns {object}
 */
export const getEndpointAndPath = endpoint => {
  let apiUrl = endpoint;

  // extract path from endpoint url
  // eslint-disable-next-line node/no-deprecated-api
  const apiPath = url.parse(apiUrl).pathname;

  // Remove domain from the client-side endpoint, and use the proxy instead
  if (process.client) {
    apiUrl = apiPath;
  }

  const returnObject = { apiUrl, apiPath };

  return returnObject;
};

/**
 * Generate MLTSHP API Authorization String
 * We must create a signed message for the API using the following:
 *  * The access token you just received.
 *  * A UTC timestamp (in seconds)
 *  * A nonce (random string between 10 and 35 characters long)
 *    Note: Don't use the UTC timestamp as a nonce!
 *  * Your request method (GET/POST)
 *  * The host (mltshp.com)
 *  * The port (443 for ssl)
 *  * The API endpoint path (/api/sharedfile/GA4)
 *  * The query array
 *    There is no query array for this request,
 *    but there will be an example on the developer site soon.
 *    There is a specific method for encoding this bit.
 *
 * @param {object} token
 * @param {string} token.access_token
 * @param {string} token.secret
 * @param {string} path
 * @param {string} [method=GET]
 * @returns {string}
 */
export const generateAuthString = (token, path, method = 'GET') => {
  console.groupCollapsed('GENERATE AUTH STRING', path);
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(20).toString('hex');

  // NOTE: using port 80 is a bug!
  // Port should be 443 but it's not recognizing it
  // You should use https for all API queries
  // @see https://github.com/MLTSHP/mltshp/issues/567
  const port = 80;

  // Normalize the message
  // NOTE: The order, indentation, and linebreaks are important!
  const normalizedString = `${token.access_token}
${timestamp}
${nonce}
${method}
mltshp.com
${port}
${path}
`;
  console.log('NORMALIZED STRING', normalizedString);

  // Create a signature by taking the normalizedString and use the secret to
  // construct a hash using SHA1 encoding, then Base64 the result.
  const hash = hmacSHA1(normalizedString, token.secret);
  const signature = base64.stringify(hash);

  const authString =
    `MAC token=${token.access_token}, ` +
    `timestamp=${timestamp}, ` +
    `nonce=${nonce}, ` +
    `signature=${signature}`;

  console.log('AUTH STRING', authString);
  console.groupEnd();

  return authString;
};

/**
 * Get from API
 *
 * @param {object} token
 * @param {string} endpoint
 * @returns {object}
 */
export const getFromApi = (token, endpoint) => {
  console.log('GET FROM API', endpoint);
  // get API URL and path
  const { apiUrl, apiPath } = getEndpointAndPath(endpoint);

  // Construct signature for API request
  const apiAuthString = generateAuthString(token, apiPath);

  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: apiAuthString,
    },
  })
    .then(response => {
      console.log('RESPONSE', response);
      return response;
    })
    .then(response => response.json())
    .then(response => {
      console.log('RESPONSE JSON', response);
      return response;
    })
    .catch(error => ({ error }));
};

/**
 * Post to API
 *
 * @param {object} token
 * @param {string} endpoint
 * @returns {object}
 */
export const postToApi = (token, endpoint) => {
  console.log('POST TO API', endpoint);
  // get API URL and path
  const { apiUrl, apiPath } = getEndpointAndPath(endpoint);

  // Construct signature for API request
  const apiAuthString = generateAuthString(token, apiPath, 'POST');

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: apiAuthString,
    },
  })
    .then(response => {
      console.log('RESPONSE', response);
      return response;
    })
    .then(response => response.json())
    .then(response => {
      console.log('RESPONSE JSON', response);
      return response;
    })
    .catch(error => ({ error }));
};
