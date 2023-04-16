import hmacSHA1 from 'crypto-js/hmac-sha1';
import base64 from 'crypto-js/enc-base64';
import * as crypto from 'crypto';

interface TokenSet {
  access_token: string;
  secret: string;
}

/**
 * Generate API Authorization String
 * We must create a signed message for the API using the following:
 *  - An API access token
 *  - A UTC timestamp (in seconds)
 *  - A nonce (random string between 10 and 35 characters long)
 *    Note: Don't use the UTC timestamp as a nonce!
 *  - Your request method (GET/POST)
 *  - The host (mltshp.com)
 *  - The port (443 for SSL)
 *  - The API endpoint path (/api/sharedfile/GA4)
 * @see https://mltshp.com/developers
 */
const generateMltshpAuthString = (
  token: TokenSet,
  path: string,
  method = 'GET'
) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(20).toString('hex');

  // NOTE: using port 80 due to a bug in the API.
  // https://github.com/MLTSHP/mltshp/issues/567
  const port = 80;

  // Normalize the message.
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

  return authString;
};

export default generateMltshpAuthString;
