import {
  encodeQuery,
  parseQuery,
} from '~/node_modules/@nuxtjs/auth/lib/core/utilities';
import { getEndpointAndPath, generateAuthString } from '~/services/mltshp';
const url = require('url');
const isHttps = process.server ? require('is-https') : null;

/**
 * Auth Module OAuth2 Scheme for MLTSHP.com
 * This is a modified copy of @nuxtjs/auth/lib/schemes/oauth2.js
 *
 * MLTSHP's OAuth2 implimentation is different from what the Nuxt Auth module
 * expects. For example, MLTSHP does not return a state parameter with the
 * auth code. Also, when making API requests, rather than simply attaching the
 * token as a parameter, MLTSHP expects a signature made using the token.
 */
export default class Oauth2Scheme {
  constructor(auth, options) {
    this.$auth = auth;
    this.req = auth.ctx.req;
    this.name = options._name;
    this.options = options;
  }

  /**
   * Get Redirect URI
   * Determines the correct redirect URI. First choice is if one is specified in
   * the strategy options. If not, then combine the current URL with the
   * callback property from the redirect object.
   */
  get _redirectURI() {
    const url = this.options.redirect_uri;

    if (url) {
      return url;
    }

    if (process.server && this.req) {
      const protocol = 'http' + (isHttps(this.req) ? 's' : '') + '://';

      return (
        protocol + this.req.headers.host + this.$auth.options.redirect.callback
      );
    }

    if (process.client) {
      return window.location.origin + this.$auth.options.redirect.callback;
    }
  }

  /**
   * Mounted
   * Load the token, if it exists. Try the callback method, which will request
   * an API access token if this is the callback route. Now we should have a
   * valid token, so try to fetch the user from the API.
   */
  async mounted() {
    console.groupCollapsed('[MLTSHP AUTH] MOUNTED', this.$auth.ctx.route.path);

    // Sync token
    const token = this.$auth.syncToken(this.name);
    console.log('[MLTSHP AUTH] SYNC TOKEN', token);

    // Handle callbacks. If this is the callback route, it will request a token.
    // If it gets a token, it will return true as it redirects back to home.
    const redirected = await this._handleCallback();
    console.log('[MLTSHP AUTH] CALLBACK REDIRECTED?', redirected);

    // Only fetch the user if we aren't currently redirecting
    if (!redirected) {
      console.log('[MLTSHP AUTH] NOT REDIRECTED, FETCH USER');
      console.groupEnd();
      return this.$auth.fetchUserOnce();
    }
    console.groupEnd();
  }

  /**
   * Log Out
   * Reset the auth state.
   */
  logout() {
    console.log('[MLTSHP AUTH] LOGOUT');
    return this.$auth.reset();
  }

  /**
   * Log In
   * Construct authorization endpoint URL with parameters, then go there.
   */
  login() {
    console.groupCollapsed('[MLTSHP AUTH] LOGIN');
    const opts = {
      response_type: 'code',
      client_id: this.options.client_id,
      redirect_uri: this._redirectURI,
    };
    const url = this.options.authorization_endpoint + '?' + encodeQuery(opts);

    console.table(opts);
    console.log('[MLTSHP AUTH] LOGIN URL', url);
    console.groupEnd();

    window.location = url;
  }

  /**
   * Fetch User
   * If we have a token and a user info endpoint, then construct an auth
   * string and use that to sign an API request for the user's info.
   */
  async fetchUser() {
    console.groupCollapsed('[MLTSHP AUTH] FETCH USER', this.$auth.user);

    if (!this.$auth.getToken(this.name)) {
      console.warn('[MLTSHP AUTH] NO TOKEN');
      console.groupEnd();
      return;
    }

    if (!this.options.userinfo_endpoint) {
      console.warn('[MLTSHP AUTH] NO USERINFO ENDPOINT');
      console.groupEnd();
      this.$auth.setUser({});
      return;
    }

    const { apiUrl, apiPath } = getEndpointAndPath(
      this.options.userinfo_endpoint
    );

    // Construct signature for API request
    const apiAuthString = generateAuthString(
      this.$auth.getToken(this.name),
      apiPath
    );

    // Request user info from the API
    const user = await this.$auth.requestWith(this.name, {
      url: apiUrl,
      headers: {
        Authorization: apiAuthString,
      },
    });

    if (!user) {
      console.error('[MLTSHP AUTH] NO USER!');
      console.groupEnd();
      return;
    }

    // massage the data
    user.shakes.forEach(shake => {
      // eslint-disable-next-line node/no-deprecated-api
      const shakePath = url.parse(shake.url).pathname;
      if (shake.type === 'user') {
        shake.url = `${shakePath}`;
      } else {
        shake.url = `/shake${shakePath}`;
      }
    });

    // Store the user object
    this.$auth.setUser(user);
    console.log('[MLTSHP AUTH] USER', user);
    console.groupEnd();
  }

  /**
   * Handle Callback
   * Check the URL for a `code` parameter, then request an access token from
   * the API using the code. If we get a token back, save it and redirect home.
   */
  async _handleCallback(uri) {
    console.groupCollapsed('[MLTSHP AUTH] CALLBACK');

    // Handle callback only for specified route
    if (
      this.$auth.options.redirect &&
      this.$auth.ctx.route.path !== this.$auth.options.redirect.callback
    ) {
      console.warn('[MLTSHP AUTH] NOT CALLBACK ROUTE');
      console.groupEnd();
      return;
    }

    // Callback flow is not supported in server side
    if (process.server) {
      console.warn('[MLTSHP AUTH] NO CALLBACKS ON SERVER');
      console.groupEnd();
      return;
    }

    const hash = parseQuery(this.$auth.ctx.route.hash.substr(1));
    const parsedQuery = Object.assign({}, this.$auth.ctx.route.query, hash);
    let token = parsedQuery[this.options.token_key || 'access_token'];
    console.log('[MLTSHP AUTH] PARSE QUERY', parsedQuery, token);

    // -- Authorization Code Grant --
    // Client secret will be appended by the proxy server, see add-authorize.js
    if (parsedQuery.code) {
      console.groupCollapsed('[MLTSHP AUTH] GET TOKEN');
      console.log('[MLTSHP AUTH] REQUEST', this.options.access_token_endpoint);
      const data = await this.$auth.request({
        method: 'post',
        url: this.options.access_token_endpoint,
        baseURL: process.server ? undefined : false,
        data: encodeQuery({
          code: parsedQuery.code,
          client_id: this.options.client_id,
          redirect_uri: this._redirectURI,
          grant_type: 'authorization_code',
        }),
      });
      console.table(data);

      // Check if we have an access token
      if (data.access_token) {
        token = data; // Save the entire token object
        console.log('[MLTSHP AUTH] TOKEN', token);
      }
      console.groupEnd();
    }

    if (!token || !token.access_token || !token.access_token.length) {
      console.error('[MLTSHP AUTH] NO TOKEN!');
      console.groupEnd();
      return;
    }

    // Store token
    this.$auth.setToken(this.name, token);
    console.log('[MLTSHP AUTH] STORE TOKEN', this.name, token);

    console.groupEnd();

    // Redirect to home
    this.$auth.redirect('home', true);

    return true; // True means a redirect happened
  }
}
