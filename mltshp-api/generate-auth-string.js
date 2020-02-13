import hmacSHA1 from 'crypto-js/hmac-sha1';
import base64 from 'crypto-js/enc-base64';

/**
 * Convert Decimal to Hex
 * i.e. 0-255 -> '00'-'ff'
 *
 * @param {number} dec
 * @returns {string}
 * @see https://stackoverflow.com/a/27747377
 */
const dec2hex = dec => {
  return ('0' + dec.toString(16)).substr(-2);
};

/**
 * Generate a Nonce
 * Returns a random string of the specified length
 *
 * @param {number} [length=40]
 * @returns {string}
 * @see https://stackoverflow.com/a/27747377
 */
const generateNonce = (length = 40) => {
  const array = new Uint8Array(length / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
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
const generateAuthString = (token, path, method = 'GET') => {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = generateNonce(35);

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

  // Create a signature by taking the normalizedString and use the secret to
  // construct a hash using SHA1 encoding, then Base64 the result.
  const hash = hmacSHA1(normalizedString, token.secret);
  const signature = base64.stringify(hash);

  const authString =
    `MAC token=${token.access_token}, ` +
    `timestamp=${timestamp}, ` +
    `nonce=${nonce}, ` +
    `signature=${signature}`;

  console.group('GENERATE AUTH STRING');
  console.log(normalizedString);
  console.log(authString);
  console.groupEnd();

  return authString;
};

export default generateAuthString;
